export const MINUTES_IN_DAY = 1440;
export const SNAP_MINUTES = 5;
export const TIMELINE_HEIGHT_PX = 1440 * 3; 
export function minutesToPx(minutes) {
  return (minutes / MINUTES_IN_DAY) * TIMELINE_HEIGHT_PX;
}

export function pxToMinutes(px) {
  return Math.round((px / TIMELINE_HEIGHT_PX) * MINUTES_IN_DAY);
}

export function snapToGrid(minutes) {
  return Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
}

export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

export function nowToMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? h + "h " + m + "m" : m + "m";
}

export function generateTimeLabels() {
  const labels = [];
  for (let h = 0; h < 24; h++) {
    labels.push({ time: String(h).padStart(2, "0") + ":00", minutes: h * 60 });
  }
  return labels;
}
