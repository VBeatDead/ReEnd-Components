import * as React from "react";
import { cn } from "../../lib/utils";

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  height?: number;
  zIndex?: number;
}

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ color, height = 2, className, style, ...props }, ref) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const onScroll = () => {
        const scrolled = window.scrollY;
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <div
        ref={ref}
        className={cn("fixed top-0 left-0 right-0 z-max bg-transparent", className)}
        style={{ height, ...style }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className="h-full transition-[width] duration-100"
          style={{
            width: `${progress}%`,
            backgroundColor: color ?? "hsl(var(--primary))",
          }}
        />
      </div>
    );
  },
);
ScrollProgress.displayName = "ScrollProgress";

export { ScrollProgress };
