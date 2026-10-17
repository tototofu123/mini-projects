"""Web search: ddgs for the result list, then a headless browser
(Playwright, no visible window) opens the top organic results and reads
their main content, skipping ads/navigation.

Search engines (Google/Bing/Brave/DDG web) block this datacenter IP with
captchas, so we never scrape SERPs — we only open the result pages
themselves, which is far more reliable.
"""
import asyncio
import re
from typing import List, Dict, Optional

from ddgs import DDGS

BROWSER_SKIP = (
    "facebook.com", "instagram.com", "tiktok.com", "pinterest.com",
    "amazon.", "ebay.", "aliexpress", "twitter.com", "x.com",
    "youtube.com", "reddit.com/r/", "walmart", "shopee", "taobao",
)

JS_CLEAN = """() => {
    for (const sel of [
        'script','style','noscript','nav','header','footer','aside',
        'iframe','form','svg','canvas',
        '.ad','.ads','.advert','[id*="ad"],[class*="ad"],[class*="cookie"]',
        '[class*="consent"],[class*="popup"],[class*="newsletter"]',
        '[class*="subscribe"],[class*="banner"],[class*="menu"]',
        '[class*="sidebar"],[class*="related"],[class*="promo"]',
        '[aria-label*="Advertisement"],[role="complementary"]'
    ]) {
        document.querySelectorAll(sel).forEach(el => el.remove());
    }
    const main = document.querySelector('main, article, [role="main"], #content');
    const root = main || document.body;
    let text = root.innerText || '';
    text = text.replace(/\\u00a0/g, ' ');
    return text;
}"""


_BING_ANSWER_JS = r"""() => {
    const NOISE = ['people also ask', 'videos of', 'images of', 'deep dive',
        'related searches', 'news about', 'see more', 'feedback'];
    function clean(t) {
        t = (t || '').trim();
        t = t.replace(/^Like\s*\|?\s*Dislike\s*/, '').trim();
        return t;
    }
    function isNoise(t) {
        const low = t.toLowerCase();
        for (const n of NOISE) { if (low.startsWith(n)) return true; }
        return t.length < 40;
    }
    // 1) AI-generated answer box (.b_ans.b_top), excluding video/news boxes
    const top = document.querySelector('.b_ans.b_top:not(.b_vidAns):not(.b_mop)');
    if (top) {
        const t = clean(top.innerText);
        if (!isNoise(t)) return t;
    }
    // 2) any other substantive .b_ans box
    let best = null, bestLen = 0;
    document.querySelectorAll('.b_ans').forEach(el => {
        const t = clean(el.innerText);
        if (isNoise(t)) return;
        if (t.length > bestLen) { bestLen = t.length; best = t; }
    });
    if (best) return best;
    // 3) knowledge/entity answer
    const k = document.querySelector('#b_context, .b_entityTitle');
    if (k) { const t = clean(k.innerText); if (!isNoise(t)) return t; }
    // 4) top organic result snippet — often contains the direct answer
    const first = document.querySelector('#b_results > li.b_algo');
    if (first) {
        const t = clean(first.innerText);
        if (!isNoise(t)) return t;
    }
    return '';
}"""


def _clean_ai(text: str) -> str:
    """Strip Bing UI noise (Like/Dislike/Feedback/news boilerplate)."""
    lines = []
    for ln in text.splitlines():
        ln = ln.strip()
        if not ln:
            continue
        low = ln.lower()
        if low in ("like", "dislike", "feedback", "see more news"):
            continue
        if low.startswith("news about") or ln.startswith("· "):
            continue
        lines.append(ln)
    return "\n".join(lines)


_PPLX_WAIT_JS = r"""() => {
    const el = document.querySelector('div[class*="prose"]');
    if (!el) return false;
    const t = (el.innerText || '');
    return t.length > 60 && !t.includes('Searching the web');
}"""

_PPLX_ANSWER_JS = r"""() => {
    const el = document.querySelector('div[class*="prose"]');
    if (!el) return '';
    let t = el.innerText || '';
    const src = [...document.querySelectorAll('div,span')].find(e =>
        /^\d+\s*sources?$/i.test((e.innerText || '').trim()));
    if (src) t = t + '\n\n[' + src.innerText.trim() + ']';
    return t;
}"""


