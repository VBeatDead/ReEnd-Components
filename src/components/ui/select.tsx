import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/utils";

/* ── Root, Group, Value ─────────────────────────────────────────────────── */

const Select = SelectPrimitive.Root;
Select.displayName = "Select";

const SelectGroup = SelectPrimitive.Group;
SelectGroup.displayName = "SelectGroup";

const SelectValue = SelectPrimitive.Value;
SelectValue.displayName = "SelectValue";

/* ── Trigger ─────────────────────────────────────────────────────────────── */

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative flex h-11 w-full items-center justify-between",
      "border border-input bg-surface-1 px-3",
      "font-mono text-sm text-foreground",
      "transition-all duration-150",
      "hover:border-border-strong",
      "focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,212,41,0.1)]",
      "disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none",
      "data-[placeholder]:text-muted-foreground",
      "[&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span className="shrink-0 text-muted-foreground text-xs ml-2 select-none">
        ▾
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

/* ── ScrollUpButton ─────────────────────────────────────────────────────── */

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground text-xs",
      className,
    )}
    {...props}
  >
    ▴
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

/* ── ScrollDownButton ────────────────────────────────────────────────────── */

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground text-xs",
      className,
    )}
    {...props}
  >
    ▾
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

/* ── Content (dropdown panel) ────────────────────────────────────────────── */

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-[var(--z-overlay,50)] min-w-[8rem] overflow-hidden",
        "bg-surface-2 border border-border shadow-lg",
        "data-[state=open]:animate-fade-in-up",
        "data-[state=closed]:animate-fade-in-up",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

/* ── Label ───────────────────────────────────────────────────────────────── */

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 px-4 py-1.5",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

/* ── Item ────────────────────────────────────────────────────────────────── */

export interface SelectItemProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> {
  danger?: boolean;
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, danger, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center px-4 py-2 text-sm text-muted-foreground",
      "outline-none transition-colors duration-100",
      "focus:bg-primary/6 focus:text-primary",
      "data-[state=checked]:text-primary data-[state=checked]:font-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      danger
        ? "hover:bg-destructive/6 hover:text-destructive focus:bg-destructive/6 focus:text-destructive"
        : "hover:bg-primary/6 hover:text-primary",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

/* ── Separator ───────────────────────────────────────────────────────────── */

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
