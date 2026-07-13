"use client";
import { useEffect } from "react";
import { PORTAL_ORIGIN, type LayerDef } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

export function EditBridge() {
  const { setEditMode, setContent, upsertLayer, removeLayer } = useEditMode();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") !== "1") return;

    setEditMode(true);
    window.parent.postMessage({ type: "READY" }, PORTAL_ORIGIN);

    function handleMessage(e: MessageEvent) {
      if (e.origin !== PORTAL_ORIGIN) return;
      const msg = e.data as {
        type: string;
        content?: Record<string, unknown>;
        layer?: LayerDef;
        id?: string;
      };
      if (msg.type === "INIT" || msg.type === "SET_CONTENT") {
        setContent(msg.content ?? {});
      } else if (msg.type === "ADD_LAYER" && msg.layer) {
        const updated = upsertLayer(msg.layer);
        window.parent.postMessage({ type: "CONTENT_CHANGED", content: updated }, PORTAL_ORIGIN);
      } else if (msg.type === "REMOVE_LAYER" && msg.id) {
        const updated = removeLayer(msg.id);
        window.parent.postMessage({ type: "CONTENT_CHANGED", content: updated }, PORTAL_ORIGIN);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setEditMode, setContent, upsertLayer, removeLayer]);

  return null;
}
