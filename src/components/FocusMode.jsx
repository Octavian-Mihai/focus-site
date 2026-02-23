import { motion } from "framer-motion";
import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../stores/useTimerStore";
import { useSessionStore } from "../stores/useSessionStore";

export default function FocusMode({ onExit }) {
  const { display, running } = useTimer();
  const { pause, resume, stop } = useTimerStore();
  const { endSession, addInterruption } = useSessionStore();

  const handleStop = () => { stop(); endSession(); onExit(); };
  const handlePause = () => { pause(); addInterruption(); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #0e0012, #0a001a, #000d1a, #00101a)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
      }}
    >
      {/* Ambient glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className="relative z-10 text-center px-8"
      >
        

        <div className="font-mono font-black text-white tabular-nums leading-none mb-10"
          style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}>
          {display}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-white/8 hover:bg-white/15 text-white px-8 py-3 rounded-2xl text-sm font-medium backdrop-blur-sm transition-all border border-white/10"
            onClick={running ? handlePause : resume}
          >
            {running ? "Pause" : "Resume"}
          </button>
          <button
            className="bg-rose-600/90 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl text-sm font-semibold transition-all"
            onClick={handleStop}
          >
            End Session
          </button>
          <button
            className="bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 px-4 py-3 rounded-2xl text-sm transition-all border border-white/5"
            onClick={onExit}
          >
            ↙ Minimize
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
