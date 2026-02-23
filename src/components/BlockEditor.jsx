import { useState } from "react";
import { motion } from "framer-motion";
import { usePlanStore } from "../stores/usePlanStore";
import { minutesToTime, timeToMinutes } from "../utils/timeUtils";

const TYPE_OPTIONS = ["focus", "break", "lunch", "other"];

export default function BlockEditor({ block, onClose }) {
  const updateBlock = usePlanStore((s) => s.updateBlock);
  const deleteBlock = usePlanStore((s) => s.deleteBlock);
  const [label, setLabel] = useState(block.label || "");
  const [type, setType] = useState(block.type);
  const [start, setStart] = useState(minutesToTime(block.startTime));
  const [end, setEnd] = useState(minutesToTime(block.endTime));

  const save = () => {
    updateBlock(block.id, {
      label,
      type,
      startTime: timeToMinutes(start),
      endTime: timeToMinutes(end),
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#16161e] border border-white/10 rounded-2xl p-6 w-80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold mb-4 text-sm">Edit Block</h3>
        <div className="space-y-3">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500 transition-colors"
            placeholder="Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <select
            className="w-full bg-[#1e1e2a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500 transition-colors"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t} className="bg-[#1e1e2a]">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-white/30 text-[10px] mb-1 block">Start</label>
              <input
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-white/30 text-[10px] mb-1 block">End</label>
              <input
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-xl py-2.5 font-medium transition-colors"
            onClick={save}
          >
            Save
          </button>
          <button
            className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm rounded-xl py-2.5 transition-colors"
            onClick={() => { deleteBlock(block.id); onClose(); }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
