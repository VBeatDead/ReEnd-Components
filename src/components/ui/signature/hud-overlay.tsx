import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Bracket size config ─────────────────────────────────────────────────── */

const BRACKET_SIZE: Record<string, string> = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface HUDOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  systemLabel?: string;
  lat?: string;
  lon?: string;
  showCoords?: boolean;
  showCrosshair?: boolean;
  showScanlines?: boolean;
  showNoise?: boolean;
  bracketSize?: "sm" | "md" | "lg";
}

/* ── Component ───────────────────────────────────────────────────────────── */

const HUDOverlay = React.forwardRef<HTMLDivElement, HUDOverlayProps>(
  (
    {
      children,
      systemLabel = "SYS::ENDFIELD v2.0",
      lat = "LAT 37.7749°N",
      lon = "LON 122.4194°W",
      showCoords = true,
      showCrosshair = true,
      showScanlines = true,
      showNoise = false,
      bracketSize = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const [time, setTime] = React.useState("");

    React.useEffect(() => {
      const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, []);

    const bClass = BRACKET_SIZE[bracketSize] ?? BRACKET_SIZE.md;

    return (
      <div
        ref={ref}
        className={cn(
          "relative border border-border bg-surface-0 aspect-video flex items-center justify-center overflow-hidden",
          className,
        )}
        {...props}
      >
        {showScanlines && (
          <div className="absolute inset-0 scanline-overlay pointer-events-none" />
        )}

        {showNoise && (
          <div
            className="absolute inset-0 pointer-events-none noise-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              opacity: 0.6,
            }}
          />
        )}

        {/* Corner brackets */}
        {(
          [
            ["top-3 left-3", "border-t-2 border-l-2"],
            ["top-3 right-3", "border-t-2 border-r-2"],
            ["bottom-3 left-3", "border-b-2 border-l-2"],
            ["bottom-3 right-3", "border-b-2 border-r-2"],
          ] as const
        ).map(([pos, borders], i) => (
          <div
            key={i}
            className={cn(
              "absolute border-primary/40 pointer-events-none",
              bClass,
              pos,
              borders,
            )}
          />
        ))}

        {/* Crosshair */}
        {showCrosshair && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="w-6 h-px bg-primary/20"
              style={{ position: "absolute", top: "50%", left: "-12px" }}
            />
            <div
              className="h-6 w-px bg-primary/20"
              style={{ position: "absolute", left: "50%", top: "-12px" }}
            />
          </div>
        )}

        {/* Top-left: system label + live time */}
        {showCoords && (
          <div className="absolute top-4 left-12 font-mono text-[9px] text-muted-foreground/60 space-y-0.5">
            <div>{systemLabel}</div>
            <div className="text-primary/60">{time}</div>
          </div>
        )}

        {/* Top-right: coordinates */}
        {showCoords && (
          <div className="absolute top-4 right-12 font-mono text-[9px] text-muted-foreground/60 text-right space-y-0.5">
            <div>{lat}</div>
            <div>{lon}</div>
          </div>
        )}

        {/* Bottom status bar */}
        <div className="absolute bottom-4 left-12 right-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 bg-ef-green"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            <span className="font-mono text-[9px] text-ef-green/80">
              LINK ACTIVE
            </span>
          </div>
          <div className="flex gap-4">
            {["FPS:60", "MEM:47%", "NET:12ms"].map((s) => (
              <span
                key={s}
                className="font-mono text-[9px] text-muted-foreground/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* User content — rendered above all decoration layers */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
HUDOverlay.displayName = "HUDOverlay";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { HUDOverlay };
