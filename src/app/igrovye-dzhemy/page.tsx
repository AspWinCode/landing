import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("igrovye-dzhemy") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Игровые джемы для детей — TirSkix Academy",
    description:
      "Игровые джемы TirSkix Academy — 48-часовые соревнования по разработке игр для детей 10–18 лет. Онлайн и офлайн по городам России.",
    canonical: "https://tirskix-academy.com/igrovye-dzhemy/",
  });
}

const HOW = [
  { num: "01", title: "Объявляем тему", desc: "В пятницу вечером объявляем тему джема. У всех одинаковые условия." },
  { num: "02", title: "48 часов разработки", desc: "Выходные — делаем игру. Соло или командой до 3 человек." },
  { num: "03", title: "Сдаём в воскресенье", desc: "Загружаем игру на itch.io или присылаем ссылку. Дедлайн — воскресенье 21:00." },
  { num: "04", title: "Голосование и призы", desc: "Участники оценивают игры друг друга. Лучшие получают призы и признание." },
];

const RULES = [
  "Игра должна быть создана во время джема — не до его начала",
  "Использование готовых ассетов разрешено с указанием авторства",
  "Можно использовать любой движок: GDevelop, Godot, Arcade, Unity и другие",
  "Команда — максимум 3 человека",
  "Тема обязательна, интерпретация — на ваше усмотрение",
];

const TOOLS = [
  { name: "GDevelop", tag: "Без кода", color: "var(--color-track-studio)" },
  { name: "Godot", tag: "GDScript", color: "var(--color-track-technolab)" },
  { name: "Python Arcade", tag: "Python", color: "var(--color-track-kodeks)" },
  { name: "Snap!", tag: "Визуальный", color: "var(--color-brand)" },
];

export default async function GameJamPage() {
  const cms = await getCmsPage('igrovye-dzhemy');
  const how = Array.isArray(cms.how) && cms.how.length > 0 ? cms.how as typeof HOW : HOW;
  const rules = Array.isArray(cms.rules) && cms.rules.length > 0 ? cms.rules as typeof RULES : RULES;
  const tools = Array.isArray(cms.tools) && cms.tools.length > 0 ? cms.tools as typeof TOOLS : TOOLS;
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-track-studio-light)] opacity-40 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/aktivnosti" className="hover:text-[var(--color-brand)] transition-colors">Мероприятия</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Игровые джемы</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium mb-6" style={{ color: "var(--color-track-studio)" }}>
              <span className="w-2 h-2 rounded-full bg-[var(--color-track-studio)] animate-pulse" />
              Следующий джем — скоро
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Игровые джемы<br />
              <span style={{ color: "var(--color-track-studio)" }}>TirSkix Academy</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              48 часов. Одна тема. Собственная игра с нуля.
              Соревнование, которое превращает обучение в настоящее приключение.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
                Хочу участвовать
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/aktivnosti" className={buttonClass("outline", "lg")}>
                Все мероприятия
              </Link>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-10 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
              {[
                { v: "5", l: "джемов проведено" },
                { v: "72+", l: "участников" },
                { v: "25+", l: "игр создано" },
                { v: "3", l: "города + онлайн" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: "var(--color-track-studio)" }}>{s.v}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как проходит */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Как проходит джем
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {how.map((h) => (
                <div key={h.num} className="flex gap-4 bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "var(--color-track-studio)" }}>
                    {h.num}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[var(--color-text-primary)] mb-1">{h.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Разрешённые инструменты */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-6 text-center">
              Разрешённые инструменты
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {tools.map((t) => (
                <div key={t.name} className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)] text-center">
                  <div className="font-bold text-[var(--color-text-primary)] mb-1">{t.name}</div>
                  <div className="text-xs px-2 py-0.5 rounded-full font-medium inline-block" style={{ background: `color-mix(in srgb, ${t.color} 12%, transparent)`, color: t.color }}>
                    {t.tag}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-center text-[var(--color-text-muted)]">
              Можно использовать любой другой движок — главное, чтобы игра запускалась в браузере или была исполняемым файлом.
            </p>
          </div>
        </section>

        {/* Правила */}
        <section className="py-16">
          <div className="container max-w-2xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-6 text-center">
              Правила участия
            </h2>
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule} className="flex items-start gap-3">
                  <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5" style={{ color: "var(--color-track-studio)" }} />
                  <span className="text-sm text-[var(--color-text-secondary)]">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Готов к первому джему?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Джемы открыты для учеников академии.
              Запишитесь на пробный урок — и попадёте на следующий джем.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
