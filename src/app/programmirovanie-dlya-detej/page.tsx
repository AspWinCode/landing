import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, CaretDown } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: { absolute: "Курсы программирования для детей онлайн — TirSkix Academy" },
  description:
    "Онлайн-курсы программирования для детей 10–18 лет. Три трека: Игровая студия (Snap/GDevelop), Кодэкс (Python), ТехноЛаб (алгоритмы). Реальные результаты: БВИ, ОГЭ 19/21. Пробный урок бесплатно.",
  keywords: [
    "курсы программирования для детей",
    "онлайн школа программирования для детей",
    "программирование для детей онлайн",
    "обучение программированию для школьников",
    "курсы программирования для школьников",
  ],
  alternates: { canonical: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  openGraph: {
    title: "Курсы программирования для детей онлайн — TirSkix Academy",
    description: "Онлайн-курсы программирования для детей 10–18 лет. Три трека, реальные результаты. Пробный урок бесплатно.",
    url: "https://tirskix-academy.com/programmirovanie-dlya-detej/",
  },
};

// JSON-LD: EducationalOrganization + FAQPage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      name: "TirSkix Academy",
      url: "https://tirskix-academy.com",
      description: "Онлайн-школа программирования для детей 10–18 лет",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Курсы программирования",
        itemListElement: [
          { "@type": "Course", name: "Игровая студия", description: "Создание игр на Snap и GDevelop для детей 10–12 лет", url: "https://tirskix-academy.com/game-studio" },
          { "@type": "Course", name: "Кодэкс", description: "Python через детективные дела для детей 12–15 лет", url: "https://tirskix-academy.com/kodeks" },
          { "@type": "Course", name: "ТехноЛаб", description: "Python, алгоритмы, ООП для подростков 14–18 лет", url: "https://tirskix-academy.com/technolab" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "С какого возраста можно начать учиться программированию?", acceptedAnswer: { "@type": "Answer", text: "В TirSkix Academy принимаем детей от 10 лет. Игровая студия — идеальный старт для детей 10–12 лет без опыта." } },
        { "@type": "Question", name: "Какой язык программирования лучше для ребёнка?", acceptedAnswer: { "@type": "Answer", text: "Для детей 10–12 лет — визуальное программирование (Snap, GDevelop). Для 12–15 лет — Python. Для 14–18 с целью олимпиад — Python с алгоритмами." } },
        { "@type": "Question", name: "Сколько стоят курсы программирования для детей?", acceptedAnswer: { "@type": "Answer", text: "От 4 200 ₽ в месяц при занятиях 2 раза в неделю. Первый урок — бесплатно." } },
        { "@type": "Question", name: "Можно ли заниматься онлайн?", acceptedAnswer: { "@type": "Answer", text: "Все занятия проходят онлайн в Zoom с живым ментором. Нужен только компьютер или ноутбук." } },
      ],
    },
  ],
};

const TRACKS = [
  {
    href: "/game-studio",
    emoji: "🎮",
    title: "Игровая студия",
    age: "10–12 лет",
    tagline: "Открой свою игровую студию",
    desc: "Создаём игры в Snap и GDevelop. Без синтаксиса — только логика и творчество. Идеальный старт.",
    tools: ["Snap!", "GDevelop"],
    color: "var(--color-track-studio)",
    colorLight: "var(--color-track-studio-light)",
    bar: "bg-[var(--color-track-studio)]",
  },
  {
    href: "/kodeks",
    emoji: "🔍",
    title: "Кодэкс",
    age: "12–15 лет",
    tagline: "Стань цифровым следователем",
    desc: "Python через детективные расследования + Data Science модуль. Настоящий код, интересные задачи.",
    tools: ["Python", "numpy", "pandas"],
    color: "var(--color-track-kodeks)",
    colorLight: "var(--color-track-kodeks-light)",
    bar: "bg-[var(--color-track-kodeks)]",
  },
  {
    href: "/technolab",
    emoji: "⚙️",
    title: "ТехноЛаб",
    age: "14–18 лет",
    tagline: "Инженерные вызовы для тех, кто хочет большего",
    desc: "Python, алгоритмы, ООП, математика, Arcade. Уровень олимпиад и поступления в топ-вузы.",
    tools: ["Python", "Алгоритмы", "Arcade"],
    color: "var(--color-track-technolab)",
    colorLight: "var(--color-track-technolab-light)",
    bar: "bg-[var(--color-track-technolab)]",
  },
];

const OTHER_PRODUCTS = [
  { href: "/napravleniya-razrabotki", label: "Frontend и Backend-разработка", sub: "Путь в профессию" },
  { href: "/podgotovka-k-oge-po-informatike", label: "Подготовка к ОГЭ по информатике", sub: "Гарантированный результат" },
  { href: "/podgotovka-k-ege-po-informatike", label: "Подготовка к ЕГЭ по информатике", sub: "Высокий балл" },
  { href: "/individualnye-zanyatiya", label: "Индивидуальные занятия", sub: "Под вашу цель" },
];

