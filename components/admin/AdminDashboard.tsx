"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceRecord } from "@/lib/invoices";

type AdminDashboardProps = {
  initialInvoices: InvoiceRecord[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminDashboard({ initialInvoices }: AdminDashboardProps) {
  const router = useRouter();
  const [invoices, setInvoices] = useState(initialInvoices);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/admin/invoices", { method: "POST", body: formData });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Upload failed.");
      return;
    }

    const { invoice } = (await res.json()) as { invoice: InvoiceRecord };
    setInvoices((prev) => [invoice, ...prev]);
    form.reset();
  }

  async function onDelete(slug: string) {
    if (!window.confirm("Delete this invoice? The link will stop working immediately.")) return;
    setDeletingSlug(slug);
    const res = await fetch(`/api/admin/invoices/${slug}`, { method: "DELETE" });
    setDeletingSlug(null);
    if (res.ok) {
      setInvoices((prev) => prev.filter((i) => i.slug !== slug));
    }
  }

  async function onCopy(slug: string) {
    const url = `${window.location.origin}/invoice/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 2000);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-warm-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl text-ink">momentsbymikkie</span>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-brown">
              Invoices
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink/60 transition-colors hover:text-ink"
          >
            Log Out
          </button>
        </div>

        <section className="border border-ink/10 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink">Send a New Invoice</h2>
          <p className="mt-1 font-sans text-sm text-ink/60">
            Upload the PDF you already created — you&apos;ll get a private link to send the client.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink/60">
                  Client Name *
                </span>
                <input
                  name="clientName"
                  required
                  className="border border-ink/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus-visible:border-ink/60"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink/60">
                  Amount
                </span>
                <input
                  name="amount"
                  placeholder="e.g. $450"
                  className="border border-ink/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus-visible:border-ink/60"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink/60">
                Label
              </span>
              <input
                name="label"
                placeholder="e.g. Wedding Package — Deposit"
                className="border border-ink/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus-visible:border-ink/60"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink/60">
                Note (optional, shown to client)
              </span>
              <textarea
                name="note"
                rows={2}
                className="border border-ink/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus-visible:border-ink/60"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink/60">
                Invoice PDF *
              </span>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                required
                className="font-sans text-sm text-ink file:mr-4 file:border file:border-ink/20 file:bg-transparent file:px-3.5 file:py-2 file:font-sans file:text-xs file:uppercase file:tracking-[0.12em]"
              />
            </label>

            {error ? <p className="font-sans text-xs text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 self-start bg-ink px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-warm-white transition-colors hover:bg-charcoal disabled:opacity-50"
            >
              {submitting ? "Uploading…" : "Create Invoice Link"}
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl text-ink">Sent Invoices</h2>

          {invoices.length === 0 ? (
            <p className="font-sans text-sm text-ink/50">No invoices yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
              {invoices.map((invoice) => (
                <li key={invoice.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      {invoice.clientName}
                      {invoice.amount ? (
                        <span className="ml-2 font-normal text-ink/60">{invoice.amount}</span>
                      ) : null}
                    </p>
                    <p className="font-sans text-xs text-ink/50">
                      {invoice.label ? `${invoice.label} · ` : ""}
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onCopy(invoice.slug)}
                      className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink/70 transition-colors hover:text-ink"
                    >
                      {copiedSlug === invoice.slug ? "Copied!" : "Copy Link"}
                    </button>
                    <a
                      href={`/invoice/${invoice.slug}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink/70 transition-colors hover:text-ink"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={() => onDelete(invoice.slug)}
                      disabled={deletingSlug === invoice.slug}
                      className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-red-600/80 transition-colors hover:text-red-600 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
