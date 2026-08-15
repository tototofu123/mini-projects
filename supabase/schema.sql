-- Coach Receipt — Supabase schema (free tier)
-- Run this in the Supabase SQL Editor once (Dashboard -> SQL Editor -> New query).

create table if not exists public.app_state (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

-- Phase 1: single-coach tool, anonymous access so the browser can sync with just
-- the anon key. TODO (phase 1.5): add Supabase Auth (email/password) and scope
-- policies to auth.uid() before sharing the app with anyone else.
create policy "app_state_anon_select" on public.app_state for select using (true);
create policy "app_state_anon_insert" on public.app_state for insert with check (true);
create policy "app_state_anon_update" on public.app_state for update using (true);

-- Guarantee the counter row exists (used by receipt numbering).
insert into public.app_state (key, value, updated_at)
values ('counter', '0'::jsonb, now())
on conflict (key) do nothing;