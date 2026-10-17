# Is It AI Image?

A convolutional neural network (CNN) project that classifies images as **AI-generated** or **real**.

Public repository maintained by @tototofu123.

## Website

- GitHub Pages: https://tototofu123.github.io/is-it-ai-image/

## Security

- Secret scanning workflow: `.github/workflows/security-secrets-scan.yml`
- Gitleaks config: `.gitleaks.toml`

## Project Overview

This repository contains:
- A training notebook: `ai_vs_real.ipynb`
- Exported trained model artifacts in multiple formats under `artifacts/`
- Project notes in `requirements.md`

The model is trained using the dataset:
- https://huggingface.co/datasets/Hemg/AI-Generated-vs-Real-Images-Datasets

## Artifacts

Generated model files:
- `artifacts/ai_vs_real_cnn.h5`
- `artifacts/ai_vs_real_cnn.keras`
- `artifacts/ai_vs_real_savedmodel/` (TensorFlow SavedModel format)

## Environment

Use a local Python virtual environment and install the required ML dependencies (TensorFlow / Keras and related packages) before running the notebook.

## Usage

1. Open `ai_vs_real.ipynb`.
2. Load the dataset.
3. Train the CNN.
4. Export the model to the desired format (`.h5`, `.keras`, or SavedModel).

## Goal

Provide a model that can later be integrated into a website where users upload an image to detect whether it is AI-generated.
