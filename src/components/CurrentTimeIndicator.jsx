import { useEffect, useState } from "react";
import { minutesToPx, nowToMinutes } from "../utils/timeUtils";

export default function CurrentTimeIndicator() {
  const [minutes, setMinutes] = useState(nowToMinutes());

  useEffect(() => {
    const id = setInterval(() => setMinutes(nowToMinutes()), 30000);
    return () => clearInterval(id);
  }, []);

  const top = minutesToPx(minutes);

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{ top }}
    >
      <div className="flex items-center">
        <div
          className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-[42px] shrink-0"
          style={{ boxShadow: "0 0 8px rgba(244,63,94,0.9)" }}
        />
        <div className="flex-1 h-px bg-rose-500 opacity-70" />
      </div>
    </div>
  );
}
