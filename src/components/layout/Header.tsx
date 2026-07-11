import { getCmsPage } from "@/lib/portal";
import { HeaderClient, type NavLink } from "./HeaderClient";

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Игровая студия", href: "/game-studio" },
  { label: "Кодэкс", href: "/kodeks" },
  { label: "ТехноЛаб", href: "/technolab" },
  { label: "Направления", href: "/napravleniya-razrabotki" },
  { label: "Мероприятия", href: "/aktivnosti" },
  { label: "Блог", href: "/blog" },
  { label: "О нас", href: "/o-nas" },
];

const DEFAULT_CTA_LABEL = "Пробный урок";
const DEFAULT_CTA_HREF = "/besplatnyj-probnyj-urok";

export async function Header() {
  const cms = await getCmsPage("header") as Record<string, unknown>;

  const navLinks =
    Array.isArray(cms.nav_links) && cms.nav_links.length > 0
      ? (cms.nav_links as NavLink[])
      : DEFAULT_NAV_LINKS;

  const ctaLabel =
    typeof cms.cta_label === "string" && cms.cta_label.trim()
      ? cms.cta_label.trim()
      : DEFAULT_CTA_LABEL;

  const ctaHref =
    typeof cms.cta_href === "string" && cms.cta_href.trim()
      ? cms.cta_href.trim()
      : DEFAULT_CTA_HREF;

  return <HeaderClient navLinks={navLinks} ctaLabel={ctaLabel} ctaHref={ctaHref} />;
}
