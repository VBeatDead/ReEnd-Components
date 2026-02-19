import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/* ── Size variants ───────────────────────────────────────────────────────── */

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden clip-corner-sm",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
        xl: "h-20 w-20",
        "2xl": "h-[120px] w-[120px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Status dot colors ───────────────────────────────────────────────────── */

const statusColors: Record<string, string> = {
  online: "text-ef-green",
  offline: "text-muted-foreground/50",
  busy: "text-destructive",
  away: "text-ef-orange",
};

/* ── Avatar (root) ───────────────────────────────────────────────────────── */

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, status, ...props }, ref) => (
  <div className="relative inline-flex shrink-0">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
    {status && (
      <span
        className={cn(
          "absolute -bottom-0.5 -right-0.5 text-[10px] leading-none select-none",
          statusColors[status],
        )}
        aria-label={status}
      >
        ◆
      </span>
    )}
  </div>
));
Avatar.displayName = "Avatar";

/* ── AvatarImage ─────────────────────────────────────────────────────────── */

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

/* ── AvatarFallback ──────────────────────────────────────────────────────── */

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center",
      "bg-surface-2 font-display text-muted-foreground uppercase text-center",
      "text-[clamp(8px,35%,28px)]",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
