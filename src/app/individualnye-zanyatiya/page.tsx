import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, User, Clock, ChartLine, Wrench } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: { absolute: "Индивидуальные занятия по программированию — TirSkix Academy" },
  description:
    "Индивидуальные уроки программирования для детей 10–18 лет онлайн. Python, подготовка к ОГЭ/ЕГЭ, алгоритмы. Под запрос и темп ребёнка.",
  alternates: { canonical: "https://tirskix-academy.com/individualnye-zanyatiya/" },
};

const ADVANTAGES = [
  {
    icon: User,
    title: "Полное внимание ментора",
    desc: "Занятие строится вокруг одного ребёнка — его темп, его вопросы, его проекты.",
  },
  {
    icon: Clock,
    title: "Гибкий график",
    desc: "Выбираете дни и время, которые удобны вам. Урок 45 или 60 минут.",
  },
  {
    icon: ChartLine,
    title: "Чёткий прогресс",
    desc: "После каждого занятия краткое резюме: что разобрали, что задано, что дальше.",
  },
  {
    icon: Wrench,
    title: "Любая задача",
    desc: "Подготовка к экзаменам, изучение нового языка, помощь со школьным проектом или олимпиадой.",
  },
];

const CASES = [
  {
    tag: "ОГЭ/ЕГЭ",
    title: "Подготовка к экзаменам",
    desc: "Диагностика слабых мест → план по заданиям → практика вариантов. Минимум воды, максимум заданий.",
    color: "var(--color-track-kodeks)",
  },
  {
    tag: "Python",
    title: "Python с нуля",
    desc: "Учим Python в удобном темпе — через проекты: игру, бот, анализ данных или детективную программу.",
    color: "var(--color-brand)",
  },
  {
    tag: "Алгоритмы",
    title: "Подготовка к олимпиадам",
    desc: "Разбираем алгоритмы и структуры данных под конкретные олимпиады — ВСОШ, Codeforces, региональные этапы.",
    color: "var(--color-track-technolab)",
  },
  {
    tag: "Проект",
    title: "Помощь с проектом",
    desc: "Школьный проект, курсовая, персональная идея — помогаем воплотить от идеи до рабочего кода.",
    color: "var(--color-track-studio)",
  },
];

export default function IndividualPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Индивидуальные занятия</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Индивидуальные<br />
              <span className="text-[var(--color-brand)]">занятия с ментором</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Один ученик — один ментор. Занятие полностью адаптировано под ребёнка:
              его темп, его цели, его вопросы. Онлайн, для детей 10–18 лет.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Почему индивидуально
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-violet-100)] flex items-center justify-center mb-4">
                    <Icon size={20} weight="fill" className="text-[var(--color-brand)]" />
                  </div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Случаи использования */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Под какие задачи
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-lg mx-auto">
              Не подходит ни один трек? Индивидуальные занятия — для любой цели.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {CASES.map((c) => (
                <div key={c.title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ background: `color-mix(in srgb, ${c.color} 12%, transparent)`, color: c.color }}>
                    {c.tag}
                  </span>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{c.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как начать */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Как начать
            </h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "Оставьте заявку", desc: "Форма ниже — имя, контакт, что нужно. Ответим в течение часа." },
                { step: "02", title: "Вводная беседа", desc: "Менеджер уточняет цель, уровень и пожелания. 10–15 минут." },
                { step: "03", title: "Пробный урок", desc: "Знакомство с ментором, диагностика уровня. Бесплатно." },
                { step: "04", title: "Расписание и план", desc: "Согласовываем дни, время и программу. Начинаем работу." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)] mb-1">{item.title}</div>
                    <div className="text-sm text-[var(--color-text-muted)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-16">
          <div className="container max-w-2xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-6 text-center">
              Что входит в занятие
            </h2>
            <div className="space-y-3">
              {[
                "Онлайн-урок 45 или 60 минут (Zoom / Meet)",
                "Разбор домашнего задания с прошлого урока",
                "Объяснение новой темы — с примерами под ребёнка",
                "Совместная практика — ментор на экране, помогает в реальном времени",
                "Домашнее задание с подсказками (не переписывать, а думать)",
                "Краткое резюме урока для родителей",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} weight="fill" className="text-[var(--color-brand)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Подберём ментора под вашу задачу
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь — обсудим цели и подберём подходящего специалиста. Первый урок бесплатно.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
