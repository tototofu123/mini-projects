"""Web search via DuckDuckGo."""
from ddgs import DDGS
from typing import Optional, List

class SearchClient:
    def __init__(self):
        self.client = DDGS()

    def search(self, query: str, max_results: int = 5) -> List[dict]:
        results = list(self.client.text(query, max_results=max_results))
        return results

    def summarize(self, query: str, results: List[dict]) -> str:
        if not results:
            return f"No results found for '{query}'."
        context = "\n\n".join(
            f"Source {i+1}: {r['title']}\n{r['body']}"
            for i, r in enumerate(results)
        )
        return f"Search results for '{query}':\n\n{context}"
