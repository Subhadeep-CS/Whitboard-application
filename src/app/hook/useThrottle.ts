import { useRef, useCallback } from "react";

export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastCall.current === null || now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - (now - (lastCall.current ?? 0)));
      }
    },
    [callback, delay]
  );

  return throttledFunction as T;
}
