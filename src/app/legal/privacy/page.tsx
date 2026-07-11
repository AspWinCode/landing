import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { absolute: "Политика конфиденциальности — TirSkix Academy" },
  description: "Политика конфиденциальности TirSkix Academy — обработка персональных данных согласно 152-ФЗ.",
  alternates: { canonical: "https://tirskix-academy.com/legal/privacy/" },
  robots: { index: false },
};

export default function PrivacyPage() {
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
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">Актуальна с 1 января 2025 года</p>

          <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mb-3">

            <section>
              <h2>1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
                персональных данных пользователей сайта TirSkix Academy (далее — «Сайт»).
                Использование Сайта означает согласие с настоящей Политикой.
              </p>
              <p className="mt-3">
                Обработка персональных данных осуществляется в соответствии с Федеральным законом
                от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section>
              <h2>2. Оператор данных</h2>
              <p>
                Оператором персональных данных является TirSkix Academy.
                Контактный адрес для вопросов об обработке данных: hello@tirskix-academy.com
              </p>
            </section>

            <section>
              <h2>3. Какие данные мы собираем</h2>
              <p>Мы можем собирать следующие персональные данные:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Имя</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Информация, добровольно предоставленная в форме заявки</li>
                <li>Технические данные (IP-адрес, тип браузера, cookies) — автоматически</li>
              </ul>
            </section>

            <section>
              <h2>4. Цели обработки данных</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Обработка заявок на обучение и пробные уроки</li>
                <li>Связь с потенциальными и действующими учениками и их родителями</li>
                <li>Информирование об услугах, мероприятиях и акциях</li>
                <li>Улучшение качества сайта и сервиса</li>
              </ul>
            </section>

            <section>
              <h2>5. Передача данных третьим лицам</h2>
              <p>
                Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих целях.
                Данные могут передаваться только в случаях, предусмотренных законодательством РФ.
              </p>
            </section>

            <section>
              <h2>6. Хранение и защита данных</h2>
              <p>
                Персональные данные хранятся на защищённых серверах. Мы принимаем технические
                и организационные меры для защиты данных от несанкционированного доступа, изменения и утечки.
              </p>
            </section>

            <section>
              <h2>7. Права субъекта данных</h2>
              <p>Вы вправе:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Получить информацию об обрабатываемых данных</li>
                <li>Потребовать исправления или удаления данных</li>
                <li>Отозвать согласие на обработку</li>
                <li>Обратиться в Роскомнадзор в случае нарушений</li>
              </ul>
              <p className="mt-3">
                Для реализации прав обращайтесь: hello@tirskix-academy.com
              </p>
            </section>

            <section>
              <h2>8. Cookies</h2>
              <p>
                Сайт использует cookies для улучшения работы сервиса. Вы можете отключить cookies
                в настройках браузера, однако некоторые функции сайта могут быть недоступны.
              </p>
            </section>

            <section>
              <h2>9. Изменение политики</h2>
              <p>
                Мы оставляем за собой право изменять настоящую Политику. Актуальная версия
                всегда доступна на этой странице.
              </p>
            </section>
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
