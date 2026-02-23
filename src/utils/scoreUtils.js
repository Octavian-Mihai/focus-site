export function calcDisciplineScore({ plannedMinutes, actualMinutes, interruptions, adherenceRatio }) {
  const completionScore = Math.min(1, actualMinutes / (plannedMinutes || 1)) * 50;
  const adherenceScore = (adherenceRatio != null ? adherenceRatio : 1) * 30;
  const interruptionPenalty = Math.min(20, (interruptions || 0) * 4);
  const raw = completionScore + adherenceScore - interruptionPenalty;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function scoreLabel(score) {
  if (score >= 90) return { label: "Exceptional", color: "text-emerald-400" };
  if (score >= 75) return { label: "Strong", color: "text-green-400" };
  if (score >= 55) return { label: "Moderate", color: "text-yellow-400" };
  if (score >= 35) return { label: "Weak", color: "text-orange-400" };
  return { label: "Poor", color: "text-red-400" };
}
