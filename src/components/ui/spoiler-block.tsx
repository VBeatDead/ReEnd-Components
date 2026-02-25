import * as React from "react";
import { cn } from "../../lib/utils";

export interface SpoilerBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  revealLabel?: string;
  hideLabel?: string;
  defaultRevealed?: boolean;
}

const SpoilerBlock = React.forwardRef<HTMLDivElement, SpoilerBlockProps>(
  (
    {
      children,
      title,
      revealLabel = "REVEAL CONTENT",
      hideLabel = "HIDE",
      defaultRevealed = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [revealed, setRevealed] = React.useState(defaultRevealed);

    return (
      <div
        ref={ref}
        aria-expanded={revealed}
        className={cn("relative border p-6 overflow-hidden", className)}
        style={{
          borderColor: "rgba(255,165,2,0.2)",
          background: "rgba(255,165,2,0.03)",
        }}
        {...props}
      >
        {/* Header */}
        <div className="font-display text-[13px] font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
          <span>⚠</span>
          <span>SPOILER{title ? ` — ${title}` : ""}</span>
        </div>

        {/* Content with blur when hidden */}
        <div
          className={cn(
            "transition-[filter] duration-400",
            revealed ? "" : "pointer-events-none select-none",
          )}
          style={{ filter: revealed ? "blur(0px)" : "blur(8px)" }}
        >
          {children}
        </div>

        {/* Overlay when hidden */}
        {!revealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/30 backdrop-blur-[2px] z-10">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="border border-primary text-primary hover:bg-primary/[0.1] font-display text-[12px] uppercase tracking-wider px-4 py-2 transition-colors"
            >
              {revealLabel}
            </button>
          </div>
        )}

        {/* Hide button when revealed */}
        {revealed && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="text-muted-foreground hover:text-primary font-display text-[11px] uppercase tracking-wider transition-colors"
            >
              {hideLabel}
            </button>
          </div>
        )}
      </div>
    );
  },
);
SpoilerBlock.displayName = "SpoilerBlock";

export interface SpoilerInlineProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const SpoilerInline = React.forwardRef<HTMLSpanElement, SpoilerInlineProps>(
  ({ children, className, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false);

    return (
      <span
        ref={ref}
        role="button"
        tabIndex={0}
        data-revealed={revealed ? "true" : undefined}
        onClick={() => setRevealed(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setRevealed(true);
        }}
        className={cn("spoiler", className)}
        aria-label={
          revealed ? undefined : "Spoiler. Press to reveal hidden content."
        }
        {...props}
      >
        {children}
      </span>
    );
  },
);
SpoilerInline.displayName = "SpoilerInline";

export { SpoilerBlock, SpoilerInline };
