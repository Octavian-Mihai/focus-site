import { useRef, useState } from "react";
import { generateTimeLabels, minutesToPx, TIMELINE_HEIGHT_PX } from "../utils/timeUtils";
import { usePlanStore } from "../stores/usePlanStore";
import { useSessionStore } from "../stores/useSessionStore";
import { useDragCreate } from "../hooks/useDragBlock";
import TimelineBlock from "./TimelineBlock";
import SessionBlock from "./SessionBlock";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import BlockEditor from "./BlockEditor";
import { AnimatePresence } from "framer-motion";

export default function Timeline() {
  const blocks = usePlanStore((s) => s.blocks);
  const sessions = useSessionStore((s) => s.sessions);
  const activeSession = useSessionStore((s) => s.activeSession);
  const [editBlock, setEditBlock] = useState(null);
  const timelineRef = useRef(null);
  const { preview, onMouseDown, onMouseMove, onMouseUp } = useDragCreate(timelineRef);
  const labels = generateTimeLabels();

  return (
    <div className="relative flex-1 overflow-y-auto bg-[#0e0e12] rounded-xl border border-white/5">
      <div
        ref={timelineRef}
        className="relative"
        style={{ height: TIMELINE_HEIGHT_PX, userSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Hour lines */}
        {labels.map(({ time, minutes }) => (
          <div
            key={time}
            className="absolute left-0 right-0 flex items-center pointer-events-none"
            style={{ top: minutesToPx(minutes) }}
          >
            <span className="w-12 text-right text-[10px] text-white/25 pr-2 shrink-0">{time}</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        ))}

        {/* 15-min sub-lines */}
        {Array.from({ length: 96 }).map((_, i) => (
          i % 4 !== 0 && (
            <div
              key={i}
              className="absolute left-12 right-0 h-px bg-white/[0.02] pointer-events-none"
              style={{ top: minutesToPx(i * 15) }}
            />
          )
        ))}

        {/* Planned blocks */}
        {blocks.map((b) => (
          <TimelineBlock key={b.id} block={b} onEdit={setEditBlock} />
        ))}

        {/* Actual session blocks */}
        {sessions.map((s) => (
          <SessionBlock key={s.id} session={s} />
        ))}
        {activeSession && <SessionBlock session={activeSession} />}

        {/* Drag preview */}
        {preview && (
          <div
            className="absolute left-14 right-2 rounded-md bg-violet-400/15 border border-violet-400/50 border-dashed pointer-events-none"
            style={{
              top: minutesToPx(preview.startTime),
              height: minutesToPx(preview.endTime - preview.startTime),
            }}
          />
        )}

        <CurrentTimeIndicator />
      </div>

      <AnimatePresence>
        {editBlock && (
          <BlockEditor block={editBlock} onClose={() => setEditBlock(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
