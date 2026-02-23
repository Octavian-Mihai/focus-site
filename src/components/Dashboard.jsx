import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePlanStore } from "../stores/usePlanStore";
import { useSessionStore } from "../stores/useSessionStore";
import { calcTotalMinutes, calcEfficiency } from "../utils/metricsUtils";
import { calcDisciplineScore, scoreLabel } from "../utils/scoreUtils";
import { formatDuration } from "../utils/timeUtils";
import { useTimer } from "../hooks/useTimer";

function StatCard({ label, value, accent = "text-white", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1a1a24] border border-white/5 rounded-xl p-3"
    >
      <p className="text-white/35 text-[10px] uppercase tracking-wide mb-1">{label}</p>
      <p className={"text-xl font-bold " + accent}>{value}</p>
    </motion.div>
  );
}

export default function Dashboard() {
  const planBlocks = usePlanStore((s) => s.blocks.filter((b) => b.type === "focus"));
  const sessions = useSessionStore((s) => s.sessions);
  const activeSession = useSessionStore((s) => s.activeSession);
  const { display, running } = useTimer();

  const plannedMins = useMemo(() => calcTotalMinutes(planBlocks), [planBlocks]);

  const actualMins = useMemo(() =>
    sessions.reduce((acc, s) => {
      if (!s.endTime) return acc;
      return acc + Math.round((s.endTime - s.startTime) / 60000);
    }, 0),
    [sessions]
  );

  const totalInterruptions = sessions.reduce((a, s) => a + (s.interruptions || 0), 0);
  const efficiency = calcEfficiency(actualMins, plannedMins);
  const disciplineScore = calcDisciplineScore({
    plannedMinutes: plannedMins,
    actualMinutes: actualMins,
    interruptions: totalInterruptions,
    adherenceRatio: efficiency / 100,
  });
  const { label: scoreText, color: scoreColor } = scoreLabel(disciplineScore);

  return (
    <div className="space-y-3">
      {/* Discipline Score Card */}
      <div className="bg-[#16161e] border border-white/5 rounded-2xl p-4">
        <p className="text-white/35 text-[10px] uppercase tracking-wide mb-2">Discipline Score</p>
        <div className="flex items-end gap-2 mb-3">
          <span className={"text-5xl font-black tabular-nums " + scoreColor}>{disciplineScore}</span>
          <span className={"text-xs font-medium mb-1.5 " + scoreColor}>{scoreText}</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: disciplineScore + "%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Planned" value={formatDuration(plannedMins)} accent="text-violet-400" delay={0.05} />
        <StatCard label="Actual" value={formatDuration(actualMins)} accent="text-sky-400" delay={0.1} />
        <StatCard
          label="Efficiency"
          value={efficiency + "%"}
          accent={efficiency >= 80 ? "text-emerald-400" : efficiency >= 50 ? "text-amber-400" : "text-red-400"}
          delay={0.15}
        />
        <StatCard label="Sessions" value={String(sessions.length)} delay={0.2} />
        <StatCard
          label="Interruptions"
          value={String(totalInterruptions)}
          accent={totalInterruptions > 5 ? "text-red-400" : "text-white"}
          delay={0.25}
        />
        {running && activeSession && (
          <StatCard label="Active" value={display} accent="text-rose-400" delay={0.3} />
        )}
      </div>
    </div>
  );
}
