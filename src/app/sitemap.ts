import type { MetadataRoute } from "next";
import { POSTS } from "@/app/blog/page";

const BASE = "https://tirskix-academy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/programmirovanie-dlya-detej/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/game-studio/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kodeks/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/technolab/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/besplatnyj-probnyj-urok/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/o-nas/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/podgotovka-k-oge-po-informatike/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/podgotovka-k-ege-po-informatike/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/individualnye-zanyatiya/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/frontend-razrabotka/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/backend-razrabotka/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/napravleniya-razrabotki/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/dostizheniya-uchenikov/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kontakty/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/aktivnosti/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/igrovye-dzhemy/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/python-dlya-detej/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/razrabotka-igr-na-python/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const blogPages: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
