import { NextResponse } from "next/server";
import { createInvoice, listInvoices } from "@/lib/invoices";

const MAX_PDF_BYTES = 15 * 1024 * 1024;

export async function GET() {
  const invoices = await listInvoices();
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const clientName = formData.get("clientName");

  if (!(file instanceof File) || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Please attach a PDF file." }, { status: 400 });
  }
  if (file.size > MAX_PDF_BYTES) {
    return NextResponse.json({ error: "PDF must be under 15MB." }, { status: 400 });
  }
  if (typeof clientName !== "string" || !clientName.trim()) {
    return NextResponse.json({ error: "Client name is required." }, { status: 400 });
  }

  const label = formData.get("label");
  const amount = formData.get("amount");
  const note = formData.get("note");

  const record = await createInvoice({
    clientName: clientName.trim(),
    label: typeof label === "string" && label.trim() ? label.trim() : undefined,
    amount: typeof amount === "string" && amount.trim() ? amount.trim() : undefined,
    note: typeof note === "string" && note.trim() ? note.trim() : undefined,
    file,
  });

  return NextResponse.json({ invoice: record }, { status: 201 });
}
