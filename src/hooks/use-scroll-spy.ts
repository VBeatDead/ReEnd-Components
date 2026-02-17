import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll spy for in-section item tracking.
 * Observes elements by ID and reports which one is currently in view.
 * Only activates when itemIds are provided (i.e., a section is active).
 */
export function useScrollSpy(itemIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (itemIds.length === 0) {
      setActiveId(null);
      return;
    }

    // Track which elements are currently intersecting
    const visibleMap = new Map<string, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }

        if (visibleMap.size > 0) {
          // Pick the topmost visible element
          let topEntry: IntersectionObserverEntry | null = null;
          for (const entry of visibleMap.values()) {
            if (
              !topEntry ||
              entry.boundingClientRect.top < topEntry.boundingClientRect.top
            ) {
              topEntry = entry;
            }
          }
          if (topEntry) {
            setActiveId(topEntry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: 0,
      },
    );

    // Observe after short delay for DOM to settle
    const timer = setTimeout(() => {
      for (const id of itemIds) {
        const el = document.getElementById(id);
        if (el) {
          observerRef.current?.observe(el);
        }
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [itemIds]);

  return activeId;
}
