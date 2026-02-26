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
>(({ className, label, offLabel, onLabel, id, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const [isOn, setIsOn] = React.useState<boolean>(
    checked !== undefined ? checked : (defaultChecked ?? false),
  );
  const [spinKey, setSpinKey] = React.useState(0);

  React.useEffect(() => {
    if (checked !== undefined) setIsOn(checked);
  }, [checked]);

  const handleChange = (v: boolean) => {
    setIsOn(v);
    setSpinKey((k) => k + 1);
    onCheckedChange?.(v);
  };

  return (
    <div className="flex items-center gap-3">
      {(offLabel || onLabel) && (
        <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground select-none min-w-[32px] text-right">
          {isOn ? onLabel : offLabel}
        </span>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleChange}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center",
          "border border-input bg-surface-3",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          className,
        )}
        {...props}
      >
        {/* Outer thumb handles translateX sliding */}
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none flex items-center justify-center",
            "h-4 w-4 transition-transform duration-200",
            "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
          )}
        >
          {/* Inner diamond spins on each toggle via key remount */}
          <span
            key={spinKey}
            aria-hidden="true"
            className={cn(
              "block h-[14px] w-[14px]",
              spinKey > 0 && "animate-switch-spin",
              isOn ? "bg-primary-foreground" : "bg-foreground/80",
            )}
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        </SwitchPrimitive.Thumb>
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
