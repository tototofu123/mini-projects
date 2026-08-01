#!/usr/bin/env python
"""Local Copilot Router — streaming GUI.

Colors:
  thinking       → dim gray italic (model's internal reasoning)
  model output   → green (typewriter streaming)
  tool calling   → yellow
  search results → cyan
  errors         → red
"""
import sys, time
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))

from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.prompt import Prompt
from rich.spinner import Spinner
from rich.text import Text

console = Console()

BANNER = Panel(
    "[bold]Local Copilot Router[/bold]\n"
    "[dim]MiniCPM5-1B · streaming · tool calling enabled[/dim]",
    border_style="cyan",
)

def print_thinking(text: str) -> None:
    console.print(Text(text, style="dim italic"), soft_wrap=True)

def print_tool(msg: str) -> None:
    console.print(Text(f"⚙ {msg}", style="bold yellow"), soft_wrap=True)

def print_error(msg: str) -> None:
    console.print(Text(msg, style="bold red"), soft_wrap=True)

def print_search_results(results) -> None:
    if not results:
        console.print("[yellow]No results found.[/yellow]")
        return
    lines = []
    for i, r in enumerate(results[:5]):
        lines.append(f"[bold]{i+1}.[/bold] {r.get('title', '')}")
        lines.append(f"[dim]{r.get('body', '')[:150]}[/dim]")
    console.print(Panel("\n".join(lines), title="search results", border_style="cyan"))

def stream_answer(server, messages) -> None:
    """Typewriter streaming of the model answer, thinking in gray."""
    thinking_buf = ""
    content_buf = ""
    thinking_done = False
    last_was_thinking = False
    try:
        for item in server.chat_stream(messages):
            if item["type"] == "reasoning":
                thinking_buf += item["delta"]
                last_was_thinking = True
                if len(thinking_buf) > 4 and thinking_buf.rstrip().endswith("\n"):
                    pass
            else:
                if not thinking_done and thinking_buf:
                    print_thinking(thinking_buf.rstrip() + "\n")
                    thinking_buf = ""
                thinking_done = True
                content_buf += item["delta"]
                console.print(item["delta"], style="green", end="", soft_wrap=True)
        if thinking_buf and not thinking_done:
            print_thinking(thinking_buf.rstrip())
    except KeyboardInterrupt:
        print_error("\n[interrupted]")
    print()

def run(server, search, router):
    console.print(BANNER)
    console.print("[dim]Type 'exit' to quit. Try: 'latest react version', 'write a merge function'[/dim]")
    console.print()
    history = []
    while True:
        try:
            query = Prompt.ask("[bold]>[/bold]").strip()
        except (KeyboardInterrupt, EOFError):
            print()
            break
        if not query:
            continue
        if query.lower() in ("exit", "quit"):
            break

        decision = router.route(query)
        if decision == "search":
            print_tool("searching web...")
            try:
                results = search.search(query, max_results=5)
            except Exception as e:
                print_error(f"search failed: {e}")
                continue
            print_search_results(results)
            context = search.summarize(query, results)
            messages = history + [
                {"role": "system", "content":
                    "You are a coding copilot. Use the web search results to answer "
                    f"the user's question. Be accurate and cite sources briefly.\n\nSearch results:\n{context}"},
                {"role": "user", "content": query},
            ]
            print_tool("answering with search results...")
            stream_answer(server, messages)
        else:
            print_tool("thinking locally...")
            messages = history + [{"role": "user", "content": query}]
            stream_answer(server, messages)

        history.append({"role": "user", "content": query})
        history.append({"role": "assistant", "content": ""})


def main():
    from inference.server import LocalServer
    from router.router import Router
    from router.search import SearchClient

    gguf_path = ROOT / "models" / "gguf" / "minicpm5-copilot-q8_0.gguf"
    if not gguf_path.exists():
        print_error(f"Model not found at {gguf_path}")
        sys.exit(1)

    server = LocalServer(str(gguf_path))
    try:
        console.print("[dim]starting llama-server...[/dim]")
        server.start()
    except Exception as e:
        print_error(f"server start failed: {e}")
        sys.exit(1)

    search = SearchClient()
    router = Router()
    try:
        run(server, search, router)
    finally:
        print_tool("shutting down server...")
        server.stop()


if __name__ == "__main__":
    main()
