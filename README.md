# Coach Receipt App

Generate a clear receipt for every coaching session — payer, coaching fee (hr × rate), transport fee, and additional costs. Exports as **PDF** and **shareable PNG**, so clients know exactly what and how to pay.

## Phases

| Phase | Status | Stack |
|---|---|---|
| 0 — Web app + local DB | ✅ Done | Next.js 16 + Tailwind, localStorage |
| 1 — Web app + online DB | 🚧 In progress | + Supabase (free tier, 500MB, $0) |
| 2 — Flutter / React APK | ⏳ Planned | Flutter (Supabase Dart SDK) |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Works out of the box with **local storage only** (phase 0).

## Phase 1 — Supabase online sync

Chosen over Firebase/Turso/Neon because: relational Postgres fits receipts, generous free tier (500MB), and it ships **official Flutter SDKs** (needed for phase 2). One caveat: free-tier projects pause after 7 days without a request — either use the app weekly or add a keep-alive ping.

1. Create a free project at [supabase.com](https://supabase.com) (no credit card).
2. In the **SQL Editor**, run the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL and anon key (Dashboard → Project Settings → API).
4. Restart `npm run dev`. You'll see a **Cloud sync** badge in the header once connected.

```bash
cp .env.local.example .env.local
```

When Supabase env vars are present, state/payers/settings sync to the `app_state` table across devices; without them the app silently stays in local mode.

> **Note (phase 1.5):** the schema uses open anon policies for the single-coach use case. Before sharing the app, add Supabase Auth (email/password) and scope policies to `auth.uid()`.

## Features

- Payer name + contact (saved for repeat clients)
- Multiple coaching sessions: date × hours × rate/hr
- Transport fee + itemized additional costs
- Payment note (FPS/bank details) shown on the receipt
- Receipt numbering (`R-YYYY-NNN`), sequential across exports
- Live preview, auto-totals, configurable currency
- **PNG export** (2x, WhatsApp-friendly) + **PDF export** (A4 print CSS)

## Structure

```
src/lib/types.ts      # data model + helpers
src/lib/store.ts      # state + localStorage/Supabase hybrid persistence
src/lib/db.ts         # Supabase client + remote load/save
src/components/       # ReceiptForm + ReceiptPreview
supabase/schema.sql   # free-tier schema (app_state table)
```