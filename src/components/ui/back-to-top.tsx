import * as React from "react";
import { cn } from "../../lib/utils";

export interface BackToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  threshold?: number;
  smooth?: boolean;
}

const BackToTop = React.forwardRef<HTMLButtonElement, BackToTopProps>(
  ({ threshold = 300, smooth = true, className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const onScroll = () => setVisible(window.scrollY > threshold);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    const handleClick = () =>
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });

    if (!visible) return null;

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "fixed bottom-6 right-6 z-sticky",
          "bg-surface-2 border border-border p-3",
          "text-muted-foreground hover:text-primary hover:border-primary/30",
          "transition-all duration-200",
          "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
          className,
        )}
        aria-label="Back to top"
        {...props}
      >
        ↑
      </button>
    );
  },
);
BackToTop.displayName = "BackToTop";

export { BackToTop };
