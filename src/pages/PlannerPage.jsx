import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Timeline from "../components/Timeline";
import TimerWidget from "../components/TimerWidget";
import Dashboard from "../components/Dashboard";
import FocusMode from "../components/FocusMode";
import Heatmap from "../components/Heatmap";
import { usePlanStore } from "../stores/usePlanStore";

export default function PlannerPage() {
  const [focusMode, setFocusMode] = useState(false);
  const clearBlocks = usePlanStore((s) => s.clearBlocks);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#0a0a0e] text-white">
        {/* Left sidebar */}
        <aside className="w-[300px] shrink-0 flex flex-col gap-3 p-4 border-r border-white/[0.06] overflow-y-auto">
          {/* Header */}
          <div className="pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-xs font-bold">F</div>
              <h1 className="text-sm font-semibold text-white">FocusAccount</h1>
            </div>
          </div>

          <TimerWidget onFocusMode={() => setFocusMode(true)} />
          <Dashboard />
          <Heatmap />

          <button
            className="text-[10px] text-white/20 hover:text-red-400 transition-colors text-left mt-auto pt-2"
            onClick={clearBlocks}
          >
            Clear all blocks
          </button>
        </aside>

        {/* Main timeline */}
        <main className="flex-1 flex flex-col p-4 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h2>
              <p className="text-white/30 text-xs mt-0.5">Click and drag to plan blocks • Click blocks to edit</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-violet-600/80 inline-block" />
                Planned
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-sky-400/60 inline-block" />
                Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                Now
              </span>
            </div>
          </div>
          <Timeline />
        </main>
      </div>

      <AnimatePresence>
        {focusMode && <FocusMode onExit={() => setFocusMode(false)} />}
      </AnimatePresence>
    </>
  );
}
