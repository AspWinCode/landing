import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { Tag, ArrowRight } from "@phosphor-icons/react/dist/ssr";

const PROMOS = [
  {
    badge: "Новым ученикам",
    badgeColor: "var(--color-track-studio)",
    title: "Первый урок — бесплатно",
    desc: "Приходите на пробное занятие без оплаты и обязательств. Ментор познакомится с ребёнком и подберёт подходящий трек.",
    cta: "Записаться",
    href: "/besplatnyj-probnyj-urok",
    highlight: true,
  },
  {
    badge: "Пакетная оплата",
    badgeColor: "var(--color-brand)",
    title: "Скидка при оплате на 3 месяца",
    desc: "Оплатите сразу три месяца обучения — получите скидку. Подходит для всех треков и форматов.",
    cta: "Узнать условия",
    href: "/kontakty",
    highlight: false,
  },
  {
    badge: "Для друзей",
    badgeColor: "var(--color-track-kodeks)",
    title: "Приведи друга — получи бонус",
    desc: "Если ваш ребёнок приведёт друга в TirSkix Academy — оба получат приятный бонус к следующему месяцу обучения.",
    cta: "Подробнее",
    href: "/kontakty",
    highlight: false,
  },
];

export function PromosSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
      <div className="container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-violet-50)] flex items-center justify-center">
            <Tag size={18} weight="fill" className="text-[var(--color-brand)]" />
          </div>
          <span className="text-sm font-semibold text-[var(--color-brand)] uppercase tracking-wide">
            Акции и предложения
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
          Специальные предложения
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl">
          Актуальные акции для новых и существующих учеников TirSkix Academy.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className={`relative rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-card-hover)] ${
                promo.highlight
                  ? "bg-[var(--color-brand)] border-[var(--color-brand)] shadow-[var(--shadow-cta)]"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] shadow-[var(--shadow-card)]"
              }`}
            >
              <div className="p-6 flex flex-col flex-1">
                <span
                  className="self-start text-xs font-bold px-3 py-1 rounded-full mb-4"
                  style={
                    promo.highlight
                      ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                      : {
                          background: `color-mix(in srgb, ${promo.badgeColor} 12%, transparent)`,
                          color: promo.badgeColor,
                        }
                  }
                >
                  {promo.badge}
                </span>

                <h3
                  className={`text-xl font-extrabold mb-3 leading-snug ${
                    promo.highlight
                      ? "text-white"
                      : "text-[var(--color-text-primary)]"
                  }`}
                >
                  {promo.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-6 flex-1 ${
                    promo.highlight ? "text-white/80" : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {promo.desc}
                </p>

                <Link
                  href={promo.href}
                  className={buttonClass(
                    promo.highlight ? "primary" : "outline",
                    "sm",
                    promo.highlight
                      ? "bg-white! text-[var(--color-brand)]! hover:bg-[var(--color-violet-50)]! w-full group font-bold"
                      : "w-full group"
                  )}
                >
                  {promo.cta}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
