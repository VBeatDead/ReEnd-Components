import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ theme = "dark", ...props }: ToasterProps) => (
  <Sonner
    theme={theme as ToasterProps["theme"]}
    className="toaster group"
    richColors
    closeButton
    duration={4000}
    visibleToasts={3}
    pauseWhenPageIsHidden
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-surface-2 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:border-l-[3px]",
        title:
          "group-[.toast]:font-display group-[.toast]:text-[13px] group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:tracking-wider",
        description: "group-[.toast]:text-[14px] group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        closeButton:
          "group-[.toast]:!text-muted-foreground group-[.toast]:hover:!text-foreground",
        error: "group-[.toaster]:!border-l-destructive group-[.toaster]:!border-destructive/40",
        success: "group-[.toaster]:!border-l-ef-green",
        warning: "group-[.toaster]:!border-l-ef-orange",
        info: "group-[.toaster]:!border-l-ef-blue",
      },
    }}
    {...props}
  />
);

const notify = {
  info: (msg: string, opts?: object) =>
    toast(msg, { duration: 5000, ...opts }),
  success: (msg: string, opts?: object) =>
    toast.success(msg, { duration: 4000, ...opts }),
  warning: (msg: string, opts?: object) =>
    toast.warning(msg, { duration: 8000, ...opts }),
  error: (msg: string, opts?: object) =>
    toast.error(msg, { duration: Infinity, ...opts }),
};

export { Toaster, toast, notify };
