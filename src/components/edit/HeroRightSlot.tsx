"use client";
import Image from "next/image";
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
    <Image
      src={url}
      alt=""
      width={600}
      height={450}
      priority
      unoptimized
      className="w-full h-auto rounded-2xl object-contain shadow-[0_20px_60px_-10px_rgba(127,35,204,0.3)]"
    />
  );
}
