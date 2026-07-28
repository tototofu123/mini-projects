"""Shared training configuration for Unsloth fine-tuning."""
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class TrainConfig:
    base_model: str = "openbmb/MiniCPM5-1B"
    dataset_path: str = "data/datasets/magicoder_10k/train.jsonl"
    output_dir: str = "models/checkpoints"
    
    # LoRA config
    lora_r: int = 32
    lora_alpha: int = 64
    lora_dropout: float = 0.05
    target_modules: tuple = ("q_proj", "k_proj", "v_proj", "o_proj",
                              "gate_proj", "up_proj", "down_proj")
    
    # Training
    max_seq_length: int = 2048
    dtype: str = "bfloat16"
    load_in_4bit: bool = True  # QLoRA for 8GB VRAM
    per_device_batch_size: int = 4
    gradient_accumulation: int = 4
    learning_rate: float = 2e-4
    num_epochs: int = 1
    warmup_steps: int = 10
    logging_steps: int = 10
    save_steps: int = 200
