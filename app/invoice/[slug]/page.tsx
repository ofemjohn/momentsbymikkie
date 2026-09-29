import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getInvoice } from "@/lib/invoices";
import { Logo } from "@/components/brand/Logo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InvoicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invoice = await getInvoice(slug);
  if (!invoice) notFound();

  return (
    <main className="min-h-screen bg-warm-cream px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Link href="/" aria-label="momentsbymikkie — back to homepage" className="self-start">
          <Logo theme="light" />
        </Link>

        <div className="border border-ink/10 bg-warm-white p-6 sm:p-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-brown">
            Invoice
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {invoice.label || `For ${invoice.clientName}`}
          </h1>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:max-w-sm">
            <div>
              <dt className="font-sans text-xs uppercase tracking-[0.15em] text-ink/45">Client</dt>
              <dd className="mt-1 font-sans font-medium text-ink">{invoice.clientName}</dd>
            </div>
            {invoice.amount ? (
              <div>
                <dt className="font-sans text-xs uppercase tracking-[0.15em] text-ink/45">Amount</dt>
                <dd className="mt-1 font-sans font-medium text-ink">{invoice.amount}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-sans text-xs uppercase tracking-[0.15em] text-ink/45">Date</dt>
              <dd className="mt-1 font-sans font-medium text-ink">{formatDate(invoice.createdAt)}</dd>
            </div>
          </dl>

          {invoice.note ? (
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-ink/70">
              {invoice.note}
            </p>
          ) : null}

          <a
            href={invoice.pdfUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex items-center justify-center bg-ink px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-warm-white transition-colors hover:bg-charcoal"
          >
            Download PDF
          </a>
        </div>

        <div
          className="overflow-hidden border border-ink/10 bg-near-black"
          style={{ aspectRatio: "8.5 / 11" }}
        >
          <iframe src={invoice.pdfUrl} title="Invoice PDF preview" className="h-full w-full" />
        </div>
      </div>
    </main>
  );
}
