![Finetune Exporter](finetune_exporter_v1_FR.jpeg)

# Finetune Exporter — Exporteur de Conversations Universel

**Exportez vos conversations IA de plus de 15 plateformes pour fine-tuner votre propre LLM**

[![Licence : CC BY-NC-SA 4.0](https://img.shields.io/badge/Licence-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Qu'est-ce que Finetune Exporter ?

Un userscript puissant qui capture les conversations des principales plateformes d'IA et les exporte dans des formats structurés prêts pour le **fine-tuning de LLM**. Créez des jeux de données d'entraînement de haute qualité à partir de vos interactions réelles.

## Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **15+ plateformes** | ChatGPT, Gemini, Claude, Grok, Copilot, Perplexity, DeepSeek, Mistral, Cohere, Kimi, Meta AI, Qwen, DeepInfra, DeepAI, LinkedIn |
| **8 formats d'export** | JSON, JSONL, ShareGPT, Alpaca, Markdown, TXT, CSV, HTML |
| **22 langues** | Localisation complète de l'interface, support RTL inclus |
| **Historique d'export** | Stockage persistant avec suivi des métadonnées |
| **UI Glassmorphism** | Bouton flottant moderne et déplaçable |


## Installation

1. Installez **Tampermonkey** ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) / [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/))
2. Cliquez sur [**Installer**](https://raw.githubusercontent.com/Lombard-Web-Services/Finetune-Exporter/refs/heads/main/Finetune_Exporter.js)
3. Naviguez sur l'une des plateformes supportées
4. Cliquez sur le bouton flottant → Choisissez le format → Exportez

## Utilisation

1. Ouvrez une conversation sur ChatGPT, Claude, Gemini, etc.
2. Cliquez sur le bouton Export déplaçable
3. Choisissez votre format (JSONL recommandé pour le fine-tuning)
4. Le fichier se télécharge automatiquement

## Formats d'Export pour le Fine-Tuning

| Format | Idéal pour | Structure |
|--------|------------|-----------|
| JSONL | Jeux de données d'entraînement | Un objet JSON par ligne |
| ShareGPT | Modèles conversationnels | Format tour Humain/GPT |
| Alpaca | Instruction tuning | Instruction/Entrée/Sortie |

## Mises à Jour Automatiques

Le script vérifie automatiquement les mises à jour via GitHub. Vous serez notifié lorsqu'une nouvelle version sera disponible.

## Structure du Dépôt

```
Finetune-Exporter/
├── Finetune_Exporter.js         # Userscript principal
├── finetune_exporter_v1_EN.png  # Capture d'écran anglaise
├── finetune_exporter_v1_FR.jpeg # Capture d'écran française
├── README.md                    # README ANGLAIS
└── README_FR.md                 # Ce fichier
```

## Fine-Tuning

Les jeux de données exportés sont spécifiquement conçus pour le fine-tuning de LLM 7B paramètres via des techniques modernes :

### Méthode de Fine-Tuning Recommandée

**Optimisation Quasi-Lorentzienne IRLS** — Une approche novatrice pour un fine-tuning robuste des LLM :

- **Perte de Cauchy** — Robuste face aux valeurs aberrantes dans les données de conversation
- **LoRA / QLoRA** — Fine-tuning efficace en mémoire
- **Compatible Tesla T4** — Fonctionne sur du matériel abordable

### Documentation Technique

| Langue | Lien de téléchargement |
|--------|------------------------|
| 🇬🇧 English | [quasi_lorentzian_irls_optimization.pdf](https://raw.githubusercontent.com/Lombard-Web-Services/cauchy/main/quasi_lorentzian_irls_optimization.pdf) |
| 🇫🇷 Français | [optimisation_quasi_lorentzienne_irls.pdf](https://raw.githubusercontent.com/Lombard-Web-Services/cauchy/main/optimisation_quasi_lorentzienne_irls.pdf) |



## Licence

CC BY-NC-SA 4.0 — Gratuit pour un usage non commercial avec attribution.

- Modifier et partager
- Usage commercial interdit
- Doit être partagé sous la même licence

## 👤 Auteur

**Thibaut LOMBARD** ([@lombardweb](https://github.com/Lombard-Web-Services/Finetune-Exporter))

Lombard Web Services
