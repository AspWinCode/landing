"use client";
import { PORTAL_ORIGIN, getNestedValue } from "@/lib/edit-mode";
import { useEditMode } from "./EditModeContext";

interface EditableSlotProps {
  slotId: string;
  defaultValue?: string;
  className?: string;
}

export function EditableSlot({ slotId, defaultValue = "", className }: EditableSlotProps) {
  const { editMode, content, patchContent } = useEditMode();
  const value = (getNestedValue(content, slotId) as string | undefined) ?? defaultValue;

  function handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
    const updated = patchContent(slotId, e.currentTarget.textContent ?? "");
    window.parent.postMessage({ type: "CONTENT_CHANGED", content: updated }, PORTAL_ORIGIN);
  }

  return (
    <span
      data-slot-id={slotId}
      contentEditable={editMode || undefined}
      suppressContentEditableWarning={editMode}
      onBlur={editMode ? handleBlur : undefined}
      className={className}
    >
      {value}
    </span>
  );
}
