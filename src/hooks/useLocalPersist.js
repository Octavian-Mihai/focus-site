import { useEffect } from "react";

export function useLocalPersist(key, value) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("LocalStorage write failed", e);
    }
  }, [key, value]);
}
