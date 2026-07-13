"use client";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { patchNested, type LayerDef } from "@/lib/edit-mode";

interface EditModeContextValue {
  editMode: boolean;
  content: Record<string, unknown>;
  layers: LayerDef[];
  setEditMode: (v: boolean) => void;
  setContent: (c: Record<string, unknown>) => void;
  patchContent: (slotId: string, value: unknown) => Record<string, unknown>;
  upsertLayer: (layer: LayerDef) => Record<string, unknown>;
  removeLayer: (id: string) => Record<string, unknown>;
}

const EditModeContext = createContext<EditModeContextValue>({
  editMode: false,
  content: {},
  layers: [],
  setEditMode: () => {},
  setContent: () => {},
  patchContent: () => ({}),
  upsertLayer: () => ({}),
  removeLayer: () => ({}),
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  function patchContent(slotId: string, value: unknown): Record<string, unknown> {
    const updated = patchNested(contentRef.current, slotId, value);
    setContent(updated);
    return updated;
  }

  function getLayers(): LayerDef[] {
    return (contentRef.current._layers as LayerDef[] | undefined) ?? [];
  }

  function upsertLayer(layer: LayerDef): Record<string, unknown> {
    const existing = getLayers();
    const idx = existing.findIndex(l => l.id === layer.id);
    const nextLayers = idx >= 0
      ? existing.map(l => l.id === layer.id ? layer : l)
      : [...existing, layer];
    const next = { ...contentRef.current, _layers: nextLayers };
    setContent(next);
    return next;
  }

  function removeLayer(id: string): Record<string, unknown> {
    const next = { ...contentRef.current, _layers: getLayers().filter(l => l.id !== id) };
    setContent(next);
    return next;
  }

  const layers = (content._layers as LayerDef[] | undefined) ?? [];

  return (
    <EditModeContext.Provider value={{
      editMode, content, layers, setEditMode, setContent,
      patchContent, upsertLayer, removeLayer,
    }}>
      {children}
    </EditModeContext.Provider>
  );
}
