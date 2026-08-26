import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, MapPin, Clock, Users, Trophy } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

const ADDRESS = "ул. Степана Разина, 6, оф. 505, Иркутск";
const PHONE_DISPLAY = "+7 924 616-40-00";
const PHONE_HREF = "+79246164000";
const EMAIL = "director@academy-wincode.com";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("shkola-programmirovaniya-irkutsk") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Школа программирования для детей в Иркутске | TirSkix Academy",
    description:
      "TirSkix Academy в Иркутске — курсы программирования для детей 8–17 лет. Офис на ул. Степана Разина, 6. Онлайн-обучение, очные встречи и джемы для иркутских учеников.",
    canonical: "https://tirskix-academy.com/shkola-programmirovaniya-irkutsk",
  });
}

const REASONS = [
  {
    icon: MapPin,
    title: "Офис в центре Иркутска",
    desc: "Встречаемся очно на ул. Степана Разина, 6 — для отдельных занятий, консультаций и мероприятий школы.",
  },
  {
    icon: Users,
    title: "Онлайн-формат обучения",
    desc: "Основные занятия проходят онлайн в мини-группах — ребёнок учится из дома, в удобное время, с постоянным ментором.",
  },
  {
    icon: Trophy,
    title: "Офлайн-джемы и встречи",
    desc: "Периодически проводим офлайн-джемы и мастер-классы для иркутских учеников — следите за расписанием в разделе мероприятий.",
  },
  {
    icon: Clock,
    title: "Гибкое расписание",
    desc: "Подберём время занятий с учётом школьного расписания ребёнка и часового пояса Иркутска (МСК+5).",
  },
];

const FAQ = [
  {
    q: "Занятия в Иркутске очные или онлайн?",
    a: "Основной формат обучения — онлайн: ребёнок занимается из дома с ментором по видеосвязи. Очно в офисе на ул. Степана Разина, 6 мы иногда проводим отдельные занятия, консультации для родителей и мероприятия школы — это исключение, а не основной формат.",
  },
  {
    q: "Где находится офис TirSkix Academy в Иркутске?",
    a: "Офис расположен по адресу: ул. Степана Разина, 6, офис 505. Здесь можно встретиться с представителем школы или прийти на организованное очное мероприятие.",
  },
  {
    q: "Можно ли прийти на пробный урок очно в Иркутске?",
    a: "Пробный урок в большинстве случаев проходит онлайн — так же, как и всё дальнейшее обучение. Если хотите обсудить формат очно, напишите нам, и мы согласуем встречу в офисе.",
  },
  {
    q: "Проводите ли вы мероприятия и джемы в Иркутске?",
    a: "Да, периодически организуем игровые джемы и мастер-классы для иркутских учеников — иногда в офисе, иногда на других площадках города. Актуальное расписание — в разделе «Мероприятия».",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://tirskix-academy.com/shkola-programmirovaniya-irkutsk#organization",
  name: "TirSkix Academy — Иркутск",
  url: "https://tirskix-academy.com/shkola-programmirovaniya-irkutsk",
  description: "Школа программирования для детей 8–17 лет с офисом в Иркутске. Онлайн-обучение, очные встречи и мероприятия для иркутских учеников.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Степана Разина, 6, оф. 505",
    addressLocality: "Иркутск",
    addressCountry: "RU",
  },
  telephone: "+7 924 616-40-00",
  email: "director@academy-wincode.com",
  sameAs: ["https://t.me/tirskix_academy"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Иркутск", url: "https://tirskix-academy.com/shkola-programmirovaniya-irkutsk" },
]);

export default function IrkutskPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Иркутск</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium mb-6" style={{ color: "var(--color-brand)" }}>
              <MapPin size={14} weight="fill" />
              {ADDRESS}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Школа программирования<br />
              для детей в <span className="text-[var(--color-brand)]">Иркутске</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              TirSkix Academy обучает детей 8–17 лет программированию онлайн и имеет офис
              в Иркутске — для очных встреч, консультаций и мероприятий школы.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
                Записаться на пробный урок
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/programmirovanie-dlya-detej" className={buttonClass("outline", "lg")}>
                Все курсы
              </Link>
            </div>
          </div>
        </section>

        {/* Почему TirSkix в Иркутске */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Как устроено обучение в Иркутске
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {REASONS.map(({ icon: Icon, title, desc }) => (
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

        {/* Адрес и карта */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Наш офис
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-2 max-w-lg mx-auto">
              {ADDRESS}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center mb-10">
              <a href={`tel:${PHONE_HREF}`} className="text-[var(--color-brand)] font-medium hover:underline">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="text-[var(--color-brand)] font-medium hover:underline">
                {EMAIL}
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)]">
              <iframe
                title="Офис TirSkix Academy на карте — ул. Степана Разина, 6, Иркутск"
                src="https://yandex.ru/map-widget/v1/?text=Иркутск%2C%20улица%20Степана%20Разина%2C%206&z=16"
                width="100%"
                height="400"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <div key={f.q} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{f.q}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Начните обучение из Иркутска
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на бесплатный пробный урок — обсудим формат, уровень ребёнка и подберём курс.
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
