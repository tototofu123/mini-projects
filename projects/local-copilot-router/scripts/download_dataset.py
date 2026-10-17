"""Download and prepare Magicoder training dataset."""
from datasets import load_dataset
import json
import os

dataset_name = "ise-uiuc/Magicoder_OSS_Instruct_75K"
output_dir = os.path.join("data", "datasets", "magicoder_10k")
os.makedirs(output_dir, exist_ok=True)

print(f"Loading {dataset_name}...")
ds = load_dataset(dataset_name, split="train")

# Take a 10K subset
subset = ds.select(range(min(10000, len(ds))))

# Format as chat-style conversations
formatted = []
for i, example in enumerate(subset):
    problem = example.get("problem", "")
    solution = example.get("solution", "")
    if not problem or not solution:
        continue
    formatted.append({
        "id": f"magicoder_{i}",
        "conversations": [
            {"role": "user", "content": problem},
            {"role": "assistant", "content": solution},
        ]
    })

output_file = os.path.join(output_dir, "train.jsonl")
with open(output_file, "w", encoding="utf-8") as f:
    for item in formatted:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print(f"Saved {len(formatted)} examples to {output_file}")
