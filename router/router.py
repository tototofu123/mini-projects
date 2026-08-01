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


class Router:
    def __init__(self, model=None, search_client=None):
        self.model = model
        self.search_client = search_client

    def wants_search(self, query: str) -> bool:
        """Everything searches online, except trivial small talk."""
        q = query.lower().strip()
        if q in GREETING_KEYWORDS:
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