const FAQ = [
  {
    q: "С какого возраста можно начать учиться программированию?",
    a: "В TirSkix Academy принимаем детей от 10 лет. Игровая студия — идеальный старт для детей 10–12 лет без какого-либо опыта. Визуальное программирование убирает барьер синтаксиса и позволяет сразу создавать игры.",
  },
  {
    q: "Какой язык программирования лучше для ребёнка?",
    a: "Для детей 10–12 лет — визуальное программирование (Snap!, GDevelop): развивает алгоритмическое мышление без синтаксиса. Для 12–15 лет — Python: универсальный, читаемый, применяется в Data Science и ИИ. Для 14–18 с целью олимпиад — Python с алгоритмами и математикой.",
  },
  {
    q: "Сколько стоят курсы программирования для детей онлайн?",
    a: "Групповые занятия от 4 200 ₽ в месяц (2 раза в неделю). Подготовка к ОГЭ/ЕГЭ — 5 200 ₽/мес. Индивидуальные занятия — 1 500 ₽/занятие. Первый урок в любом треке — бесплатно.",
  },
  {
    q: "Как проходят онлайн-занятия по программированию?",
    a: "В Zoom с живым ментором-практиком. Ментор видит экран ребёнка, объясняет, помогает в реальном времени. Занятие длится 45–60 минут. Нужен компьютер или ноутбук — планшет не подойдёт.",
  },
  {
    q: "Что получает ребёнок после курса?",
    a: "Реальные навыки: ученики Игровой студии выпускают игры, Кодэкса — пишут программы и работают с данными, ТехноЛаба — решают олимпиадные задачи и поступают в топ-вузы. Плюс сертификат об окончании и проекты в портфолио.",
  },
];

export default function ProgrammirovaniyaDlyaDetejPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Программирование для детей</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
                Курсы программирования<br />
                <span className="text-[var(--color-brand)]">для детей онлайн</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
                TirSkix Academy — онлайн-школа программирования для детей и подростков 10–18 лет.
                Три нарративных трека, живые менторы, реальные результаты.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group")}>
                  Записаться на пробный урок
                  <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="#treky" className={buttonClass("secondary", "lg")}>
                  Выбрать трек
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Summary «Коротко о главном» ── */}
        <section className="py-10 bg-[var(--color-bg-subtle)]" aria-label="Коротко о главном">
          <div className="container max-w-3xl">
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 md:p-8">
              <h2 className="text-lg font-extrabold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="text-[var(--color-brand)]">◆</span> Коротко о главном
              </h2>
              <ul className="space-y-3">
                {[
                  "Онлайн-школа TirSkix Academy обучает программированию детей от 10 до 18 лет.",
                  "Три трека по возрасту: Игровая студия (10–12, Snap/GDevelop), Кодэкс (12–15, Python+Data Science), ТехноЛаб (14–18, алгоритмы/ООП).",
                  "Формат: онлайн, 2 раза в неделю, живой ментор-практик, личный кабинет с прогрессом.",
                  "Результаты учеников: 2 БВИ в вузы, ОГЭ 19/21 с нуля, полуфинал ICPC, ЕГЭ 98 баллов.",
                  "Первый урок — бесплатно, без обязательств.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                    <CheckCircle size={16} weight="fill" className="text-[var(--color-brand)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Треки ── */}
        <section id="treky" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
                Выберите направление
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                Три нарративных трека — один путь от первой игры до олимпиад.
                Выберите по возрасту или уровню ребёнка.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {TRACKS.map((t) => (
                <article
                  key={t.href}
                  className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`h-1.5 ${t.bar}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: t.colorLight, color: t.color }}>
                        {t.age}
                      </span>
                      <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">{t.title}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: t.color }}>{t.tagline}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 flex-1">{t.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {t.tools.map((tool) => (
                        <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] font-medium">{tool}</span>
                      ))}
                    </div>
                    <Link
                      href={t.href}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 group-hover:opacity-90"
                      style={{ borderColor: t.color, color: t.color }}
                    >
                      Подробнее о треке
                      <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Other products */}
            <div className="bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-4">Также доступны</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {OTHER_PRODUCTS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group flex flex-col gap-1 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-card)] transition-all"
                  >
                    <span className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">{p.label}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{p.sub}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Почему TirSkix ── */}
        <section className="py-16 md:py-20 bg-[var(--color-bg-subtle)]">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Почему выбирают TirSkix Academy
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: "🎯", title: "Нарративный подход", desc: "Дети не учатся — они расследуют дела, строят студии, решают вызовы. Мотивация держится годами." },
                { emoji: "👨‍💻", title: "Менторы-практики", desc: "Только действующие разработчики. Не теория из учебника — реальный опыт из индустрии." },
                { emoji: "📊", title: "Прозрачный прогресс", desc: "Ежемесячная характеристика в личном кабинете. Родитель видит конкретные навыки, а не оценку «молодец»." },
                { emoji: "🔄", title: "Пропуск ≠ потеря", desc: "Пропустил занятие — отработаешь. Запись урока остаётся в кабинете. Ничего не потеряется." },
                { emoji: "🏆", title: "Реальные результаты", desc: "2 БВИ, 98 баллов ЕГЭ, полуфинал ICPC — не рекламные обещания, а истории реальных учеников." },
                { emoji: "💰", title: "Честные цены", desc: "От 4 200 ₽/мес — ниже большинства конкурентов. Первый урок всегда бесплатно." },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Тизер достижений ── */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Что достигают ученики
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Несколько фактов из нашей истории — полный список на отдельной странице.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { v: "2 БВИ", l: "без вступительных испытаний" },
                { v: "19/21", l: "ОГЭ с нуля за 6 месяцев" },
                { v: "98 б.", l: "лучший результат ЕГЭ" },
                { v: "ICPC", l: "полуфинал олимпиады" },
              ].map((s) => (
                <div key={s.v} className="bg-[var(--color-bg-subtle)] rounded-2xl p-5 border border-[var(--color-border)]">
                  <div className="text-2xl font-extrabold text-[var(--color-brand)] mb-1">{s.v}</div>
                  <div className="text-xs text-[var(--color-text-muted)] leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/dostizheniya-uchenikov" className={buttonClass("outline", "md")}>
              Все достижения учеников →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <CaretDown size={18} weight="bold" className="shrink-0 text-[var(--color-brand)] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Начните с бесплатного урока
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Оставьте заявку — мы подберём подходящий трек и проведём первое занятие бесплатно.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">Ответим в течение часа. Без спама.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
