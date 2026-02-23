import { minutesToPx, minutesToTime } from "../utils/timeUtils";

export default function SessionBlock({ session }) {
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime || Date.now());
  const startMins = startDate.getHours() * 60 + startDate.getMinutes();
  const endMins = endDate.getHours() * 60 + endDate.getMinutes();
  const top = minutesToPx(startMins);
  const height = Math.max(minutesToPx(endMins - startMins), 16);

  return (
    <div
      className="absolute left-14 right-2 rounded-md border border-dashed border-sky-400/60 bg-sky-500/20 px-2 py-1 text-xs pointer-events-none"
      style={{ top, height }}
    >
      <div className="font-semibold text-sky-300 truncate leading-tight">Actual</div>
      {height > 30 && (
        <div className="text-sky-400/60 text-[10px]">
          {minutesToTime(startMins)} – {minutesToTime(endMins)}
        </div>
      )}
    </div>
  );
}
