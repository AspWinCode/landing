"use client";
import { useEffect } from "react";
import { PORTAL_ORIGIN } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

export function EditBridge() {
  const { setEditMode, setContent } = useEditMode();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") !== "1") return;

    setEditMode(true);
    window.parent.postMessage({ type: "READY" }, PORTAL_ORIGIN);

    function handleMessage(e: MessageEvent) {
      if (e.origin !== PORTAL_ORIGIN) return;
      if (e.data?.type === "INIT" || e.data?.type === "SET_CONTENT") {
        setContent(e.data.content ?? {});
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setEditMode, setContent]);

  return null;
}
