import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { WeddingData } from "../context/WebsiteContext";

export async function loadContent(siteId: string): Promise<WeddingData | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("site_id", siteId)
    .single();

  if (error || !data) {
    return null;
  }

  return (data.data as WeddingData) ?? null;
}
