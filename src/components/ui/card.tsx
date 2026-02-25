import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ── Corner brackets via Tailwind before:/after: utilities ─────────────────────
const BRACKET_BASE =
  "before:content-[''] before:absolute before:-top-px before:-left-px " +
  "before:w-6 before:h-6 before:border-t-2 before:border-l-2 " +
  "before:border-primary/40 before:pointer-events-none " +
  "after:content-[''] after:absolute after:-bottom-px after:-right-px " +
  "after:w-6 after:h-6 after:border-b-2 after:border-r-2 " +
  "after:border-primary/40 after:pointer-events-none";

const cardVariants = cva(
  [
    "relative bg-surface-1 border border-border transition-all duration-300",
    BRACKET_BASE,
  ].join(" "),
  {
    variants: {
      hoverable: {
        true: [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
          "hover:border-primary/20",
          "hover:before:border-primary/60",
          "hover:after:border-primary/60",
        ].join(" "),
        false: "",
      },
      selected: {
        true: "border-2 border-primary/40 bg-primary/[0.06]",
        false: "",
      },
    },
    defaultVariants: {
      hoverable: false,
      selected: false,
    },
  },
);

// ── CardProps ─────────────────────────────────────────────────────────────────

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Adds hover lift effect — `translateY(-4px)` + deep shadow + yellow border tint.
   * Bracket corners intensify on hover.
   */
  hoverable?: boolean;
  /**
   * Highlights card with primary border + subtle yellow background.
   * Use for selected/active state in selection grids.
   */
  selected?: boolean;
}

// ── Card (root) ───────────────────────────────────────────────────────────────

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, selected, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ hoverable, selected }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

// ── CardHeader ────────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start justify-between gap-4 p-5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ── CardMeta ──────────────────────────────────────────────────────────────────
const CardMeta = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-mono text-[10px] tracking-[0.15em] uppercase text-primary mb-2",
      className,
    )}
    {...props}
  />
));
CardMeta.displayName = "CardMeta";

// ── CardTitle ─────────────────────────────────────────────────────────────────
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ── CardDescription ───────────────────────────────────────────────────────────
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ── CardBody ──────────────────────────────────────────────────────────────────
const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5", className)} {...props} />
));
CardBody.displayName = "CardBody";

// ── CardFooter ────────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 px-5 py-4 border-t border-border",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ── OperatorCard ──────────────────────────────────────────────────────────────

export interface OperatorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  faction?: string;
  rarity?: 1 | 2 | 3 | 4 | 5 | 6;
  imageSrc?: string;
  imageAlt?: string;
  selected?: boolean;
}

const OperatorCard = React.forwardRef<HTMLDivElement, OperatorCardProps>(
  (
    { name, faction, rarity = 5, imageSrc, imageAlt, selected, className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative bg-surface-1 border border-border transition-all duration-300 w-[120px] sm:w-[140px] shrink-0 cursor-pointer",
        "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:border-primary/20",
        selected && "border-2 border-primary/40 bg-primary/[0.06]",
        className,
      )}
      {...props}
    >
      {/* Portrait area 3:4 */}
      <div className="clip-corner-sm aspect-[3/4] bg-surface-2 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary/20 text-4xl">◆</span>
          </div>
        )}
      </div>
      {/* Rarity */}
      <div className="px-2 pt-1.5 pb-0">
        <span className="text-[10px] text-primary tracking-wider">
          {"◆".repeat(rarity)}
          {"◇".repeat(6 - rarity)}
        </span>
      </div>
      {/* Name + Faction */}
      <div className="px-2 pb-2">
        <p className="font-display text-[13px] font-semibold uppercase text-foreground leading-tight truncate">
          {name}
        </p>
        {faction && (
          <p className="font-mono text-[10px] text-muted-foreground truncate">
            {faction}
          </p>
        )}
      </div>
    </div>
  ),
);
OperatorCard.displayName = "OperatorCard";

// ── LinkCard ──────────────────────────────────────────────────────────────────

export interface LinkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

const LinkCard = React.forwardRef<HTMLDivElement, LinkCardProps>(
  ({ title, icon, href, external, className, onClick, ...props }, ref) => {
    const inner = (
      <div
        className={cn(
          "relative bg-surface-1 border border-border flex items-center gap-3 p-3",
          "transition-all duration-200 cursor-pointer group",
          "hover:border-primary/40 hover:bg-primary/[0.04]",
          className,
        )}
        {...props}
      >
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center bg-surface-2 shrink-0 text-primary">
            {icon}
          </div>
        )}
        <span className="font-display text-[13px] font-semibold uppercase text-foreground flex-1 truncate">
          {title}
        </span>
        <span className="text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0">
          →
        </span>
      </div>
    );
    if (href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="block"
        >
          {inner}
        </a>
      );
    }
    return (
      <div ref={ref} onClick={onClick}>
        {inner}
      </div>
    );
  },
);
LinkCard.displayName = "LinkCard";

// ── Exports ───────────────────────────────────────────────────────────────────

export {
  Card,
  cardVariants,
  CardHeader,
  CardMeta,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  OperatorCard,
  LinkCard,
};
