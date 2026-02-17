import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Lightweight scroll spy for in-section item tracking.
 * Observes elements by ID and reports which one is currently in view.
 * Only activates when itemIds are provided (i.e., a section is active).
 *
 * Key design decisions:
 * - Resets activeId to null on section change so the fallback hashActiveId
 *   in DocsLayout can take over immediately (no stale ID flash)
 * - Uses live getBoundingClientRect() instead of stale IntersectionObserver
 *   entry rects for accurate "topmost visible" detection
 * - Delays first observe attempt to 300ms to account for AnimatePresence
 *   exit animation (200ms) + mount delay
 * - Falls back to first visible item on initial observation if nothing
 *   intersects, rather than keeping stale state
 */
export function useScrollSpy(itemIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intersectingRef = useRef<Set<string>>(new Set());
  const hasInitializedRef = useRef(false);

  // Determine the topmost visible element using live rects
  const resolveActive = useCallback(() => {
    const ids = intersectingRef.current;

    if (ids.size === 0) {
      // Nothing intersecting — only keep last known AFTER initial observation
      // Before first observation, return null so hashActiveId can take over
      if (!hasInitializedRef.current) return;
      return; // keep last known active
    }

    hasInitializedRef.current = true;

    if (ids.size === 1) {
      setActiveId(ids.values().next().value!);
      return;
    }

    // Multiple elements visible: pick topmost using fresh getBoundingClientRect
    let bestId: string | null = null;
    let bestTop = Infinity;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top < bestTop) {
        bestTop = top;
        bestId = id;
      }
    }

    if (bestId) {
      setActiveId(bestId);
    }
  }, []);

  useEffect(() => {
    // CRITICAL: Reset activeId immediately when itemIds change.
    // This prevents stale IDs from a previous section bleeding into the new one.
    // With activeId=null, DocsLayout falls back to hashActiveId (first item of
    // the new section) until the observer catches up.
    setActiveId(null);
    intersectingRef.current.clear();
    hasInitializedRef.current = false;

    if (itemIds.length === 0) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            intersectingRef.current.add(id);
          } else {
            intersectingRef.current.delete(id);
          }
        }
        resolveActive();
      },
      {
        // Top: account for fixed header (64px) + some buffer
        // Bottom: 20% margin to bias toward items near the top
        rootMargin: "-80px 0px -20% 0px",
        threshold: [0, 0.15],
      },
    );

    // Observe elements — delay accounts for AnimatePresence exit (200ms) + mount
    const observe = (attempt: number) => {
      let observed = 0;
      for (const id of itemIds) {
        const el = document.getElementById(id);
        if (el) {
          observerRef.current?.observe(el);
          observed++;
        }
      }
      // Retry if not all elements found yet (lazy content loading)
      if (observed < itemIds.length && attempt < 4) {
        setTimeout(() => observe(attempt + 1), 250);
      }
    };

    // Wait 300ms: AnimatePresence exit (200ms) + new content mount (~100ms)
    const timer = setTimeout(() => observe(0), 300);

    // Scroll listener as safety net for fast/momentum scrolling
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(resolveActive, 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [itemIds, resolveActive]);

  return activeId;
}
