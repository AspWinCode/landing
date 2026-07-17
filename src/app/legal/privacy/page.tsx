import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("legal-privacy") as unknown as Record<string, unknown>;
  return {
    ...buildPageMetadata(cms, {
      title: "Политика конфиденциальности — TirSkix Academy",
      description: "Политика конфиденциальности TirSkix Academy — обработка персональных данных согласно 152-ФЗ.",
      canonical: "https://tirskix-academy.com/legal/privacy",
    }),
    robots: { index: false, follow: false },
  };
}

const DEFAULT_HEADING = "Политика конфиденциальности";
const DEFAULT_DATE = "Актуальна с 1 января 2025 года";

const DEFAULT_SECTIONS = [
  { h2: "1. Общие положения", content: "Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки персональных данных пользователей сайта TirSkix Academy (далее — «Сайт»). Использование Сайта означает согласие с настоящей Политикой.\n\nОбработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»." },
  { h2: "2. Оператор данных", content: "Оператором персональных данных является TirSkix Academy. Контактный адрес для вопросов об обработке данных: hello@tirskix-academy.com" },
  { h2: "3. Какие данные мы собираем", content: "Мы можем собирать следующие персональные данные:\n— Имя\n— Номер телефона\n— Адрес электронной почты\n— Информация, добровольно предоставленная в форме заявки\n— Технические данные (IP-адрес, тип браузера, cookies) — автоматически" },
  { h2: "4. Цели обработки данных", content: "— Обработка заявок на обучение и пробные уроки\n— Связь с потенциальными и действующими учениками и их родителями\n— Информирование об услугах, мероприятиях и акциях\n— Улучшение качества сайта и сервиса" },
  { h2: "5. Передача данных третьим лицам", content: "Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих целях. Данные могут передаваться только в случаях, предусмотренных законодательством РФ." },
  { h2: "6. Хранение и защита данных", content: "Персональные данные хранятся на защищённых серверах. Мы принимаем технические и организационные меры для защиты данных от несанкционированного доступа, изменения и утечки." },
  { h2: "7. Права субъекта данных", content: "Вы вправе:\n— Получить информацию об обрабатываемых данных\n— Потребовать исправления или удаления данных\n— Отозвать согласие на обработку\n— Обратиться в Роскомнадзор в случае нарушений\n\nДля реализации прав обращайтесь: hello@tirskix-academy.com" },
  { h2: "8. Cookies", content: "Сайт использует cookies для улучшения работы сервиса. Вы можете отключить cookies в настройках браузера, однако некоторые функции сайта могут быть недоступны." },
  { h2: "9. Изменение политики", content: "Мы оставляем за собой право изменять настоящую Политику. Актуальная версия всегда доступна на этой странице." },
];

export default async function PrivacyPage() {
  const cms = await getCmsPage("legal-privacy");

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
            <span className="text-[var(--color-brand)] font-medium">Политика конфиденциальности</span>
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
            <Link href="/legal/terms" className="text-sm text-[var(--color-brand)] hover:underline">Пользовательское соглашение →</Link>
            <Link href="/legal/oferta" className="text-sm text-[var(--color-brand)] hover:underline">Публичная оферта →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
