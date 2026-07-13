"use client";
import { PORTAL_ORIGIN, getNestedValue } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

interface EditableSlotProps {
  slotId: string;
  defaultValue?: string;
  className?: string;
}

export function EditableSlot({ slotId, defaultValue = "", className }: EditableSlotProps) {
  const { editMode, effectiveContent, patchSlot, currentBp } = useEditMode();
  const value = (getNestedValue(effectiveContent, slotId) as string | undefined) ?? defaultValue;

  function handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
    const updated = patchSlot(slotId, e.currentTarget.textContent ?? "");
    window.parent.postMessage({ type: "CONTENT_CHANGED", content: updated }, PORTAL_ORIGIN);
  }

  return (
    <span
      data-slot-id={slotId}
      data-bp={editMode ? currentBp : undefined}
      contentEditable={editMode || undefined}
      suppressContentEditableWarning={editMode}
      onBlur={editMode ? handleBlur : undefined}
      className={className}
      style={
        editMode && currentBp !== "desktop"
          ? { outline: "2px dashed #f59e0b", outlineOffset: "1px", borderRadius: "2px" }
          : undefined
      }
    >
      {value}
    </span>
  );
}
