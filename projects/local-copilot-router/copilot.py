#!/usr/bin/env python
"""Local Copilot Router — CLI entry point.

Usage:
  python copilot.py "write a merge function"
  python copilot.py --mode search "latest React version"
  python copilot.py --interactive
"""
import sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))


def load_parts():
    from router.router import Router
    from router.search import SearchClient
    from inference.model import LocalModel

    gguf_path = ROOT / "models" / "gguf" / "minicpm5-copilot-q8_0.gguf"
    if not gguf_path.exists():
        print(f"Model not found at {gguf_path}")
        print("Run: python training/train.py")
        sys.exit(1)

    model = LocalModel(str(gguf_path))
    search = SearchClient()
    router = Router(model=model, search_client=search)
    return model, search, router


def run_one(model, search, router, query: str, mode: str = "auto") -> None:
    """Single query through the router loop (tool calling)."""
    if mode == "search":
        print("[search] Searching web...")
        results = search.search(query)
        print(search.summarize(query, results))
        return

    if mode == "local":
        print("[local] Thinking locally...")
        print(model.chat([{"role": "user", "content": query}]))
        return

    # auto: freshness check first, then ask model, fall back on uncertainty
    decision = router.route(query)
    if decision == "search":
        print("[search] Query needs current info — searching web...")
        results = search.search(query)
        print(search.summarize(query, results))
        return

    print("[local] Thinking locally...")
    reply = model.chat([{"role": "user", "content": query}])
    print(f"\n{reply}\n")

    if router.is_uncertain(reply):
        print("[search] Model uncertain — searching web for grounding...")
        results = search.search(query)
        print(search.summarize(query, results))


def run_interactive(model, search, router) -> None:
    print("Local Copilot Router — interactive mode (Ctrl+C to exit)")
    print(f"Model: {Path(model.model_path).name}")
    print("Tool calling: freshness check → local answer → web fallback")
    print("-" * 50)
    history = []
    while True:
        try:
            query = input("\n> ").strip()
            if not query:
                continue
            if query.lower() in ("exit", "quit"):
                break
        except (KeyboardInterrupt, EOFError):
            break

        if router.wants_search(query):
            print("[search] Searching web...")
            results = search.search(query)
            answer = search.summarize(query, results)
            print(f"\n{answer}")
        else:
            messages = history + [{"role": "user", "content": query}]
            print("[local] Thinking locally...")
            reply = model.chat(messages)
            history.append({"role": "user", "content": query})
            history.append({"role": "assistant", "content": reply})
            print(f"\n{reply}")

            if router.is_uncertain(reply):
                print("\n[search] Model uncertain — searching web for grounding...")
                results = search.search(query)
                print(search.summarize(query, results))


def main():
    parser = argparse.ArgumentParser(description="Local Copilot Router")
    parser.add_argument("query", nargs="*", help="Query to answer")
    parser.add_argument("--interactive", "-i", action="store_true", help="Interactive chat mode")
    parser.add_argument("--mode", choices=["local", "search", "auto"], default="auto",
                        help="Routing mode (default: auto)")
    args = parser.parse_args()

    query = " ".join(args.query) if args.query else ""
    if not query and not args.interactive:
        parser.print_help()
        return

    model, search, router = load_parts()

    if args.interactive:
        run_interactive(model, search, router)
    else:
        run_one(model, search, router, query, args.mode)


if __name__ == "__main__":
    main()
