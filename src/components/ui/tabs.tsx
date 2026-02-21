import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/* ── Root ────────────────────────────────────────────────────────────────── */

const Tabs = TabsPrimitive.Root;
Tabs.displayName = "Tabs";

/* ── List variants ───────────────────────────────────────────────────────── */

const tabsListVariants = cva("flex items-center overflow-x-auto", {
  variants: {
    variant: {
      underline: "border-b border-border gap-0 w-full",
      pill: "gap-1 bg-surface-1 p-1 w-fit",
      bordered: "border border-border gap-0 w-full",
    },
  },
  defaultVariants: { variant: "underline" },
});

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ── Trigger variants ────────────────────────────────────────────────────── */

const tabsTriggerVariants = cva(
  [
    "font-display text-[13px] font-semibold uppercase tracking-wider",
    "transition-all duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        underline: [
          "px-4 py-2.5 text-muted-foreground border-b-2 border-transparent -mb-px",
          "hover:text-foreground",
          "data-[state=active]:text-primary data-[state=active]:border-b-primary",
        ],
        pill: [
          "px-4 py-1.5 text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:bg-surface-3 data-[state=active]:text-primary",
        ],
        bordered: [
          "px-4 py-2.5 text-muted-foreground border-r border-border last:border-r-0",
          "hover:text-foreground hover:bg-surface-hover",
          "data-[state=active]:text-primary data-[state=active]:bg-surface-3",
        ],
      },
    },
    defaultVariants: { variant: "underline" },
  },
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/* ── Content ─────────────────────────────────────────────────────────────── */

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 text-sm text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
