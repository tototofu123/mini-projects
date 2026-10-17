# 🛠️ SVG Migration & Metadata Toolkit

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white&style=flat-square)](https://www.python.org/)
[![PowerShell](https://img.shields.io/badge/PowerShell-5.1+-5391FE?logo=powershell&logoColor=white&style=flat-square)](https://learn.microsoft.com/en-us/powershell/)
[![SVG](https://img.shields.io/badge/Format-SVG-FFB13B?logo=svg&logoColor=white&style=flat-square)](https://www.w3.org/Graphics/SVG/)

A robust collection of automation scripts designed for batch processing, renaming, and migrating massive SVG icon libraries. Optimized for maintaining structural integrity and metadata consistency across thousands of assets.

## ✨ Key Features

- **🚀 Batch Migration**: Efficiently move and organize large sets of SVG files with path mapping.
- **🔍 Metadata Generation**: Automatically generates JSON metadata including SHA-256 hashes, file sizes, and classification tags.
- **🧹 Deduplication**: Identifies overlapping or duplicate icons using hash-based comparison.
- **📊 Inventory Management**: Maintains a unified `inventory.json` and `metadata.json` for complex icon systems.
- **📦 Tabler Icons Integration**: Specific logic tailored for the Tabler Icons library and its naming conventions.

## 📂 Included Scripts

| Script | Language | Purpose |
| :--- | :--- | :--- |
| `migrate_icons.py` | Python | Core logic for moving files and generating hash-based metadata. |
| `check_and_migrate_tabler.py` | Python | Specialized migration handler for Tabler Icon transitions. |
| `check_overlap_optimized.ps1` | PowerShell | Performance-tuned script for identifying duplicate assets across directories. |

## 🚀 Getting Started

1. **Clone the Repo:**
   ```bash
   gh repo clone tototofu123/svg-migration-script
   ```

2. **Configure Paths:**
   Edit the `source_dir` and `target_dir` variables in `migrate_icons.py` to point to your icon libraries.

3. **Run Migration:**
   ```bash
   python migrate_icons.py
   ```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Maintained as part of the Icon Automation project. Updated 17-05-2026.*
