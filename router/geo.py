"""User location + timezone detection.

Uses ip-api.com (no key) for city/country/timezone, falls back to the
Windows registry timezone. Cached after first call.
"""
import difflib
import json
import re
import subprocess
import time
import urllib.request
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from typing import Dict

_cache: Dict = {}


def _win_timezone() -> str | None:
    try:
        out = subprocess.run(
            ["tzutil", "/g"], capture_output=True, text=True, timeout=5
        ).stdout.strip()
        return out or None
    except Exception:
        return None


def _from_ip() -> Dict:
    try:
        with urllib.request.urlopen(
            "http://ip-api.com/json/", timeout=6
        ) as r:
            data = json.loads(r.read())
        if data.get("status") == "success":
            return {
                "city": data.get("city", ""),
                "region": data.get("regionName", ""),
                "country": data.get("country", ""),
                "tz_name": data.get("timezone", ""),
            }
    except Exception:
        pass
    return {}


def detect(force: bool = False) -> Dict:
    """Return geo info: city, country, tz_name, tz_offset, local_time."""
    global _cache
    if _cache and not force:
        return _cache

    info = _from_ip()
    tz_name = info.get("tz_name") or _win_timezone() or "UTC"
    try:
        tz = ZoneInfo(tz_name)
    except Exception:
        tz = timezone.utc

    now = datetime.now(tz)
    offset = now.utcoffset() or timezone.utc.utcoffset(None)
    sign = "+" if offset.total_seconds() >= 0 else "-"
    h = int(abs(offset.total_seconds()) // 3600)
    m = int((abs(offset.total_seconds()) % 3600) // 60)
    tz_offset = f"{sign}{h:02d}:{m:02d}"

    _cache = {
        "city": info.get("city", ""),
        "region": info.get("region", ""),
        "country": info.get("country", ""),
        "tz_name": tz_name,
        "tz_offset": tz_offset,
        "local_time": now.strftime("%Y-%m-%d %H:%M:%S"),
    }
    return _cache


def describe() -> str:
    """Human sentence, e.g. 'Hong Kong (Asia/Hong_Kong, UTC+08:00)'."""
    g = detect()
    parts = []
    loc = ", ".join(x for x in (g["city"], g["region"], g["country"]) if x)
    if loc:
        parts.append(loc)
    parts.append(f"{g['tz_name']} (UTC{g['tz_offset']})")
    return "; ".join(parts)


def is_date_time_query(q: str) -> bool:
    q = q.lower().strip()
    if re.search(r"\b(yesterday|tomorrow|tonight|today|ago|now|date|time|"
                 r"hour|minute|second|week|month|year)\b", q):
        return True
    if re.search(r"\b(in|after|before)\s+\d+\s+(day|week|month|hour|minute)s?", q):
        return True
    if re.search(r"\b\d+\s+(day|week|month|hour|minute)s?\s+(ago|from\s+now|later|ahead)\b", q):
        return True
    if re.search(r"\b(what|which)\s+(day|date|time|year|month)", q):
        return True
    return False


def clock_context() -> str:
    """Current local time as a sentence, injected into the model prompt."""
    g = detect()
    now = datetime.fromisoformat(g["local_time"].replace(" ", "T"))
    return (f"Current local time: {now.strftime('%A, %Y-%m-%d %H:%M')} "
            f"({g['tz_name']}, UTC{g['tz_offset']}). "
            f"Use this as ground truth for any date/time question.")


_DATE_WORDS = ["yesterday", "tomorrow", "today"]


def _fix_typos(q: str) -> str:
    """Fuzzy-correct date words: any close misspelling of yesterday/
    tomorrow/today maps to the correct word."""
    fixed = []
    for w in q.split():
        if w in _DATE_WORDS:
            fixed.append(w)
            continue
        if "yester" in w:
            fixed.append("yesterday")
            continue
        m = difflib.get_close_matches(w, _DATE_WORDS, n=1, cutoff=0.62)
        fixed.append(m[0] if m else w)
    return " ".join(fixed)


_NUM = r"(?P<n>\d+|one|two|three|four|five|six|seven|eight|nine|ten|a|an)"


def _to_int(s: str) -> int:
    w = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
         "seven": 7, "eight": 8, "nine": 9, "ten": 10, "a": 1, "an": 1}
    try:
        return int(s)
    except ValueError:
        return w.get(s, 1)


def _add_months(d: datetime, n: int) -> datetime:
    month = d.month - 1 + n
    year = d.year + month // 12
    month = month % 12 + 1
    last = [31, 29 if (year % 4 == 0 and (year % 100 or year % 400 == 0)) else 28,
            31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
    return d.replace(year=year, month=month, day=min(d.day, last))


def clock_answer(q: str) -> str:
    """Answer date/time questions from the local clock.

    Uses a small fuzzy parser (typo-tolerant). The 1B model cannot do
    date arithmetic, so this stays deterministic.
    """
    ql = _fix_typos(q.lower().strip())
    g = detect()
    now = datetime.fromisoformat(g["local_time"].replace(" ", "T"))
    tz = f"({g['tz_name']}, UTC{g['tz_offset']})"

    def out(label: str, target: datetime) -> str:
        return (f"Local time now: {now.strftime('%A, %Y-%m-%d %H:%M')} {tz}.\n"
                f"{label}: {target.strftime('%A, %Y-%m-%d')}.")

    def base() -> str:
        return f"Local time now: {now.strftime('%A, %Y-%m-%d %H:%M')} {tz}."

    if re.match(r"^(?:what(?:'s| is)?|the)?\s*(?:time|time now|current time|clock)(?:\s+is\s+it)?\??$", ql):
        return base()
    if re.match(r"^(?:what(?:'s| is)?|the)?\s*(?:date|today|today'?s date|what day is it)\??$", ql):
        return f"Today's date: {now.strftime('%A, %Y-%m-%d')} {tz}."
    if "yesterday" in ql:
        return out("Yesterday", now - timedelta(days=1))
    if "tomorrow" in ql:
        return out("Tomorrow", now + timedelta(days=1))
    m = re.search(rf"{_NUM}\s+day(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"{n} day{'s' if n>1 else ''} ago", now - timedelta(days=n))
    m = re.search(rf"{_NUM}\s+week(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"{n} week{'s' if n>1 else ''} ago", now - timedelta(weeks=n))
    m = re.search(rf"{_NUM}\s+month(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"{n} month{'s' if n>1 else ''} ago", _add_months(now, -n))
    m = re.search(rf"{_NUM}\s+year(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"{n} year{'s' if n>1 else ''} ago", now - timedelta(days=365 * n))
    m = re.search(rf"(?:in|after)\s+{_NUM}\s+day(?:s)?", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"In {n} day{'s' if n>1 else ''}", now + timedelta(days=n))
    m = re.search(rf"(?:in|after)\s+{_NUM}\s+week(?:s)?", ql)
    if m:
        n = _to_int(m.group("n"))
        return out(f"In {n} week{'s' if n>1 else ''}", now + timedelta(weeks=n))
    if re.search(r"\b(last|previous|one|a)\s+week", ql):
        return out("Last week (7 days ago)", now - timedelta(weeks=1))
    if re.search(r"\bnext\s+week", ql):
        return out("Next week (7 days from now)", now + timedelta(weeks=1))
    return ""
