import { NextResponse } from "next/server";
import { deleteInvoice } from "@/lib/invoices";

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await deleteInvoice(slug);
  return NextResponse.json({ ok: true });
}
