"""User location + timezone detection.

Uses ip-api.com (no key) for city/country/timezone, falls back to the
Windows registry timezone. Cached after first call.
"""
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


def _add_months(d: datetime, n: int) -> datetime:
    month = d.month - 1 + n
    year = d.year + month // 12
    month = month % 12 + 1
    day = min(d.day, [31, 29 if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0) else 28,
                      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])
    return d.replace(year=year, month=month, day=day)


_NUM = r"(?P<n>\d+|one|a|an|two|three|four|five|six|seven|eight|nine|ten)"


def _to_int(s: str) -> int:
    words = {
        "one": 1, "a": 1, "an": 1, "two": 2, "three": 3, "four": 4,
        "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    }
    if s in words:
        return words[s]
    return int(s)


def clock_answer(q: str) -> str:
    """Answer date/time questions from the local clock."""
    g = detect()
    now = datetime.fromisoformat(g["local_time"].replace(" ", "T"))
    ql = q.lower().strip()
    fmt = "%A, %Y-%m-%d %H:%M"
    base = f"Local time now: {now.strftime(fmt)} ({g['tz_name']}, UTC{g['tz_offset']})."

    def when(target: datetime, label: str) -> str:
        return f"{base}\n{label}: {target.strftime('%A, %Y-%m-%d')}."

    if re.search(r"\b(yesterday|last\s+day)\b", ql):
        return when(now - timedelta(days=1), "Yesterday")
    if re.search(r"\b(tomorrow|next\s+day)\b", ql):
        return when(now + timedelta(days=1), "Tomorrow")
    m = re.search(rf"{_NUM}\s+day(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group(1))
        return when(now - timedelta(days=n), f"{n} day{'s' if n>1 else ''} ago")
    m = re.search(rf"{_NUM}\s+week(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group(1))
        return when(now - timedelta(weeks=n), f"{n} week{'s' if n>1 else ''} ago")
    m = re.search(rf"{_NUM}\s+month(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group(1))
        return when(_add_months(now, -n), f"{n} month{'s' if n>1 else ''} ago")
    m = re.search(rf"{_NUM}\s+year(?:s)?\s+ago", ql)
    if m:
        n = _to_int(m.group(1))
        return when(now - timedelta(days=365 * n), f"{n} year{'s' if n>1 else ''} ago")
    m = re.search(r"(?:in|after)\s+(\d+)\s+(day|days)", ql)
    if m:
        n = int(m.group(1))
        return when(now + timedelta(days=n), f"In {n} day{'s' if n>1 else ''}")
    m = re.search(r"(?:in|after)\s+(\d+)\s+(week|weeks)", ql)
    if m:
        n = int(m.group(1))
        return when(now + timedelta(weeks=n), f"In {n} week{'s' if n>1 else ''}")
    m = re.search(r"before\s+(\d+)\s+(day|days)", ql)
    if m:
        n = int(m.group(1))
        return when(now - timedelta(days=n), f"{n} day{'s' if n>1 else ''} before")
    if re.search(r"\b(last|previous)\s+week\b", ql):
        return when(now - timedelta(weeks=1), "Last week (7 days ago)")
    if re.search(r"\b(next)\s+week\b", ql):
        return when(now + timedelta(weeks=1), "Next week (7 days from now)")
    if re.search(r"\b(one|a)\s+week\s+ago\b", ql):
        return when(now - timedelta(weeks=1), "One week ago")
    if re.search(r"\b(time|now)\b", ql):
        return base
    return base
