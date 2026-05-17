# 🚀 Blog Hub: Event Dispatcher

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white&style=flat-square)](https://github.com/features/actions)
[![Integration](https://img.shields.io/badge/Type-Integration_Bridge-blue?style=flat-square)](https://github.com/tototofu123/exampledemo)
[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)](https://github.com/tototofu123/exampledemo)

A specialized infrastructure repository that serves as a **Notification Bridge** and **Event Dispatcher** for the [Public Repo Blog Hub](https://github.com/tototofu123/public-repo-blog-hub).

## 🧠 How it Works

This repository is designed to trigger automated rebuilds and data refreshes for the main blog hub. When a push is detected on the `main` or `master` branches, a GitHub Action is triggered that dispatches a `repo-updated` event to the central hub via the GitHub REST API.

## ✨ Key Features

- **⚡ Automated Dispatch**: Zero-touch notification system using `repository_dispatch`.
- **🛡️ Secure Token Handling**: Utilizes GitHub Secrets (`REPO_BLOG_TRIGGER_TOKEN`) for authenticated cross-repo communication.
- **🔄 Centralized Orchestration**: Part of a broader ecosystem to keep public-facing portfolio data in sync.

## 🛠️ Tech Stack

- **Platform**: GitHub
- **Automation Engine**: [GitHub Actions](https://github.com/features/actions)
- **API**: GitHub REST API (v3)

## 🚀 Setup

This repository is part of an automated pipeline. To enable it:
1. Ensure a valid `REPO_BLOG_TRIGGER_TOKEN` is added to the repository secrets.
2. Push changes to `main` to trigger the `notify-repo-blog-hub.yml` workflow.

---
*Created as part of a modular infrastructure project. Updated 17-05-2026.*
