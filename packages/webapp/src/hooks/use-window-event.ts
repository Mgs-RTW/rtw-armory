import { useEffect } from "react";

export function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void
) {
  useEffect(() => {
    window.addEventListener(type as any, listener);
    return () => window.removeEventListener(type as any, listener);
  }, [type, listener]);
}
