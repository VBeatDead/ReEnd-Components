import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import {
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Search,
  Lock,
  Wifi,
  WifiOff,
  Mail,
  Filter,
} from "lucide-react";
import SignatureFeedbackSection from "./signature/SignatureFeedbackSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import { Button } from "../ui/button";
import { SkeletonCard, SkeletonText, SkeletonAvatar, SkeletonLine } from "../ui/skeleton";
import { EmptyState } from "../ui/empty-state";
import { Alert } from "../ui/alert";

export function FeedbackSection() {
  const { t } = useTranslation("feedback");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      {/* Toast */}
      <ComponentPreview
        id="toast-notification"
        title={t("notification.title")}
        showViewport
        description={t("notification.description")}
        props={[
          {
            name: "type",
            type: '"info" | "success" | "warning" | "error" | "endfield"',
            required: true,
            description: t("_props.toast-notification.type"),
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: t("_props.toast-notification.title"),
          },
          {
            name: "message",
            type: "string",
            required: true,
            description: t("_props.toast-notification.message"),
          },
          {
            name: "duration",
            type: "number",
            default: "5000",
            required: false,
            description: t("_props.toast-notification.duration"),
          },
          {
            name: "dismissible",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.toast-notification.dismissible"),
          },
          {
            name: "onDismiss",
            type: "() => void",
            required: false,
            description: t("_props.toast-notification.onDismiss"),
          },
        ]}
        api={[
          {
            name: "toast.info()",
            signature: "(title: string, msg: string) => void",
            description: t("_props.toast-notification.api.toast_info"),
          },
          {
            name: "toast.success()",
            signature: "(title: string, msg: string) => void",
            description: t("_props.toast-notification.api.toast_success"),
          },
          {
            name: "toast.error()",
            signature: "(title: string, msg: string) => void",
            description: t("_props.toast-notification.api.toast_error"),
          },
        ]}
      >
        <div className="space-y-3 max-w-sm">
          {[
            {
              type: "Info",
              border: "border-l-ef-blue",
              icon: <Info className="w-4 h-4 text-ef-blue" />,
              title: t("notification.toasts.0.title"),
              msg: t("notification.toasts.0.message"),
            },
            {
              type: "Success",
              border: "border-l-ef-green",
              icon: <CheckCircle className="w-4 h-4 text-ef-green" />,
              title: t("notification.toasts.1.title"),
              msg: t("notification.toasts.1.message"),
            },
            {
              type: "Warning",
              border: "border-l-ef-orange",
              icon: <AlertTriangle className="w-4 h-4 text-ef-orange" />,
              title: t("notification.toasts.2.title"),
              msg: t("notification.toasts.2.message"),
            },
            {
              type: "Error",
              border: "border-l-ef-red",
              icon: <AlertOctagon className="w-4 h-4 text-ef-red" />,
              title: t("notification.toasts.3.title"),
              msg: t("notification.toasts.3.message"),
            },
            {
              type: "Endfield",
              border: "border-l-primary",
              icon: <span className="text-primary text-sm">◆</span>,
              title: t("notification.toasts.4.title"),
              msg: t("notification.toasts.4.message"),
            },
          ].map((item) => (
            <div
              key={item.type}
              className={`bg-surface-2 border border-border ${item.border} border-l-[3px] px-4 py-3 flex items-start gap-3 relative overflow-hidden`}
            >
              <div className="mt-0.5">{item.icon}</div>
              <div className="flex-1">
                <h4
                  className="font-display text-[13px] font-bold uppercase tracking-[0.05em]"
                  style={{
                    color:
                      item.type === "Info"
                        ? "#4DA8DA"
                        : item.type === "Success"
                          ? "#2ED573"
                          : item.type === "Warning"
                            ? "#FFA502"
                            : item.type === "Error"
                              ? "#FF4757"
                              : "#FFD429",
                  }}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.msg}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-shrink" />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Modal */}
      <ComponentPreview
        id="modal-dialog"
        title={t("modal.title")}
        showViewport
        description={t("modal.description")}
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: t("_props.modal-dialog.open"),
          },
          {
            name: "onClose",
            type: "() => void",
            required: true,
            description: t("_props.modal-dialog.onClose"),
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: t("_props.modal-dialog.title"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.modal-dialog.children"),
          },
          {
            name: "actions",
            type: "ReactNode",
            required: false,
            description: t("_props.modal-dialog.actions"),
          },
          {
            name: "variant",
            type: '"default" | "danger"',
            default: '"default"',
            required: false,
            description: t("_props.modal-dialog.variant"),
          },
          {
            name: "closeOnBackdrop",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.modal-dialog.closeOnBackdrop"),
          },
        ]}
        api={[
          {
            name: "useModal",
            signature: "() => { open, onOpen, onClose }",
            description: t("_props.modal-dialog.api.useModal"),
          },
        ]}
        keyboard={[
          { key: "Escape", description: t("_props.modal-dialog.kbd.0") },
          {
            key: "Tab",
            description: t("_props.modal-dialog.kbd.1"),
          },
          {
            key: "Shift + Tab",
            description: t("_props.modal-dialog.kbd.2"),
          },
          { key: "Enter", description: t("_props.modal-dialog.kbd.3") },
        ]}
        install={{
          importPath:
            'import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";',
          usage:
            "<Dialog open={open} onOpenChange={setOpen}>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>CONFIRM ACTION</DialogTitle>\n    </DialogHeader>\n    <p>Content here</p>\n  </DialogContent>\n</Dialog>",
          dependencies: ["@radix-ui/react-dialog"],
        }}
        playground={{
          componentName: "Modal",
          controls: [
            {
              name: "variant",
              type: "select",
              options: ["default", "danger"],
              default: "default",
            },
            {
              name: "title",
              label: t("modal.playground.title_label"),
              type: "text",
              default: t("modal.confirm_title"),
            },
            {
              name: "showFooter",
              label: t("modal.playground.show_footer_label"),
              type: "boolean",
              default: true,
            },
          ],
          render: (v) => (
            <div className="max-w-md mx-auto">
              <div className="bg-surface-3 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.02em] text-foreground">
                    {v.variant === "danger" ? "⚠ " : ""}
                    {v.title}
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-6 py-6">
                  <p className="text-sm text-muted-foreground">
                    {t("modal.confirm_body")}
                  </p>
                </div>
                {v.showFooter && (
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                    <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:text-foreground transition-colors bg-transparent">
                      {t("modal.cancel")}
                    </button>
                    <button
                      className={`clip-corner font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:brightness-110 transition-all ${v.variant === "danger" ? "bg-ef-red text-foreground" : "bg-primary text-primary-foreground"}`}
                    >
                      {v.variant === "danger"
                        ? t("modal.delete")
                        : t("modal.confirm")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ),
        }}
      >
        <div className="flex items-center justify-center min-h-[120px]">
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            {t("modal.confirm_title")}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>{"⚠ " + t("modal.confirm_title")}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {t("modal.confirm_body")}
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">{t("modal.cancel")}</Button>
                </DialogClose>
                <Button variant="destructive">{t("modal.delete")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      {/* Tooltip & Popover */}
      <ComponentPreview
        id="tooltip-popover"
        title={t("tooltip.title")}
        description={t("tooltip.description")}
        props={[
          {
            name: "content",
            type: "ReactNode",
            required: true,
            description: t("_props.tooltip-popover.content"),
          },
          {
            name: "trigger",
            type: "ReactNode",
            required: true,
            description: t("_props.tooltip-popover.trigger"),
          },
          {
            name: "side",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"top"',
            required: false,
            description: t("_props.tooltip-popover.side"),
          },
          {
            name: "delay",
            type: "number",
            default: "200",
            required: false,
            description: t("_props.tooltip-popover.delay"),
          },
          {
            name: "interactive",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.tooltip-popover.interactive"),
          },
        ]}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              {t("tooltip.tooltip_label")}
            </p>
            <div className="relative inline-block">
              <button className="bg-surface-2 border border-border px-4 py-2 text-sm text-card-foreground">
                {t("tooltip.hover_me")}
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-3 border border-border px-3 py-1.5 text-xs text-card-foreground whitespace-nowrap">
                {t("tooltip.tooltip_content")}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-3 border-b border-r border-border rotate-45 -mt-1" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              {t("tooltip.popover_label")}
            </p>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  onMouseEnter={() => setPopoverOpen(true)}
                  onMouseLeave={() => setPopoverOpen(false)}
                >
                  {t("tooltip.hover_me")}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
              >
                <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.05em] text-foreground mb-2">
                  {t("tooltip.popover_title")}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("tooltip.popover_body")}
                </p>
                <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase bg-transparent">
                  {t("tooltip.action_cta")}
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ComponentPreview>

      {/* Loading */}
      <ComponentPreview
        id="loading-skeleton"
        title={t("loading.title")}
        description={t("loading.description")}
        props={[
          {
            name: "variant",
            type: '"spinner" | "dots" | "skeleton" | "fullpage"',
            default: '"spinner"',
            required: false,
            description: t("_props.loading-skeleton.variant"),
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            required: false,
            description: t("_props.loading-skeleton.size"),
          },
          {
            name: "text",
            type: "string",
            required: false,
            description: t("_props.loading-skeleton.text"),
          },
          {
            name: "lines",
            type: "number",
            default: "3",
            required: false,
            description: t("_props.loading-skeleton.lines"),
          },
        ]}
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-8">
            {/* Diamond spinner */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin" />
              <span className="font-ui text-[10px] text-muted-foreground uppercase">
                {t("loading.spinner")}
              </span>
            </div>
            {/* Loading dots */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-primary animate-pulse"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      animationDelay: `${i * 200}ms`,
                    }}
                  />
                ))}
              </div>
              <span className="font-ui text-[10px] text-muted-foreground uppercase">
                {t("loading.dots")}
              </span>
            </div>
            {/* Full page style */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin mx-auto mb-2" />
                <p className="font-ui text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  {t("loading.initializing")}
                </p>
              </div>
            </div>
          </div>
          {/* Skeleton — library components */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("loading.skeleton")}
            </h4>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-3 w-full max-w-xs">
                <SkeletonText lines={3} />
                <div className="flex gap-3 items-center">
                  <SkeletonAvatar size="md" />
                  <SkeletonText lines={2} className="flex-1" />
                </div>
              </div>
              <SkeletonCard showAvatar lines={2} className="w-full max-w-xs" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Empty State */}
      <ComponentPreview
        id="empty-state"
        title={t("empty_state.title")}
        showViewport
        description={t("empty_state.description")}
        props={[
          {
            name: "icon",
            type: "ReactNode",
            required: true,
            description: t("_props.empty-state.icon"),
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: t("_props.empty-state.title"),
          },
          {
            name: "description",
            type: "string",
            required: true,
            description: t("_props.empty-state.description"),
          },
          {
            name: "action",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: t("_props.empty-state.action"),
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmptyState
            variant="search"
            icon={<Search />}
            title={t("empty_state.no_results_title")}
            description={t("empty_state.no_results_desc")}
            action={
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5">
                {t("empty_state.clear_search")}
              </button>
            }
            size="sm"
          />
          <EmptyState
            variant="permission"
            icon={<Lock />}
            title={t("empty_state.access_restricted_title")}
            description={t("empty_state.access_restricted_desc")}
            size="sm"
          />
          <EmptyState
            variant="empty"
            icon={<Mail />}
            title={t("empty_state.inbox_zero_title")}
            description={t("empty_state.inbox_zero_desc")}
            size="sm"
          />
        </div>
      </ComponentPreview>

      {/* Error Pages */}
      <ComponentPreview
        id="error-pages"
        title={t("error_pages.title")}
        showViewport
        description={t("error_pages.description")}
        props={[
          {
            name: "code",
            type: '"404" | "403" | "500" | "503"',
            required: true,
            description: t("_props.error-pages.code"),
          },
          {
            name: "title",
            type: "string",
            required: false,
            description: t("_props.error-pages.title"),
          },
          {
            name: "onRetry",
            type: "() => void",
            required: false,
            description: t("_props.error-pages.onRetry"),
          },
        ]}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              code: "404",
              title: t("error_pages.signal_lost_title"),
              color: "text-primary",
              desc: t("error_pages.signal_lost_desc"),
            },
            {
              code: "403",
              title: t("error_pages.access_denied_title"),
              color: "text-ef-red",
              desc: t("error_pages.access_denied_desc"),
            },
            {
              code: "500",
              title: t("error_pages.system_malfunction_title"),
              color: "text-ef-orange",
              desc: t("error_pages.system_malfunction_desc"),
            },
            {
              code: "503",
              title: t("error_pages.maintenance_title"),
              color: "text-ef-blue",
              desc: t("error_pages.maintenance_desc"),
            },
          ].map((e) => (
            <div
              key={e.code}
              className="text-center py-5 px-3 scanline-overlay bg-surface-1 border border-border overflow-hidden flex flex-col items-center justify-center"
            >
              <p
                className={`font-display text-4xl sm:text-5xl lg:text-6xl leading-none font-black tracking-[0.08em] sm:tracking-[0.12em] ${e.color} animate-glitch`}
                style={{ textShadow: "0 0 30px currentColor" }}
              >
                {e.code}
              </p>
              <h4 className="font-display text-[10px] sm:text-xs font-bold uppercase mt-3 text-foreground">
                {e.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                {e.desc}
              </p>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#444] mt-2 sm:mt-3">
                EF-{e.code}-3B2C
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Offline */}
      <ComponentPreview
        id="offline-state"
        title={t("offline.title")}
        description={t("offline.description")}
        props={[
          {
            name: "variant",
            type: '"banner" | "fullpage"',
            default: '"banner"',
            required: false,
            description: t("_props.offline-state.variant"),
          },
          {
            name: "onRetry",
            type: "() => void",
            required: false,
            description: t("_props.offline-state.onRetry"),
          },
        ]}
      >
        <div className="space-y-4">
          <div className="bg-ef-orange/[0.08] border border-ef-orange/20 border-l-[3px] border-l-ef-orange px-5 py-3 flex items-center gap-3">
            <WifiOff className="w-4 h-4 text-ef-orange" />
            <span className="text-sm text-ef-orange">
              {t("offline.banner_text")}
            </span>
          </div>
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase">
              <span
                className="w-2 h-2 bg-ef-green"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("offline.online")}
            </span>
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-red">
              <span
                className="w-2 h-2 bg-ef-red"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("offline.offline_label")}
            </span>
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-orange">
              <span
                className="w-2 h-2 bg-ef-orange"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("offline.slow")}
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* Success State */}
      <ComponentPreview
        id="success-state"
        title={t("success.title")}
        description={t("success.description")}
        props={[
          {
            name: "message",
            type: "string",
            required: true,
            description: t("_props.success-state.message"),
          },
          {
            name: "variant",
            type: '"inline" | "fullpage"',
            default: '"inline"',
            required: false,
            description: t("_props.success-state.variant"),
          },
        ]}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-ef-green/[0.08] border border-ef-green/20 px-4 py-3">
            <CheckCircle className="w-5 h-5 text-ef-green" />
            <span className="text-sm text-ef-green">
              {t("success.success_message")}
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* Inline Validation */}
      <ComponentPreview
        id="inline-validation"
        title={t("validation.title")}
        description={t("validation.description")}
        props={[
          {
            name: "status",
            type: '"error" | "success" | "warning" | "idle"',
            default: '"idle"',
            required: false,
            description: t("_props.inline-validation.status"),
          },
          {
            name: "message",
            type: "string",
            required: false,
            description: t("_props.inline-validation.message"),
          },
          {
            name: "trigger",
            type: '"onChange" | "onBlur" | "onSubmit"',
            default: '"onBlur"',
            required: false,
            description: t("_props.inline-validation.trigger"),
          },
          {
            name: "debounce",
            type: "number",
            default: "300",
            required: false,
            description: t("_props.inline-validation.debounce"),
          },
        ]}
      >
        <div className="max-w-sm space-y-4">
          <div>
            <input
              className="w-full bg-surface-1 border border-ef-red text-card-foreground px-4 py-3 text-sm outline-none shadow-[0_0_0_3px_rgba(255,71,87,0.1)]"
              value="ab"
              readOnly
            />
            <p className="text-xs text-ef-red mt-1">
              {t("validation.password_error")}
            </p>
          </div>
          <div>
            <input
              className="w-full bg-surface-1 border border-ef-green text-card-foreground px-4 py-3 text-sm outline-none"
              value="endministrator@endfield.icu"
              readOnly
            />
            <p className="text-xs text-ef-green mt-1">
              {t("validation.email_valid")}
            </p>
          </div>
          <div>
            <input
              className="w-full bg-surface-1 border border-ef-orange text-card-foreground px-4 py-3 text-sm outline-none"
              value="password123"
              readOnly
            />
            <p className="text-xs text-ef-orange mt-1">
              {t("validation.password_warning")}
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* Banner & Alert */}
      <ComponentPreview
        id="banner-alert"
        title={t("banner.title")}
        description={t("banner.description")}
        props={[
          {
            name: "type",
            type: '"info" | "success" | "warning" | "error"',
            required: true,
            description: t("_props.banner-alert.type"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.banner-alert.children"),
          },
          {
            name: "dismissible",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.banner-alert.dismissible"),
          },
          {
            name: "variant",
            type: '"inline" | "banner"',
            default: '"inline"',
            required: false,
            description: t("_props.banner-alert.variant"),
          },
          {
            name: "onDismiss",
            type: "() => void",
            required: false,
            description: t("_props.banner-alert.onDismiss"),
          },
        ]}
      >
        <div className="space-y-3 max-w-xl">
          <Alert variant="info" title="INFO">
            {t("banner.info_message", { type: "Info" })}
          </Alert>
          <Alert variant="success" title="SUCCESS">
            {t("banner.info_message", { type: "Success" })}
          </Alert>
          <Alert variant="warning" title="WARNING">
            {t("banner.info_message", { type: "Warning" })}
          </Alert>
          <Alert variant="error" title="ERROR" dismissible>
            {t("banner.info_message", { type: "Error" })}
          </Alert>
        </div>
      </ComponentPreview>
      <SignatureFeedbackSection />
    </>
  );
}
