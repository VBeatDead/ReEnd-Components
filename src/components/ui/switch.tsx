import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> {
  label?: string;
  offLabel?: string;
  onLabel?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, offLabel, onLabel, id, checked, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  return (
    <div className="flex items-center gap-3">
      {(offLabel || onLabel) && (
        <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground select-none min-w-[32px] text-right">
          {checked ? onLabel : offLabel}
        </span>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        checked={checked}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-none",
          "border border-white/15 bg-white/10",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 bg-white shadow-sm ring-0",
            "transition-transform duration-200",
            "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={switchId}
          className="text-sm text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-40 select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = "Switch";

export { Switch };
