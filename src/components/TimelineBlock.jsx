import { motion } from "framer-motion";
import { minutesToPx, minutesToTime } from "../utils/timeUtils";
import { usePlanStore } from "../stores/usePlanStore";

const TYPE_COLORS = {
  focus: "bg-violet-600/80 border-violet-400/60",
  break: "bg-emerald-600/70 border-emerald-400/60",
  lunch: "bg-amber-600/70 border-amber-400/60",
  other: "bg-slate-600/70 border-slate-400/60",
};

export default function TimelineBlock({ block, onEdit }) {
  const deleteBlock = usePlanStore((s) => s.deleteBlock);
  const top = minutesToPx(block.startTime);
  const height = Math.max(minutesToPx(block.endTime - block.startTime), 22);
  const colorClass = TYPE_COLORS[block.type] || TYPE_COLORS.other;

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.9 }}
      animate={{ opacity: 1, scaleY: 1 }}
      className={"absolute left-14 right-2 rounded-md border px-2 py-1 text-xs cursor-pointer select-none " + colorClass}
      style={{ top, height }}
      onClick={() => onEdit(block)}
    >
      <div className="font-semibold text-white truncate leading-tight">
        {block.label || block.type.charAt(0).toUpperCase() + block.type.slice(1)}
      </div>
      {height > 30 && (
        <div className="text-white/50 text-[10px]">
          {minutesToTime(block.startTime)} – {minutesToTime(block.endTime)}
        </div>
      )}
      <button
        className="absolute top-0.5 right-1 text-white/30 hover:text-red-400 transition-colors text-sm leading-none"
        onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
      >
        ×
      </button>
    </motion.div>
  );
}
