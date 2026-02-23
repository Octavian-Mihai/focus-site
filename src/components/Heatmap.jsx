import { useMemo } from "react";
import { useStatsStore } from "../stores/useStatsStore";
import { subDays, eachDayOfInterval, format } from "date-fns";

function getColor(score) {
  if (!score) return "bg-white/[0.04]";
  if (score >= 90) return "bg-emerald-400";
  if (score >= 70) return "bg-emerald-600";
  if (score >= 50) return "bg-amber-600";
  if (score >= 25) return "bg-orange-700";
  return "bg-red-900";
}

export default function Heatmap() {
  const history = useStatsStore((s) => s.history);

  const days = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 89);
    return eachDayOfInterval({ start, end });
  }, []);

  const weeks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < days.length; i += 7) chunks.push(days.slice(i, i + 7));
    return chunks;
  }, [days]);

  return (
    <div className="bg-[#16161e] border border-white/5 rounded-2xl p-4">
      <p className="text-white/35 text-[10px] uppercase tracking-wide mb-3">
        90-Day Discipline Heatmap
      </p>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 shrink-0">
            {week.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const stats = history[key];
              return (
                <div
                  key={key}
                  className={"w-2.5 h-2.5 rounded-[2px] " + getColor(stats?.disciplineScore)}
                  title={key + ": " + (stats?.disciplineScore ?? 0)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-white/25 text-[10px]">Low</span>
        {["bg-white/[0.04]", "bg-red-900", "bg-amber-600", "bg-emerald-600", "bg-emerald-400"].map((c, i) => (
          <div key={i} className={"w-2.5 h-2.5 rounded-[2px] " + c} />
        ))}
        <span className="text-white/25 text-[10px]">High</span>
      </div>
    </div>
  );
}
