import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("legal-oferta") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Публичная оферта — TirSkix Academy",
    description: "Публичная оферта TirSkix Academy — условия оказания образовательных услуг.",
    canonical: "https://tirskix-academy.com/legal/oferta/",
  });
}

const DEFAULT_HEADING = "Публичная оферта";
const DEFAULT_DATE = "Договор на оказание образовательных услуг. Актуален с 1 января 2025 года.";

const DEFAULT_SECTIONS = [
  { h2: "1. Термины и определения", content: "Исполнитель — TirSkix Academy, оказывающий образовательные услуги.\nЗаказчик — физическое лицо (родитель/опекун), принимающее настоящую оферту.\nУченик — несовершеннолетний, в отношении которого оказываются услуги.\nАкцепт — оплата услуг или подача заявки, означающие согласие с офертой." },
  { h2: "2. Предмет договора", content: "Исполнитель обязуется оказывать образовательные услуги в сфере программирования (онлайн-обучение), а Заказчик — принять и оплатить услуги в соответствии с условиями оферты." },
  { h2: "3. Порядок оказания услуг", content: "Обучение проводится онлайн в формате видеоконференции.\nРасписание согласовывается индивидуально с Заказчиком.\nЗанятия проводятся в мини-группах до 4 человек или индивидуально.\nПродолжительность одного занятия — 45 или 60 минут." },
  { h2: "4. Стоимость и порядок оплаты", content: "Стоимость услуг определяется действующим прайс-листом на момент заключения договора. Оплата производится ежемесячно, не позднее 5-го числа текущего месяца. Реквизиты для оплаты предоставляются менеджером." },
  { h2: "5. Пробный урок", content: "Первое занятие (пробный урок) предоставляется бесплатно. Пробный урок не является акцептом оферты и не обязывает Заказчика к заключению договора." },
  { h2: "6. Права и обязанности сторон", content: "Исполнитель обязуется:\n— проводить занятия в соответствии с программой и расписанием;\n— уведомлять об отмене занятия не менее чем за 2 часа;\n— предоставлять обратную связь по прогрессу ученика.\n\nЗаказчик обязуется:\n— своевременно производить оплату;\n— обеспечить ученику необходимое оборудование для занятий;\n— уведомлять об отсутствии ученика не менее чем за 2 часа." },
  { h2: "7. Возврат денежных средств", content: "В случае отказа Заказчика от услуг, возврат средств производится пропорционально неиспользованным занятиям. Заявка на возврат оформляется в письменной форме на email hello@tirskix-academy.com. Срок возврата — 10 рабочих дней." },
  { h2: "8. Срок действия и изменение оферты", content: "Оферта действует бессрочно. Исполнитель вправе изменять условия оферты, уведомив Заказчика не менее чем за 7 дней. Продолжение обучения после уведомления означает согласие с новыми условиями." },
  { h2: "9. Применимое право", content: "К отношениям сторон применяется законодательство Российской Федерации. Споры разрешаются путём переговоров, а при недостижении согласия — в судебном порядке." },
];

export default async function OfertaPage() {
  const cms = await getCmsPage("legal-oferta");

  const heading = typeof cms.heading === "string" && cms.heading ? cms.heading : DEFAULT_HEADING;
  const effectiveDate = typeof cms.effective_date === "string" && cms.effective_date ? cms.effective_date : DEFAULT_DATE;
  const sections = Array.isArray(cms.sections) && cms.sections.length > 0
    ? (cms.sections as { h2: string; content: string }[])
    : DEFAULT_SECTIONS;

  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[var(--color-brand)] font-medium">Публичная оферта</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            {heading}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">{effectiveDate}</p>

          <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mb-3">
            {sections.map((sec, i) => (
              <section key={i}>
                {sec.h2 && <h2>{sec.h2}</h2>}
                {sec.content && (
                  <p style={{ whiteSpace: "pre-line" }}>{sec.content}</p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="text-sm text-[var(--color-brand)] hover:underline">Политика конфиденциальности →</Link>
            <Link href="/legal/terms" className="text-sm text-[var(--color-brand)] hover:underline">Пользовательское соглашение →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
