import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSession } from "../models/Session";

export const useSessionStore = create(
  persist(
    (set, get) => ({
      sessions: [],
      activeSession: null,
      startSession: () => {
        const session = createSession({ startTime: Date.now() });
        set({ activeSession: session });
      },
      endSession: () => {
        const { activeSession, sessions } = get();
        if (!activeSession) return;
        const ended = { ...activeSession, endTime: Date.now() };
        set({ sessions: [...sessions, ended], activeSession: null });
      },
      addInterruption: () =>
        set((s) => ({
          activeSession: s.activeSession
            ? { ...s.activeSession, interruptions: s.activeSession.interruptions + 1 }
            : null,
        })),
      clearSessions: () => set({ sessions: [], activeSession: null }),
    }),
    { name: "focusaccount-sessions" }
  )
);
