"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { ReceiptForm } from "@/components/ReceiptForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { useReceiptStore } from "@/lib/store";

export default function Home() {
  const { state, setState, payers, settings, setSettings, rememberPayer, nextReceiptNumber, online } =
    useReceiptStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [exporting, setExporting] = useState<"png" | "pdf" | null>(null);

  useEffect(() => {
    setReceiptNumber(nextReceiptNumber());
  }, [nextReceiptNumber]);

  const payerName = state.payer.name.trim() || "receipt";

  const exportPng = useCallback(async () => {
    if (!previewRef.current) return;
    setExporting("png");
    try {
      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `${receiptNumber}_${payerName.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(null);
    }
  }, [receiptNumber, payerName]);

  const exportPdf = useCallback(() => {
    setExporting("pdf");
    setReceiptNumber(nextReceiptNumber());
    setTimeout(() => {
      window.print();
      setExporting(null);
    }, 50);
  }, [nextReceiptNumber]);

  return (
    <div className="min-h-screen bg-neutral-100 print:bg-white">
      <header className="border-b border-neutral-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-neutral-900">Coach Receipt</h1>
            <p className="text-xs text-neutral-500">
              Generate a clear receipt for every coaching session.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {online && (
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Cloud sync
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={exportPng}
                disabled={exporting !== null}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
              >
                {exporting === "png" ? "Exporting…" : "Download PNG"}
              </button>
              <button
                onClick={exportPdf}
                disabled={exporting !== null}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {exporting === "pdf" ? "Preparing…" : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="print:hidden">
          <ReceiptForm
            state={state}
            settings={settings}
            payers={payers}
            onState={setState}
            onSettings={setSettings}
            onRememberPayer={rememberPayer}
          />
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ReceiptPreview
            ref={previewRef}
            state={state}
            settings={settings}
            receiptNumber={receiptNumber}
          />
        </div>
      </main>
    </div>
  );
}