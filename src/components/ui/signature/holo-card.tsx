import * as React from "react";

export interface HoloCardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  value?: string;
  className?: string;
}

export const HoloCard = React.forwardRef<HTMLDivElement, HoloCardProps>(
  ({ title, subtitle, icon: Icon, value, className }, ref) => {
    const [hovering, setHovering] = React.useState(false);
    return (
      <div
        ref={ref}
        className={`relative clip-corner border border-border bg-surface-1 p-6 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/30${className ? ` ${className}` : ""}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all"
          style={{
            top: hovering ? "100%" : "-10%",
            opacity: hovering ? 1 : 0,
            transitionDuration: "2000ms",
          }}
        />
        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.03) 40%, transparent 60%)",
            opacity: hovering ? 1 : 0,
          }}
        />
        <div className="relative z-10">
          <Icon className="w-5 h-5 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
          {value && (
            <p className="font-display text-3xl font-bold text-primary mb-1">
              {value}
            </p>
          )}
          <h4 className="font-display text-sm font-bold tracking-[0.05em] uppercase text-foreground mb-1">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {/* Bottom diamond */}
        <div className="absolute bottom-3 right-3 text-primary/20 group-hover:text-primary/60 transition-colors text-xs">
          ◆
        </div>
      </div>
    );
  },
);
HoloCard.displayName = "HoloCard";
