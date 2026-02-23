export function calcEfficiency(actualMinutes, plannedMinutes) {
  if (plannedMinutes === 0) return 0;
  return Math.min(100, Math.round((actualMinutes / plannedMinutes) * 100));
}

export function calcTotalMinutes(blocks) {
  return blocks.reduce((acc, b) => {
    const s = typeof b.startTime === "string"
      ? b.startTime.split(":").reduce((a, t, i) => i === 0 ? a + Number(t) * 60 : a + Number(t), 0)
      : b.startTime;
    const e = typeof b.endTime === "string"
      ? b.endTime.split(":").reduce((a, t, i) => i === 0 ? a + Number(t) * 60 : a + Number(t), 0)
      : b.endTime;
    return acc + (e - s);
  }, 0);
}
