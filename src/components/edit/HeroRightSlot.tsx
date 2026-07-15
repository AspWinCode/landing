"use client";
import { useEditMode } from "./EditModeContext";

interface Props {
  fallback: React.ReactNode;
  serverUrl?: string;
}

export function HeroRightSlot({ fallback, serverUrl }: Props) {
  const { effectiveContent } = useEditMode();
  const hero = effectiveContent.hero as Record<string, unknown> | undefined;
  const url = (hero?.right_image_url as string | undefined) ?? serverUrl ?? "";

  if (!url) return <>{fallback}</>;

  return (
    <img
      src={url}
      alt=""
      className="w-full rounded-2xl object-contain shadow-[0_20px_60px_-10px_rgba(127,35,204,0.3)]"
    />
  );
}
