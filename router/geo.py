"""User location + timezone detection.

Uses ip-api.com (no key) for city/country/timezone, falls back to the
Windows registry timezone. Cached after first call.
"""
import json
import re
import subprocess
import time
import urllib.request
from datetime import datetime, timezone
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
    return bool(re.search(
        r"\b(date|time|day|today|what day|what time|日期|时间|今天)\b", q
    ))
