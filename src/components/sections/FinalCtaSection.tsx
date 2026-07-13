import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EditableSlot } from "@/components/edit/EditableSlot";

interface FinalCtaSectionProps {
  heading?: string;
  subtext?: string;
  btn_primary?: string;
  btn_primary_href?: string;
  btn_secondary?: string;
  btn_secondary_href?: string;
  note?: string;
}

export function FinalCtaSection({
  heading,
  subtext,
  btn_primary,
  btn_primary_href,
  btn_secondary,
  btn_secondary_href,
  note,
}: FinalCtaSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--color-brand)] px-8 py-14 md:px-16 md:py-20 text-center">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-2xl mx-auto">
              <EditableSlot slotId="cta_final.heading" defaultValue={heading || "Начни путь в IT сегодня"} />
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
              <EditableSlot slotId="cta_final.subtext" defaultValue={subtext || "Первый урок — бесплатно. Без обязательств. Просто посмотри, как это работает."} />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={btn_primary_href || "/besplatnyj-probnyj-urok"}
                className={buttonClass("primary", "lg", "bg-white! text-[var(--color-brand)]! hover:bg-[var(--color-violet-50)]! shadow-lg font-bold")}
              >
                {btn_primary || "Записаться на пробный урок"}
                <ArrowRight size={20} weight="bold" />
              </Link>
              <Link
                href={btn_secondary_href || "/kontakty"}
                className={buttonClass("outline", "lg", "border-white! text-white! hover:bg-white/10! bg-transparent!")}
              >
                {btn_secondary || "Задать вопрос"}
              </Link>
            </div>

            {(note !== undefined ? note : "Ответим в течение часа. Без спама.") && (
              <p className="mt-6 text-sm text-white/60">
                {note !== undefined ? note : "Ответим в течение часа. Без спама."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