_TIME_SENSITIVE = ("price", "gold", "bitcoin", "stock", "crypto", "election",
                   "won", "winner", "latest", "version", "score", "match",
                   "game", "weather", "today", "current", "time in", "when",
                   "news", "update", "release", "result", "rate", "market",
                   "election", "ago", "last")


def _has_live_data_answer(answer: str) -> bool:
    """Reject Perplexity answers that admit to having no live data."""
    low = answer.lower()
    for pat in ("i don't have live", "don't have real-time", "no live data",
                "can't provide real-time", "i don't have real-time",
                "don't have current", "as of my knowledge cutoff",
                "i don't have real-time data"):
        if pat in low:
            return False
    return True


def _clean_perplexity(text: str) -> str:
    """Strip Perplexity citation artifacts (+1 / source-name lines)."""
    for marker in ("facts this depends on", "follow-ups", "sources:"):
        idx = text.lower().find(marker)
        if idx > 0:
            text = text[:idx]
    lines = []
    for ln in text.splitlines():
        ln = ln.strip()
        if not ln:
            continue
        if re.fullmatch(r"[+\d\s]{1,6}", ln):
            continue
        low = ln.lower()
        if low in ("follow-ups", "links", "images", "share", "answer",
                   "searching the web", "sign in"):
            continue
        lines.append(ln)
    while len(lines) > 1 and re.fullmatch(r"[a-z]{2,24}", lines[-1]):
        lines.pop()
    return "\n".join(lines)


PRIORITY_DOMAINS = (
    "goldprice.org", "kitco.com", "tradingview.com", "investing.com",
    "livepriceofgold.com", "apmex.com", "bullionbypost", "tradingeconomics.com",
    "metals.live", "silverprice.org", "coinbase.com", "finance.yahoo.com",
    "reuters.com", "bloomberg.com", "cnbc.com", "marketwatch.com",
    "nvidia.com", "python.org", "nodejs.org", "react.dev", "npmjs.com",
    "stackoverflow.com", "github.com", "developer.mozilla.org", "w3schools.com",
    "openai.com", "anthropic.com", "docker.com", "kubernetes.io",
)

PRICE_REFINERS = ("price", "rate", "value", "cost", "usd", "costs", "how much", "per ounce", "per kg")


_PLACE_ALIASES = {
    "usa": "united states", "us": "united states", "u.s.": "united states",
    "uk": "united kingdom", "england": "united kingdom",
    "hk": "hong kong", "nyc": "new york", "ny": "new york",
    "la": "los angeles", "sf": "san francisco", "dc": "washington",
    "korea": "south korea", "switzerland": "swiss",
}

_SKIP_PLACE_WORDS = {"what", "whats", "is", "the", "time", "in", "at", "it",
                     "current", "local", "now", "today", "clock", "of"}


def _answer_place_matches(answer: str, query: str) -> bool:
    """Bing sometimes serves a wrong-location time widget (e.g. India for
    'time in usa'). Check the answer's place against the query's place."""
    m = re.search(r"time\s+in\s+(.+?)(?:\s*\(|$)", answer, re.I)
    if not m:
        return True  # not a time-widget answer; can't verify
    place = m.group(1).lower()
    q_words = set(w for w in re.findall(r"[a-z]{2,}", query.lower())
                  if w not in _SKIP_PLACE_WORDS)
    if not q_words:
        return True
    for w in q_words:
        if w in place:
            return True
        alias = _PLACE_ALIASES.get(w)
        if alias and (alias in place or alias.split()[-1] in place):
            return True
    return False


