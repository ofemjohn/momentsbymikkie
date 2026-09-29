import { listInvoices } from "@/lib/invoices";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const invoices = await listInvoices();
  return <AdminDashboard initialInvoices={invoices} />;
}
