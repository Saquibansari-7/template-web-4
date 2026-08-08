import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { WeddingData } from "../context/WebsiteContext";

export async function saveContent(siteId: string, data: WeddingData) {
  if (!isSupabaseConfigured()) {
    const err = new Error("Supabase not configured - check your .env file");
    console.error("saveContent - error:", err);
    return { error: err };
  }

  const result = await supabase
    .from("site_content")
    .upsert({
      site_id: siteId,
      data,
      updated_at: new Date().toISOString(),
    });

  return result;
}
