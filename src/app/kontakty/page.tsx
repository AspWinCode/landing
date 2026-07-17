import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Envelope, MessengerLogo } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("kontakty") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Контакты — TirSkix Academy",
    description:
      "Свяжитесь с TirSkix Academy: Telegram, e-mail или форма обратной связи. Ответим в течение часа.",
    canonical: "https://tirskix-academy.com/kontakty",
  });
}

const CHANNELS = [
  {
    icon: MessengerLogo,
    title: "Telegram",
    desc: "Самый быстрый способ. Отвечаем обычно за 15–30 минут.",
    href: "https://t.me/tirskix_academy",
    label: "@tirskix_academy",
    color: "var(--color-track-technolab)",
  },
  {
    icon: Envelope,
    title: "E-mail",
    desc: "Для официальных вопросов и документов.",
    href: "mailto:hello@tirskix-academy.com",
    label: "hello@tirskix-academy.com",
    color: "var(--color-brand)",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Контакты</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Свяжитесь с нами
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Ответим в течение часа в рабочее время. Или напишите в форме — менеджер свяжется сам.
            </p>
          </div>
        </section>

        {/* Каналы + Форма */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto items-start">
              {/* Каналы */}
              <div>
                <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-6">Как связаться</h2>
                <div className="space-y-4 mb-8">
                  {CHANNELS.map(({ icon: Icon, title, desc, href, label, color }) => (
                    <a
                      key={title}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-5 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                      >
                        <Icon size={20} weight="fill" style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[var(--color-text-primary)] mb-0.5 group-hover:text-[var(--color-brand)] transition-colors">
                          {title}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">{desc}</div>
                        <div className="text-sm font-medium truncate" style={{ color }}>{label}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="bg-[var(--color-bg-subtle)] rounded-2xl p-5 border border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-sm">Рабочие часы</h3>
                  <div className="text-sm text-[var(--color-text-muted)] space-y-2">
                    <div className="flex justify-between gap-4">
                      <span>Пн–Пт</span>
                      <span className="font-medium text-[var(--color-text-primary)]">10:00 – 21:00 МСК</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Сб–Вс</span>
                      <span className="font-medium text-[var(--color-text-primary)]">11:00 – 19:00 МСК</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Форма */}
              <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] p-8">
                <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">Напишите нам</h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">Ответим в течение часа</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Доп. CTA */}
        <section className="py-12 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <div className="container max-w-xl text-center">
            <p className="text-[var(--color-text-secondary)] mb-4">Хотите сразу записать ребёнка?</p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "md", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
