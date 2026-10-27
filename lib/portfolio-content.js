import "server-only";

import { cache } from "react";
import { createServiceClient } from "./supabase/service";

export const getPortfolioContent = cache(async function getPortfolioContent() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("portfolio_content")
    .select("content, updated_at")
    .eq("id", "primary")
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load portfolio content: ${error.message}`);
  }

  return data?.content ?? null;
});