class SearchClient:
    def __init__(self):
        self.ddgs = DDGS()

    def ai_answer(self, query: str) -> Optional[str]:
        """AI answer from multiple engines: Perplexity first, then Bing.

        Google's AI Overview is unreachable from this IP (captcha), so we
        use Perplexity (free, cited, works headless) as the primary AI
        source and Bing's AI answer box as fallback. For live-data queries
        (prices, versions, results) Bing is tried first — Perplexity's
        free web search is often stale ("I don't have live data").
        Sets self.last_source ('perplexity'/'bing').
        """
        q = query
        if any(w in q.lower() for w in PRICE_REFINERS):
            q += " usd"
        if "price" in q.lower():
            q += " today"
        self.last_source = None
        time_sensitive = any(w in q.lower() for w in _TIME_SENSITIVE)
        sources = ("bing", "perplexity") if time_sensitive else ("perplexity", "bing")
        for src in sources:
            if src == "perplexity":
                answer = asyncio.run(self._fetch_perplexity(q))
                if answer and _has_live_data_answer(answer):
                    self.last_source = "perplexity"
                    return answer
            else:  # bing — flaky time widgets, validate + retry once
                for _ in range(2):
                    answer = asyncio.run(self._fetch_bing_ai(q))
                    if not answer:
                        break
                    if _answer_place_matches(answer, query):
                        self.last_source = "bing"
                        return answer
        return None

    @staticmethod
    async def _fetch_perplexity(q: str) -> Optional[str]:
        """Headless Perplexity search page → cited answer text."""
        from playwright.async_api import async_playwright
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True, channel="chrome")
                ctx = await browser.new_context(
                    locale="en-US",
                    user_agent=("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                                "AppleWebKit/537.36 (KHTML, like Gecko) "
                                "Chrome/151.0.0.0 Safari/537.36"),
                    viewport={"width": 1280, "height": 900},
                )
                await ctx.add_init_script(
                    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined});")
                page = await ctx.new_page()
                try:
                    await page.goto(
                        f"https://www.perplexity.ai/search?q={q}",
                        timeout=30000, wait_until="domcontentloaded")
                    try:
                        await page.wait_for_function(_PPLX_WAIT_JS, timeout=45000)
                    except Exception:
                        pass  # answer may already be rendered
                    await page.wait_for_timeout(1500)
                    answer = await page.evaluate(_PPLX_ANSWER_JS)
                finally:
                    await ctx.close()
                    await browser.close()
                answer = (answer or "").strip()
                if len(answer) < 60:
                    return None
                return _clean_perplexity(answer)[:1200]
        except Exception:
            return None

    @staticmethod
    async def _fetch_bing_ai(q: str) -> Optional[str]:
        from playwright.async_api import async_playwright
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True, channel="chrome")
                ctx = await browser.new_context(
                    locale="en-US",
                    user_agent=("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                                "AppleWebKit/537.36 (KHTML, like Gecko) "
                                "Chrome/151.0.0.0 Safari/537.36"),
                    viewport={"width": 1280, "height": 900},
                )
                await ctx.add_init_script(
                    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined});")
                page = await ctx.new_page()
                try:
                    await page.goto(
                        f"https://www.bing.com/search?q={q}&setlang=en",
                        timeout=25000, wait_until="domcontentloaded")
                    await page.wait_for_timeout(4000)
                    answer = await page.evaluate(_BING_ANSWER_JS)
                finally:
                    await ctx.close()
                    await browser.close()
                if not answer:
                    return None
                return _clean_ai(answer[:900])
        except Exception:
            return None

    def search(self, query: str, max_results: int = 6) -> List[dict]:
        """Organic results from MULTIPLE engines (DDG + Google + Brave +
        Yahoo via DDG's aggregator — the proxy bypasses the IP captcha),
        then a headless browser reads the top result pages.
        """
        q = self._refine(query)
        try:
            results = list(self.ddgs.text(
                q, backend="duckduckgo,google,brave,yahoo",
                max_results=max_results))
        except Exception:
            results = []
        if results:
            results = self._read_pages(results, q)
        return results

    @staticmethod
    def _refine(query: str) -> str:
        """Attract data-rich pages: add currency for price queries,
        exclude generic encyclopedic pages."""
        q = query
        if any(w in q.lower() for w in PRICE_REFINERS):
            q += " usd"
        if "price" in q.lower():
            q += " today"
        return q

    def summarize(self, query: str, results: List[dict]) -> str:
        if not results:
            return f"No results found for '{query}'."
        ranked = [r for r in results if (r.get("page_text") or "").strip()]
        ranked.sort(key=lambda r: (r.get("score", 0), len(r.get("page_text", ""))), reverse=True)
        parts = []
        for i, r in enumerate(ranked[:3]):
            head = f"Source {i+1}: {r.get('title', '')} ({r.get('href', '')})"
            body = (r.get("page_text") or "").strip() or (r.get("body") or "")
            if body:
                parts.append(f"{head}\n{body[:1200]}")
        if not parts:
            return f"No usable results found for '{query}'."
        facts = self._key_facts(ranked[:3])
        out = f"Search results for '{query}':\n\n" + "\n\n".join(parts)
        if facts:
            out = "KEY FACTS extracted from the sources (quote these numbers exactly):\n" + \
                  "\n".join(f" - {f}" for f in facts[:8]) + "\n\n" + out
        return out

    @staticmethod
    def _key_facts(ranked: List[dict]) -> List[str]:
        """Pull the most concrete lines (prices, amounts, dates, versions)
        out of the top pages, so the weak model can quote them."""
        lines = []
        for r in ranked:
            for ln in (r.get("page_text") or "").splitlines():
                ln = ln.strip()
                if not ln or len(ln) > 140:
                    continue
                if re.search(r"[$£€]\s?\d[\d,]*\.?\d*", ln) or re.search(
                        r"(?:per|price|cost|worth|rate|version|released|today|as of)\b", ln, re.I):
                    if re.search(r"\d", ln):
                        lines.append(ln)
        seen = set()
        out = []
        for ln in lines:
            if ln not in seen:
                seen.add(ln)
                out.append(ln)
        return out

    @staticmethod
    def _score_text(text: str) -> float:
        """Prefer pages full of concrete data (numbers, currency, dates)."""
        if not text:
            return 0.0
        money = len(re.findall(r"[$£€]\s?[\d,]+\.?\d*", text))
        big = len(re.findall(r"\d{2,3}(?:,\d{3})+\.?\d*", text))
        date = len(re.findall(r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2}", text))
        words = len(text.split())
        return money * 5 + big * 3 + date * 2 + min(words, 400) / 400.0

    def _read_pages(self, results: List[dict], query: str) -> List[dict]:
        """Open up to 3 non-junk result pages headless and read main text.
        Known data-rich domains are preferred over generic pages."""
        good = [r for r in results
                if any(d in (r.get("href") or "").lower() for d in PRIORITY_DOMAINS)]
        rest = [r for r in results if r not in good]
        ordered = good + rest
        candidates = []
        for r in ordered:
            href = (r.get("href") or "").lower()
            if any(skip in href for skip in BROWSER_SKIP):
                continue
            candidates.append(r)
            if len(candidates) == 3:
                break
        if not candidates:
            return results

        try:
            pages = asyncio.run(self._grab_pages([r["href"] for r in candidates]))
        except Exception:
            return results
        for r, text in zip(candidates, pages):
            if text:
                r["page_text"] = text[:1800]
                r["score"] = self._score_text(text)
        return results

    @staticmethod
    async def _grab_pages(urls: List[str]) -> List[str]:
        from playwright.async_api import async_playwright

        out: List[str] = [""] * len(urls)
        async with async_playwright() as p:
            try:
                browser = await p.chromium.launch(headless=True, channel="chrome")
            except Exception:
                browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(locale="en-US")
            try:
                for i, url in enumerate(urls):
                    try:
                        page = await context.new_page()
                        await page.goto(url, timeout=20000, wait_until="domcontentloaded")
                        await page.wait_for_timeout(3000)
                        text = await page.evaluate(JS_CLEAN)
                        text = re.sub(r"\n{3,}", "\n\n", text or "")
                        out[i] = text.strip()[:1800]
                    except Exception:
                        out[i] = ""
                    finally:
                        try:
                            await page.close()
                        except Exception:
                            pass
            finally:
                await context.close()
                await browser.close()
        return out
