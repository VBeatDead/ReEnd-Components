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

export const FeedbackSection = () => {
  return (
    <>
      {/* 25. Toast */}
      <ComponentPreview
        id="toast-notification"
        title="25. Notification & Toast"
        showViewport
        description="Left border 3px semantic color. Auto-dismiss progress bar. Position: top-right."
        props={[
          {
            name: "type",
            type: '"info" | "success" | "warning" | "error" | "endfield"',
            required: true,
            description: "Semantic type controlling color and icon",
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: "Bold uppercase heading text",
          },
          {
            name: "message",
            type: "string",
            required: true,
            description: "Body text description",
          },
          {
            name: "duration",
            type: "number",
            default: "5000",
            required: false,
            description: "Auto-dismiss time in ms. Set 0 for persistent.",
          },
          {
            name: "dismissible",
            type: "boolean",
            default: "true",
            required: false,
            description: "Shows the X close button",
          },
          {
            name: "onDismiss",
            type: "() => void",
            required: false,
            description: "Callback when toast is dismissed",
          },
        ]}
        api={[
          {
            name: "toast.info()",
            signature: "(title: string, msg: string) => void",
            description:
              "Shows an info toast with blue left border and info icon.",
          },
          {
            name: "toast.success()",
            signature: "(title: string, msg: string) => void",
            description:
              "Shows a success toast with green left border and checkmark icon.",
          },
          {
            name: "toast.error()",
            signature: "(title: string, msg: string) => void",
            description:
              "Shows an error toast with red left border and alert icon.",
          },
        ]}
      >
        <div className="space-y-3 max-w-sm">
          {[
            {
              type: "Info",
              border: "border-l-ef-blue",
              icon: <Info className="w-4 h-4 text-ef-blue" />,
              title: "SYSTEM INFO",
              msg: "New update available.",
            },
            {
              type: "Success",
              border: "border-l-ef-green",
              icon: <CheckCircle className="w-4 h-4 text-ef-green" />,
              title: "OPERATION COMPLETE",
              msg: "Data saved successfully.",
            },
            {
              type: "Warning",
              border: "border-l-ef-orange",
              icon: <AlertTriangle className="w-4 h-4 text-ef-orange" />,
              title: "CAUTION",
              msg: "Maintenance scheduled.",
            },
            {
              type: "Error",
              border: "border-l-ef-red",
              icon: <AlertOctagon className="w-4 h-4 text-ef-red" />,
              title: "ERROR DETECTED",
              msg: "Connection lost to server.",
            },
            {
              type: "Endfield",
              border: "border-l-primary",
              icon: <span className="text-primary text-sm">◆</span>,
              title: "ENDFIELD ALERT",
              msg: "New mission briefing.",
            },
          ].map((t) => (
            <div
              key={t.type}
              className={`bg-surface-2 border border-border ${t.border} border-l-[3px] px-4 py-3 flex items-start gap-3 relative overflow-hidden`}
            >
              <div className="mt-0.5">{t.icon}</div>
              <div className="flex-1">
                <h4
                  className="font-display text-[13px] font-bold uppercase tracking-[0.05em]"
                  style={{
                    color:
                      t.type === "Info"
                        ? "#4DA8DA"
                        : t.type === "Success"
                          ? "#2ED573"
                          : t.type === "Warning"
                            ? "#FFA502"
                            : t.type === "Error"
                              ? "#FF4757"
                              : "#FFD429",
                  }}
                >
                  {t.title}
                </h4>
                <p className="text-sm text-muted-foreground">{t.msg}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-shrink" />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 26. Modal */}
      <ComponentPreview
        id="modal-dialog"
        title="26. Modal & Dialog"
        showViewport
        description="Backdrop: blur(4px). Container: surface-3. Title: Orbitron 16px uppercase. Close: ✕."
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: "Controls modal visibility",
          },
          {
            name: "onClose",
            type: "() => void",
            required: true,
            description: "Callback when modal is closed",
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: "Modal header title text",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Modal body content",
          },
          {
            name: "actions",
            type: "ReactNode",
            required: false,
            description: "Footer action buttons",
          },
          {
            name: "variant",
            type: '"default" | "danger"',
            default: '"default"',
            required: false,
            description: "Visual variant for destructive confirmations",
          },
          {
            name: "closeOnBackdrop",
            type: "boolean",
            default: "true",
            required: false,
            description: "Close when clicking backdrop overlay",
          },
        ]}
        api={[
          {
            name: "useModal",
            signature: "() => { open, onOpen, onClose }",
            description:
              "Hook to manage modal open/close state with escape key handling built-in.",
          },
        ]}
        keyboard={[
          { key: "Escape", description: "Close the modal dialog" },
          {
            key: "Tab",
            description:
              "Move focus to the next element within the modal (focus trap)",
          },
          {
            key: "Shift + Tab",
            description: "Move focus to the previous element within the modal",
          },
          { key: "Enter", description: "Activate the focused action button" },
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
              label: "Title",
              type: "text",
              default: "CONFIRM ACTION",
            },
            {
              name: "showFooter",
              label: "Show Footer",
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
                    This action cannot be undone. All associated data will be
                    permanently removed from the system.
                  </p>
                </div>
                {v.showFooter && (
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                    <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:text-foreground transition-colors bg-transparent">
                      CANCEL
                    </button>
                    <button
                      className={`clip-corner font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:brightness-110 transition-all ${v.variant === "danger" ? "bg-ef-red text-foreground" : "bg-primary text-primary-foreground"}`}
                    >
                      {v.variant === "danger" ? "DELETE" : "CONFIRM"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ),
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="bg-surface-3 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-display text-base font-bold uppercase tracking-[0.02em] text-foreground">
                ⚠ CONFIRM ACTION
              </h3>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-6">
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. All associated data will be
                permanently removed from the system.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:text-foreground transition-colors bg-transparent">
                CANCEL
              </button>
              <button className="clip-corner bg-ef-red text-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5 hover:brightness-110 transition-all">
                DELETE
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 27. Tooltip & Popover */}
      <ComponentPreview
        id="tooltip-popover"
        title="27. Tooltip & Popover"
        description="Tooltip: #222 bg, 12px, non-interactive. Popover: surface-2, shadow-lg, interactive."
        props={[
          {
            name: "content",
            type: "ReactNode",
            required: true,
            description: "Tooltip/popover content",
          },
          {
            name: "trigger",
            type: "ReactNode",
            required: true,
            description: "Element that triggers the tooltip",
          },
          {
            name: "side",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"top"',
            required: false,
            description: "Preferred placement side",
          },
          {
            name: "delay",
            type: "number",
            default: "200",
            required: false,
            description: "Hover delay in ms before showing (tooltip only)",
          },
          {
            name: "interactive",
            type: "boolean",
            default: "false",
            required: false,
            description: "If true, renders as popover (clickable content)",
          },
        ]}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              TOOLTIP
            </p>
            <div className="relative inline-block">
              <button className="bg-surface-2 border border-border px-4 py-2 text-sm text-card-foreground">
                Hover me
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-3 border border-border px-3 py-1.5 text-xs text-card-foreground whitespace-nowrap">
                Tooltip content
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-3 border-b border-r border-border rotate-45 -mt-1" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">
              POPOVER
            </p>
            <div className="bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)] p-4 min-w-[200px]">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.05em] text-foreground mb-2">
                POPOVER TITLE
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Interactive popover content with actions.
              </p>
              <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase bg-transparent">
                ACTION →
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 28. Loading */}
      <ComponentPreview
        id="loading-skeleton"
        title="28. Loading, Skeleton & Spinner"
        description="Diamond spinner with clip-path. Skeleton shimmer effect. Loading dots."
        props={[
          {
            name: "variant",
            type: '"spinner" | "dots" | "skeleton" | "fullpage"',
            default: '"spinner"',
            required: false,
            description: "Loading indicator style",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            required: false,
            description: "Spinner/dots size",
          },
          {
            name: "text",
            type: "string",
            required: false,
            description:
              "Optional loading status text (e.g. 'INITIALIZING...')",
          },
          {
            name: "lines",
            type: "number",
            default: "3",
            required: false,
            description: "Number of skeleton shimmer lines",
          },
        ]}
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-8">
            {/* Diamond spinner */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin" />
              <span className="font-ui text-[10px] text-muted-foreground uppercase">
                SPINNER
              </span>
            </div>
            {/* Loading dots */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
              <span className="font-ui text-[10px] text-muted-foreground uppercase">
                DOTS
              </span>
            </div>
            {/* Full page style */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent clip-corner-sm animate-diamond-spin mx-auto mb-2" />
                <p className="font-ui text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  INITIALIZING...
                </p>
              </div>
            </div>
          </div>
          {/* Skeleton */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              SKELETON
            </h4>
            <div className="max-w-sm space-y-3">
              <div className="h-4 w-3/4 animate-skeleton rounded-none" />
              <div className="h-4 w-full animate-skeleton rounded-none" />
              <div className="h-4 w-2/3 animate-skeleton rounded-none" />
              <div className="flex gap-3 mt-4">
                <div className="w-10 h-10 animate-skeleton rounded-none" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 animate-skeleton rounded-none" />
                  <div className="h-3 w-3/4 animate-skeleton rounded-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 29. Empty State */}
      <ComponentPreview
        id="empty-state"
        title="29. Empty State"
        showViewport
        description="Icon 48px, title Orbitron 18px uppercase. CTA button. Context-specific variants."
        props={[
          {
            name: "icon",
            type: "ReactNode",
            required: true,
            description: "Large icon element (48px)",
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: "Uppercase heading text",
          },
          {
            name: "description",
            type: "string",
            required: true,
            description: "Supporting context text",
          },
          {
            name: "action",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: "Optional CTA button",
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Search className="w-12 h-12" />,
              title: "NO RESULTS FOUND",
              desc: "Coba ubah kata kunci pencarian.",
              cta: "CLEAR SEARCH",
            },
            {
              icon: <Lock className="w-12 h-12" />,
              title: "ACCESS RESTRICTED",
              desc: "Anda tidak memiliki akses.",
              cta: null,
            },
            {
              icon: <Mail className="w-12 h-12" />,
              title: "INBOX ZERO",
              desc: "Semua pesan telah diproses.",
              cta: null,
            },
          ].map((e) => (
            <div
              key={e.title}
              className="flex flex-col items-center text-center py-8 px-4"
            >
              <div className="text-ef-gray-mid mb-4">{e.icon}</div>
              <h4 className="font-display text-lg font-bold tracking-[0.02em] uppercase text-foreground mb-2">
                {e.title}
              </h4>
              <p className="text-sm text-muted-foreground max-w-[360px] mb-4">
                {e.desc}
              </p>
              {e.cta && (
                <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2.5">
                  {e.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 30. Error Pages */}
      <ComponentPreview
        id="error-pages"
        title="30. Error Pages"
        showViewport
        description="Error code: Orbitron 120px glitch animation. Color-coded by error type."
        props={[
          {
            name: "code",
            type: '"404" | "403" | "500" | "503"',
            required: true,
            description: "HTTP error code",
          },
          {
            name: "title",
            type: "string",
            required: false,
            description: "Override default error title",
          },
          {
            name: "onRetry",
            type: "() => void",
            required: false,
            description: "Retry action callback (shows retry button)",
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              code: "404",
              title: "SIGNAL LOST",
              color: "text-primary",
              desc: "Halaman tidak ditemukan.",
            },
            {
              code: "403",
              title: "ACCESS DENIED",
              color: "text-ef-red",
              desc: "Anda tidak memiliki izin.",
            },
            {
              code: "500",
              title: "SYSTEM MALFUNCTION",
              color: "text-ef-orange",
              desc: "Kesalahan server.",
            },
            {
              code: "503",
              title: "MAINTENANCE MODE",
              color: "text-ef-blue",
              desc: "Sistem dalam perbaikan.",
            },
          ].map((e) => (
            <div
              key={e.code}
              className="text-center py-6 scanline-overlay bg-surface-1 border border-border"
            >
              <p
                className={`font-display text-5xl font-black tracking-[0.2em] ${e.color} animate-glitch`}
                style={{ textShadow: "0 0 40px currentColor" }}
              >
                {e.code}
              </p>
              <h4 className="font-display text-xs font-bold uppercase mt-3 text-foreground">
                {e.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{e.desc}</p>
              <p className="font-mono text-[9px] text-ef-gray-mid mt-3">
                EF-{e.code}-3B2C
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 31. Offline */}
      <ComponentPreview
        id="offline-state"
        title="31. Offline State"
        description="Full page dan inline banner variants. Network status indicator."
        props={[
          {
            name: "variant",
            type: '"banner" | "fullpage"',
            default: '"banner"',
            required: false,
            description: "Display mode",
          },
          {
            name: "onRetry",
            type: "() => void",
            required: false,
            description: "Retry connection callback",
          },
        ]}
      >
        <div className="space-y-4">
          <div className="bg-ef-orange/[0.08] border border-ef-orange/20 border-l-[3px] border-l-ef-orange px-5 py-3 flex items-center gap-3">
            <WifiOff className="w-4 h-4 text-ef-orange" />
            <span className="text-sm text-ef-orange">
              Anda sedang offline. Beberapa fitur mungkin tidak tersedia.
            </span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase">
              <span className="w-2 h-2 rounded-full bg-ef-green" /> ONLINE
            </span>
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-red">
              <span className="w-2 h-2 rounded-full bg-ef-red" /> OFFLINE
            </span>
            <span className="flex items-center gap-2 font-ui text-[10px] uppercase text-ef-orange">
              <span className="w-2 h-2 rounded-full bg-ef-orange" /> SLOW
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* 32. Success State */}
      <ComponentPreview
        id="success-state"
        title="32. Success State / Confirmation"
        description="Checkmark icon animated. Green accent. Minimal affirming text."
        props={[
          {
            name: "message",
            type: "string",
            required: true,
            description: "Success message text",
          },
          {
            name: "variant",
            type: '"inline" | "fullpage"',
            default: '"inline"',
            required: false,
            description: "Display mode",
          },
        ]}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-ef-green/[0.08] border border-ef-green/20 px-4 py-3">
            <CheckCircle className="w-5 h-5 text-ef-green" />
            <span className="text-sm text-ef-green">
              Operation complete. Changes have been saved.
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* 33. Inline Validation */}
      <ComponentPreview
        id="inline-validation"
        title="33. Inline Validation"
        description="Field-level: icon prefix ✕/✓/⚠. Real-time debounced 300ms, on-blur, on-submit."
        props={[
          {
            name: "status",
            type: '"error" | "success" | "warning" | "idle"',
            default: '"idle"',
            required: false,
            description: "Validation state",
          },
          {
            name: "message",
            type: "string",
            required: false,
            description: "Validation message with icon prefix",
          },
          {
            name: "trigger",
            type: '"onChange" | "onBlur" | "onSubmit"',
            default: '"onBlur"',
            required: false,
            description: "When validation fires",
          },
          {
            name: "debounce",
            type: "number",
            default: "300",
            required: false,
            description: "Debounce delay in ms for onChange trigger",
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
              ✕ Password must be at least 8 characters.
            </p>
          </div>
          <div>
            <input
              className="w-full bg-surface-1 border border-ef-green text-card-foreground px-4 py-3 text-sm outline-none"
              value="endministrator@endfield.icu"
              readOnly
            />
            <p className="text-xs text-ef-green mt-1">✓ Email is valid.</p>
          </div>
          <div>
            <input
              className="w-full bg-surface-1 border border-ef-orange text-card-foreground px-4 py-3 text-sm outline-none"
              value="password123"
              readOnly
            />
            <p className="text-xs text-ef-orange mt-1">
              ⚠ Consider using a stronger password.
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* 34. Banner & Alert */}
      <ComponentPreview
        id="banner-alert"
        title="34. Banner & Alert (Persistent)"
        description="Inline alerts with semantic bg tint. Top-of-page banner: yellow bg, black text."
        props={[
          {
            name: "type",
            type: '"info" | "success" | "warning" | "error"',
            required: true,
            description: "Semantic type controlling color scheme",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Alert message content",
          },
          {
            name: "dismissible",
            type: "boolean",
            default: "true",
            required: false,
            description: "Shows close button",
          },
          {
            name: "variant",
            type: '"inline" | "banner"',
            default: '"inline"',
            required: false,
            description: "Inline alert or full-width top banner",
          },
          {
            name: "onDismiss",
            type: "() => void",
            required: false,
            description: "Callback when dismissed",
          },
        ]}
      >
        <div className="space-y-4">
          {[
            {
              type: "Info",
              bg: "bg-ef-blue/[0.08]",
              border: "border-ef-blue/20",
              color: "text-ef-blue",
              icon: <Info className="w-4 h-4" />,
            },
            {
              type: "Success",
              bg: "bg-ef-green/[0.08]",
              border: "border-ef-green/20",
              color: "text-ef-green",
              icon: <CheckCircle className="w-4 h-4" />,
            },
            {
              type: "Warning",
              bg: "bg-ef-orange/[0.08]",
              border: "border-ef-orange/20",
              color: "text-ef-orange",
              icon: <AlertTriangle className="w-4 h-4" />,
            },
            {
              type: "Error",
              bg: "bg-ef-red/[0.08]",
              border: "border-ef-red/20",
              color: "text-ef-red",
              icon: <AlertOctagon className="w-4 h-4" />,
            },
          ].map((a) => (
            <div
              key={a.type}
              className={`${a.bg} border ${a.border} px-4 py-3 flex items-start gap-3`}
            >
              <span className={a.color}>{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-card-foreground">
                  {a.type} alert message. Persistent and dismissible.
                </p>
              </div>
              <button className="text-muted-foreground/50 hover:text-foreground text-xs">
                ✕
              </button>
            </div>
          ))}
          {/* Top banner */}
          <div className="bg-primary text-primary-foreground px-4 py-2.5 text-center font-display text-xs font-semibold tracking-[0.08em] uppercase flex items-center justify-center gap-4">
            <span>◆ NEW VERSION AVAILABLE — UPDATE NOW</span>
            <button className="text-primary-foreground/70 hover:text-primary-foreground">
              ✕
            </button>
          </div>
        </div>
      </ComponentPreview>
      <SignatureFeedbackSection />
    </>
  );
};
