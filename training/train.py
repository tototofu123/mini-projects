#!/usr/bin/env python
"""Automated fine-tuning pipeline — no manual input needed.

Runs: QLoRA fine-tune on MiniCPM5-1B with Magicoder dataset.
Outputs: merged model + GGUF Q8_0 quantized file ready for llama.cpp.
"""
import os, sys, json, gc, torch
from pathlib import Path

# Add project root to path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from training.config import TrainConfig
from datasets import load_dataset
from unsloth import FastLanguageModel, is_bfloat16_supported

cfg = TrainConfig()

def prepare_dataset(tokenizer):
    print(f"[1/5] Loading dataset from {cfg.dataset_path}")
    dataset = load_dataset("json", data_files=cfg.dataset_path, split="train")
    print(f"       {len(dataset)} examples loaded")

    def format_chat(example):
        conv = example["conversations"]
        text = tokenizer.apply_chat_template(
            conv, tokenize=False, add_generation_prompt=False
        )
        return {"text": text}

    dataset = dataset.map(format_chat, remove_columns=dataset.column_names)
    return dataset

def load_model():
    print(f"[2/5] Loading {cfg.base_model} in 4-bit (QLoRA)...")
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=cfg.base_model,
        max_seq_length=cfg.max_seq_length,
        dtype=torch.bfloat16 if is_bfloat16_supported() else torch.float16,
        load_in_4bit=cfg.load_in_4bit,
    )
    return model, tokenizer

def attach_lora(model):
    print(f"[3/5] Attaching LoRA adapters (rank={cfg.lora_r})...")
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
    print(f"[4/5] Starting training ({cfg.num_epochs} epoch, {cfg.max_seq_length} ctx)...")
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
        save_strategy="steps" if cfg.save_steps else "no",
        save_steps=cfg.save_steps,
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
    print(f"[5/5] Exporting...")
    gguf_dir = os.path.join(ROOT, "models", "gguf")
    os.makedirs(gguf_dir, exist_ok=True)

    # Save merged 16-bit (for future fine-tuning)
    merged_dir = os.path.join(ROOT, "models", "merged")
    print(f"       Merging LoRA → {merged_dir}")
    model.save_pretrained_merged(merged_dir, tokenizer, save_method="merged_16bit")

    # Export directly to GGUF Q8_0 for llama.cpp
    gguf_path = os.path.join(gguf_dir, "minicpm5-copilot-q8_0.gguf")
    print(f"       Converting to GGUF Q8_0 → {gguf_path}")
    model.save_pretrained_gguf(
        gguf_dir, tokenizer, quantization_method="q8_0"
    )
    print(f"       Done! GGUF saved to {gguf_path}")

def main():
    os.makedirs(cfg.output_dir, exist_ok=True)
    model, tokenizer = load_model()
    model = attach_lora(model)
    dataset = prepare_dataset(tokenizer)
    trainer = train(model, tokenizer, dataset)
    export(model, tokenizer)
    print("\n✅ Training complete! GGUF model ready at models/gguf/")

if __name__ == "__main__":
    main()
