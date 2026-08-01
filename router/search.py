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


class SearchClient:
    def __init__(self):
        self.ddgs = DDGS()

    def search(self, query: str, max_results: int = 5) -> List[dict]:
        try:
            results = list(self.ddgs.text(query, max_results=max_results))
        except Exception:
            results = []
        if results:
            results = self._read_pages(results, query)
        return results

    def summarize(self, query: str, results: List[dict]) -> str:
        if not results:
            return f"No results found for '{query}'."
        ranked = [r for r in results if (r.get("page_text") or "").strip()]
        ranked.sort(key=lambda r: (r.get("score", 0), len(r.get("page_text", ""))), reverse=True)
        parts = []
        for i, r in enumerate(ranked[:4]):
            head = f"Source {i+1}: {r.get('title', '')} ({r.get('href', '')})"
            body = (r.get("page_text") or "").strip() or (r.get("body") or "")
            if body:
                parts.append(f"{head}\n{body[:1200]}")
        if not parts:
            return f"No usable results found for '{query}'."
        return f"Search results for '{query}':\n\n" + "\n\n".join(parts)

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
        """Open up to 3 non-junk result pages headless and read main text."""
        candidates = []
        for r in results:
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
