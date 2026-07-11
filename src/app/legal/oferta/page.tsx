import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { absolute: "Публичная оферта — TirSkix Academy" },
  description: "Публичная оферта TirSkix Academy — условия оказания образовательных услуг.",
  alternates: { canonical: "https://tirskix-academy.com/legal/oferta/" },
  robots: { index: false },
};

export default function OfertaPage() {
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
            Публичная оферта
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">Договор на оказание образовательных услуг. Актуален с 1 января 2025 года.</p>

          <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mb-3">

            <section>
              <h2>1. Термины и определения</h2>
              <ul className="space-y-2">
                <li><strong className="text-[var(--color-text-primary)]">Исполнитель</strong> — TirSkix Academy, оказывающий образовательные услуги.</li>
                <li><strong className="text-[var(--color-text-primary)]">Заказчик</strong> — физическое лицо (родитель/опекун), принимающее настоящую оферту.</li>
                <li><strong className="text-[var(--color-text-primary)]">Ученик</strong> — несовершеннолетний, в отношении которого оказываются услуги.</li>
                <li><strong className="text-[var(--color-text-primary)]">Акцепт</strong> — оплата услуг или подача заявки, означающие согласие с офертой.</li>
              </ul>
            </section>

            <section>
              <h2>2. Предмет договора</h2>
              <p>
                Исполнитель обязуется оказывать образовательные услуги в сфере программирования
                (онлайн-обучение), а Заказчик — принять и оплатить услуги в соответствии с условиями оферты.
              </p>
            </section>

            <section>
              <h2>3. Порядок оказания услуг</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Обучение проводится онлайн в формате видеоконференции</li>
                <li>Расписание согласовывается индивидуально с Заказчиком</li>
                <li>Занятия проводятся в мини-группах до 4 человек или индивидуально</li>
                <li>Продолжительность одного занятия — 45 или 60 минут</li>
              </ul>
            </section>

            <section>
              <h2>4. Стоимость и порядок оплаты</h2>
              <p>
                Стоимость услуг определяется действующим прайс-листом на момент заключения договора.
                Оплата производится ежемесячно, не позднее 5-го числа текущего месяца.
                Реквизиты для оплаты предоставляются менеджером.
              </p>
            </section>

            <section>
              <h2>5. Пробный урок</h2>
              <p>
                Первое занятие (пробный урок) предоставляется бесплатно. Пробный урок не является
                акцептом оферты и не обязывает Заказчика к заключению договора.
              </p>
            </section>

            <section>
              <h2>6. Права и обязанности сторон</h2>
              <p className="mb-2"><strong className="text-[var(--color-text-primary)]">Исполнитель обязуется:</strong></p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Проводить занятия в соответствии с программой и расписанием</li>
                <li>Уведомлять об отмене занятия не менее чем за 2 часа</li>
                <li>Предоставлять обратную связь по прогрессу ученика</li>
              </ul>
              <p className="mb-2"><strong className="text-[var(--color-text-primary)]">Заказчик обязуется:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Своевременно производить оплату</li>
                <li>Обеспечить ученику необходимое оборудование для занятий</li>
                <li>Уведомлять об отсутствии ученика не менее чем за 2 часа</li>
              </ul>
            </section>

            <section>
              <h2>7. Возврат денежных средств</h2>
              <p>
                В случае отказа Заказчика от услуг, возврат средств производится пропорционально
                неиспользованным занятиям. Заявка на возврат оформляется в письменной форме на email
                hello@tirskix-academy.com. Срок возврата — 10 рабочих дней.
              </p>
            </section>

            <section>
              <h2>8. Срок действия и изменение оферты</h2>
              <p>
                Оферта действует бессрочно. Исполнитель вправе изменять условия оферты,
                уведомив Заказчика не менее чем за 7 дней. Продолжение обучения после уведомления
                означает согласие с новыми условиями.
              </p>
            </section>

            <section>
              <h2>9. Применимое право</h2>
              <p>
                К отношениям сторон применяется законодательство Российской Федерации.
                Споры разрешаются путём переговоров, а при недостижении согласия — в судебном порядке.
              </p>
            </section>
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
