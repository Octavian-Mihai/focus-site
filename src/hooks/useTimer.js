import { useTimerStore } from "../stores/useTimerStore";

export function useTimer() {
  const { elapsed, running, start, pause, resume, stop } = useTimerStore();
  const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  return {
    elapsed,
    running,
    display: hours + ":" + minutes + ":" + seconds,
    start,
    pause,
    resume,
    stop,
  };
}
