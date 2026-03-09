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
        const { lastDate } = get();

        if (lastDate !== current) {
          set({
            sessions: [],
            activeSession: null,
            lastDate: current,
          });
        }
      },

      startSession: () => {
        get().checkDayReset();

        const session = createSession({ startTime: Date.now() });
        set({ activeSession: session });
      },

      endSession: () => {
        get().checkDayReset();

        const { activeSession, sessions } = get();
        if (!activeSession) return;

        const ended = { ...activeSession, endTime: Date.now() };

        set({
          sessions: [...sessions, ended],
          activeSession: null,
        });
      },

      addInterruption: () =>
        set((s) => ({
          activeSession: s.activeSession
            ? {
                ...s.activeSession,
                interruptions: s.activeSession.interruptions + 1,
              }
            : null,
        })),

      clearSessions: () => set({ sessions: [], activeSession: null }),
    }),
    { name: "focusaccount-sessions" }
  )
)