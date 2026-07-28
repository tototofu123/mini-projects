#!/usr/bin/env python
"""Automated fine-tuning pipeline — zero manual input.

1. Loads MiniCPM5-1B in 4-bit (QLoRA) from HF cache
2. Loads Magicoder dataset from HF cache
3. Formats conversations, fine-tunes with SFTTrainer
4. Saves merged 16-bit checkpoint + GGUF Q8_0 for llama.cpp
"""
import os, sys, torch
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from training.config import TrainConfig
from datasets import load_dataset
from unsloth import FastLanguageModel, is_bfloat16_supported

cfg = TrainConfig()

def prepare_dataset(tokenizer):
    print(f"[1/5] Loading dataset from HF ({cfg.dataset_id})...")
    ds = load_dataset(cfg.dataset_id, split=cfg.dataset_split)
    ds = ds.select(range(min(cfg.dataset_subset, len(ds))))
    print(f"       {len(ds)} examples loaded")

    def format_chat(ex):
        conv = [
            {"role": "user", "content": ex["problem"]},
            {"role": "assistant", "content": ex["solution"]},
        ]
        text = tokenizer.apply_chat_template(
            conv, tokenize=False, add_generation_prompt=False
        )
        return {"text": text}

    ds = ds.map(format_chat, remove_columns=ds.column_names)
    return ds

def load_model():
    print(f"[2/5] Loading {cfg.base_model} in 4-bit (QLoRA)...")
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=cfg.base_model,
        max_seq_length=cfg.max_seq_length,
        dtype=torch.bfloat16 if is_bfloat16_supported() else torch.float16,
        load_in_4bit=cfg.load_in_4bit,
    )
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    return model, tokenizer

def attach_lora(model):
    print(f"[3/5] Attaching LoRA (rank={cfg.lora_r})...")
    model = FastLanguageModel.get_peft_model(
        model,
        r=cfg.lora_r,
        target_modules=cfg.target_modules,
        lora_alpha=cfg.lora_alpha,
        lora_dropout=cfg.lora_dropout,
        bias="none",
        use_gradient_checkpointing="unsloth",
        random_state=42,
    )
    return model

def train(model, tokenizer, dataset):
    print(f"[4/5] Training (epochs={cfg.num_epochs}, lr={cfg.learning_rate})...")
    from trl import SFTTrainer
    from transformers import TrainingArguments

    args = TrainingArguments(
        output_dir=cfg.output_dir,
        per_device_train_batch_size=cfg.per_device_batch_size,
        gradient_accumulation_steps=cfg.gradient_accumulation,
        warmup_steps=cfg.warmup_steps,
        num_train_epochs=cfg.num_epochs,
        learning_rate=cfg.learning_rate,
        fp16=not is_bfloat16_supported(),
        bf16=is_bfloat16_supported(),
        logging_steps=cfg.logging_steps,
        save_strategy="no",
        optim=cfg.optim,
        max_grad_norm=cfg.max_grad_norm,
        report_to="none",
        dataloader_num_workers=0,
        packing=False,
    )

    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=cfg.max_seq_length,
        args=args,
    )
    trainer.train()
    return trainer

def export(model, tokenizer):
    print(f"[5/5] Exporting to GGUF...")
    gguf_dir = ROOT / "models" / "gguf"
    gguf_dir.mkdir(parents=True, exist_ok=True)
    merged_dir = ROOT / "models" / "merged"

    print(f"       Merging LoRA → {merged_dir}")
    model.save_pretrained_merged(str(merged_dir), tokenizer, save_method="merged_16bit")

    gguf_path = gguf_dir / "minicpm5-copilot-q8_0.gguf"
    print(f"       Converting → {gguf_path}")
    model.save_pretrained_gguf(
        str(gguf_dir), tokenizer, quantization_method="q8_0"
    )
    print("       Done!")

def main():
    os.makedirs(cfg.output_dir, exist_ok=True)
    model, tokenizer = load_model()
    model = attach_lora(model)
    dataset = prepare_dataset(tokenizer)
    trainer = train(model, tokenizer, dataset)
    export(model, tokenizer)
    print("\n✅ Training complete!")
    print(f"   GGUF: models/gguf/minicpm5-copilot-q8_0.gguf")
    print(f"   Merged: models/merged/")

if __name__ == "__main__":
    main()
