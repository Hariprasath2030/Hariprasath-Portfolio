import { redirect } from "next/navigation";
import Link from "next/link";
import PortfolioEditor from "../components/admin/PortfolioEditor";
import { getAdminSession } from "../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function AdminSetupNotice() {
  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <p className="admin-eyebrow">ADMIN SETUP REQUIRED</p>
        <h1>Connect the portfolio services</h1>
        <p className="admin-auth-description">
          Add the Supabase project URL, anon key, service-role key, and owner email,
          the one-time admin setup token, and the AWS S3 bucket settings. Then apply
          the SQL schema and seed the starter content.
        </p>
        <Link className="button button-primary admin-submit" href="/admin/login">Continue to admin sign in</Link>
        <Link className="admin-back-link" href="/">Back to portfolio</Link>
      </section>
    </main>
  );
}

export default async function AdminPage() {
  let session;
  try {
    session = await getAdminSession();
  } catch {
    return <AdminSetupNotice />;
  }

  if (!session.configured) return <AdminSetupNotice />;
  if (!session.isAdmin) redirect("/admin/login");
  return <PortfolioEditor email={session.user.email} />;
}
