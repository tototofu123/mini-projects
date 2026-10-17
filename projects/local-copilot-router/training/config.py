"""Shared training configuration for Unsloth fine-tuning."""
from dataclasses import dataclass

@dataclass
class TrainConfig:
    # Model - uses HF cache automatically
    base_model: str = "openbmb/MiniCPM5-1B"
    
    # Dataset - loads from HF hub (cached from earlier download)
    dataset_id: str = "ise-uiuc/Magicoder_OSS_Instruct_75K"
    dataset_split: str = "train"
    dataset_subset: int = 10000  # Use first 10K
    
    # Output paths (relative to repo root)
    output_dir: str = "models/checkpoints"
    
    # LoRA config
    lora_r: int = 32
    lora_alpha: int = 64
    lora_dropout: float = 0.05
    target_modules: tuple = ("q_proj", "k_proj", "v_proj", "o_proj",
                              "gate_proj", "up_proj", "down_proj")
    
    # QLoRA
    max_seq_length: int = 2048
    load_in_4bit: bool = True
    
    # Training
    per_device_batch_size: int = 4
    gradient_accumulation: int = 4
    learning_rate: float = 2e-4
    num_epochs: int = 1
    warmup_steps: int = 10
    logging_steps: int = 10
    save_steps: int = 0  # 0 = only save at end
    max_grad_norm: float = 0.3
    optim: str = "adamw_8bit"
