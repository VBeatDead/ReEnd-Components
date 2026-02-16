import { ComponentPreview } from "../docs/ComponentPreview";
import { Search, ArrowUp, Copy, Check, ChevronDown, MoreVertical } from "lucide-react";
import { useState } from "react";

export const OverlayUtilitySection = () => {
  return (
    <>
      {/* 48. Command Palette */}
      <ComponentPreview
        id="command-palette"
        title="48. Command Palette / Quick Search"
        description="Trigger: ⌘K. Surface-2 bg. Input 16px. Results with diamond markers."
        props={[
          { name: "open", type: "boolean", required: true, description: "Controls visibility" },
          { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Callback for open/close state" },
          { name: "onSelect", type: "(item: CommandItem) => void", required: true, description: "Callback when a result is selected" },
          { name: "placeholder", type: "string", default: '"Type a command..."', required: false, description: "Search input placeholder" },
          { name: "groups", type: '{ label: string; items: CommandItem[] }[]', required: true, description: "Grouped command items" },
        ]}
        api={[
          { name: "useCommandPalette", signature: "() => { open, toggle, close }", description: "Hook with ⌘K shortcut binding and focus management." },
        ]}
      >
        <div className="max-w-[500px] mx-auto bg-surface-2 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="bg-transparent text-base text-card-foreground outline-none flex-1 placeholder:text-ef-gray-mid" placeholder="Type a command..." readOnly />
            <kbd className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 border border-border text-muted-foreground">ESC</kbd>
          </div>
          <div className="py-2">
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">RECENT</p>
            {["Dashboard", "Components", "Settings"].map((item, i) => (
              <button key={item} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${i === 0 ? "bg-primary/[0.06] text-primary" : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary"}`}>
                <span className="text-[8px]">{i === 0 ? "◆" : "◇"}</span>
                {item}
              </button>
            ))}
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2 mt-1">ACTIONS</p>
            {["Create New Page", "Toggle Theme"].map((item) => (
              <button key={item} className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors">
                <span className="text-[8px]">◇</span>
                {item}
              </button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* 49. Cookie Consent */}
      <ComponentPreview
        id="cookie-consent"
        title="49. Cookie Consent"
        description="Fixed bottom, surface-2 bg, border-top. Accept All primary + Customize ghost."
        props={[
          { name: "onAccept", type: "() => void", required: true, description: "Callback when all cookies accepted" },
          { name: "onCustomize", type: "() => void", required: false, description: "Callback to open cookie preferences" },
          { name: "message", type: "string", required: false, description: "Custom consent message text" },
        ]}
      >
        <div className="bg-surface-2 border-t border-border px-6 py-4 flex items-center justify-between gap-4 -m-8 mt-0">
          <p className="text-sm text-muted-foreground">We use cookies to enhance your experience. By continuing, you agree to our cookie policy.</p>
          <div className="flex gap-3 shrink-0">
            <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-4 py-2 hover:text-foreground transition-colors bg-transparent">CUSTOMIZE</button>
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2">ACCEPT ALL</button>
          </div>
        </div>
      </ComponentPreview>

      {/* 50. Back to Top */}
      <ComponentPreview
        id="back-to-top"
        title="50. Back to Top"
        description="Fixed bottom-right. Visible after scroll >300px. Icon button style."
        props={[
          { name: "threshold", type: "number", default: "300", required: false, description: "Scroll distance in px before button appears" },
          { name: "smooth", type: "boolean", default: "true", required: false, description: "Use smooth scroll behavior" },
        ]}
      >
        <div className="flex items-center gap-4">
          <button className="bg-surface-2 border border-border p-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground">Appears after scroll &gt;300px</span>
        </div>
      </ComponentPreview>

      {/* 51. Copy to Clipboard */}
      <ComponentPreview
        id="copy-clipboard"
        title="51. Copy to Clipboard"
        description="Idle: Copy icon. Click: ✓ + 'Copied!' green. Reset 2s. Used on code blocks, URLs."
        props={[
          { name: "text", type: "string", required: true, description: "Text content to copy" },
          { name: "resetDelay", type: "number", default: "2000", required: false, description: "Time in ms before resetting to idle state" },
          { name: "onCopy", type: "() => void", required: false, description: "Callback after successful copy" },
        ]}
      >
        <CopyClipboardDemo />
      </ComponentPreview>

      {/* 52. Dropdown */}
      <ComponentPreview
        id="dropdown"
        title="52. Dropdown Menu"
        description="surface-2 bg. Hover: yellow bg tint + text. Danger: red variant. Section labels."
        props={[
          { name: "trigger", type: "ReactNode", required: true, description: "Element that opens the dropdown" },
          { name: "items", type: '{ label: string; onClick: () => void; variant?: "default" | "danger" }[]', required: true, description: "Menu items" },
          { name: "groups", type: '{ label?: string; items: DropdownItem[] }[]', required: false, description: "Grouped menu items with optional section labels" },
          { name: "align", type: '"start" | "end"', default: '"start"', required: false, description: "Horizontal alignment relative to trigger" },
        ]}
      >
        <div className="max-w-[180px] bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          <div className="py-1">
            <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">ACTIONS</p>
            {["Edit", "Duplicate", "Archive"].map((item) => (
              <button key={item} className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors">{item}</button>
            ))}
            <div className="border-t border-border my-1" />
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red transition-colors">Delete</button>
          </div>
        </div>
      </ComponentPreview>

      {/* 53. Context Menu */}
      <ComponentPreview
        id="context-menu"
        title="53. Context Menu"
        description="Same styling as Dropdown. Right-click trigger. Keyboard shortcut hints."
        props={[
          { name: "items", type: '{ label: string; shortcut?: string; onClick: () => void; variant?: "default" | "danger" }[]', required: true, description: "Context menu items with optional keyboard shortcut hints" },
          { name: "children", type: "ReactNode", required: true, description: "Target area that triggers context menu on right-click" },
        ]}
      >
        <div className="max-w-[220px] bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          <div className="py-1">
            {[
              { label: "Cut", key: "⌘X" },
              { label: "Copy", key: "⌘C" },
              { label: "Paste", key: "⌘V" },
            ].map((item) => (
              <button key={item.label} className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors flex items-center justify-between">
                <span>{item.label}</span>
                <span className="font-mono text-[11px] text-ef-gray-mid">{item.key}</span>
              </button>
            ))}
            <div className="border-t border-border my-1" />
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red transition-colors flex items-center justify-between">
              <span>Delete</span>
              <span className="font-mono text-[11px] text-ef-gray-mid">⌫</span>
            </button>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};

const CopyClipboardDemo = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-surface-1 border border-border">
        <span className="px-4 py-2 text-sm font-mono text-muted-foreground">npm install endfield-ui</span>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="px-3 py-2 border-l border-border text-muted-foreground hover:text-primary transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-ef-green" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {copied && <span className="text-xs text-ef-green animate-fade-in">Copied!</span>}
    </div>
  );
};
