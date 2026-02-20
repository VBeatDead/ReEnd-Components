import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Rarity config ────────────────────────────────────────────────────────── */

const RARITY_STAR_COLORS: Record<number, string> = {
  1: "text-white/40",
  2: "text-ef-green/70",
  3: "text-ef-blue/80",
  4: "text-ef-purple",
  5: "text-ef-orange",
  6: "text-primary",
};

/* ── Stat fill colors ─────────────────────────────────────────────────────── */

const STAT_FILL: Record<string, string> = {
  default: "bg-primary",
  success: "bg-ef-green",
  danger: "bg-destructive",
  info: "bg-ef-blue",
};

/* ── Variants ─────────────────────────────────────────────────────────────── */

const operatorCardVariants = cva(
  [
    "relative bg-surface-1 border border-white/8 overflow-hidden transition-all duration-300",
    "before:absolute before:top-0 before:left-0 before:w-5 before:h-5",
    "before:border-t-2 before:border-l-2 before:border-primary/40 before:pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        compact: "flex gap-3 p-3",
        default: "p-4",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface OperatorStat {
  label: string;
  value: number;
  max?: number;
  color?: "default" | "success" | "danger" | "info";
}

export interface OperatorCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof operatorCardVariants> {
  name: string;
  operatorClass?: string;
  rarity?: 1 | 2 | 3 | 4 | 5 | 6;
  avatarSrc?: string;
  initials?: string;
  stats?: OperatorStat[];
  faction?: string;
  tags?: string[];
}

/* ── Avatar block ─────────────────────────────────────────────────────────── */

function OperatorAvatar({
  src,
  name,
  initials,
  sizeClass,
}: {
  src?: string;
  name: string;
  initials?: string;
  sizeClass: string;
}) {
  return (
    <div
      className={cn(
        "shrink-0 bg-surface-2 flex items-center justify-center",
        "font-display font-bold uppercase text-primary",
        sizeClass,
      )}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
      }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials ?? name.slice(0, 2)}</span>
      )}
    </div>
  );
}

/* ── Stars ────────────────────────────────────────────────────────────────── */

function RarityStars({ rarity }: { rarity: number }) {
  const starColor = RARITY_STAR_COLORS[rarity] ?? RARITY_STAR_COLORS[3];
  return (
    <span
      className="font-mono text-[11px]"
      aria-label={`${rarity} star${rarity !== 1 ? "s" : ""}`}
    >
      {Array.from({ length: rarity }).map((_, i) => (
        <span key={`f-${i}`} className={starColor}>
          ◆
        </span>
      ))}
      {Array.from({ length: 6 - rarity }).map((_, i) => (
        <span key={`e-${i}`} className="text-white/15">
          ◇
        </span>
      ))}
    </span>
  );
}

/* ── Class badge (inline, replicates TacticalBadge style) ────────────────── */

function ClassBadge({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 clip-corner-sm border",
        "px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.15em] uppercase",
        "border-primary/40 text-primary bg-primary/10",
      ].join(" ")}
    >
      <span style={{ fontSize: "6px" }}>◆</span>
      {label}
    </span>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

const OperatorCard = React.forwardRef<HTMLDivElement, OperatorCardProps>(
  (
    {
      className,
      name,
      operatorClass,
      rarity = 3,
      avatarSrc,
      initials,
      stats,
      faction,
      tags,
      size,
      ...props
    },
    ref,
  ) => {
    const clampedRarity = Math.min(6, Math.max(1, rarity)) as
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6;

    /* ── Compact layout ── */
    if (size === "compact") {
      return (
        <div
          ref={ref}
          className={cn(operatorCardVariants({ size }), className)}
          {...props}
        >
          <OperatorAvatar
            src={avatarSrc}
            name={name}
            initials={initials}
            sizeClass="w-12 h-12 text-sm"
          />
          <div className="flex-1 min-w-0 py-0.5">
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-foreground truncate">
              {name}
            </p>
            {operatorClass && (
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                ◆ {operatorClass.toUpperCase()}
              </p>
            )}
            <div className="mt-1">
              <RarityStars rarity={clampedRarity} />
            </div>
          </div>
        </div>
      );
    }

    /* ── Default layout ── */
    return (
      <div
        ref={ref}
        className={cn(operatorCardVariants({ size }), className)}
        {...props}
      >
        {/* Top section: avatar + identity */}
        <div className="flex items-start gap-4 mb-3">
          <OperatorAvatar
            src={avatarSrc}
            name={name}
            initials={initials}
            sizeClass="w-20 h-20 text-xl"
          />
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-display text-[16px] font-bold uppercase tracking-wider text-foreground leading-tight">
              {name}
            </h3>
            {faction && (
              <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5 uppercase tracking-wider">
                {faction}
              </p>
            )}
            {operatorClass && (
              <div className="mt-1.5">
                <ClassBadge label={operatorClass} />
              </div>
            )}
            <div className="mt-2">
              <RarityStars rarity={clampedRarity} />
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider border border-white/10 px-1.5 py-0.5 text-muted-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/6">
            {stats.map((stat) => {
              const maxVal = stat.max ?? stat.value;
              const pct =
                maxVal > 0 ? Math.min(100, (stat.value / maxVal) * 100) : 0;
              const fill =
                STAT_FILL[stat.color ?? "default"] ?? STAT_FILL.default;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground w-8 shrink-0">
                    {stat.label}
                  </span>
                  <div className="flex-1 h-1 bg-white/8 overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-500", fill)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/70 w-12 text-right shrink-0">
                    {stat.value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
OperatorCard.displayName = "OperatorCard";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { OperatorCard, operatorCardVariants };
