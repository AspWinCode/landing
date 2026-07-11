import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--color-brand)] px-8 py-14 md:px-16 md:py-20 text-center">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-2xl mx-auto">
              Начни путь в IT сегодня
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Первый урок — бесплатно. Без обязательств. Просто посмотри, как это работает.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/besplatnyj-probnyj-urok"
                className={buttonClass("primary", "lg", "bg-white! text-[var(--color-brand)]! hover:bg-[var(--color-violet-50)]! shadow-lg font-bold")}
              >
                Записаться на пробный урок
                <ArrowRight size={20} weight="bold" />
              </Link>
              <Link
                href="/kontakty"
                className={buttonClass("outline", "lg", "border-white! text-white! hover:bg-white/10! bg-transparent!")}
              >
                Задать вопрос
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/60">
              Ответим в течение часа. Без спама.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
