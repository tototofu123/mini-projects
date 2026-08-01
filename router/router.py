"""Router: decides local vs search for each query.

Two-stage flow:
1. Freshness check — query asks about current/latest info → search directly.
2. Ask model first — if the model expresses uncertainty, search and
   re-answer with grounded results.
"""
import re
from typing import Optional, List, Dict

SEARCH_KEYWORDS = [
    "latest", "current", "news", "update", "today", "now",
    "recent", "newest", "released", "2025", "2026", "2027",
    "announced", "weather", "price", "stock",
]

UNCERTAINTY_MARKERS = [
    "i don't know", "i'm not sure", "i am not sure", "i'm unsure",
    "i don't have", "i cannot", "i'm unable", "i'm not aware",
    "as of my last", "my knowledge cutoff", "i was trained on",
    "i don't have access", "not sure", "cannot provide",
]

CONFIDENCE_MARKERS = [
    "i'm confident", "i know", "here is", "certainly", "definitely",
    "of course", "sure", "here's", "yes,", "absolutely",
]


class Router:
    def __init__(self, model=None, search_client=None):
        self.model = model
        self.search_client = search_client

    def wants_search(self, query: str) -> bool:
        """Stage 1: freshness/recency check."""
        q = query.lower()
        # A bare number means a year reference → likely current info
        return any(kw in q for kw in SEARCH_KEYWORDS)

    def is_uncertain(self, response: str) -> bool:
        """Stage 2: did the model signal it doesn't know?"""
        r = response.lower()
        hits = sum(1 for m in UNCERTAINTY_MARKERS if m in r)
        confidence = sum(1 for m in CONFIDENCE_MARKERS if m in r)
        # Uncertainty wins unless the model is clearly confident
        return hits > 0 and hits > confidence

    def route(self, query: str, model_response: str = "") -> str:
        """Returns 'search', 'local', or 'model_uncertain'."""
        if self.wants_search(query):
            return "search"
        if model_response and self.is_uncertain(model_response):
            return "model_uncertain"
        return "local"

    def answer(self, query: str) -> Dict:
        """End-to-end tool-calling loop.

        Returns {'decision', 'answer', 'searched'}.
        """
        decision = self.route(query)
        searched = False

        if decision == "search":
            searched = True
            results = self.search_client.search(query)
            context = self.search_client.summarize(query, results)
            answer = context
        elif decision == "model_uncertain":
            searched = True
            results = self.search_client.search(query)
            context = self.search_client.summarize(query, results)
            answer = context
        else:
            answer = self.model.generate(query)

        return {"decision": decision, "answer": answer, "searched": searched}
