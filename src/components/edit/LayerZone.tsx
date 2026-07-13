"use client";
import { useRef, useState, type ReactNode } from "react";
import { PORTAL_ORIGIN, type LayerDef } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

interface DragState {
  layerId: string;
  startMouseX: number;
  startMouseY: number;
  startLayerX: number;
  startLayerY: number;
}

interface Props {
  sectionId: string;
  children: ReactNode;
  className?: string;
}

export function LayerZone({ sectionId, children, className }: Props) {
  const { editMode, layers, upsertLayer } = useEditMode();
  const zoneRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [localPos, setLocalPos] = useState<Record<string, { x: number; y: number }>>({});

  const sectionLayers = layers.filter(l => l.section === sectionId);

  function pos(layer: LayerDef) {
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
      startLayerX: pos(layer).x,
      startLayerY: pos(layer).y,
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

  function handlePointerUp(e: React.PointerEvent<HTMLImageElement>, layer: LayerDef) {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    const { x, y } = pos(layer);
    const newContent = upsertLayer({ ...layer, x, y });
    window.parent.postMessage({ type: "CONTENT_CHANGED", content: newContent }, PORTAL_ORIGIN);
  }

  return (
    <div ref={zoneRef} className={`relative${className ? ` ${className}` : ""}`}>
      {children}
      {sectionLayers.map(layer => {
        const { x, y } = pos(layer);
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
              cursor: editMode ? "move" : "default",
              userSelect: "none",
              pointerEvents: editMode ? "auto" : "none",
              outline: editMode ? "2px dashed rgba(99,102,241,0.8)" : "none",
              outlineOffset: "2px",
              touchAction: "none",
            }}
            onPointerDown={e => handlePointerDown(e, layer)}
            onPointerMove={handlePointerMove}
            onPointerUp={e => handlePointerUp(e, layer)}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
