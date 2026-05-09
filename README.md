![Finetune Exporter](finetune_exporter_v1_EN.png)

# Finetune Exporter - Universal Conversation Exporter

**Export AI conversations from 15+ platforms to fine-tune your own LLM**

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## What is Finetune Exporter?

A powerful userscript that captures conversations from major AI platforms and exports them in structured formats ready for **LLM fine-tuning**. Create high-quality training datasets from your real-world interactions.

## Features

| Feature | Description |
|---------|-------------|
| **15+ Platforms** | ChatGPT, Gemini, Claude, Grok, Copilot, Perplexity, DeepSeek, Mistral, Cohere, Kimi, Meta AI, Qwen, DeepInfra, DeepAI, LinkedIn |
| **8 Export Formats** | JSON, JSONL, ShareGPT, Alpaca, Markdown, TXT, CSV, HTML |
| **22 Languages** | Full UI localization including RTL support |
| **Export History** | Persistent storage with metadata tracking |
| **Glassmorphism UI** | Modern, draggable floating button |


## Installation

1. Install **Tampermonkey** ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) / [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/))
2. Click [**Install**](https://raw.githubusercontent.com/Lombard-Web-Services/Finetune-Exporter/refs/heads/main/Finetune_Exporter.js)
3. Navigate to any supported platform
4. Click the floating button → Select format → Export

## Usage

1. Open a conversation on ChatGPT, Claude, Gemini, etc.
2. Click the draggable Export button
3. Choose your format (JSONL recommended for fine-tuning)
4. File downloads automatically

## 📊 Export Formats for Fine-Tuning

| Format | Best For | Structure |
|--------|----------|-----------|
| JSONL | Training datasets | One JSON object per line |
| ShareGPT | Conversation models | Human/GPT turn format |
| Alpaca | Instruction tuning | Instruction/Input/Output |

## Auto-Updates

The script automatically checks for updates via GitHub. You'll be notified when a new version is available.

## Repository Structure

```
Finetune-Exporter/
├── Finetune_Exporter.js         # Main userscript
├── finetune_exporter_v1_EN.png  # English screenshot
├── finetune_exporter_v1_FR.jpeg # French screenshot
├── README_FR.md                 # French README
└── README.md                    # This file
```

## Perfect for Fine-Tuning

The exported datasets are specifically designed for fine-tuning 7B parameter LLMs using modern techniques:

### Recommended Fine-Tuning Method

**Quasi-Lorentzian IRLS Optimization** — A novel approach for robust LLM fine-tuning:

- **Cauchy Loss** — Robust to outliers in conversation data
- **LoRA / QLoRA** — Memory-efficient fine-tuning
- **Tesla T4 Compatible** — Runs on affordable hardware

### Technical Documentation

| Language | Download Link |
|----------|---------------|
| 🇬🇧 English | [quasi_lorentzian_irls_optimization.pdf](https://raw.githubusercontent.com/Lombard-Web-Services/cauchy/main/quasi_lorentzian_irls_optimization.pdf) |
| 🇫🇷 Français | [optimisation_quasi_lorentzienne_irls.pdf](https://raw.githubusercontent.com/Lombard-Web-Services/cauchy/main/optimisation_quasi_lorentzienne_irls.pdf) |


## License

CC BY-NC-SA 4.0 — Free for non-commercial use with attribution.

- Modify and share
- Commercial use prohibited
- Must share under same license

## 👤 Author

**Thibaut LOMBARD** ([@lombardweb](https://github.com/Lombard-Web-Services/Finetune-Exporter))

Lombard Web Services
