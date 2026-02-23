import { useRef, useState, useCallback } from "react";
import { pxToMinutes, snapToGrid } from "../utils/timeUtils";
import { usePlanStore } from "../stores/usePlanStore";

export function useDragCreate(timelineRef) {
  const addBlock = usePlanStore((s) => s.addBlock);
  const [preview, setPreview] = useState(null);
  const dragStart = useRef(null);
  const isDragging = useRef(false);

  const onMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top + timelineRef.current.scrollTop;
      const mins = snapToGrid(pxToMinutes(y));
      dragStart.current = mins;
      isDragging.current = false;
      setPreview({ startTime: mins, endTime: mins + 15 });
    },
    [timelineRef]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (dragStart.current === null) return;
      isDragging.current = true;
      const rect = timelineRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top + timelineRef.current.scrollTop;
      const mins = snapToGrid(pxToMinutes(y));
      setPreview({
        startTime: Math.min(dragStart.current, mins),
        endTime: Math.max(dragStart.current + 15, mins),
      });
    },
    [timelineRef]
  );

  const onMouseUp = useCallback(() => {
    if (isDragging.current && preview && preview.endTime - preview.startTime >= 15) {
      addBlock({ startTime: preview.startTime, endTime: preview.endTime, type: "focus" });
    }
    dragStart.current = null;
    isDragging.current = false;
    setPreview(null);
  }, [preview, addBlock]);

  return { preview, onMouseDown, onMouseMove, onMouseUp };
}
