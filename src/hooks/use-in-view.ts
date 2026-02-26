import { RefObject, useEffect, useRef, useState } from "react";

export interface UseInViewOptions {
  /** Intersection ratio threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** Only trigger once (stays true after first intersection). Default: true */
  once?: boolean;
}

/**
 * Returns `true` when the referenced element enters the viewport.
 * Respects `prefers-reduced-motion` by returning `true` immediately when motion is reduced.
 *
 * @example
 * const ref = useRef(null);
 * const inView = useInView(ref, { threshold: 0.1, once: true });
 * return <div ref={ref} className={inView ? "animate-fade-in-up" : "opacity-0"} />;
 */
export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {},
): boolean {
  const { threshold = 0.1, once = true } = options;

  const [inView, setInView] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const inViewRef = useRef(inView);
  inViewRef.current = inView;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (inViewRef.current && once) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold, once]);

  return inView;
}
