import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPlanBlock } from "../models/PlanBlock";

export const usePlanStore = create(
  persist(
    (set) => ({
      blocks: [],
      addBlock: (data) =>
        set((s) => ({ blocks: [...s.blocks, createPlanBlock(data)] })),
      updateBlock: (id, changes) =>
        set((s) => ({
          blocks: s.blocks.map((b) => (b.id === id ? { ...b, ...changes } : b)),
        })),
      deleteBlock: (id) =>
        set((s) => ({ blocks: s.blocks.filter((b) => b.id !== id) })),
      clearBlocks: () => set({ blocks: [] }),
    }),
    { name: "focusaccount-plan" }
  )
);
