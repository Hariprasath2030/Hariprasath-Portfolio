import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/admin-auth";
import { createServiceClient } from "../../../../lib/supabase/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorize() {
  const session = await getAdminSession();
  if (!session.configured) {
    return { response: NextResponse.json({ error: "Admin is not configured." }, { status: 503 }) };
  }
  if (!session.isAdmin) {
    return { response: NextResponse.json({ error: "Not authorized." }, { status: 401 }) };
  }
  return { response: null };
}

function contentDatabaseError(operation, error) {
  console.error(`Could not ${operation} portfolio content.`, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });

  if (error.code === "42P01" || error.code === "PGRST205") {
    return NextResponse.json(
      { error: "The portfolio_content table is missing. Apply supabase/schema.sql in the Supabase SQL Editor." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { error: `Could not ${operation} portfolio content.` },
    { status: 500 },
  );
}

export async function GET() {
  const { response } = await authorize();
  if (response) return response;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("portfolio_content")
    .select("content, updated_at")
    .eq("id", "primary")
    .maybeSingle();

  if (error) {
    return contentDatabaseError("read", error);
  }
  if (!data) {
    return NextResponse.json(
      { error: "Portfolio content has not been initialized. Follow the setup guide and run npm run seed:portfolio." },
      { status: 404 },
    );
  }

  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request) {
  const { response } = await authorize();
  if (response) return response;

  const raw = await request.text();
  if (raw.length > 1_000_000) {
    return NextResponse.json({ error: "The content document is too large." }, { status: 413 });
  }

  let content;
  try {
    content = JSON.parse(raw)?.content;
  } catch {
    return NextResponse.json({ error: "The content document is invalid." }, { status: 400 });
  }

  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content) ||
    !content.settings ||
    !content.hero ||
    !content.projects ||
    !content.navigation
  ) {
    return NextResponse.json({ error: "Required portfolio sections are missing." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("portfolio_content").upsert(
    {
      id: "primary",
      content,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    return contentDatabaseError("save", error);
  }

  return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
}
