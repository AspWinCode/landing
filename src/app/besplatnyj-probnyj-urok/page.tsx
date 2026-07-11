import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrialForm } from "@/components/forms/TrialForm";
import { CheckCircle, Clock, ChatTeardropText, Medal } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("besplatnyj-probnyj-urok") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Бесплатный пробный урок — TirSkix Academy",
    description:
      "Запишитесь на бесплатный пробный урок по программированию для ребёнка 10–18 лет. Ответим в течение часа. Без обязательств.",
    canonical: "https://tirskix-academy.com/besplatnyj-probnyj-urok",
  });
}

const BENEFITS = [
  { icon: CheckCircle, text: "Урок бесплатно — без условий и скрытых платежей" },
  { icon: Clock, text: "Ответим в течение часа и согласуем удобное время" },
  { icon: ChatTeardropText, text: "Ментор оценит уровень ребёнка и порекомендует трек" },
  { icon: Medal, text: "Без обязательств — понравится, продолжим" },
];

const STATS = [
  { value: "4 года", label: "средний срок обучения ученика" },
  { value: "19/21", label: "ОГЭ с нуля за 6 месяцев" },
  { value: "2 БВИ", label: "в вузы у одной ученицы" },
  { value: "< 1 часа", label: "время ответа на заявку" },
];

const FAQ = [
  {
    q: "Это действительно бесплатно?",
    a: "Да, без условий. Первое занятие мы проводим бесплатно, чтобы вы и ребёнок смогли оценить формат, ментора и программу. Никаких скрытых платежей или обязательств продолжать.",
  },
  {
    q: "Какой возраст подходит?",
    a: "Принимаем детей от 10 до 18 лет. У нас три трека для разных возрастов и уровней: Игровая студия (10–12), Кодэкс (12–15), ТехноЛаб (14–18). Если не уверены — укажите в форме, подберём сами.",
  },
  {
    q: "Нужен ли опыт программирования?",
    a: "Нет. Игровая студия и Кодэкс рассчитаны на старт с нуля. ТехноЛаб требует базовый Python — уточним на вводном занятии.",
  },
  {
    q: "Как проходит урок онлайн?",
    a: "В Zoom или аналоге. Ментор видит экран ребёнка, объясняет, помогает в реальном времени. Нужен только компьютер или ноутбук — планшет/телефон не подойдут.",
  },
];

export default async function TrialPage() {
  const cms = await getCmsPage('besplatnyj-probnyj-urok');
  const benefits = Array.isArray(cms.benefits) && cms.benefits.length > 0 ? cms.benefits as typeof BENEFITS : BENEFITS;
  const stats = Array.isArray(cms.stats) && cms.stats.length > 0 ? cms.stats as typeof STATS : STATS;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
  return (
    <>
      <Header />
      <main>
        {/* ── Hero + Form ── */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>

          <div className="container relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Пробный урок</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-brand)] mb-6">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-track-studio)] animate-pulse" />
                  Набор открыт · Места есть
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
                  Первый урок —<br />
                  <span className="text-[var(--color-brand)]">бесплатно</span>
                </h1>

                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
                  Оставьте заявку — мы свяжемся, узнаем о ребёнке и подберём подходящий трек.
                  Первое занятие проведём бесплатно, чтобы вы убедились сами.
                </p>

                <ul className="space-y-4 mb-10">
                  {benefits.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon size={20} weight="fill" className="text-[var(--color-brand)] shrink-0 mt-0.5" />
                      <span className="text-[var(--color-text-secondary)] text-sm">{text}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats strip */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-[var(--color-bg-subtle)] rounded-2xl p-4 border border-[var(--color-border)]">
                      <div className="text-2xl font-extrabold text-[var(--color-brand)] mb-0.5">{s.value}</div>
                      <div className="text-xs text-[var(--color-text-muted)] leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form card */}
              <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] p-8 lg:sticky lg:top-24">
                <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">
                  Записаться на пробный урок
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  Заполните форму — ответим в течение часа
                </p>
                <TrialForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Как это работает ── */}
        <section className="py-16 md:py-20 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Как проходит пробный урок
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Оставляете заявку",
                  desc: "Заполняете форму — имя и контакт. Опционально: возраст ребёнка и интересующий трек.",
                },
                {
                  step: "02",
                  title: "Мы связываемся",
                  desc: "В течение часа менеджер звонит или пишет, уточняет детали и согласовывает удобное время.",
                },
                {
                  step: "03",
                  title: "Пробный урок",
                  desc: "45 минут онлайн с ментором. Ребёнок знакомится с форматом, создаёт что-то своими руками, задаёт вопросы.",
                },
                {
                  step: "04",
                  title: "Рекомендация",
                  desc: "После урока ментор даёт рекомендацию по треку и рассказывает о следующих шагах. Без давления.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)] mb-1">{item.title}</div>
                    <div className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="text-[var(--color-brand)] shrink-0 transition-transform group-open:rotate-45 text-lg font-light">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
