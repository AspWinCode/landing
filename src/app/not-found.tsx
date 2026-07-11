import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  const LINKS = [
    { href: "/programmirovanie-dlya-detej", label: "Курсы программирования" },
    { href: "/besplatnyj-probnyj-urok", label: "Пробный урок" },
    { href: "/faq", label: "Частые вопросы" },
    { href: "/kontakty", label: "Контакты" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center">
        <div className="container max-w-xl text-center py-24">
          {/* Big 404 */}
          <div className="relative mb-8 select-none flex items-center justify-center" style={{ height: "160px" }}>
            <span className="text-[140px] md:text-[160px] font-extrabold leading-none text-[var(--color-bg-subtle)] tracking-tighter">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-5xl drop-shadow-sm">🔍</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-3">
            Страница не найдена
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            Похоже, эта улика ведёт в никуда. Может, страница переехала
            или ссылка была неправильной.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/" className={buttonClass("primary", "md", "group inline-flex")}>
              На главную
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/kontakty" className={buttonClass("outline", "md")}>
              Написать нам
            </Link>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">Или перейдите в один из разделов:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-surface-raised)] border border-[var(--color-border)] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
