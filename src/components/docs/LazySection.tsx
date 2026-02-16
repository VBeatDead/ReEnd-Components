import { ReactNode, useRef, useState, useEffect } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  forceVisible?: boolean;
}

const DefaultFallback = () => (
  <div className="space-y-8 py-8 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i} className="space-y-4">
        <div className="h-6 w-48 bg-surface-2" />
        <div className="h-3 w-96 max-w-full bg-surface-1" />
        <div className="h-48 bg-surface-1 border border-border" />
      </div>
    ))}
  </div>
);

export const LazySection = ({ children, fallback, rootMargin = "200px", forceVisible = false }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Force visible from parent (e.g. navigation click)
  useEffect(() => {
    if (forceVisible) setIsVisible(true);
  }, [forceVisible]);

  useEffect(() => {
    if (isVisible) return; // already visible, no need to observe
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, isVisible]);

  return (
    <div ref={ref} className="min-h-[100px]">
      {isVisible ? children : (fallback ?? <DefaultFallback />)}
    </div>
  );
};
