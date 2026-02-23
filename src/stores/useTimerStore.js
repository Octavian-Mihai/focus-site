import { create } from "zustand";

export const useTimerStore = create((set, get) => ({
  running: false,
  startEpoch: null,
  elapsed: 0,
  intervalRef: null,

  start: () => {
    const startEpoch = Date.now() - get().elapsed * 1000;
    const ref = setInterval(() => {
      set({ elapsed: Math.floor((Date.now() - get().startEpoch) / 1000) });
    }, 500);
    set({ running: true, startEpoch, intervalRef: ref });
  },

  pause: () => {
    clearInterval(get().intervalRef);
    set({ running: false });
  },

  resume: () => {
    const startEpoch = Date.now() - get().elapsed * 1000;
    const ref = setInterval(() => {
      set({ elapsed: Math.floor((Date.now() - get().startEpoch) / 1000) });
    }, 500);
    set({ running: true, startEpoch, intervalRef: ref });
  },

  stop: () => {
    clearInterval(get().intervalRef);
    set({ running: false, elapsed: 0, startEpoch: null, intervalRef: null });
  },
}));
