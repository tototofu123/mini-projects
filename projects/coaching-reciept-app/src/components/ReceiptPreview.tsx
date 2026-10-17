"use client";

import { forwardRef } from "react";
import { fmtDate, money, type ReceiptState, type Settings } from "@/lib/types";

interface Props {
  state: ReceiptState;
  settings: Settings;
  receiptNumber: string;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, Props>(function ReceiptPreview(
  { state, settings, receiptNumber },
  ref
) {
  const coachingTotal = state.sessions.reduce((sum, s) => sum + (s.hours || 0) * (s.rate || 0), 0);
  const extrasTotal = state.extras.reduce((sum, e) => sum + (e.amount || 0), 0);
  const grandTotal = coachingTotal + (state.transportFee || 0) + extrasTotal;

  return (
    <div
      id="print-receipt"
      ref={ref}
      className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg print:max-w-none print:rounded-none print:border-0 print:shadow-none"
    >
      <div className="bg-emerald-900 px-8 py-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">Receipt</p>
            <h1 className="mt-1 text-xl font-bold">{settings.coachName || "Coaching"}</h1>
            {settings.coachContact && (
              <p className="mt-0.5 text-xs text-emerald-200">{settings.coachContact}</p>
            )}
          </div>
          <div className="text-right text-sm">
            <p className="font-mono text-emerald-200">{receiptNumber}</p>
            <p className="mt-1 text-emerald-100">{state.issuedDate ? fmtDate(state.issuedDate) : ""}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Payer</p>
            <p className="text-lg font-semibold text-neutral-900">
              {state.payer.name || "—"}
            </p>
          </div>
          {state.payer.contact && (
            <p className="text-sm text-neutral-500">{state.payer.contact}</p>
          )}
        </div>

        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-medium">Item</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.sessions
              .filter((s) => s.hours > 0 || s.rate > 0)
              .map((s) => (
                <tr key={s.id} className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">
                    Coaching session{s.date ? ` — ${fmtDate(s.date)}` : ""}
                    <span className="text-neutral-400">
                      {" "}
                      ({s.hours} hr × {money(s.rate, settings.currency)})
                    </span>
                  </td>
                  <td className="py-2 text-right font-medium text-neutral-900">
                    {money((s.hours || 0) * (s.rate || 0), settings.currency)}
                  </td>
                </tr>
              ))}
            {(state.transportFee || 0) > 0 && (
              <tr className="border-b border-neutral-100">
                <td className="py-2 text-neutral-700">Transport fee</td>
                <td className="py-2 text-right font-medium text-neutral-900">
                  {money(state.transportFee, settings.currency)}
                </td>
              </tr>
            )}
            {state.extras
              .filter((e) => e.amount > 0)
              .map((e) => (
                <tr key={e.id} className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">{e.label || "Additional cost"}</td>
                  <td className="py-2 text-right font-medium text-neutral-900">
                    {money(e.amount, settings.currency)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-50 px-5 py-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Total due</span>
          <span className="text-2xl font-bold text-emerald-700">
            {money(grandTotal, settings.currency)}
          </span>
        </div>

        {state.paymentNote && (
          <div className="mt-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Payment</p>
            <p className="mt-1 whitespace-pre-line text-sm text-emerald-900">{state.paymentNote}</p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          Thank you for your support!
        </p>
      </div>
    </div>
  );
});