export interface PayerProfile {
  id: string;
  name: string;
  contact: string;
}

export interface SessionRow {
  id: string;
  date: string;
  hours: number;
  rate: number;
}

export interface ExtraRow {
  id: string;
  label: string;
  amount: number;
}

export interface ReceiptState {
  payer: PayerProfile;
  sessions: SessionRow[];
  transportFee: number;
  extras: ExtraRow[];
  paymentNote: string;
  issuedDate: string;
}

export interface Settings {
  coachName: string;
  coachContact: string;
  currency: string;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const emptyState = (): ReceiptState => ({
  payer: { id: uid(), name: "", contact: "" },
  sessions: [{ id: uid(), date: todayISO(), hours: 1, rate: 0 }],
  transportFee: 0,
  extras: [],
  paymentNote: "",
  issuedDate: todayISO(),
});

export const defaultSettings = (): Settings => ({
  coachName: "Your Coaching",
  coachContact: "",
  currency: "$",
});

export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function money(n: number, currency: string): string {
  return `${currency}${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}