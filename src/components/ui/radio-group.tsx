import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  label?: string;
  helperText?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, helperText, id, ...props }, ref) => {
  const generatedId = React.useId();
  const itemId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          className={cn(
            "group peer cursor-pointer shrink-0 flex items-center justify-center",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-40",
            className,
          )}
          {...props}
        >
          <span className="text-[18px] leading-none select-none transition-colors duration-150 group-data-[state=unchecked]:inline group-data-[state=checked]:hidden text-muted-foreground/50 group-hover:text-muted-foreground group-data-[disabled]:pointer-events-none">
            ◇
          </span>
          <span className="text-[18px] leading-none select-none transition-colors duration-150 group-data-[state=checked]:inline group-data-[state=unchecked]:hidden text-primary">
            ◆
          </span>
        </RadioGroupPrimitive.Item>
        {label && (
          <label
            htmlFor={itemId}
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
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
