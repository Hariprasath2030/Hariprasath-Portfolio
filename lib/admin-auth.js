import "server-only";

import { createAuthClient, isSupabaseConfigured } from "./supabase/server";

export async function getAdminSession() {
  if (!isSupabaseConfigured()) {
    return { configured: false, user: null, isAdmin: false };
  }

  const supabase = await createAuthClient();
  const { data, error } = await supabase.auth.getUser();
  const user = error ? null : data.user;
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  return {
    configured: true,
    user,
    isAdmin: Boolean(
      user?.email && configuredEmail && user.email.toLowerCase() === configuredEmail,
    ),
  };
}

export function isOwnerEmail(email) {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(email && allowedEmail && email.trim().toLowerCase() === allowedEmail);
}
