import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("legal-terms") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Пользовательское соглашение — TirSkix Academy",
    description: "Пользовательское соглашение TirSkix Academy — условия использования сайта.",
    canonical: "https://tirskix-academy.com/legal/terms/",
  });
}

const DEFAULT_HEADING = "Пользовательское соглашение";
const DEFAULT_DATE = "Актуально с 1 января 2025 года";

const DEFAULT_SECTIONS = [
  { h2: "1. Общие положения", content: "Настоящее Пользовательское соглашение регулирует отношения между TirSkix Academy и пользователями сайта tirskix-academy.com. Используя сайт, вы принимаете условия соглашения." },
  { h2: "2. Предмет соглашения", content: "TirSkix Academy предоставляет пользователям информацию об образовательных услугах и возможность оставить заявку на обучение. Образовательные услуги оказываются на основании отдельного договора-оферты." },
  { h2: "3. Права и обязанности пользователя", content: "Пользователь обязуется:\n— Предоставлять достоверную информацию при заполнении форм\n— Не использовать сайт в целях, противоречащих законодательству РФ\n— Не нарушать права интеллектуальной собственности" },
  { h2: "4. Интеллектуальная собственность", content: "Все материалы сайта (тексты, изображения, дизайн) являются интеллектуальной собственностью TirSkix Academy. Копирование без разрешения запрещено." },
  { h2: "5. Ограничение ответственности", content: "TirSkix Academy не несёт ответственности за перебои в работе сайта, вызванные техническими причинами, а также за содержание внешних ресурсов, ссылки на которые могут присутствовать на сайте." },
  { h2: "6. Изменение соглашения", content: "TirSkix Academy вправе изменять условия соглашения без предварительного уведомления. Актуальная версия всегда доступна на этой странице." },
  { h2: "7. Контакты", content: "По вопросам, связанным с соглашением: hello@tirskix-academy.com" },
];

export default async function TermsPage() {
  const cms = await getCmsPage("legal-terms");

  const heading = typeof cms.heading === "string" && cms.heading ? cms.heading : DEFAULT_HEADING;
  const effectiveDate = typeof cms.effective_date === "string" && cms.effective_date ? cms.effective_date : DEFAULT_DATE;
  const sections = Array.isArray(cms.sections) && cms.sections.length > 0
    ? (cms.sections as { h2: string; content: string }[])
    : DEFAULT_SECTIONS;

  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[var(--color-brand)] font-medium">Пользовательское соглашение</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            {heading}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">{effectiveDate}</p>

          <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mb-3">
            {sections.map((sec, i) => (
              <section key={i}>
                {sec.h2 && <h2>{sec.h2}</h2>}
                {sec.content && (
                  <p style={{ whiteSpace: "pre-line" }}>{sec.content}</p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="text-sm text-[var(--color-brand)] hover:underline">Политика конфиденциальности →</Link>
            <Link href="/legal/oferta" className="text-sm text-[var(--color-brand)] hover:underline">Публичная оферта →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
