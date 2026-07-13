"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { deepMerge, getBreakpoint, patchNested, type Breakpoint, type LayerDef } from "@/lib/edit-mode";

interface EditModeContextValue {
  editMode: boolean;
  content: Record<string, unknown>;
  effectiveContent: Record<string, unknown>;
  currentBp: Breakpoint;
  layers: LayerDef[];
  setEditMode: (v: boolean) => void;
  setContent: (c: Record<string, unknown>) => void;
  patchContent: (slotId: string, value: unknown) => Record<string, unknown>;
  patchSlot: (slotId: string, value: unknown) => Record<string, unknown>;
  upsertLayer: (layer: LayerDef) => Record<string, unknown>;
  removeLayer: (id: string) => Record<string, unknown>;
}

const EditModeContext = createContext<EditModeContextValue>({
  editMode: false,
  content: {},
  effectiveContent: {},
  currentBp: "desktop",
  layers: [],
  setEditMode: () => {},
  setContent: () => {},
  patchContent: () => ({}),
  patchSlot: () => ({}),
  upsertLayer: () => ({}),
  removeLayer: () => ({}),
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [currentBp, setCurrentBp] = useState<Breakpoint>("desktop");
  const contentRef = useRef(content);
  contentRef.current = content;

  // Track viewport breakpoint (responds to iframe resize from portal)
  useEffect(() => {
    function update() { setCurrentBp(getBreakpoint()); }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function getBpOverrides(bp: Breakpoint): Record<string, unknown> {
    if (bp === "desktop") return {};
    const bps = (contentRef.current._breakpoints as Record<string, unknown> | undefined) ?? {};
    return (bps[bp] as Record<string, unknown> | undefined) ?? {};
  }

  // Effective content = deep merge of base with current bp overrides.
  // Layers, animations and _breakpoints themselves always come from base.
  function buildEffective(c: Record<string, unknown>, bp: Breakpoint): Record<string, unknown> {
    if (bp === "desktop") return c;
    const bps = (c._breakpoints as Record<string, unknown> | undefined) ?? {};
    const overrides = (bps[bp] as Record<string, unknown> | undefined) ?? {};
    const merged = deepMerge(c, overrides);
    // keep system keys from base only
    merged._layers = c._layers;
    merged._animations = c._animations;
    merged._breakpoints = c._breakpoints;
    return merged;
  }

  const effectiveContent = buildEffective(content, currentBp);

  // ── Content patch methods ─────────────────────────────────────────────────

  // Always writes to base content (for desktop or system keys)
  function patchContent(slotId: string, value: unknown): Record<string, unknown> {
    const updated = patchNested(contentRef.current, slotId, value);
    setContent(updated);
    return updated;
  }

  // Writes to _breakpoints[bp][slotId] when on mobile/tablet; base on desktop
  function patchSlot(slotId: string, value: unknown): Record<string, unknown> {
    if (currentBp === "desktop") return patchContent(slotId, value);
    const bps = (contentRef.current._breakpoints as Record<string, unknown> | undefined) ?? {};
    const bpData = (bps[currentBp] as Record<string, unknown> | undefined) ?? {};
    const updatedBpData = patchNested(bpData, slotId, value);
    const updatedBps = { ...bps, [currentBp]: updatedBpData };
    const next = { ...contentRef.current, _breakpoints: updatedBps };
    setContent(next);
    return next;
  }

  // ── Layer helpers ─────────────────────────────────────────────────────────

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
      editMode, content, effectiveContent, currentBp, layers,
      setEditMode, setContent, patchContent, patchSlot,
      upsertLayer, removeLayer,
    }}>
      {children}
    </EditModeContext.Provider>
  );
}
