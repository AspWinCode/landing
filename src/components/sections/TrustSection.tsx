import Image from "next/image";
import { ShieldCheck, Baby } from "@phosphor-icons/react/dist/ssr";

export function TrustSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            Надёжность и удобство
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Официальная лицензия, налоговый вычет и оплата материнским капиталом
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Образовательная лицензия */}
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-violet-50)] flex items-center justify-center shrink-0">
                <ShieldCheck size={24} weight="fill" className="text-[var(--color-brand)]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">
                  Образовательная лицензия
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Официально лицензированная образовательная организация
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              TirSkix Academy работает на основании государственной лицензии на осуществление
              образовательной деятельности. Это означает, что наши программы проверены
              и соответствуют стандартам качества.
            </p>

            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {[
                "Лицензированные образовательные программы",
                "Официальные документы об обучении",
                "Налоговый вычет 13% за обучение (ст. 219 НК РФ)",
                "Выдаём сертификат по окончании курса",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--color-brand)] mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Сертификат */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
                Наш сертификат
              </p>
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                {/* Замените путь на реальный файл сертификата: /images/license.jpg */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)]">
                  <ShieldCheck size={40} weight="light" className="text-[var(--color-border-strong)]" />
                  <span className="text-xs text-center px-4">
                    Загрузите файл сертификата в{" "}
                    <code className="font-mono bg-[var(--color-bg-muted)] px-1 rounded">
                      public/images/license.jpg
                    </code>
                  </span>
                </div>
                {/* Раскомментируйте после добавления файла:
                <Image
                  src="/images/license.jpg"
                  alt="Образовательная лицензия TirSkix Academy"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                */}
              </div>
            </div>
          </div>

          {/* Материнский капитал */}
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "color-mix(in srgb, var(--color-track-studio) 12%, transparent)" }}>
                <Baby size={24} weight="fill" className="text-[var(--color-track-studio)]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">
                  Материнский капитал
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Принимаем оплату средствами МСК
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Вы можете оплатить обучение ребёнка средствами материнского (семейного) капитала.
              Мы работаем с Социальным фондом России напрямую — без лишних бумаг и задержек.
            </p>

            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Оставьте заявку",
                  desc: "Напишите нам, что хотите оплатить маткапиталом",
                },
                {
                  step: "02",
                  title: "Договор и реквизиты",
                  desc: "Подготовим договор и все документы для СФР",
                },
                {
                  step: "03",
                  title: "Подача в СФР",
                  desc: "Направляете заявление в СФР через Госуслуги или МФЦ",
                },
                {
                  step: "04",
                  title: "Начинаете учиться",
                  desc: "После одобрения СФР — занятия стартуют",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-black text-[var(--color-track-studio)]"
                    style={{ background: "color-mix(in srgb, var(--color-track-studio) 12%, transparent)" }}>
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Остались вопросы по оплате маткапиталом?{" "}
                <a
                  href="https://t.me/tirskix_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand)] hover:underline font-medium"
                >
                  Напишите нам в Telegram
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
