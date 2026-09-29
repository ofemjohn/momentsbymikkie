import { listInvoices, type InvoiceRecord } from "@/lib/invoices";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

async function loadInvoices(): Promise<InvoiceRecord[] | null> {
  try {
    return await listInvoices();
  } catch {
    return null;
  }
}

export default async function AdminPage() {
  const invoices = await loadInvoices();

  if (invoices === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-warm-white px-5">
        <div className="max-w-md text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-brown">
            Setup Needed
          </p>
          <h1 className="mt-3 font-display text-2xl text-ink">
            Storage isn&apos;t connected yet
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70">
            The invoice dashboard needs a Vercel Blob store. In the Vercel project dashboard, go
            to Storage → Create Database → Blob, connect it to this project, then redeploy.
          </p>
        </div>
      </main>
    );
  }

  return <AdminDashboard initialInvoices={invoices} />;
}
