import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const VARIANTS = {
  primary:
    "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] shadow-[var(--shadow-cta)] border-2 border-transparent",
  secondary:
    "bg-[var(--color-surface-raised)] text-[var(--color-brand)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border)]",
  outline:
    "border-2 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-bg-subtle)]",
  ghost: "text-[var(--color-brand)] hover:bg-[var(--color-bg-subtle)]",
};

const SIZES = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export function buttonClass(
  variant: keyof typeof VARIANTS = "primary",
  size: keyof typeof SIZES = "md",
  extra?: string
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], extra);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
