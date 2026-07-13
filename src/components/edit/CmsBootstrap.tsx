"use client";
import { useEffect } from "react";
import { useEditMode } from "./EditModeContext";

interface Props {
  content: Record<string, unknown>;
}

// Feeds server-fetched CMS content (including _layers, _animations, _breakpoints)
// into EditModeContext so they render on the public site after hydration.
export function CmsBootstrap({ content }: Props) {
  const { setContent } = useEditMode();
  useEffect(() => {
    if (Object.keys(content).length > 0) {
      setContent(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
