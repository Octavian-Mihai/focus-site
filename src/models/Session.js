import { v4 as uuidv4 } from "uuid";

export function createSession({ startTime, endTime = null, interruptions = 0 }) {
  return { id: uuidv4(), startTime, endTime, type: "actual", interruptions };
}
