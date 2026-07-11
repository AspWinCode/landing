'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from '@phosphor-icons/react';

interface Props {
  text: string;
  href?: string | null;
  style?: string;
}

export function AnnouncementBanner({ text, href, style = 'brand' }: Props) {
  const dismissKey = `ann-v1-${text}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(dismissKey)) setVisible(true);
  }, [dismissKey]);

  const dismiss = () => {
    sessionStorage.setItem(dismissKey, '1');
    setVisible(false);
  };

  if (!visible) return null;

  const bgStyle =
    style === 'green'
      ? { background: '#16a34a', color: '#fff' }
      : style === 'yellow'
      ? { background: '#d97706', color: '#fff' }
      : { background: 'var(--color-brand)', color: '#fff' };

  const inner = <span className="text-sm font-semibold leading-tight">{text}</span>;

  return (
    <div style={bgStyle} className="w-full flex items-center justify-center gap-3 px-10 py-2.5 relative">
      {href ? (
        <Link href={href} className="hover:underline underline-offset-2 flex items-center gap-2">
          {inner}
          <span className="text-xs opacity-75">→</span>
        </Link>
      ) : (
        inner
      )}
      <button
        onClick={dismiss}
        aria-label="Закрыть объявление"
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity p-1"
      >
        <X size={16} weight="bold" />
      </button>
    </div>
  );
}
