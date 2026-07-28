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

    from router.router import Router
    from router.search import SearchClient
    from inference.model import LocalModel

    gguf_path = ROOT / "models" / "gguf" / "minicpm5-copilot-q8_0.gguf"
    if not gguf_path.exists():
        print(f"Model not found at {gguf_path}")
        print("Run: python training/train.py")
        return

    model = LocalModel(str(gguf_path))
    search = SearchClient()
    router = Router(model=model, search_client=search)

    if args.interactive:
        print("Local Copilot Router — interactive mode (Ctrl+C to exit)")
        print(f"Model: {gguf_path.name}")
        print("-" * 50)
        while True:
            try:
                query = input("\n> ").strip()
                if not query:
                    continue
                if query.lower() in ("exit", "quit"):
                    break
            except (KeyboardInterrupt, EOFError):
                break

            route_decision = "search" if args.mode == "search" else "auto"
            if route_decision == "auto":
                route_decision = router.route(query, "")

            if route_decision in ("search", "model_uncertain"):
                print("[search] Searching web...")
                results = search.search(query)
                answer = search.summarize(query, results)
            else:
                print("[local] Thinking locally...")
                answer = model.generate(query)
            print(f"\n{answer}")
    else:
        route_decision = args.mode if args.mode != "auto" else router.route(query, "")
        if route_decision in ("search", "model_uncertain"):
            print("[search]")
            results = search.search(query)
            print(search.summarize(query, results))
        else:
            print("[local]")
            print(model.generate(query))

if __name__ == "__main__":
    main()
