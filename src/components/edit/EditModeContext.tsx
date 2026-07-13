"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { patchNested } from "@/lib/edit-mode";

interface EditModeContextValue {
  editMode: boolean;
  content: Record<string, unknown>;
  setEditMode: (v: boolean) => void;
  setContent: (c: Record<string, unknown>) => void;
  patchContent: (slotId: string, value: unknown) => Record<string, unknown>;
}

const EditModeContext = createContext<EditModeContextValue>({
  editMode: false,
  content: {},
  setEditMode: () => {},
  setContent: () => {},
  patchContent: () => ({}),
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>>({});

  function patchContent(slotId: string, value: unknown): Record<string, unknown> {
    const updated = patchNested(content, slotId, value);
    setContent(updated);
    return updated;
  }

  return (
    <EditModeContext.Provider value={{ editMode, content, setEditMode, setContent, patchContent }}>
      {children}
    </EditModeContext.Provider>
  );
}
