# TirSkix Academy — лендинг

Маркетинговый сайт онлайн-школы программирования для детей 10–18 лет.  
Стек: **Next.js 16** / **React 19** / **Tailwind CSS v4** / **TypeScript**

## Быстрый старт

```bash
npm install
npm run dev        # http://localhost:3000
```

Для полного функционала (CMS, блог, аналитика) нужен запущенный инстанс [tirskix.space](https://tirskix.space).  
Без него сайт работает с дефолтным контентом из `src/lib/tracks.ts`.

## Переменные окружения

| Переменная | По умолчанию | Назначение |
|---|---|---|
| `PORTAL_API_URL` | `https://tirskix.space` | API портала (CMS, блог, настройки) |

Создайте `.env.local` в корне `frontend/` при необходимости переопределить.

## Структура `src/`

```
app/                  # Next.js App Router — страницы и API-роуты
  layout.tsx          # Корневой layout (шрифты, аналитика, CMS bootstrap)
  page.tsx            # Главная страница
  [slug]/             # Универсальный fallback для CMS-страниц
  sitemap.ts          # /sitemap.xml (статика + динамические посты блога)
  robots.ts           # /robots.txt
components/
  edit/               # CMS-режим редактирования (EditBridge, LayerZone, ...)
  forms/              # Форма заявки (TrialForm) и контактная форма
  layout/             # Header, Footer, AnnouncementBanner
  sections/           # Секции главной страницы (Hero, Tracks, Results, ...)
  ui/                 # Button и прочие атомарные компоненты
lib/
  portal.ts           # Клиент API портала (CMS, блог, настройки)
  seo.ts              # Утилиты метаданных и JSON-LD (buildPageMetadata, buildBreadcrumbJsonLd)
  tracks.ts           # Дефолтный контент треков (Игровая студия / Кодэкс / ТехноЛаб)
  theme.ts            # Генерация CSS-переменных из бренд-цвета
```

## Сборка и Docker

```bash
npm run build          # Standalone-сборка в .next/standalone/
node .next/standalone/server.js   # Запуск в проде
```

Или через Docker (Dockerfile в корне репо).

## CI/CD

- **Lighthouse CI** — `.github/workflows/lighthouse.yml`: аудит производительности и SEO против продакшн-URL при каждом PR и пуше в master.
- Бюджеты производительности — `budget.json` в корне репо.
