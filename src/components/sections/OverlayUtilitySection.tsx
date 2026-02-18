import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import {
  Search,
  ArrowUp,
  Copy,
  Check,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function OverlayUtilitySection() {
  const { t } = useTranslation("overlay");
  return (
    <>
      {/* Command Palette */}
      <ComponentPreview
        id="command-palette"
        title={t("command_palette.title")}
        description={t("command_palette.description")}
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: t("_props.command-palette.open"),
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            required: true,
            description: t("_props.command-palette.onOpenChange"),
          },
          {
            name: "onSelect",
            type: "(item: CommandItem) => void",
            required: true,
            description: t("_props.command-palette.onSelect"),
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Type a command..."',
            required: false,
            description: t("_props.command-palette.placeholder"),
          },
          {
            name: "groups",
            type: "{ label: string; items: CommandItem[] }[]",
            required: true,
            description: t("_props.command-palette.groups"),
          },
        ]}
        api={[
          {
            name: "useCommandPalette",
            signature: "() => { open, toggle, close }",
            description: t("_props.command-palette.api.useCommandPalette"),
          },
        ]}
        keyboard={[
          { key: "⌘K / Ctrl+K", description: t("_props.command-palette.kbd.0") },
          { key: "Escape", description: t("_props.command-palette.kbd.1") },
          { key: "Arrow ↑/↓", description: t("_props.command-palette.kbd.2") },
          { key: "Enter", description: t("_props.command-palette.kbd.3") },
          {
            key: "Tab",
            description: t("_props.command-palette.kbd.4"),
          },
        ]}
        install={{
          importPath:
            'import { CommandPalette } from "@/components/docs/CommandPalette";',
          usage:
            "<CommandPalette\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  onNavigate={(id) => scrollTo(id)}\n/>",
          dependencies: ["fuse.js"],
        }}
      >
        <div className="max-w-[500px] mx-auto bg-surface-2 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              className="bg-transparent text-base text-card-foreground outline-none flex-1 placeholder:text-ef-gray-mid"
              placeholder={t("command_palette.placeholder")}
              readOnly
            />
            <kbd className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 border border-border text-muted-foreground">
              ESC
            </kbd>
          </div>
          <div className="py-2">
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">
              {t("command_palette.recent")}
            </p>
            {[
              t("command_palette.dashboard"),
              t("command_palette.components"),
              t("command_palette.settings"),
            ].map((item, i) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${i === 0 ? "bg-primary/[0.06] text-primary" : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary"}`}
              >
                <span className="text-[8px]">{i === 0 ? "◆" : "◇"}</span>
                {item}
              </button>
            ))}
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2 mt-1">
              {t("command_palette.actions_label")}
            </p>
            {[
              t("command_palette.create_new"),
              t("command_palette.toggle_theme"),
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors"
              >
                <span className="text-[8px]">◇</span>
                {item}
              </button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Cookie Consent */}
      <ComponentPreview
        id="cookie-consent"
        title={t("cookie_consent.title")}
        showViewport
        description={t("cookie_consent.description")}
        props={[
          {
            name: "onAccept",
            type: "() => void",
            required: true,
            description: t("_props.cookie-consent.onAccept"),
          },
          {
            name: "onCustomize",
            type: "() => void",
            required: false,
            description: t("_props.cookie-consent.onCustomize"),
          },
          {
            name: "message",
            type: "string",
            required: false,
            description: t("_props.cookie-consent.message"),
          },
        ]}
      >
        <div className="bg-surface-2 border-t border-border px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-0">
          <p className="text-sm text-muted-foreground">
            {t("cookie_consent.consent_text")}
          </p>
          <div className="flex gap-3 shrink-0">
            <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-4 py-2 hover:text-foreground transition-colors bg-transparent">
              {t("cookie_consent.customize")}
            </button>
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2">
              {t("cookie_consent.accept_all")}
            </button>
          </div>
        </div>
      </ComponentPreview>

      {/* Back to Top */}
      <ComponentPreview
        id="back-to-top"
        title={t("back_to_top.title")}
        description={t("back_to_top.description")}
        props={[
          {
            name: "threshold",
            type: "number",
            default: "300",
            required: false,
            description: t("_props.back-to-top.threshold"),
          },
          {
            name: "smooth",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.back-to-top.smooth"),
          },
        ]}
      >
        <div className="flex items-center gap-4">
          <button
            className="bg-surface-2 border border-border p-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            aria-label={t("back_to_top.scroll_to_top")}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground">
            {t("back_to_top.appears_text")}
          </span>
        </div>
      </ComponentPreview>

      {/* Copy to Clipboard */}
      <ComponentPreview
        id="copy-clipboard"
        title={t("clipboard.title")}
        description={t("clipboard.description")}
        props={[
          {
            name: "text",
            type: "string",
            required: true,
            description: t("_props.copy-clipboard.text"),
          },
          {
            name: "resetDelay",
            type: "number",
            default: "2000",
            required: false,
            description: t("_props.copy-clipboard.resetDelay"),
          },
          {
            name: "onCopy",
            type: "() => void",
            required: false,
            description: t("_props.copy-clipboard.onCopy"),
          },
        ]}
      >
        <CopyClipboardDemo />
      </ComponentPreview>

      {/* Dropdown */}
      <ComponentPreview
        id="dropdown"
        title={t("dropdown.title")}
        description={t("dropdown.description")}
        props={[
          {
            name: "trigger",
            type: "ReactNode",
            required: true,
            description: t("_props.dropdown.trigger"),
          },
          {
            name: "items",
            type: '{ label: string; onClick: () => void; variant?: "default" | "danger" }[]',
            required: true,
            description: t("_props.dropdown.items"),
          },
          {
            name: "groups",
            type: "{ label?: string; items: DropdownItem[] }[]",
            required: false,
            description: t("_props.dropdown.groups"),
          },
          {
            name: "align",
            type: '"start" | "end"',
            default: '"start"',
            required: false,
            description: t("_props.dropdown.align"),
          },
        ]}
      >
        <div className="max-w-[180px] bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          <div className="py-1">
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">
              {t("dropdown.actions_label")}
            </p>
            {[
              t("dropdown.edit"),
              t("dropdown.duplicate"),
              t("dropdown.archive"),
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <div className="border-t border-border my-1" />
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red transition-colors">
              {t("dropdown.delete")}
            </button>
          </div>
        </div>
      </ComponentPreview>

      {/* Context Menu */}
      <ComponentPreview
        id="context-menu"
        title={t("context_menu.title")}
        description={t("context_menu.description")}
        props={[
          {
            name: "items",
            type: '{ label: string; shortcut?: string; onClick: () => void; variant?: "default" | "danger" }[]',
            required: true,
            description: t("_props.context-menu.items"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.context-menu.children"),
          },
        ]}
      >
        <div className="max-w-[220px] bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          <div className="py-1">
            {[
              { label: t("context_menu.cut"), key: "⌘X" },
              { label: t("context_menu.copy"), key: "⌘C" },
              { label: t("context_menu.paste"), key: "⌘V" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[11px] text-ef-gray-mid">
                  {item.key}
                </span>
              </button>
            ))}
            <div className="border-t border-border my-1" />
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red transition-colors flex items-center justify-between">
              <span>{t("context_menu.delete")}</span>
              <span className="font-mono text-[11px] text-ef-gray-mid">⌫</span>
            </button>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

const CopyClipboardDemo = () => {
  const { t } = useTranslation("overlay");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-surface-1 border border-border">
        <span className="px-4 py-2 text-sm font-mono text-muted-foreground">
          npm install endfield-ui
        </span>
        <button
          onClick={() => {
            setCopied(true);
            clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
          }}
          className="px-3 py-2 border-l border-border text-muted-foreground hover:text-primary transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-ef-green" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      {copied && (
        <span className="text-xs text-ef-green animate-fade-in">
          {t("clipboard.copied")}
        </span>
      )}
    </div>
  );
};
