"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { remoteLoad, remoteSave } from "@/lib/db";
import {
  defaultSettings,
  emptyState,
  type PayerProfile,
  type ReceiptState,
  type Settings,
} from "@/lib/types";

const STATE_KEY = "coach-receipt:state";
const PAYERS_KEY = "coach-receipt:payers";
const SETTINGS_KEY = "coach-receipt:settings";
const COUNTER_KEY = "coach-receipt:counter";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

type JsonState = {
  state: ReceiptState;
  payers: PayerProfile[];
  settings: Settings;
  counter: number;
};

async function loadRemoteState(): Promise<Partial<JsonState> | null> {
  const [state, payers, settings, counter] = await Promise.all([
    remoteLoad("state"),
    remoteLoad("payers"),
    remoteLoad("settings"),
    remoteLoad("counter"),
  ]);
  if (!state && !payers && !settings && !counter) return null;
  return {
    state: state as ReceiptState | undefined,
    payers: payers as PayerProfile[] | undefined,
    settings: settings as Settings | undefined,
    counter: (counter as number) ?? undefined,
  };
}

export function useReceiptStore() {
  const [state, setState] = useState<ReceiptState>(() => load(STATE_KEY, emptyState()));
  const [payers, setPayers] = useState<PayerProfile[]>(() => load(PAYERS_KEY, []));
  const [settings, setSettings] = useState<Settings>(() => ({
    ...defaultSettings(),
    ...load(SETTINGS_KEY, {}),
  }));
  const [online, setOnline] = useState(false);
  const counterRef = useRef<number>(load(COUNTER_KEY, 0));

  const syncToRemote = useCallback((patch: Partial<JsonState>) => {
    remoteSave("state", patch.state ?? null).catch(() => {});
    if (patch.payers !== undefined) remoteSave("payers", patch.payers).catch(() => {});
    if (patch.settings !== undefined) remoteSave("settings", patch.settings).catch(() => {});
    if (patch.counter !== undefined) remoteSave("counter", patch.counter).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await loadRemoteState();
      if (cancelled || !remote) return;
      setOnline(true);
      if (remote.state) setState((prev) => ({ ...prev, ...remote.state! }));
      if (remote.payers) setPayers(remote.payers!);
      if (remote.settings) setSettings((prev) => ({ ...prev, ...remote.settings! }));
      if (remote.counter !== undefined) counterRef.current = remote.counter;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => save(STATE_KEY, state), [state]);
  useEffect(() => save(PAYERS_KEY, payers), [payers]);
  useEffect(() => save(SETTINGS_KEY, settings), [settings]);

  const rememberPayer = useCallback(
    (name: string, contact: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      setPayers((prev) => {
        if (prev.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return prev;
        const next = [...prev, { id: uid(), name: trimmed, contact: contact.trim() }];
        syncToRemote({ payers: next });
        return next;
      });
    },
    [syncToRemote]
  );

  const nextReceiptNumber = useCallback((): string => {
    const year = new Date().getFullYear();
    counterRef.current += 1;
    const count = counterRef.current;
    save(COUNTER_KEY, count);
    syncToRemote({ counter: count });
    return `R-${year}-${String(count).padStart(3, "0")}`;
  }, [syncToRemote]);

  return { state, setState, payers, setPayers, settings, setSettings, rememberPayer, nextReceiptNumber, online };
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}