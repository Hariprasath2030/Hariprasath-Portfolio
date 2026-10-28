import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "../../../../lib/supabase/service";
import { createAuthClient } from "../../../../lib/supabase/server";
import { isOwnerEmail } from "../../../../lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: "Admin authentication is not configured yet." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const action = body?.action;
  const supabase = await createAuthClient();

  if (action === "logout") {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json({ error: "Could not sign out." }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isOwnerEmail(email)) {
    return NextResponse.json(
      { error: "Admin access is restricted to the configured owner email." },
      { status: 403 },
    );
  }

  if (!email || password.length < 12) {
    return NextResponse.json(
      { error: "Enter the owner email and a password with at least 12 characters." },
      { status: 400 },
    );
  }

  if (action === "signup") {
    const expectedToken = process.env.ADMIN_SETUP_TOKEN ?? "";
    const suppliedToken =
      typeof body?.setupToken === "string" && body.setupToken.length <= 512
        ? body.setupToken.trim()
        : "";
    const expectedBuffer = Buffer.from(expectedToken);
    const suppliedBuffer = Buffer.from(suppliedToken);
    const tokenMatches =
      expectedBuffer.length >= 32 &&
      expectedBuffer.length === suppliedBuffer.length &&
      timingSafeEqual(expectedBuffer, suppliedBuffer);

    if (!tokenMatches) {
      return NextResponse.json(
        { error: "The one-time owner setup token is missing or invalid." },
        { status: 403 },
      );
    }

    const serviceClient = createServiceClient();
    let existingUser = null;
    let lookupError = null;
    let page = 1;

    do {
      const { data, error } = await serviceClient.auth.admin.listUsers({
        page,
        perPage: 1000,
      });

      if (error) {
        lookupError = error;
        break;
      }

      existingUser =
        data.users.find(
          (user) => user.email?.toLowerCase() === email.toLowerCase(),
        ) ?? null;
      page = data.nextPage;
    } while (!existingUser && page !== null);

    if (lookupError) {
      return NextResponse.json(
        { error: "Could not check for an existing owner account." },
        { status: 502 },
      );
    }
    if (existingUser) {
      return NextResponse.json(
        { error: "The owner account already exists. Sign in instead." },
        { status: 409 },
      );
    }

    const { error: createError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      return NextResponse.json(
        { error: "Could not create the owner account. Check the Supabase Auth settings and try again." },
        { status: 400 },
      );
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      return NextResponse.json(
        { error: "Owner account created. Sign in with the email and password you entered." },
        { status: 201 },
      );
    }

    return NextResponse.json({ success: true, message: "Owner account created." });
  }

  if (action === "login") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json(
        { error: "The email or password could not be verified." },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unsupported authentication action." }, { status: 400 });
}
