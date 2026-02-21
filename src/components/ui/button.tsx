import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-[0.1em] transition-all duration-150 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "clip-corner bg-primary text-primary-foreground hover:brightness-110 hover:shadow-glow active:brightness-90",
        secondary:
          "clip-corner border border-border-strong text-card-foreground bg-transparent hover:border-primary/60 hover:text-primary active:bg-primary/5",
        ghost:
          "bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10",
        danger:
          "clip-corner bg-destructive text-destructive-foreground hover:brightness-110 active:brightness-90",
        link: "bg-transparent text-primary underline-offset-4 hover:underline h-auto p-0",
        icon: "bg-surface-2 border border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
      },
      size: {
        xs: "h-7  px-3  text-[11px]",
        sm: "h-8  px-4  text-xs",
        md: "h-11 px-7  text-sm",
        lg: "h-[52px] px-9  text-base",
        xl: "h-[60px] px-12 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, renders the button as its child element (Radix Slot pattern).
   * Useful for wrapping `<a>` or other elements with button styling.
   * @example <Button asChild><a href="/page">Go</a></Button>
   */
  asChild?: boolean;
  /**
   * Displays a diamond spinner and disables interaction.
   * Sets `aria-busy` for accessibility.
   */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.ForwardedRef<HTMLElement>}
          className={cn(buttonVariants({ variant, size }), className)}
          aria-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size }),
          loading && "pointer-events-none opacity-80",
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span
            className="h-4 w-4 shrink-0 border-2 border-current clip-corner-sm animate-diamond-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
