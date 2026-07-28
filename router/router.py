"""Router: decides local vs search for each query."""
from typing import Optional

SEARCH_KEYWORDS = [
    "latest", "current", "news", "update", "2024", "2025", "2026",
    "today", "now", "recent", "newest", "released",
]

UNCERTAINTY_MARKERS = [
    "i don't know", "i'm not sure", "i am not sure",
    "i don't have", "i cannot", "i'm unable", "i don't understand",
    "as of my last", "my knowledge cutoff", "i was trained on",
]

class Router:
    def __init__(self, model=None, search_client=None):
        self.model = model
        self.search_client = search_client
    
    def route(self, query: str, model_response: str) -> str:
        """Returns 'local', 'search', or 'model_uncertain'."""
        query_lower = query.lower()
        response_lower = model_response.lower()
        
        # Check if query needs current info
        for kw in SEARCH_KEYWORDS:
            if kw in query_lower:
                return "search"
        
        # Check if model expressed uncertainty
        for marker in UNCERTAINTY_MARKERS:
            if marker in response_lower:
                return "model_uncertain"
        
        return "local"
