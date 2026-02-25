import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── SkeletonLine ─────────────────────────────────────────────────────────── */

const skeletonLineVariants = cva("animate-skeleton rounded-none", {
  variants: {
    width: {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
      "1/4": "w-1/4",
    },
    height: {
      xs: "h-2",
      sm: "h-3",
      md: "h-4",
      lg: "h-6",
    },
  },
  defaultVariants: { width: "full", height: "md" },
});

export interface SkeletonLineProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonLineVariants> {}

const SkeletonLine = React.forwardRef<HTMLDivElement, SkeletonLineProps>(
  ({ className, width, height, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonLineVariants({ width, height }), className)}
      aria-hidden="true"
      {...props}
    />
  ),
);
SkeletonLine.displayName = "SkeletonLine";

/* ── SkeletonText ────────────────────────────────────────────────────────── */

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, className, ...props }, ref) => {
    const lineWidths: Array<
      VariantProps<typeof skeletonLineVariants>["width"]
    > = ["full", "3/4", "full", "1/2", "3/4"];

    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLine
            key={i}
            width={lineWidths[i % lineWidths.length]}
            height="sm"
          />
        ))}
      </div>
    );
  },
);
SkeletonText.displayName = "SkeletonText";

/* ── SkeletonAvatar ──────────────────────────────────────────────────────── */

const skeletonAvatarSizes = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof skeletonAvatarSizes;
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "md", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-skeleton clip-corner-sm shrink-0",
        skeletonAvatarSizes[size],
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  ),
);
SkeletonAvatar.displayName = "SkeletonAvatar";

/* ── SkeletonCard ────────────────────────────────────────────────────────── */

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean;
  lines?: number;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ showAvatar = false, lines = 3, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-border bg-surface-1 p-4 space-y-3",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        {showAvatar && <SkeletonAvatar size="md" />}
        <div className="flex-1 space-y-2">
          <SkeletonLine width="3/4" height="md" />
          <SkeletonLine width="1/2" height="sm" />
        </div>
      </div>

      {/* Body lines */}
      <SkeletonText lines={lines} />

      {/* Footer strip */}
      <SkeletonLine width="1/3" height="xs" />
    </div>
  ),
);
SkeletonCard.displayName = "SkeletonCard";

/* ── SkeletonImage ───────────────────────────────────────────────────────── */

export interface SkeletonImageProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "video" | "square" | "portrait";
}

const ASPECT_RATIOS = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  ({ aspectRatio = "video", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-skeleton w-full",
        ASPECT_RATIOS[aspectRatio],
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  ),
);
SkeletonImage.displayName = "SkeletonImage";

/* ── SkeletonTableRow ───────────────────────────────────────────────────── */

export interface SkeletonTableRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
}

const SkeletonTableRow = React.forwardRef<HTMLDivElement, SkeletonTableRowProps>(
  ({ columns = 4, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 py-3", className)}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonLine
          key={i}
          width={i === 0 ? "1/4" : "full"}
          height="sm"
          className="flex-1"
        />
      ))}
    </div>
  ),
);
SkeletonTableRow.displayName = "SkeletonTableRow";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  SkeletonLine,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonImage,
  SkeletonTableRow,
  skeletonLineVariants,
};
