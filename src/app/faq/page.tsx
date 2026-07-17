import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("faq") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Часто задаваемые вопросы — TirSkix Academy",
    description:
      "Ответы на частые вопросы об обучении в TirSkix Academy: возраст, формат, цены, треки, пробный урок и многое другое.",
    canonical: "https://tirskix-academy.com/faq",
  });
}

interface FaqItem { q: string; a: string }
interface FaqSection { title: string; items: FaqItem[] }

const SECTIONS: FaqSection[] = [
  {
    title: "О школе и формате",
    items: [
      {
        q: "Что такое TirSkix Academy?",
        a: "TirSkix Academy — онлайн-школа программирования для детей и подростков 10–18 лет. Мы работаем с 2020 года. Главная особенность — нарративный подход: дети не просто учатся, а расследуют дела, строят игровые студии и решают инженерные вызовы.",
      },
      {
        q: "Как проходят занятия?",
        a: "Онлайн, в Zoom или аналоге. Живой ментор ведёт урок, видит экран ученика, помогает в реальном времени. Нужен компьютер или ноутбук. Планшет и телефон не подходят для программирования.",
      },
      {
        q: "Сколько занятий в неделю?",
        a: "Рекомендуем 2 занятия в неделю по 60 минут. Это оптимальный ритм, при котором дети успевают закрепить материал между уроками и не перегружаются.",
      },
      {
        q: "Группа или индивидуально?",
        a: "По умолчанию — мини-группы до 4 человек. Это позволяет и получать внимание ментора, и учиться у сверстников. Индивидуальные занятия доступны отдельно — подробнее на странице «Индивидуальные занятия».",
      },
    ],
  },
  {
    title: "Треки и программа",
    items: [
      {
        q: "Какие треки есть в TirSkix Academy?",
        a: "Три основных трека: Игровая студия (10–12 лет, Snap!/GDevelop), Кодэкс (12–15 лет, Python + Data Science), ТехноЛаб (14–18 лет, алгоритмы, ООП, олимпиады). Также доступны: подготовка к ОГЭ, ЕГЭ и индивидуальные занятия.",
      },
      {
        q: "Как выбрать подходящий трек?",
        a: "По возрасту и опыту. Если ребёнок 10–12 лет и без опыта — Игровая студия. 12–15 лет и хочет Python — Кодэкс. Старше 14 и есть база или амбиции — ТехноЛаб. Можно не выбирать заранее: на пробном уроке ментор даст рекомендацию.",
      },
      {
        q: "Можно ли перейти с одного трека на другой?",
        a: "Да, это нормальная практика. Многие ученики проходят сначала Кодэкс, потом переходят в ТехноЛаб. Ментор подскажет, когда пришло время.",
      },
      {
        q: "Нужен ли опыт программирования для старта?",
        a: "Нет. Игровая студия и Кодэкс рассчитаны на полный ноль. ТехноЛаб предполагает базовый Python — если его нет, начнём с Кодэкса.",
      },
    ],
  },
  {
    title: "Пробный урок",
    items: [
      {
        q: "Пробный урок действительно бесплатный?",
        a: "Да, без условий. Мы проводим первое занятие бесплатно, чтобы ребёнок и родители могли оценить формат, ментора и программу. Никаких скрытых платежей и обязательств продолжать.",
      },
      {
        q: "Что происходит на пробном уроке?",
        a: "45 минут онлайн с ментором. Ребёнок знакомится с форматом, создаёт что-то руками (первый шаг в игре, простую программу). Ментор оценивает уровень и даёт рекомендацию по треку.",
      },
      {
        q: "Как записаться на пробный урок?",
        a: "Заполните форму на странице «Пробный урок». Менеджер свяжется в течение часа, уточнит детали и согласует удобное время.",
      },
    ],
  },
  {
    title: "Стоимость и оплата",
    items: [
      {
        q: "Сколько стоит обучение?",
        a: "Стоимость зависит от трека и формата (группа или индивидуально). Актуальные цены уточняйте у менеджера — напишите нам в Telegram или оставьте заявку.",
      },
      {
        q: "Можно ли оплачивать помесячно?",
        a: "Да, мы работаем с помесячной оплатой. Также доступны пакеты на несколько месяцев — они выгоднее.",
      },
      {
        q: "Есть ли скидки?",
        a: "Да. Скидки при оплате пакетом на несколько месяцев. Уточняйте у менеджера при записи.",
      },
    ],
  },
  {
    title: "Результаты и прогресс",
    items: [
      {
        q: "Как я узнаю, чему научился ребёнок?",
        a: "После каждого занятия ментор отправляет краткое резюме: что разобрали, что задано, на что обратить внимание. В личном кабинете виден прогресс по программе.",
      },
      {
        q: "Какие реальные результаты у учеников?",
        a: "Примеры: ОГЭ 19/21 с нуля за 6 месяцев, ЕГЭ 98 баллов, 2 поступления без вступительных (БВИ), полуфинал ICPC. Подробнее — на странице «Достижения учеников».",
      },
      {
        q: "Что если ребёнок отстаёт или скучает?",
        a: "Мы адаптируем темп. Если скучно — усложняем или переходим к более интересным задачам. Если трудно — замедляемся и разбираем с другого угла. Ментор следит за состоянием ребёнка на каждом уроке.",
      },
    ],
  },
];

export default async function FaqPage() {
  const cms = await getCmsPage("faq");
  const cmsSections = Array.isArray(cms.sections) && cms.sections.length > 0
    ? (cms.sections as FaqSection[])
    : SECTIONS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cmsSections.flatMap((s) =>
      (s.items || []).map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">FAQ</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Частые вопросы
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Собрали ответы на всё, что спрашивают чаще всего. Не нашли — напишите нам.
            </p>
          </div>
        </section>

        {/* FAQ sections */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-3xl">
            <div className="space-y-12">
              {cmsSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-4 pb-3 border-b border-[var(--color-border)]">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {(section.items || []).map((item) => (
                      <details
                        key={item.q}
                        className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
                        itemScope
                        itemType="https://schema.org/Question"
                      >
                        <summary
                          className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm"
                          itemProp="name"
                        >
                          {item.q}
                          <span className="text-[var(--color-brand)] shrink-0 transition-transform group-open:rotate-45 text-xl font-light leading-none">+</span>
                        </summary>
                        <div
                          className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4"
                          itemScope
                          itemType="https://schema.org/Answer"
                          itemProp="acceptedAnswer"
                        >
                          <span itemProp="text">{item.a}</span>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-3">
              Остались вопросы?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Напишите нам — ответим в течение часа. Или сразу запишитесь на пробный урок.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/kontakty" className={buttonClass("outline", "md")}>
                Написать нам
              </Link>
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "md", "group inline-flex")}>
                Пробный урок бесплатно
                <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
