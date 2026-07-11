const PORTAL_API = process.env.PORTAL_API_URL ?? "https://tirskix.space";

export interface PortalCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PortalPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  category: PortalCategory | null;
}

export interface PortalPostDetail extends PortalPostSummary {
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical: string | null;
}

export interface PortalSettings {
  site_title: string | null;
  site_description: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  vk_url: string | null;
  tg_url: string | null;
  inst_url: string | null;
  ga_measurement_id: string | null;
  ym_counter_id: string | null;
  vk_pixel_id: string | null;
}

async function portalFetch<T>(path: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(`${PORTAL_API}${path}`, {
      next: { revalidate },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getPortalPosts(): Promise<PortalPostSummary[]> {
  const data = await portalFetch<PortalPostSummary[]>("/api/v1/public/blog/posts?limit=100");
  return data ?? [];
}

export async function getPortalPost(slug: string): Promise<PortalPostDetail | null> {
  return portalFetch<PortalPostDetail>(`/api/v1/public/blog/posts/${slug}`);
}

const EMPTY_SETTINGS: PortalSettings = {
  site_title: null, site_description: null, contact_phone: null,
  contact_email: null, vk_url: null, tg_url: null, inst_url: null,
  ga_measurement_id: null, ym_counter_id: null, vk_pixel_id: null,
};

export async function getPortalSettings(): Promise<PortalSettings> {
  const data = await portalFetch<PortalSettings>("/api/v1/public/site-settings");
  return data ?? EMPTY_SETTINGS;
}
