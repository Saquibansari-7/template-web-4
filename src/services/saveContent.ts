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

export async function saveContentToSite(siteId: string, data: WeddingData) {
  const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL?.trim();
  const key = import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    const err = new Error("Supabase not configured - check your .env file");
    console.error("saveContentToSite - error:", err);
    return { error: err };
  }

  try {
    const res = await fetch(`${url}/rest/v1/sites?id=eq.${encodeURIComponent(siteId)}`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ data, updated_at: new Date().toISOString() }),
    });

    if (!res.ok) {
      const err = new Error(`[saveContentToSite] HTTP ${res.status}`);
      console.error("saveContentToSite - error:", err);
      return { error: err };
    }

    return { data: null };
  } catch (err) {
    console.error("saveContentToSite - error:", err);
    return { error: err };
  }
}
