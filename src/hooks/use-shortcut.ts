import { useEffect } from "react";

interface ShortcutOptions {
  /** Match Meta key (⌘ on Mac) */
  meta?: boolean;
  /** Match Ctrl key (or ⌘ on Mac, cross-platform) */
  ctrl?: boolean;
  /** Match Shift key */
  shift?: boolean;
  /** Prevent default browser action */
  preventDefault?: boolean;
}

export function useShortcut(
  key: string,
  handler: () => void,
  options: ShortcutOptions = {},
): void {
  useEffect(() => {
    const { meta = false, ctrl = false, shift = false, preventDefault = true } = options;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (meta && !e.metaKey) return;
      if (ctrl && !(e.ctrlKey || e.metaKey)) return;
      if (shift && !e.shiftKey) return;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      if (preventDefault) e.preventDefault();
      handler();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, handler, options]);
}
