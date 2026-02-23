import { useTimer } from "../hooks/useTimer";
import { useSessionStore } from "../stores/useSessionStore";
import { useTimerStore } from "../stores/useTimerStore";

export default function TimerWidget({ onFocusMode }) {
  const { display, running } = useTimer();
  const { start, pause, resume, stop } = useTimerStore();
  const { startSession, endSession } = useSessionStore();
  const activeSession = useSessionStore((s) => s.activeSession);

  const handleStart = () => { startSession(); start(); };
  const handleStop = () => { stop(); endSession(); };

  return (
    <div className="bg-[#16161e] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-xs font-medium tracking-wide uppercase">Focus Timer</span>
        {activeSession && (
          <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-medium animate-pulse">
            LIVE
          </span>
        )}
      </div>

      <div className="text-center font-mono text-4xl font-bold text-white tracking-widest tabular-nums">
        {display}
      </div>

      <div className="flex gap-2">
        {!activeSession ? (
          <button
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            onClick={handleStart}
          >
            Start Session
          </button>
        ) : (
          <>
            <button
              className="flex-1 bg-white/8 hover:bg-white/15 text-white rounded-xl py-2.5 text-sm transition-colors border border-white/10"
              onClick={running ? pause : resume}
            >
              {running ? "Pause" : "Resume"}
            </button>
            <button
              className="flex-1 bg-red-600/80 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
              onClick={handleStop}
            >
              Stop
            </button>
          </>
        )}
        {activeSession && (
          <button
            className="bg-white/5 hover:bg-white/10 text-white/50 rounded-xl px-3 text-base transition-colors border border-white/10"
            onClick={onFocusMode}
            title="Enter Focus Mode"
          >
            ⛶
          </button>
        )}
      </div>
    </div>
  );
}
