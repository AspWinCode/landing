"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { List, X, Moon, Sun } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Игровая студия", href: "/game-studio" },
  { label: "Кодэкс", href: "/kodeks" },
  { label: "ТехноЛаб", href: "/technolab" },
  { label: "Направления", href: "/napravleniya-razrabotki" },
  { label: "Мероприятия", href: "/aktivnosti" },
  { label: "Блог", href: "/blog" },
  { label: "О нас", href: "/o-nas" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="TirSkix Academy — главная"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm leading-none select-none">T</span>
          </div>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-extrabold text-base text-[var(--color-text-primary)]">TirSkix</span>
            <span className="text-[var(--color-brand)] text-xs font-semibold -mt-0.5">Academy</span>
          </span>
          <span className="sm:hidden font-heading font-extrabold text-base text-[var(--color-text-primary)]">
            TirSkix
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Основное меню">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-subtle)] rounded-lg transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-brand)] transition-colors"
            aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}
          >
            {theme === "light"
              ? <Moon size={18} weight="fill" />
              : <Sun size={18} weight="fill" />}
          </button>

          <Link
            href="/besplatnyj-probnyj-urok"
            className={cn(buttonClass("primary", "sm"), "hidden sm:inline-flex")}
          >
            Пробный урок
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 border-t border-[var(--color-border)]",
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="container py-4 flex flex-col gap-1" aria-label="Мобильное меню">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-subtle)] rounded-xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[var(--color-border)]">
            <Link
              href="/besplatnyj-probnyj-urok"
              className={buttonClass("primary", "md", "w-full")}
              onClick={() => setMenuOpen(false)}
            >
              Записаться на пробный урок
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
