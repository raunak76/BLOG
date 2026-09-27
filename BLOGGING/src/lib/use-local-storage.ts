import { useCallback, useEffect, useState } from "react";

/**
 * Reads/writes JSON in localStorage. Starts from `initial` so SSR and the first
 * client render agree, then hydrates from storage in an effect.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore unreadable storage */
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore full/blocked storage */
    }
  }, [key, value, loaded]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return { value, setValue, loaded, reset };
}
