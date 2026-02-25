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
  WifiOff,
  Mail,
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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SkeletonCard, SkeletonText, SkeletonAvatar, SkeletonImage, SkeletonTableRow } from "../ui/skeleton";
import { EmptyState } from "../ui/empty-state";
import { Alert, TopBanner } from "../ui/alert";
import { WarningBanner } from "../ui/signature/warning-banner";
import { notify } from "../ui/sonner";

export function FeedbackSection() {
  const { t } = useTranslation("feedback");
  const [dialogOpen, setDialogOpen] = useState(false);
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
            name: "notify.info()",
            signature: "(msg: string, opts?: object) => void",
            description: t("_props.toast-notification.api.toast_info"),
          },
          {
            name: "notify.success()",
            signature: "(msg: string, opts?: object) => void",
            description: t("_props.toast-notification.api.toast_success"),
          },
          {
            name: "notify.warning()",
            signature: "(msg: string, opts?: object) => void",
            description: t("_props.toast-notification.api.toast_warning"),
          },
          {
            name: "notify.error()",
            signature: "(msg: string, opts?: object) => void",
            description: t("_props.toast-notification.api.toast_error"),
          },
        ]}
        code={`import { SonnerToaster, notify } from "reend-components";

// Mount once in your app root:
<SonnerToaster />

// Then call anywhere:
notify.info("Scan initiated. Processing data...");
notify.success("Operation complete.");
notify.warning("Maintenance scheduled. Save your work.");
notify.error("Signal lost. Check your connection.");`}
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
              <div className="mt-0.5" aria-hidden="true">{item.icon}</div>
              <div className="flex-1">
                <h4
                  className={`font-display text-[13px] font-bold uppercase tracking-[0.05em] ${
                    item.type === "Info"
                      ? "text-ef-blue"
                      : item.type === "Success"
                        ? "text-ef-green"
                        : item.type === "Warning"
                          ? "text-ef-orange"
                          : item.type === "Error"
                            ? "text-ef-red"
                            : "text-primary"
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.msg}</p>
              </div>
              <button
                aria-label={t("notification.dismiss_label")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-shrink" />
            </div>
          ))}
        </div>
        {/* Live trigger buttons */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
            {t("notification.trigger_label")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => notify.info(t("notification.toasts.0.message"))}>
              {t("notification.trigger_info")}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => notify.success(t("notification.toasts.1.message"))}>
              {t("notification.trigger_success")}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => notify.warning(t("notification.toasts.2.message"))}>
              {t("notification.trigger_warning")}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => notify.error(t("notification.toasts.3.message"))}>
              {t("notification.trigger_error")}
            </Button>
          </div>
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
              <div className="bg-surface-3 border border-border shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.02em] text-foreground flex items-center gap-2">
                    {v.variant === "danger" && (
                      <AlertTriangle className="w-4 h-4 text-ef-red shrink-0" aria-hidden="true" />
                    )}
                    {v.title}
                  </h3>
                  <button
                    aria-label={t("modal.close_label")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
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
        code={`import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from "reend-components";

<Dialog>
  <DialogTrigger asChild>
    <button>OPEN BRIEFING</button>
  </DialogTrigger>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>MISSION BRIEFING</DialogTitle>
      <DialogDescription>
        Endfield System has detected an anomaly.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <button variant="secondary">CANCEL</button>
      </DialogClose>
      <button>CONFIRM</button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <div className="flex items-center justify-center min-h-[120px]">
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            {t("modal.confirm_title")}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-ef-red shrink-0" aria-hidden="true" />
                  {t("modal.confirm_title")}
                </DialogTitle>
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
        code={`import {
  TooltipProvider, Tooltip,
  TooltipTrigger, TooltipContent,
} from "reend-components";
import { Popover, PopoverTrigger, PopoverContent } from "reend-components";

// Tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent>OPERATOR STATUS: ACTIVE</TooltipContent>
  </Tooltip>
</TooltipProvider>

// Popover
<Popover>
  <PopoverTrigger asChild>
    <button>DETAILS</button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Endfield System v2.4.1 — All systems operational.</p>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              {t("tooltip.tooltip_label")}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">{t("tooltip.hover_me")}</Button>
                </TooltipTrigger>
                <TooltipContent>{t("tooltip.tooltip_content")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              {t("tooltip.popover_label")}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{t("tooltip.click_me")}</Button>
              </PopoverTrigger>
              <PopoverContent>
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
        code={`import {
  SkeletonLine, SkeletonText, SkeletonAvatar,
  SkeletonCard, SkeletonImage, SkeletonTableRow,
} from "reend-components";

// Card skeleton
<SkeletonCard />

// Avatar + text combo
<div className="flex items-center gap-3">
  <SkeletonAvatar size="md" />
  <SkeletonText lines={2} />
</div>

// Table row shimmer
<SkeletonTableRow cols={4} />

// CSS spinner (no import needed)
// <div className="diamond-loader" />`}
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-8">
            {/* Diamond spinner */}
            <div className="flex flex-col items-center gap-2">
              <div
                role="status"
                aria-label={t("loading.loading_label")}
                className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin"
              />
              <span className="font-ui text-[10px] text-muted-foreground uppercase" aria-hidden="true">
                {t("loading.spinner")}
              </span>
            </div>
            {/* Loading dots */}
            <div className="flex flex-col items-center gap-2">
              <div
                role="status"
                aria-label={t("loading.loading_label")}
                className="flex gap-1"
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-primary animate-pulse"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      animationDelay: `${i * 200}ms`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-ui text-[10px] text-muted-foreground uppercase" aria-hidden="true">
                {t("loading.dots")}
              </span>
            </div>
            {/* Full page style */}
            <div className="flex flex-col items-center gap-2">
              <div
                role="status"
                aria-label={t("loading.loading_label")}
                className="text-center"
              >
                <div className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin mx-auto mb-2" aria-hidden="true" />
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
            <div className="mt-6 space-y-3 max-w-md">
              <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-2">
                {t("loading.table_row_image")}
              </h4>
              <SkeletonTableRow columns={4} />
              <SkeletonTableRow columns={4} />
              <SkeletonImage aspectRatio="video" className="max-w-xs" />
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
        code={`import { EmptyState } from "reend-components";

<EmptyState variant="search" />
<EmptyState variant="empty-list" />
<EmptyState variant="no-permission" />
<EmptyState variant="error-loading" />
<EmptyState variant="no-notifications" />
<EmptyState variant="empty-filter" />
<EmptyState variant="inbox-zero" />
<EmptyState variant="no-connection" />`}
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
        code={`import { EmptyState } from "reend-components";

// 404 — Not Found
<EmptyState variant="empty-list" />

// Use the animate-glitch class for error codes:
// <span className="animate-glitch font-display text-8xl text-primary">404</span>

// Full error page pattern:
// 1. Large glitch error code (animate-glitch)
// 2. Title + description (font-display)
// 3. Action buttons (variant="primary" + variant="secondary")
// 4. Corner bracket decoration (clip-corner class)`}
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
                aria-hidden="true"
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
              <p className="font-mono text-[10px] sm:text-[11px] text-muted-foreground mt-2 sm:mt-3">
                EF-{e.code}-3B2C
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Connectivity & System States (offline + success merged) */}
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
          {
            name: "message",
            type: "string",
            required: false,
            description: t("_props.offline-state.message"),
          },
        ]}
        code={`import { Alert } from "reend-components";

// Offline detection
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handle = () => setIsOnline(navigator.onLine);
  window.addEventListener("online", handle);
  window.addEventListener("offline", handle);
  return () => {
    window.removeEventListener("online", handle);
    window.removeEventListener("offline", handle);
  };
}, []);

// Render
{!isOnline && (
  <Alert variant="warning" title="CONNECTION LOST">
    Signal lost. Check your network status.
  </Alert>
)}
{isOnline && (
  <Alert variant="success" title="RECONNECTED">
    System link restored. All operations nominal.
  </Alert>
)}`}
      >
        <div className="space-y-6">
          {/* Connectivity states */}
          <div>
            <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("offline.connectivity_states_label")}
            </p>
            <div className="space-y-4">
              <div className="bg-ef-orange/[0.08] border border-ef-orange/20 border-l-[3px] border-l-ef-orange px-5 py-3 flex items-center gap-3">
                <WifiOff className="w-4 h-4 text-ef-orange" aria-hidden="true" />
                <span className="text-sm text-ef-orange">
                  {t("offline.banner_text")}
                </span>
              </div>
              <div className="flex flex-wrap gap-6">
                <span className="flex items-center gap-2 font-ui text-[10px] uppercase">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 bg-ef-green"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />{" "}
                  {t("offline.online")}
                </span>
                <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-red">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 bg-ef-red"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />{" "}
                  {t("offline.offline_label")}
                </span>
                <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-orange">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 bg-ef-orange"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />{" "}
                  {t("offline.slow")}
                </span>
              </div>
            </div>
          </div>

          {/* Success state */}
          <div>
            <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("offline.success_states_label")}
            </p>
            <div className="flex items-center gap-3 bg-ef-green/[0.08] border border-ef-green/20 border-l-[3px] border-l-ef-green px-4 py-3 animate-in fade-in-0 duration-300">
              <CheckCircle className="w-5 h-5 text-ef-green animate-in zoom-in-95 duration-300" aria-hidden="true" />
              <span className="text-sm text-ef-green">
                {t("offline.success_message")}
              </span>
            </div>
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
        code={`import { Input, Label, HelperText } from "reend-components";

// Error state
<div className="space-y-1">
  <Label htmlFor="callsign">CALLSIGN</Label>
  <Input
    id="callsign"
    aria-invalid="true"
    aria-describedby="callsign-error"
    className="border-ef-red focus-visible:ring-ef-red/30"
  />
  <HelperText id="callsign-error" variant="error">
    Callsign already in use. Choose another.
  </HelperText>
</div>

// Success state
<Input className="border-ef-green focus-visible:ring-ef-green/30" />
<HelperText variant="success">Callsign available.</HelperText>`}
      >
        <div className="max-w-sm space-y-4">
          <div>
            <Input
              className="border-ef-red ring-2 ring-ef-red/10"
              value="ab"
              readOnly
              aria-invalid="true"
              aria-describedby="ef-validation-error"
            />
            <p id="ef-validation-error" className="text-xs text-ef-red mt-1 flex items-center gap-1">
              <X className="w-3 h-3 shrink-0" aria-hidden="true" />
              {t("validation.password_error")}
            </p>
          </div>
          <div>
            <Input
              className="border-ef-green"
              value="endministrator@endfield.icu"
              readOnly
              aria-describedby="ef-validation-success"
            />
            <p id="ef-validation-success" className="text-xs text-ef-green mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {t("validation.email_valid")}
            </p>
          </div>
          <div>
            <Input
              className="border-ef-orange"
              value="password123"
              readOnly
              aria-describedby="ef-validation-warning"
            />
            <p id="ef-validation-warning" className="text-xs text-ef-orange mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" aria-hidden="true" />
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
            name: "variant",
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
            default: "false",
            required: false,
            description: t("_props.banner-alert.dismissible"),
          },
          {
            name: "onDismiss",
            type: "() => void",
            required: false,
            description: t("_props.banner-alert.onDismiss"),
          },
          {
            name: "level",
            type: '"caution" | "alert" | "critical"',
            default: '"caution"',
            required: false,
            description: t("_props.banner-alert.level"),
          },
        ]}
        api={[
          {
            name: "Alert",
            signature: "variant: info | success | warning | error",
            description: "Generic inline feedback alert. Dismissible with onDismiss callback.",
          },
          {
            name: "TopBanner",
            signature: "dismissible?: boolean",
            description: "Sticky full-width announcement bar (bg-primary). Sits at top of page.",
          },
          {
            name: "WarningBanner",
            signature: "level: caution | alert | critical",
            description: "◆ SIGNATURE — Endfield tactical warning. clip-corner + AlertTriangle icon. Levels map to yellow/orange/red.",
          },
        ]}
        install={{
          importPath: 'import { Alert, TopBanner } from "@/components/ui/alert";\nimport { WarningBanner } from "@/components/ui/signature/warning-banner";',
          usage: '<Alert variant="warning" title="WARNING">Message</Alert>\n<TopBanner>◆ NEW VERSION AVAILABLE</TopBanner>\n<WarningBanner level="critical">System integrity compromised.</WarningBanner>',
          dependencies: [],
        }}
        code={`import { Alert, TopBanner } from "reend-components";
import { WarningBanner } from "reend-components";

// Alert variants
<Alert variant="info" title="SYSTEM UPDATE">Patch 2.4.1 deployed.</Alert>
<Alert variant="success" title="OPERATION COMPLETE" dismissible />
<Alert variant="warning" title="MAINTENANCE WINDOW" dismissible />
<Alert variant="error" title="CRITICAL FAILURE" />

// Top sticky banner
<TopBanner variant="warning">
  ◆ Scheduled maintenance in 2 hours. Save your work.
</TopBanner>

// Signature warning banner
<WarningBanner severity="caution" title="CAUTION">
  Proceed with care.
</WarningBanner>
<WarningBanner severity="alert" title="ALERT" />
<WarningBanner severity="critical" title="CRITICAL" />`}
      >
        <div className="space-y-3 max-w-xl">
          {/* Generic Alert variants */}
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

          {/* TopBanner */}
          <div className="mt-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("banner.top_banner_label")}
            </h4>
            <TopBanner>
              {t("banner.new_version")}
            </TopBanner>
          </div>

          {/* WarningBanner — Signature */}
          <div className="mt-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-1">
              {t("banner.tactical_heading")}
            </h4>
            <p className="text-[11px] text-muted-foreground mb-3">
              {t("banner.tactical_description")}
            </p>
            <div className="space-y-3">
              <WarningBanner level="caution">
                {t("banner.warning_caution_msg")}
              </WarningBanner>
              <WarningBanner level="alert">
                {t("banner.warning_alert_msg")}
              </WarningBanner>
              <WarningBanner level="critical">
                {t("banner.warning_critical_msg")}
              </WarningBanner>
            </div>
          </div>
        </div>
      </ComponentPreview>
      <SignatureFeedbackSection />
    </>
  );
}
