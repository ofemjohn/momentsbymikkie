import { put, list, del } from "@vercel/blob";

export type InvoiceRecord = {
  slug: string;
  clientName: string;
  label: string;
  amount: string;
  note: string;
  fileName: string;
  pdfUrl: string;
  createdAt: string;
};

function randomSlug() {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createInvoice(input: {
  clientName: string;
  label?: string;
  amount?: string;
  note?: string;
  file: File;
}): Promise<InvoiceRecord> {
  const slug = randomSlug();

  const pdfBlob = await put(`invoices/${slug}/invoice.pdf`, input.file, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });

  const record: InvoiceRecord = {
    slug,
    clientName: input.clientName,
    label: input.label ?? "",
    amount: input.amount ?? "",
    note: input.note ?? "",
    fileName: input.file.name,
    pdfUrl: pdfBlob.url,
    createdAt: new Date().toISOString(),
  };

  await put(`invoices/${slug}/meta.json`, JSON.stringify(record), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  return record;
}

export async function listInvoices(): Promise<InvoiceRecord[]> {
  const { blobs } = await list({ prefix: "invoices/" });
  const metaBlobs = blobs.filter((b) => b.pathname.endsWith("/meta.json"));

  const records = await Promise.all(
    metaBlobs.map(async (b) => {
      const res = await fetch(b.url, { cache: "no-store" });
      return (await res.json()) as InvoiceRecord;
    }),
  );

  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getInvoice(slug: string): Promise<InvoiceRecord | null> {
  const { blobs } = await list({ prefix: `invoices/${slug}/` });
  const metaBlob = blobs.find((b) => b.pathname.endsWith("/meta.json"));
  if (!metaBlob) return null;

  const res = await fetch(metaBlob.url, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as InvoiceRecord;
}

export async function deleteInvoice(slug: string): Promise<void> {
  const { blobs } = await list({ prefix: `invoices/${slug}/` });
  await Promise.all(blobs.map((b) => del(b.url)));
}
