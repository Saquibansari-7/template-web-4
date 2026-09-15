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

export function mergeDeep<T>(target: T, source: Record<string, unknown>): T {
  if (!source || typeof source !== "object") return target;

  const result = { ...(target as Record<string, unknown>) };

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

    const sourceVal = source[key];
    const targetVal = (result as Record<string, unknown>)[key];

    if (
      sourceVal &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      (result as Record<string, unknown>)[key] = mergeDeep(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (Array.isArray(sourceVal) && sourceVal.length > 0) {
      (result as Record<string, unknown>)[key] = sourceVal;
    } else if (sourceVal !== undefined && sourceVal !== null) {
      (result as Record<string, unknown>)[key] = sourceVal;
    }
  }

  return result as T;
}

export async function loadContentByCustomer(customer: string, defaults: WeddingData) {
  const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL?.trim();
  const key = import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return null;

  const { resolveSite } = await import("../lib/siteResolver");
  const site = await resolveSite(customer, url, key);
  if (!site || !site.data) return null;

  const merged = mergeDeep(defaults, site.data as Record<string, unknown>);
  return { site, content: merged };
}
