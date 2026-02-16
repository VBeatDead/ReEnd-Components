import { ComponentPreview } from "../docs/ComponentPreview";
import { ArrowRight, Copy, Check, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export const InteractiveSection = () => {
  return (
    <>
      {/* 35. States Matrix */}
      <ComponentPreview
        id="states-matrix"
        title="35. Interactive States Matrix"
        description="Comprehensive mapping of all interactive states across components."
        props={[
          { name: "elements", type: '{ name: string; states: Record<string, string> }[]', required: true, description: "Element definitions with state mappings" },
        ]}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {["ELEMENT", "DEFAULT", "HOVER", "ACTIVE", "FOCUS", "DISABLED"].map((h) => (
                  <th key={h} className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border bg-surface-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Button", "Standard", "Lighten+glow", "Darken", "Yellow ring", "Gray 0.38"],
                ["Input", "#111 bg", "Border lighten", "—", "Yellow border", "Gray text"],
                ["Card", "surface-1", "Lift+yellow", "surface-active", "Yellow ring", "opacity:0.5"],
                ["Link", "#4DA8DA", "Underline", "#2A6F97", "Yellow ring", "#444"],
                ["Nav item", "#CCC", "#FFD429", "—", "Yellow ring", "#444"],
                ["Tab", "#999", "#E0E0E0", "—", "Yellow ring", "#FFD429+line"],
              ].map(([el, ...states]) => (
                <tr key={el} className="border-b border-border hover:bg-primary/[0.03]">
                  <td className="py-2 px-3 font-semibold text-card-foreground">{el}</td>
                  {states.map((s, i) => (
                    <td key={i} className="py-2 px-3 text-muted-foreground font-mono text-[10px]">{s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* 36. Micro-Interactions */}
      <ComponentPreview
        id="micro-interactions"
        title="36. Micro-Interactions & Feedback"
        description="Click ripple, copy feedback, toggle animation, accordion expand."
        props={[
          { name: "type", type: '"ripple" | "copy" | "favorite" | "toggle"', required: true, description: "Interaction pattern type" },
          { name: "onTrigger", type: "() => void", required: false, description: "Callback when interaction is triggered" },
        ]}
      >
        <div className="flex flex-wrap gap-6 items-start">
          <div className="space-y-2 text-center">
            <button className="bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-3 tracking-[0.1em] active:scale-95 transition-transform">
              CLICK ME
            </button>
            <p className="text-[10px] text-muted-foreground">Ripple effect</p>
          </div>
          <CopyDemo />
          <div className="space-y-2 text-center">
            <button className="text-muted-foreground hover:text-ef-red text-2xl transition-colors active:scale-125">♡</button>
            <p className="text-[10px] text-muted-foreground">Favorite</p>
          </div>
        </div>
      </ComponentPreview>

      {/* 37. Hover Effects */}
      <ComponentPreview
        id="hover-effects"
        title="37. Hover Effects Catalog"
        description="Card lift, button glow, image scale, nav color change, table row tint."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">ELEMENT</th>
                <th className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">EFFECT</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Card", "translateY(-4px) + shadow + yellow border tint"],
                ["Button Primary", "translateY(-1px) + lighter bg + glow shadow"],
                ["Button Secondary", "Border → yellow, text → yellow"],
                ["Image", "scale(1.05) smooth ease"],
                ["Nav link", "Color → yellow, diamond indicator"],
                ["Table row", "Yellow bg tint 0.03"],
                ["Code block", "Copy button appears (fade in)"],
                ["Avatar", "Subtle glow ring"],
              ].map(([el, eff]) => (
                <tr key={el} className="border-b border-border hover:bg-primary/[0.03]">
                  <td className="py-2 px-3 text-card-foreground font-medium">{el}</td>
                  <td className="py-2 px-3 text-muted-foreground">{eff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* 38. Focus & Keyboard */}
      <ComponentPreview
        id="focus-keyboard"
        title="38. Focus & Keyboard Navigation"
        description="Focus ring: 2px solid #FFD429, offset 2px. Keyboard shortcuts table."
        code={`*:focus-visible {
  outline: 2px solid #FFD429;
  outline-offset: 2px;
}
input:focus-visible {
  outline: none;
  border-color: #FFD429;
  box-shadow: 0 0 0 3px rgba(255,212,41,0.15);
}`}
        props={[
          { name: "shortcuts", type: '{ key: string; action: string }[]', required: false, description: "Custom keyboard shortcut definitions" },
          { name: "trapFocus", type: "boolean", default: "false", required: false, description: "Trap focus within container (for modals)" },
        ]}
        api={[
          { name: "useFocusTrap", signature: "(ref: RefObject) => void", description: "Traps keyboard focus within a container element. Used for modals and dialogs." },
          { name: "useShortcut", signature: "(key: string, handler: () => void) => void", description: "Registers a global keyboard shortcut with automatic cleanup." },
        ]}
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-2.5 tracking-[0.1em] ring-2 ring-primary ring-offset-2 ring-offset-background">FOCUS STATE</button>
            <input className="bg-surface-1 border border-primary text-card-foreground px-4 py-2.5 text-sm shadow-[0_0_0_3px_hsl(47_100%_56%/0.15)] outline-none" value="Focus state" readOnly />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              ["Tab", "Navigate forward"],
              ["Enter / Space", "Activate"],
              ["Escape", "Close overlay"],
              ["⌘K", "Command palette"],
              ["Arrow keys", "Navigate menus"],
              ["Home / End", "First/last item"],
            ].map(([key, action]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <kbd className="font-mono text-[10px] bg-surface-2 px-2 py-1 border border-border text-muted-foreground">{key}</kbd>
                <span className="text-muted-foreground">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* 39. Drag & Drop */}
      <ComponentPreview
        id="drag-drop"
        title="39. Drag & Drop"
        description="Draggable: cursor grab. Drop zone: dashed border, yellow active state."
        props={[
          { name: "items", type: "T[]", required: true, description: "Draggable items array" },
          { name: "onReorder", type: "(items: T[]) => void", required: true, description: "Callback with reordered items" },
          { name: "direction", type: '"vertical" | "horizontal"', default: '"vertical"', required: false, description: "Drag direction constraint" },
        ]}
      >
        <div className="flex gap-6 items-start">
          <div className="border-2 border-dashed border-ef-gray px-6 py-4 text-sm text-muted-foreground cursor-grab active:cursor-grabbing active:opacity-50 active:border-primary transition-all">
            ⠿ Drag me
          </div>
          <div className="border-2 border-dashed border-ef-gray px-8 py-8 text-sm text-muted-foreground flex items-center justify-center">
            Drop zone
          </div>
          <div className="border-2 border-dashed border-primary bg-primary/5 px-8 py-8 text-sm text-primary flex items-center justify-center">
            Active zone
          </div>
        </div>
      </ComponentPreview>

      {/* 40. Selection */}
      <ComponentPreview
        id="selection"
        title="40. Selection & Multi-Select"
        description="Selected: yellow border + bg tint. Floating action bar for multi-select."
        props={[
          { name: "options", type: '{ label: string; value: string }[]', required: true, description: "Selectable option items" },
          { name: "value", type: "string | string[]", required: true, description: "Selected value(s)" },
          { name: "onChange", type: "(value: string | string[]) => void", required: true, description: "Selection change callback" },
          { name: "multiple", type: "boolean", default: "false", required: false, description: "Enable multi-select with floating action bar" },
          { name: "actions", type: '{ label: string; onClick: (selected: string[]) => void; variant?: "default" | "danger" }[]', required: false, description: "Bulk action buttons for multi-select" },
        ]}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {["Option A", "Option B", "Option C"].map((o, i) => (
              <button key={o} className={`border p-4 text-sm text-center transition-all ${i === 1 ? "border-primary bg-primary/[0.06] text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                {o}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-4 bg-surface-3 border border-primary/40 px-6 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
            <span className="text-sm text-card-foreground">3 selected</span>
            <button className="clip-corner bg-ef-red text-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]">DELETE</button>
            <button className="clip-corner border border-border text-card-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]">EXPORT</button>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};

const CopyDemo = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-2 text-center">
      <button
        onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="bg-surface-2 border border-border px-4 py-2.5 flex items-center gap-2 text-sm text-card-foreground hover:border-primary/30 transition-all"
      >
        {copied ? <Check className="w-4 h-4 text-ef-green" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <p className="text-[10px] text-muted-foreground">Copy feedback</p>
    </div>
  );
};
