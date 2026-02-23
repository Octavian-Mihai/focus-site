import { v4 as uuidv4 } from "uuid";

export function createPlanBlock({ startTime, endTime, type = "focus", label = "" }) {
  return { id: uuidv4(), startTime, endTime, type, label };
}
