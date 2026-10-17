"""Router: search-first for everything.

The 1B model is a helper (tool calling + answer synthesis), not a source
of truth — it hallucinates facts. So every query goes to web search, and
the model composes a grounded answer from the results. Only trivial
small-talk stays local (no point searching the web for "hi").
"""
import re
from typing import Optional, List, Dict

GREETING_KEYWORDS = [
    "hi", "hello", "hey", "yo", "thanks", "thank you", "good morning",
    "good afternoon", "good evening", "how are you", "what's up",
    "whats up", "bye", "goodbye", "ok", "okay", "cool",
]

GREETING_PREFIXES = ("hi", "hello", "hey", "yo")

_GREET_PREFIX_RE = re.compile(
    r"^(hi|hello|hey|yo|good morning|good afternoon|good evening)[\s,!]+",
    re.I)

_SMALL_TALK_TAILS = (
    "how are you", "how are you doing", "how are you today", "how's it going",
    "how is it going", "how r u", "whats up", "what's up", "there", "guys",
    "everyone", "friends", "yo", "ya",
)

_THANKS_RE = re.compile(
    r"^(thanks|thank you|thx|ty)(\s+(a lot|alot|very much|so much|"
    r"for your help|for everything|anyway))?\??$",
    re.I)

_SEARCH_HINTS = re.compile(
    r"\b(what|who|when|where|why|how|price|weather|time|date|latest|news|"
    r"version|tell\s+me|can\s+you|could\s+you|is\s+there|are\s+there)\b",
    re.I)

_NAME_PATTERNS = [
    re.compile(r"\bi am ([a-z]{2,20})", re.I),
    re.compile(r"\bmy name is ([a-z]{2,20})", re.I),
    re.compile(r"\bcall me ([a-z]{2,20})", re.I),
    re.compile(r"\bi'm ([a-z]{2,20})", re.I),
    re.compile(r"\bim ([a-z]{2,20})", re.I),
]
_NON_NAMES = {
    "sorry", "fine", "good", "great", "well", "back", "here", "there",
    "ready", "sure", "new", "tired", "bored", "happy", "sad", "angry",
    "confused", "kidding", "joking", "not", "just", "going", "feeling",
    "trying", "working", "living", "thinking", "sitting", "waiting",
    "playing", "learning", "eating", "sleepy", "sick", "busy", "excited",
    "hungry", "thirsty", "a", "an", "the", "am", "so", "very", "really",
    "also", "still", "done", "late", "early", "cold", "hot", "warm",
    "ok", "okay", "thanks",
}

_LANGS = (r"chinese|japanese|korean|french|spanish|german|italian|"
          r"russian|arabic|hindi|english|portuguese|thai|vietnamese|"
          r"turkish|hebrew|dutch")

_user_name: Optional[str] = None


class Router:
    def __init__(self, model=None, search_client=None):
        self.model = model
        self.search_client = search_client

    def remember_name(self, query: str) -> None:
        """Store the user's name when they introduce themselves."""
        global _user_name
        for pat in _NAME_PATTERNS:
            m = pat.search(query)
            if m:
                name = m.group(1).lower()
                if name not in _NON_NAMES:
                    _user_name = name.capitalize()
                return

    def my_name_answer(self, query: str) -> Optional[str]:
        """Answer 'what is my name' from session memory; no web search."""
        q = query.lower().strip()
        if re.search(rf"\b(in|into)\s+({_LANGS})\b", q):
            return None  # "my name in chinese" is a translation query → search
        if not re.search(r"\b(what(?:'s| is|s)? my name|my name\?|"
                         r"do you know my name|remember my name)\b", q):
            return None
        if _user_name:
            return f"Your name is {_user_name} — I remember it from our chat."
        return ("I don't know your name yet. Tell me, e.g. "
                "'my name is Toto' or 'call me Alex'.")

    def wants_search(self, query: str) -> bool:
        """Everything searches online, except trivial small talk."""
        q = query.lower().strip()
        if q in GREETING_KEYWORDS:
            return False
        t = q.rstrip("?!., ")
        m = _GREET_PREFIX_RE.match(t)
        tail = t[m.end():].strip() if m else t
        if tail in _SMALL_TALK_TAILS:
            return False
        if _THANKS_RE.match(t):
            return False
        if re.match(r"^ok(ay)?\s+(thanks|cool|got it|sure|bye|goodbye)$", t):
            return False
        if (q.startswith(GREETING_PREFIXES)
                and not _SEARCH_HINTS.search(q)):
            return False
        if (any(p.search(q) for p in _NAME_PATTERNS)
                and len(q) < 40
                and not _SEARCH_HINTS.search(q)):
            return False
        return True

    def is_uncertain(self, response: str) -> bool:
        return False

    def route(self, query: str, model_response: str = "") -> str:
        """Returns 'search' or 'local'. Search is the default."""
        return "search" if self.wants_search(query) else "local"

    def answer(self, query: str) -> Dict:
        """End-to-end tool-calling loop.

        Returns {'decision', 'answer', 'searched'}.
        """
        decision = self.route(query)
        if decision == "search":
            results = self.search_client.search(query)
            context = self.search_client.summarize(query, results)
            return {"decision": decision, "answer": context, "searched": True}
        return {"decision": decision, "answer": self.model.generate(query), "searched": False}
