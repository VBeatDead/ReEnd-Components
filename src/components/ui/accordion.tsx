import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";

/* ── Root ────────────────────────────────────────────────────────────────── */

const Accordion = AccordionPrimitive.Root;
Accordion.displayName = "Accordion";

/* ── Item ────────────────────────────────────────────────────────────────── */

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border border-white/6", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

/* ── Trigger ─────────────────────────────────────────────────────────────── */

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between px-4 py-3",
        "font-display text-[13px] font-semibold uppercase tracking-wider text-foreground",
        "transition-all duration-200",
        "hover:text-primary hover:bg-white/[0.02]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          "font-mono text-base leading-none select-none shrink-0 ml-2",
          "text-muted-foreground transition-colors duration-200",
          "group-hover:text-primary",
          "group-data-[state=open]:hidden group-data-[state=closed]:inline",
        )}
        aria-hidden
      >
        +
      </span>
      <span
        className={cn(
          "font-mono text-base leading-none select-none shrink-0 ml-2",
          "text-primary transition-colors duration-200",
          "group-data-[state=open]:inline group-data-[state=closed]:hidden",
        )}
        aria-hidden
      >
        −
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/* ── Content ─────────────────────────────────────────────────────────────── */

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
    {...props}
  >
    <div className={cn("px-4 pb-4 pt-1 text-sm text-muted-foreground", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
