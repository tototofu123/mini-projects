# 🛡️ npm CWD Guard

[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)](https://github.com/tototofu123/npm-cwd-guard-skill)
[![Safety](https://img.shields.io/badge/Focus-CLI_Safety-red?style=flat-square)](https://github.com/tototofu123/npm-cwd-guard-skill)
[![Tools](https://img.shields.io/badge/Supports-npm_|_bun_|_pnpm-CB3837?logo=npm&style=flat-square)](https://www.npmjs.com/)
[![AI Skill](https://img.shields.io/badge/Type-AI_Agent_Skill-blue?style=flat-square)](https://github.com/tototofu123/npm-cwd-guard-skill)

A specialized developer safety protocol and AI agent skill designed to enforce correct **Current Working Directory (CWD)** resolution. This tool prevents the common pitfall of executing package manager commands in the wrong folder, especially within complex, multi-project monorepos or workspaces.

## 🧠 The Problem

In modern development, it's common to have multiple `package.json` files across different subdirectories. Running `npm install` or `npm run dev` from the workspace root instead of the project-specific folder can lead to corrupted `node_modules`, missing dependencies, and runtime errors.

## ✨ Key Features

- **🚀 Smart CWD Resolution**: Automatically infers the correct target directory based on active file context or recent prompt history.
- **🛡️ Safety Enforcement**: Blocks execution at the workspace root unless explicitly requested, protecting the global environment.
- **📦 Multi-Manager Support**: Works seamlessly across `npm`, `pnpm`, `yarn`, `bun`, `npx`, `node`, `vite`, and `turbo`.
- **🤖 AI Agent Optimized**: Designed specifically as a "Skill" for AI coding assistants to ensure they operate safely on your filesystem.

## 🛠️ Resolution Algorithm

The Guard follows a strict priority order to determine the execution folder:
1. **Active Context**: Uses the path of the file currently being edited.
2. **Explicit Mention**: Searches recent prompts for specific folder or file references.
3. **Climb Up**: Starting from the inferred path, it walks up the directory tree to find the nearest `package.json`.
4. **Fallback**: If confidence is low, it halts and asks the user for clarification.

## 📂 Repository Contents

- **`SKILL.md`**: The core specification and logic for the CWD Guard protocol.
- **`README.md`**: Documentation and overview.

## 🚀 Usage (AI Agents)

When integrated into an AI agent's toolset, the agent will automatically invoke this logic before performing any shell commands involving package managers, ensuring a zero-error workflow in complex directory structures.

---
*Developed to ensure robust and safe development workflows. Updated 17-05-2026.*
