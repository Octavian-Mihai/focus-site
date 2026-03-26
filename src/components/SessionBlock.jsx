import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { minutesToPx, minutesToTime } from "../utils/timeUtils";
import { useSessionStore } from "../stores/useSessionStore";

function SessionEditor({ session, onClose }) {
  const { updateSession, deleteSession } = useSessionStore();

  const toTimeStr = (epoch) => {
    const d = new Date(epoch);
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
  };

  const toEpoch = (timeStr, referenceEpoch) => {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(referenceEpoch);
    d.setHours(h, m, 0, 0);
    return d.getTime();
  };

  const [start, setStart] = useState(toTimeStr(session.startTime));
  const [end, setEnd] = useState(toTimeStr(session.endTime));

  const save = () => {
    updateSession(session.id, {
      startTime: toEpoch(start, session.startTime),
      endTime: toEpoch(end, session.endTime),
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
        <h3 className="text-white font-semibold mb-1 text-sm">Edit Actual Session</h3>
        <p className="text-white/30 text-xs mb-4">Correct inaccurate start/end times</p>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-white/30 text-[10px] mb-1 block">Start</label>
            <input
              type="time"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-sky-500"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-white/30 text-[10px] mb-1 block">End</label>
            <input
              type="time"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-sky-500"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white text-sm rounded-xl py-2.5 font-medium transition-colors"
            onClick={save}
          >
            Save
          </button>
          <button
            className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm rounded-xl py-2.5 transition-colors"
            onClick={() => { deleteSession(session.id); onClose(); }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SessionBlock({ session }) {
  const [editing, setEditing] = useState(false);
  const isActive = !session.endTime;

  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime || Date.now());
  const startMins = startDate.getHours() * 60 + startDate.getMinutes();
  const endMins = endDate.getHours() * 60 + endDate.getMinutes();
  const top = minutesToPx(startMins);
  const height = Math.max(minutesToPx(endMins - startMins), 3);

  return (
    <>
      <div
        className={
          "absolute left-14 right-2 rounded-md border border-dashed border-sky-400/60 bg-sky-500/20 px-2 py-1 text-xs " +
          (isActive ? "pointer-events-none" : "cursor-pointer hover:bg-sky-500/30 transition-colors")
        }
        style={{ top, height }}
        onClick={isActive ? undefined : () => setEditing(true)}
      >
        <div className="font-semibold text-sky-300 truncate leading-tight">
          {isActive ? "Actual (live)" : "Actual"}
        </div>
        {height > 30 && (
          <div className="text-sky-400/60 text-[10px]">
            {minutesToTime(startMins)} – {isActive ? "now" : minutesToTime(endMins)}
          </div>
        )}
        {!isActive && (
          <button
            className="absolute top-0.5 right-1 text-sky-400/30 hover:text-red-400 transition-colors text-sm leading-none"
            onClick={(e) => {
              e.stopPropagation();
              useSessionStore.getState().deleteSession(session.id);
            }}
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {editing && <SessionEditor session={session} onClose={() => setEditing(false)} />}
      </AnimatePresence>
    </>
  );
}
