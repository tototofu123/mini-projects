import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!isSupabaseConfigured()) return null;
  client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return client;
}

const KEYS = ["state", "payers", "settings", "counter"] as const;
type StateKey = (typeof KEYS)[number];

export async function remoteLoad(key: StateKey): Promise<unknown | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("app_state").select("value").eq("key", key).maybeSingle();
  if (error || !data) return null;
  return data.value;
}

export async function remoteSave(key: StateKey, value: unknown): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb
    .from("app_state")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  return !error;
}