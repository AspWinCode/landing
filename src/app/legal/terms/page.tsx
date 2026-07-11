import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { absolute: "Пользовательское соглашение — TirSkix Academy" },
  description: "Пользовательское соглашение TirSkix Academy — условия использования сайта.",
  alternates: { canonical: "https://tirskix-academy.com/legal/terms/" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[var(--color-brand)] font-medium">Пользовательское соглашение</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            Пользовательское соглашение
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">Актуально с 1 января 2025 года</p>

          <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mb-3">

            <section>
              <h2>1. Общие положения</h2>
              <p>
                Настоящее Пользовательское соглашение регулирует отношения между TirSkix Academy
                и пользователями сайта tirskix-academy.com. Используя сайт, вы принимаете условия соглашения.
              </p>
            </section>

            <section>
              <h2>2. Предмет соглашения</h2>
              <p>
                TirSkix Academy предоставляет пользователям информацию об образовательных услугах
                и возможность оставить заявку на обучение. Образовательные услуги оказываются
                на основании отдельного договора-оферты.
              </p>
            </section>

            <section>
              <h2>3. Права и обязанности пользователя</h2>
              <p>Пользователь обязуется:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Предоставлять достоверную информацию при заполнении форм</li>
                <li>Не использовать сайт в целях, противоречащих законодательству РФ</li>
                <li>Не нарушать права интеллектуальной собственности</li>
              </ul>
            </section>

            <section>
              <h2>4. Интеллектуальная собственность</h2>
              <p>
                Все материалы сайта (тексты, изображения, дизайн) являются интеллектуальной
                собственностью TirSkix Academy. Копирование без разрешения запрещено.
              </p>
            </section>

            <section>
              <h2>5. Ограничение ответственности</h2>
              <p>
                TirSkix Academy не несёт ответственности за перебои в работе сайта,
                вызванные техническими причинами, а также за содержание внешних ресурсов,
                ссылки на которые могут присутствовать на сайте.
              </p>
            </section>

            <section>
              <h2>6. Изменение соглашения</h2>
              <p>
                TirSkix Academy вправе изменять условия соглашения без предварительного уведомления.
                Актуальная версия всегда доступна на этой странице.
              </p>
            </section>

            <section>
              <h2>7. Контакты</h2>
              <p>
                По вопросам, связанным с соглашением: hello@tirskix-academy.com
              </p>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="text-sm text-[var(--color-brand)] hover:underline">Политика конфиденциальности →</Link>
            <Link href="/legal/oferta" className="text-sm text-[var(--color-brand)] hover:underline">Публичная оферта →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
