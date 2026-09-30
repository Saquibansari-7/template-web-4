export interface SiteRow {
  id: string;
  subdomain: string;
  data?: Record<string, unknown> | null;
  [key: string]: unknown;
}

const MAIN_APP_API = (import.meta.env.VITE_MAIN_APP_API_URL || "https://weddappvows.vercel.app").replace(/\/+$/, "");

export async function resolveSite(
  customerSubdomain: string,
): Promise<SiteRow | null> {
  let customer = (customerSubdomain || "").trim().toLowerCase();
  if (!customer) return null;

  customer = customer.replace(/\/+$/, "");

  if (!/^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/.test(customer)) {
    console.warn("[siteResolver] invalid subdomain format:", customer);
    return null;
  }

  try {
    const res = await fetch(`${MAIN_APP_API}/api/site/lookup?customer=${encodeURIComponent(customer)}`);

    if (!res.ok) {
      console.error("[siteResolver] HTTP", res.status);
      return null;
    }

    const site = (await res.json()) as SiteRow;
    console.log("[siteResolver] site found:", site?.subdomain);
    return site ?? null;
  } catch (err) {
    console.error("[siteResolver] fetch failed:", err);
    return null;
  }
}
