import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

/* ── Root, Trigger, Anchor ───────────────────────────────────────────────── */

const Popover = PopoverPrimitive.Root;
Popover.displayName = "Popover";

const PopoverTrigger = PopoverPrimitive.Trigger;
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverAnchor = PopoverPrimitive.Anchor;
PopoverAnchor.displayName = "PopoverAnchor";

/* ── Content ─────────────────────────────────────────────────────────────── */

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[200px]",
        "bg-surface-2 border border-white/10 shadow-lg",
        "p-4",
        "data-[state=open]:animate-fade-in-up",
        "data-[state=closed]:animate-fade-in-up",
        "focus:outline-none",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
