import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: string;
  helperText?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, helperText, id, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={cn(
            "group peer h-[18px] w-[18px] shrink-0 border-2 border-white/25 bg-transparent",
            "cursor-pointer transition-all duration-150",
            "hover:border-primary/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
            "data-[state=indeterminate]:bg-primary/50 data-[state=indeterminate]:border-primary",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <span className="hidden group-data-[state=checked]:inline leading-none text-primary-foreground text-[10px] font-bold select-none">
              ◆
            </span>
            <span className="hidden group-data-[state=indeterminate]:inline leading-none text-primary-foreground text-sm font-bold select-none">
              −
            </span>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-40 select-none leading-none"
          >
            {label}
          </label>
        )}
      </div>
      {helperText && (
        <p className="text-[12px] text-muted-foreground pl-[30px]">
          {helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
