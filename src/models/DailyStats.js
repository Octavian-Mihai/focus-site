export function createDailyStats(date) {
  return {
    date,
    plannedFocusMinutes: 0,
    actualFocusMinutes: 0,
    efficiency: 0,
    disciplineScore: 0,
  };
}
