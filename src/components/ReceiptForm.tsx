"use client";

import { uid, type ReceiptState, type Settings } from "@/lib/types";

interface Props {
  state: ReceiptState;
  settings: Settings;
  payers: { id: string; name: string; contact: string }[];
  onState: (s: ReceiptState) => void;
  onSettings: (s: Settings) => void;
  onRememberPayer: (name: string, contact: string) => void;
}

const inputCls =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
const labelCls = "mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500";
const cardCls = "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm";

export function ReceiptForm({ state, settings, payers, onState, onSettings, onRememberPayer }: Props) {
  const set = (patch: Partial<ReceiptState>) => onState({ ...state, ...patch });

  const setPayer = (name: string, contact: string) =>
    set({ payer: { ...state.payer, name, contact } });

  const setSession = (id: string, patch: Partial<ReceiptState["sessions"][number]>) =>
    set({
      sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });

  const setExtra = (id: string, patch: Partial<ReceiptState["extras"][number]>) =>
    set({ extras: state.extras.map((e) => (e.id === id ? { ...e, ...patch } : e)) });

  const coachingTotal = state.sessions.reduce((sum, s) => sum + (s.hours || 0) * (s.rate || 0), 0);
  const extrasTotal = state.extras.reduce((sum, e) => sum + (e.amount || 0), 0);
  const grandTotal = coachingTotal + (state.transportFee || 0) + extrasTotal;

  return (
    <div className="space-y-4">
      <div className={cardCls}>
        <h2 className="mb-3 text-sm font-semibold text-neutral-900">Your business</h2>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Coach / business name</label>
            <input
              className={inputCls}
              value={settings.coachName}
              onChange={(e) => onSettings({ ...settings, coachName: e.target.value })}
              placeholder="e.g. Alex Coaching Studio"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Contact</label>
              <input
                className={inputCls}
                value={settings.coachContact}
                onChange={(e) => onSettings({ ...settings, coachContact: e.target.value })}
                placeholder="phone / email"
              />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <input
                className={inputCls}
                value={settings.currency}
                onChange={(e) => onSettings({ ...settings, currency: e.target.value })}
                placeholder="$"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="mb-3 text-sm font-semibold text-neutral-900">Payer</h2>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Name</label>
            <input
              className={inputCls}
              list="payer-list"
              value={state.payer.name}
              onChange={(e) => setPayer(e.target.value, state.payer.contact)}
              onBlur={() => onRememberPayer(state.payer.name, state.payer.contact)}
              placeholder="Payer name"
            />
            <datalist id="payer-list">
              {payers.map((p) => (
                <option key={p.id} value={p.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelCls}>Contact (optional)</label>
            <input
              className={inputCls}
              value={state.payer.contact}
              onChange={(e) => setPayer(state.payer.name, e.target.value)}
              onBlur={() => onRememberPayer(state.payer.name, state.payer.contact)}
              placeholder="phone / email"
            />
          </div>
          <div>
            <label className={labelCls}>Receipt date</label>
            <input
              type="date"
              className={inputCls}
              value={state.issuedDate}
              onChange={(e) => set({ issuedDate: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Coaching sessions</h2>
          <button
            type="button"
            onClick={() => set({ sessions: [...state.sessions, { id: uid(), date: state.issuedDate, hours: 1, rate: 0 }] })}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
          >
            + Add session
          </button>
        </div>
        <div className="space-y-3">
          {state.sessions.map((s) => (
            <div key={s.id} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
              <div>
                <label className={labelCls}>Date</label>
                <input
                  type="date"
                  className={inputCls}
                  value={s.date}
                  onChange={(e) => setSession(s.id, { date: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls}>Hours</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  className={inputCls}
                  value={s.hours}
                  onChange={(e) => setSession(s.id, { hours: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className={labelCls}>Rate / hr</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className={inputCls}
                  value={s.rate}
                  onChange={(e) => setSession(s.id, { rate: Number(e.target.value) })}
                />
              </div>
              <button
                type="button"
                onClick={() => set({ sessions: state.sessions.filter((x) => x.id !== s.id) })}
                disabled={state.sessions.length === 1}
                className="mb-1 rounded-lg border border-neutral-300 px-2.5 py-2 text-xs text-neutral-500 transition hover:border-red-300 hover:text-red-600 disabled:opacity-30"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={cardCls}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Additional costs</h2>
          <button
            type="button"
            onClick={() => set({ extras: [...state.extras, { id: uid(), label: "", amount: 0 }] })}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-emerald-500 hover:text-emerald-700"
          >
            + Add item
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Transport fee</label>
            <input
              type="number"
              min="0"
              step="1"
              className={inputCls}
              value={state.transportFee}
              onChange={(e) => set({ transportFee: Number(e.target.value) })}
              placeholder="0"
            />
          </div>
          {state.extras.map((e) => (
            <div key={e.id} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
              <div>
                <label className={labelCls}>Description</label>
                <input
                  className={inputCls}
                  value={e.label}
                  onChange={(ev) => setExtra(e.id, { label: ev.target.value })}
                  placeholder="e.g. equipment, parking"
                />
              </div>
              <div>
                <label className={labelCls}>Amount</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className={inputCls}
                  value={e.amount}
                  onChange={(ev) => setExtra(e.id, { amount: Number(ev.target.value) })}
                />
              </div>
              <button
                type="button"
                onClick={() => set({ extras: state.extras.filter((x) => x.id !== e.id) })}
                className="mb-1 rounded-lg border border-neutral-300 px-2.5 py-2 text-xs text-neutral-500 transition hover:border-red-300 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="mb-3 text-sm font-semibold text-neutral-900">Payment note</h2>
        <textarea
          className={`${inputCls} min-h-20 resize-y`}
          value={state.paymentNote}
          onChange={(e) => set({ paymentNote: e.target.value })}
          placeholder="e.g. Please transfer to FPS 9876 5432, or cash. Thanks!"
        />
        <p className="mt-3 border-t border-dashed border-neutral-200 pt-3 text-right text-sm text-neutral-700">
          Coaching {money(coachingTotal, settings.currency)}
          <span className="mx-2 text-neutral-300">+</span>
          Transport {money(state.transportFee || 0, settings.currency)}
          <span className="mx-2 text-neutral-300">+</span>
          Extras {money(extrasTotal, settings.currency)}
          <span className="mx-2 text-neutral-300">=</span>
          <span className="font-bold text-emerald-700">{money(grandTotal, settings.currency)}</span>
        </p>
      </div>
    </div>
  );
}

function money(n: number, currency: string): string {
  return `${currency}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}