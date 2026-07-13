"use client";
import { useRef, useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { PORTAL_ORIGIN, type LayerDef, type AnimationPreset, type HoverEffect } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

// ── Drag state ────────────────────────────────────────────────────────────────

interface DragState {
  layerId: string;
  startMouseX: number;
  startMouseY: number;
  startLayerX: number;
  startLayerY: number;
}

// ── Animation tables ──────────────────────────────────────────────────────────

const ENTRANCE_INITIAL: Record<string, CSSProperties> = {
  "fade-up":    { opacity: 0, transform: "translateY(40px)" },
  "fade-in":    { opacity: 0 },
  "zoom-in":    { opacity: 0, transform: "scale(0.95)" },
  "slide-left": { opacity: 0, transform: "translateX(-48px)" },
  "slide-right":{ opacity: 0, transform: "translateX(48px)" },
};

const ENTRANCE_TRANSITION =
  "opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1)";

const HOVER_STYLE: Record<HoverEffect, CSSProperties> = {
  none:  {},
  scale: { transform: "scale(1.06)", transition: "transform 0.28s ease" },
  lift:  { transform: "translateY(-6px)", boxShadow: "0 12px 32px rgba(0,0,0,0.18)", transition: "transform 0.28s ease, box-shadow 0.28s ease" },
  glow:  { filter: "brightness(1.12) drop-shadow(0 0 14px rgba(99,102,241,0.7))", transition: "filter 0.28s ease" },
};

const HOVER_BASE_TRANSITION: Record<HoverEffect, CSSProperties> = {
  none:  {},
  scale: { transition: "transform 0.28s ease" },
  lift:  { transition: "transform 0.28s ease, box-shadow 0.28s ease" },
  glow:  { transition: "filter 0.28s ease" },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  sectionId: string;
  children: ReactNode;
  className?: string;
}

export function LayerZone({ sectionId, children, className }: Props) {
  const { editMode, layers, upsertLayer, content } = useEditMode();

  // ── Scroll entrance animation ─────────────────────────────────────────────
  const animations = (content._animations as AnimationPreset[] | undefined) ?? [];
  const entrance = animations.find(a => a.sectionId === sectionId)?.entrance ?? "none";

  const zoneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(entrance === "none");

  useEffect(() => {
    if (entrance === "none") {
      setVisible(true);
      return;
    }
    setVisible(false);
    const el = zoneRef.current;
    if (!el) return;
    // short delay so the browser repaints the initial hidden state first
    const timer = setTimeout(() => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, 30);
    return () => clearTimeout(timer);
  }, [entrance]);

  const entranceInitial = ENTRANCE_INITIAL[entrance] ?? {};
  const wrapperStyle: CSSProperties =
    entrance === "none"
      ? {}
      : visible
      ? { opacity: 1, transform: "none", transition: ENTRANCE_TRANSITION }
      : entranceInitial;

  // ── Layer drag ─────────────────────────────────────────────────────────────
  const dragRef = useRef<DragState | null>(null);
  const [localPos, setLocalPos] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const sectionLayers = layers.filter(l => l.section === sectionId);

  function layerPos(layer: LayerDef) {
    return localPos[layer.id] ?? { x: layer.x, y: layer.y };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLImageElement>, layer: LayerDef) {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      layerId: layer.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startLayerX: layerPos(layer).x,
      startLayerY: layerPos(layer).y,
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLImageElement>) {
    const drag = dragRef.current;
    if (!drag || !zoneRef.current) return;
    const rect = zoneRef.current.getBoundingClientRect();
    const dx = (e.clientX - drag.startMouseX) / rect.width;
    const dy = (e.clientY - drag.startMouseY) / rect.height;
    setLocalPos(prev => ({
      ...prev,
      [drag.layerId]: {
        x: Math.max(-0.5, Math.min(1.5, drag.startLayerX + dx)),
        y: Math.max(-0.5, Math.min(1.5, drag.startLayerY + dy)),
      },
    }));
  }

  function handlePointerUp(_e: React.PointerEvent<HTMLImageElement>, layer: LayerDef) {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    const { x, y } = layerPos(layer);
    const newContent = upsertLayer({ ...layer, x, y });
    window.parent.postMessage({ type: "CONTENT_CHANGED", content: newContent }, PORTAL_ORIGIN);
  }

  return (
    <div ref={zoneRef} style={wrapperStyle} className={`relative${className ? ` ${className}` : ""}`}>
      {children}
      {sectionLayers.map(layer => {
        const { x, y } = layerPos(layer);
        const effect = (layer.hoverEffect ?? "none") as HoverEffect;
        const isHovered = hoveredLayer === layer.id && !dragRef.current;
        const isDragging = dragRef.current?.layerId === layer.id;

        return (
          <img
            key={layer.id}
            src={layer.src}
            alt=""
            data-layer-id={layer.id}
            style={{
              position: "absolute",
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              width: `${layer.w * 100}%`,
              opacity: layer.opacity,
              zIndex: layer.zIndex,
              cursor: editMode ? (isDragging ? "grabbing" : "move") : "default",
              userSelect: "none",
              pointerEvents: editMode ? "auto" : "none",
              outline: editMode ? "2px dashed rgba(99,102,241,0.8)" : "none",
              outlineOffset: "2px",
              touchAction: "none",
              ...HOVER_BASE_TRANSITION[effect],
              ...(isHovered ? HOVER_STYLE[effect] : {}),
            }}
            onPointerDown={e => handlePointerDown(e, layer)}
            onPointerMove={handlePointerMove}
            onPointerUp={e => handlePointerUp(e, layer)}
            onMouseEnter={() => setHoveredLayer(layer.id)}
            onMouseLeave={() => setHoveredLayer(null)}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
