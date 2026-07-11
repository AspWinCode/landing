import Link from "next/link";
import { TelegramLogo, YoutubeLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { getPortalSettings, getCmsPage } from "@/lib/portal";

function VkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.54h-1.63c-.62 0-.81-.49-1.92-1.63-1-.97-1.43-.97-1.67-.97-.34 0-.44.1-.44.57v1.48c0 .41-.13.65-1.22.65-1.8 0-3.8-1.1-5.2-3.14-2.12-2.98-2.7-5.22-2.7-5.67 0-.24.1-.46.57-.46h1.63c.43 0 .59.19.75.65.83 2.38 2.22 4.47 2.79 4.47.22 0 .32-.1.32-.65V9.04c-.07-1.17-.68-1.27-.68-1.68 0-.2.16-.4.42-.4h2.56c.36 0 .49.19.49.62v3.32c0 .36.16.49.27.49.22 0 .4-.13.8-.54 1.24-1.39 2.13-3.53 2.13-3.53.12-.24.32-.46.75-.46h1.63c.49 0 .6.25.49.62-.21 1-.2.96-1.97 3.29-.16.22-.22.32 0 .57.16.19.68.68 1.03 1.09.64.73 1.13 1.35 1.26 1.78.14.43-.08.65-.57.65z"/>
    </svg>
  );
}

interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Треки",
    links: [
      { label: "Игровая студия", href: "/game-studio" },
      { label: "Кодэкс", href: "/kodeks" },
      { label: "ТехноЛаб", href: "/technolab" },
    ],
  },
  {
    title: "Продукты",
    links: [
      { label: "Направления разработки", href: "/napravleniya-razrabotki" },
      { label: "Подготовка к ОГЭ", href: "/podgotovka-k-oge-po-informatike" },
      { label: "Подготовка к ЕГЭ", href: "/podgotovka-k-ege-po-informatike" },
      { label: "Frontend-разработка", href: "/frontend-razrabotka" },
      { label: "Backend-разработка", href: "/backend-razrabotka" },
      { label: "Индивидуальные занятия", href: "/individualnye-zanyatiya" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/o-nas" },
      { label: "Достижения учеников", href: "/dostizheniya-uchenikov" },
      { label: "Блог", href: "/blog" },
      { label: "Мероприятия", href: "/aktivnosti" },
      { label: "Контакты", href: "/kontakty" },
    ],
  },
];

const DEFAULT_TAGLINE = "Онлайн-школа программирования для детей 10–18 лет. Три мира — один путь в IT.";
const DEFAULT_COPYRIGHT = "TirSkix Academy. Все права защищены.";

const LEGAL: FooterLink[] = [
  { label: "Оферта", href: "/legal/oferta" },
  { label: "Политика конфиденциальности", href: "/legal/privacy" },
  { label: "Пользовательское соглашение", href: "/legal/terms" },
];

export async function Footer() {
  const [settings, cms] = await Promise.all([
    getPortalSettings(),
    getCmsPage("footer") as Promise<Record<string, unknown>>,
  ]);

  const year = new Date().getFullYear();

  const tagline =
    typeof cms.tagline === "string" && cms.tagline.trim()
      ? cms.tagline.trim()
      : DEFAULT_TAGLINE;

  const copyright =
    typeof cms.copyright === "string" && cms.copyright.trim()
      ? cms.copyright.trim()
      : DEFAULT_COPYRIGHT;

  const columns: FooterColumn[] =
    Array.isArray(cms.columns) && cms.columns.length > 0
      ? (cms.columns as FooterColumn[])
      : DEFAULT_COLUMNS;

  const tgUrl = settings.tg_url || "https://t.me/tirskix_academy";
  const vkUrl = settings.vk_url || "https://vk.com/tirskix_academy";
  const instUrl = settings.inst_url;

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="container py-12 md:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <span className="font-heading font-bold text-base text-[var(--color-text-primary)]">
                TirSkix Academy
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-2">
              {tagline}
            </p>
            {settings.contact_phone && (
              <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors mb-1">
                {settings.contact_phone}
              </a>
            )}
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors mb-4">
                {settings.contact_email}
              </a>
            )}
            <div className="flex items-center gap-3">
              <a href={tgUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-muted)] transition-colors"
                aria-label="Telegram">
                <TelegramLogo size={18} weight="fill" />
              </a>
              <a href={vkUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-muted)] transition-colors"
                aria-label="ВКонтакте">
                <VkIcon size={18} />
              </a>
              {instUrl && (
                <a href={instUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-muted)] transition-colors"
                  aria-label="Instagram">
                  <InstagramLogo size={18} weight="fill" />
                </a>
              )}
            </div>
          </div>

          {/* Nav columns from CMS */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© {year} {copyright}</p>
          <div className="flex gap-4">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--color-brand)] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
