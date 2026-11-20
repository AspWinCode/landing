import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("programmirovanie-dlya-detej") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Курсы программирования для детей онлайн — TirSkix Academy",
    description:
      "Онлайн-курсы программирования для детей с 3 класса. Три этапа: Новичок (Snap!/GDevelop/Roblox/Turtle), Программист (Python), Эксперт (Git/ООП/алгоритмы). Реальные результаты: БВИ, ОГЭ 19/21. Пробный урок бесплатно.",
    keywords: [
      "курсы программирования для детей",
      "онлайн школа программирования для детей",
      "программирование для детей онлайн",
      "обучение программированию для школьников",
      "курсы программирования для школьников",
    ],
    canonical: "https://tirskix-academy.com/programmirovanie-dlya-detej",
  });
}

// JSON-LD: EducationalOrganization + FAQPage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      name: "TirSkix Academy",
      url: "https://tirskix-academy.com",
      description: "Онлайн-школа программирования для детей с 3 класса",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Курсы программирования",
        itemListElement: [
          { "@type": "Course", name: "Новичок", description: "Snap!, GDevelop, Roblox Studio (два направления), Turtle — с 3 класса", url: "https://tirskix-academy.com/game-studio" },
          { "@type": "Course", name: "Программист", description: "Базовая программа на Python с 6 класса", url: "https://tirskix-academy.com/programmist" },
          { "@type": "Course", name: "Эксперт", description: "Git, ООП, алгоритмы для учеников 7–8 класса и старше", url: "https://tirskix-academy.com/ekspert" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "С какого возраста можно начать учиться программированию?", acceptedAnswer: { "@type": "Answer", text: "В TirSkix Academy принимаем детей с 3 класса. «Новичок» — идеальный старт: Snap! в 3–4 классе, затем выбор направления по интересу." } },
        { "@type": "Question", name: "Какой язык программирования лучше для ребёнка?", acceptedAnswer: { "@type": "Answer", text: "В 3–4 классе — визуальное программирование (Snap!). С 5 класса — GDevelop, Roblox Studio или Turtle. С 6 класса — Python («Программист»), с 7–8 класса — Git, ООП и алгоритмы («Эксперт»)." } },
        { "@type": "Question", name: "Сколько стоят курсы программирования для детей?", acceptedAnswer: { "@type": "Answer", text: "От 4 200 ₽ в месяц при занятиях 2 раза в неделю. Первый урок — бесплатно." } },
        { "@type": "Question", name: "Можно ли заниматься онлайн?", acceptedAnswer: { "@type": "Answer", text: "Все занятия проходят онлайн в Zoom с живым ментором. Нужен только компьютер или ноутбук." } },
      ],
    },
  ],
};

const TRACKS = [
  {
    href: "/game-studio",
    emoji: "🌱",
    title: "Новичок",
    age: "с 3 класса",
    tagline: "Первый шаг в программирование",
    desc: "Snap! 3–4 класс, затем выбор: GDevelop, Roblox Studio (два направления) или Turtle. Подбираем направление по классу и интересу.",
    tools: ["Snap!", "GDevelop", "Roblox Studio", "Turtle"],
    color: "var(--color-track-studio)",
    colorLight: "var(--color-track-studio-light)",
    bar: "bg-[var(--color-track-studio)]",
  },
  {
    href: "/programmist",
    emoji: "🐍",
    title: "Программист",
    age: "с 6 класса",
    tagline: "Уверенный Python для реальных задач",
    desc: "Базовая программа на Python. Настоящий код, собственные проекты. Опционально — модуль анализа данных: NumPy, Pandas.",
    tools: ["Python", "NumPy", "Pandas"],
    color: "var(--color-track-kodeks)",
    colorLight: "var(--color-track-kodeks-light)",
    bar: "bg-[var(--color-track-kodeks)]",
  },
  {
    href: "/ekspert",
    emoji: "⚙️",
    title: "Эксперт",
    age: "7–8 класс",
    tagline: "От учебного Python к инженерной культуре",
    desc: "Git, ООП, алгоритмика, Arcade и игровой AI. Вход после «Программиста» или по входному тесту.",
    tools: ["Python", "Git", "ООП", "Алгоритмы"],
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
    a: "В TirSkix Academy принимаем детей с 3 класса. «Новичок» — идеальный старт без опыта: Snap! в 3–4 классе, затем выбор направления по интересу с 5 класса. Визуальное программирование убирает барьер синтаксиса и позволяет сразу создавать игры.",
  },
  {
    q: "Какой язык программирования лучше для ребёнка?",
    a: "В 3–4 классе — визуальное программирование (Snap!): развивает алгоритмическое мышление без синтаксиса. С 5 класса — GDevelop, Roblox Studio или Turtle. С 6 класса — Python («Программист»): универсальный, читаемый язык. С 7–8 класса — Git, ООП и алгоритмы («Эксперт»).",
  },
  {
    q: "Сколько стоят курсы программирования для детей онлайн?",
    a: "«Новичок» — 4 200 ₽/мес, «Программист» и «Эксперт» — 4 950 ₽/мес (2 раза в неделю). Подготовка к ОГЭ — 4 200/4 000 ₽, к ЕГЭ — 5 200 ₽/мес. Индивидуальные занятия — 1 500 ₽/час. Первый урок — бесплатно.",
  },
  {
    q: "Как проходят онлайн-занятия по программированию?",
    a: "В Zoom с живым ментором-практиком. Ментор видит экран ребёнка, объясняет, помогает в реальном времени. Нужен компьютер или ноутбук — планшет не подойдёт.",
  },
  {
    q: "Что получает ребёнок после курса?",
    a: "Реальные навыки: ученики «Новичка» выпускают свои первые игры и проекты, «Программиста» — пишут программы и работают с данными, «Эксперта» — решают олимпиадные задачи и поступают в топ-вузы. Плюс ежемесячная характеристика прогресса и проекты в портфолио.",
  },
];

export default async function ProgrammirovaniyaDlyaDetejPage() {
  const cms = await getCmsPage('programmirovanie-dlya-detej');
  const cmsTracks = Array.isArray(cms.tracks) && cms.tracks.length > 0 ? cms.tracks as typeof TRACKS : TRACKS;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
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
                TirSkix Academy — онлайн-школа программирования с 3 класса. Три этапа траектории,
                у каждого свои направления, живые менторы, реальные результаты.
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
                  "Онлайн-школа TirSkix Academy обучает программированию с 3 класса.",
                  "Три этапа: Новичок (с 3 класса — Snap!/GDevelop/Roblox Studio/Turtle), Программист (с 6 класса — Python/анализ данных), Эксперт (7–8 класс — Git/ООП/алгоритмы).",
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
                Три этапа — один путь роста. Методист подбирает направление
                по классу, знаниям и способностям ребёнка.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {cmsTracks.map((t) => (
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
                { emoji: "🎯", title: "Диагностика перед началом", desc: "Методист созванивается с ребёнком, даёт задания и подбирает направление по его знаниям и способностям — не один курс для всех." },
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
              {faq.map((item) => (
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
