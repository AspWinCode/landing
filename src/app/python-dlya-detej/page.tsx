import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Python для детей онлайн — TirSkix Academy" },
  description:
    "Обучение Python для детей 10–18 лет онлайн. Учим через детективные истории и реальные проекты — не через скучные учебники. Первый урок бесплатно.",
  alternates: { canonical: "https://tirskix-academy.com/python-dlya-detej/" },
  keywords: ["Python для детей", "изучить Python ребёнку", "курс Python для школьников", "Python онлайн дети"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Python для детей",
  description: "Обучение Python для детей 10–18 лет через детективные истории и реальные проекты",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy" },
  educationalLevel: "10–18 лет",
  teaches: "Python, основы программирования, Data Science, алгоритмы",
};

const WHY = [
  { emoji: "🔍", title: "Через истории", desc: "Дети не учат синтаксис — они расследуют детективные дела на Python. Мотивация держится сама." },
  { emoji: "💻", title: "Реальный код", desc: "С первого урока пишем настоящий код — не блоки, не скретч, а Python-программы." },
  { emoji: "📈", title: "Практический результат", desc: "После курса — уверенный Python, понимание алгоритмов и готовность к ОГЭ/ЕГЭ." },
  { emoji: "👨‍💻", title: "Живые менторы", desc: "Каждый ментор — практикующий разработчик. Не методист, а человек из IT." },
];

const WHAT_LEARN = [
  "Синтаксис Python: переменные, типы данных, ввод-вывод",
  "Условия, циклы, функции — на реальных задачах",
  "Списки, словари, работа со строками",
  "Написание программ по условию (уровень ОГЭ)",
  "Основы Data Science: numpy, pandas, визуализация",
  "Алгоритмическое мышление — как разбивать задачу на шаги",
];

const TRACKS_PYTHON = [
  {
    title: "Кодэкс",
    age: "12–15 лет",
    desc: "Python через детективный нарратив. Для тех, кто хочет начать с нуля и дойти до Data Science.",
    href: "/kodeks",
    color: "var(--color-track-kodeks)",
  },
  {
    title: "ТехноЛаб",
    age: "14–18 лет",
    desc: "Python на уровне олимпиад и ЕГЭ. ООП, алгоритмы, математика.",
    href: "/technolab",
    color: "var(--color-track-technolab)",
  },
  {
    title: "Подготовка к ОГЭ",
    age: "8–9 класс",
    desc: "Python в контексте заданий ОГЭ — 2 часть на 100%.",
    href: "/podgotovka-k-oge-po-informatike",
    color: "var(--color-track-kodeks)",
  },
];

const FAQ = [
  { q: "С какого возраста можно учить Python?", a: "С 12 лет. До 12 рекомендуем начать с визуального программирования — трек Игровая студия на Snap! и GDevelop. К 12 годам дети готовы к текстовому синтаксису Python." },
  { q: "Нужен ли опыт программирования?", a: "Нет. Кодэкс начинается с абсолютного нуля. ТехноЛаб предполагает базу — если её нет, начнём с Кодэкса." },
  { q: "Сколько времени занимает освоение Python?", a: "Базовый уровень (переменные, циклы, функции) — 3–4 месяца при 2 занятиях в неделю. Уровень ОГЭ — 6 месяцев. Уверенный уровень с Data Science — 1–1,5 года." },
  { q: "Какую версию Python учим?", a: "Python 3 — актуальная версия, которая используется в реальных проектах, олимпиадах и на ОГЭ/ЕГЭ." },
];

export default async function PythonForKidsPage() {
  const cms = await getCmsPage('python-dlya-detej');
  const why = Array.isArray(cms.why) && cms.why.length > 0 ? cms.why as typeof WHY : WHY;
  const whatLearn = Array.isArray(cms.what_learn) && cms.what_learn.length > 0 ? cms.what_learn as typeof WHAT_LEARN : WHAT_LEARN;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--color-track-kodeks-light)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Python для детей</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium mb-6" style={{ color: "var(--color-track-kodeks)" }}>
              12–18 лет · С нуля
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Python для детей —<br />
              <span style={{ color: "var(--color-track-kodeks)" }}>онлайн, с живым ментором</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Учим Python не по учебнику, а через реальные задачи и истории.
              Дети пишут детективные программы, анализируют данные и решают олимпиадные задачи.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
                Первый урок бесплатно
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/kodeks" className={buttonClass("outline", "lg")}>
                Трек Кодэкс
              </Link>
            </div>
          </div>
        </section>

        {/* Почему TirSkix */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">Почему у нас учатся Python</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {why.map((w) => (
                <div key={w.title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="text-3xl mb-3">{w.emoji}</div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{w.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что изучим */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">Что изучит ребёнок</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {whatLearn.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                  <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5" style={{ color: "var(--color-track-kodeks)" }} />
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Треки с Python */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">Треки с Python</h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-xl mx-auto">
              Python используется в трёх направлениях — выбирайте по возрасту и цели.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {TRACKS_PYTHON.map((t) => (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col"
                >
                  <div className="text-xs font-bold mb-1" style={{ color: t.color }}>{t.age}</div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2 text-lg">{t.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1 mb-4">{t.desc}</p>
                  <span className="text-sm font-semibold group-hover:underline" style={{ color: t.color }}>
                    Подробнее →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">Вопросы о Python</h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="shrink-0 transition-transform group-open:rotate-45 text-xl font-light leading-none" style={{ color: "var(--color-track-kodeks)" }}>+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Начнём с Python?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Первый урок бесплатно — ментор познакомится с ребёнком и определит стартовый уровень.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться бесплатно
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
