import type { Metadata } from "next";

interface SeoDefaults {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
}

/**
 * Builds Next.js Metadata by merging CMS seo fields with static defaults.
 * CMS fields take priority when non-empty.
 */
export function buildPageMetadata(
  cms: Record<string, unknown>,
  defaults: SeoDefaults
): Metadata {
  const seo = (cms?.seo && typeof cms.seo === "object" ? cms.seo : {}) as Record<string, unknown>;

  const title =
    typeof seo.meta_title === "string" && seo.meta_title.trim()
      ? seo.meta_title.trim()
      : defaults.title;

  const description =
    typeof seo.meta_description === "string" && seo.meta_description.trim()
      ? seo.meta_description.trim()
      : defaults.description;

  const keywords: string[] | undefined =
    typeof seo.keywords === "string" && seo.keywords.trim()
      ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : defaults.keywords;

  const ogImage =
    typeof seo.og_image === "string" && seo.og_image.trim()
      ? seo.og_image.trim()
      : undefined;

  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: defaults.canonical },
    openGraph: {
      title,
      description,
      url: defaults.canonical,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}
