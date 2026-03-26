import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSession } from "../models/Session";

const today = () => new Date().toISOString().split("T")[0];

export const useSessionStore = create(
  persist(
    (set, get) => ({
      sessions: [],
      activeSession: null,
      lastDate: today(),

      checkDayReset: () => {
        const current = today();
        if (get().lastDate !== current) {
          set({ sessions: [], activeSession: null, lastDate: current });
        }
      },

      startSession: () => {
        get().checkDayReset();
        set({ activeSession: createSession({ startTime: Date.now() }) });
      },

      endSession: () => {
        get().checkDayReset();
        const { activeSession, sessions } = get();
        if (!activeSession) return;
        set({
          sessions: [...sessions, { ...activeSession, endTime: Date.now() }],
          activeSession: null,
        });
      },

      addInterruption: () =>
        set((s) => ({
          activeSession: s.activeSession
            ? { ...s.activeSession, interruptions: s.activeSession.interruptions + 1 }
            : null,
        })),

      // NEW
      deleteSession: (id) =>
        set((s) => ({ sessions: s.sessions.filter((s) => s.id !== id) })),

      updateSession: (id, changes) =>
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === id ? { ...sess, ...changes } : sess
          ),
        })),

      clearSessions: () => set({ sessions: [], activeSession: null }),
    }),
    {
      name: "focusaccount-sessions",
      // Runs once after rehydration — triggers day reset automatically
      onRehydrateStorage: () => (state) => {
        state?.checkDayReset();
      },
    }
  )
);
