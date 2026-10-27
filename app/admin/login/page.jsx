import AdminAuthForm from "../../components/admin/AdminAuthForm";
import { getAdminSession } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLoginPage() {
  let configured = false;
  let isAdmin = false;
  try {
    const session = await getAdminSession();
    configured = session.configured;
    isAdmin = session.isAdmin;
  } catch {
    configured = false;
  }

  if (isAdmin) redirect("/admin");
  return <AdminAuthForm configured={configured} />;
}
