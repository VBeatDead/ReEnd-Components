import * as React from "react";
import { cn } from "../../lib/utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
}

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("shrink-0 w-full", className)}
      style={{ scrollSnapAlign: "start" }}
      {...props}
    />
  ),
);
CarouselItem.displayName = "CarouselItem";

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      autoPlay,
      autoPlayInterval = 4000,
      showDots = true,
      showArrows = true,
      loop,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [current, setCurrent] = React.useState(0);

    const items = React.Children.toArray(children);
    const count = items.length;

    const scrollTo = React.useCallback(
      (index: number) => {
        let next = index;
        if (loop) {
          next = ((index % count) + count) % count;
        } else {
          next = Math.max(0, Math.min(index, count - 1));
        }
        setCurrent(next);
        const track = trackRef.current;
        if (!track) return;
        const child = track.children[next] as HTMLElement;
        if (child) {
          track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
        }
      },
      [count, loop],
    );

    React.useEffect(() => {
      if (!autoPlay || count <= 1) return;
      const timer = setInterval(() => scrollTo(current + 1), autoPlayInterval);
      return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, current, count, scrollTo]);

    const handleScroll = React.useCallback(() => {
      const track = trackRef.current;
      if (!track) return;
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setCurrent(index);
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollTo(current - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollTo(current + 1);
        }
      },
      [current, scrollTo],
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Carousel, slide ${current + 1} of ${count}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn("relative focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40", className)}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-hidden snap-x snap-mandatory"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {React.Children.map(children, (child, i) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement, {
                  "aria-label": `Slide ${i + 1} of ${count}`,
                } as Record<string, unknown>)
              : child,
          )}
        </div>

        {/* Arrows */}
        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollTo(current - 1)}
              disabled={!loop && current === 0}
              aria-label="Previous slide"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-raised",
                "w-11 h-11 flex items-center justify-center",
                "bg-surface-2/90 backdrop-blur-sm border border-border",
                "text-muted-foreground hover:text-primary hover:bg-primary/[0.08] hover:border-primary/30",
                "transition-all duration-150",
                "disabled:opacity-30 disabled:cursor-not-allowed",
              )}
            >
              ◂
            </button>
            <button
              type="button"
              onClick={() => scrollTo(current + 1)}
              disabled={!loop && current === count - 1}
              aria-label="Next slide"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-raised",
                "w-11 h-11 flex items-center justify-center",
                "bg-surface-2/90 backdrop-blur-sm border border-border",
                "text-muted-foreground hover:text-primary hover:bg-primary/[0.08] hover:border-primary/30",
                "transition-all duration-150",
                "disabled:opacity-30 disabled:cursor-not-allowed",
              )}
            >
              ▸
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && count > 1 && (
          <div
            role="tablist"
            aria-label="Carousel slides"
            className="flex justify-center gap-2 mt-3"
          >
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === current}
                className={cn(
                  "w-2 h-2 transition-all duration-200",
                  "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",
                  i === current
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
Carousel.displayName = "Carousel";

export { Carousel, CarouselItem };
