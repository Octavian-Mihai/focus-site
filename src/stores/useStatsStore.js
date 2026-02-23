import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStatsStore = create(
  persist(
    (set) => ({
      history: {},
      saveStats: (date, stats) =>
        set((s) => ({ history: { ...s.history, [date]: stats } })),
    }),
    { name: "focusaccount-stats" }
  )
);
