import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/* ── Root, Trigger, Portal, Close ────────────────────────────────────────── */

const Dialog = DialogPrimitive.Root;
Dialog.displayName = "Dialog";

const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = DialogPrimitive.Portal;
DialogPortal.displayName = "DialogPortal";

const DialogClose = DialogPrimitive.Close;
DialogClose.displayName = "DialogClose";

/* ── Overlay ─────────────────────────────────────────────────────────────── */

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm",
      "data-[state=open]:animate-fade-in-up",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/* ── Content size variants ───────────────────────────────────────────────── */

const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "bg-surface-2 border border-white/10 shadow-xl",
    "flex flex-col",
    "data-[state=open]:animate-fade-in-up",
    "focus:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-lg",
        lg: "w-full max-w-2xl",
        xl: "w-full max-w-4xl",
        fullscreen: "w-screen h-screen max-w-none",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

/* ── Header ──────────────────────────────────────────────────────────────── */

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

/* ── Footer ──────────────────────────────────────────────────────────────── */

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-end gap-3 border-t border-white/8 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

/* ── Title ───────────────────────────────────────────────────────────────── */

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-display text-base font-semibold uppercase tracking-wider text-foreground",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

/* ── Description ─────────────────────────────────────────────────────────── */

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-6 py-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogContentVariants,
};
