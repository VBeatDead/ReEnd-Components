import { ComponentPreview } from "../docs/ComponentPreview";
import { Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";

/* ── Count-up hook ─────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1500, run = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) { setValue(0); return; }
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

export function InteractiveSection() {
  const { t } = useTranslation("interactive");

  /* micro-interactions state */
  const [countRunning, setCountRunning] = useState(false);
  const countValue = useCountUp(1337, 1500, countRunning);
  const [liked, setLiked] = useState(false);
  const [likeKey, setLikeKey] = useState(0);
  const [toggled, setToggled] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  /* drag & drop state */
  const [isDragging, setIsDragging] = useState(false);
  const [dropState, setDropState] = useState<"idle" | "accept" | "reject">("idle");

  /* selection state */
  const [selected, setSelected] = useState<number[]>([]);
  const toggleSelect = (i: number) =>
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <>
      {/* States Matrix */}
      <ComponentPreview
        id="states-matrix"
        title={t("states_matrix.title")}
        description={t("states_matrix.description")}
        props={[
          {
            name: "elements",
            type: "{ name: string; states: Record<string, string> }[]",
            required: true,
            description: t("_props.states-matrix.elements"),
          },
        ]}
        code={`/* Interactive States Matrix */

/* All 8 states via CSS/Tailwind */

/* 1. Default */
.btn { @apply bg-surface-2 border border-border text-foreground; }

/* 2. Hover */
.btn:hover { @apply border-primary/30 text-primary bg-surface-3; }

/* 3. Focus */
.btn:focus-visible { @apply outline-none ring-2 ring-primary/30; }

/* 4. Active / Pressed */
.btn:active { @apply scale-[0.98] brightness-90; }

/* 5. Disabled */
.btn:disabled { @apply opacity-40 cursor-not-allowed pointer-events-none; }

/* 6. Loading */
/* Add spinner + pointer-events-none */

/* 7. Selected */
.btn[aria-selected="true"] { @apply border-primary text-primary bg-primary/10; }

/* 8. Error */
.input[aria-invalid="true"] { @apply border-ef-red ring-ef-red/30; }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {[
                  t("states_matrix.headers.element"),
                  t("states_matrix.headers.default"),
                  t("states_matrix.headers.hover"),
                  t("states_matrix.headers.active"),
                  t("states_matrix.headers.focus"),
                  t("states_matrix.headers.disabled"),
                  t("states_matrix.headers.loading"),
                  t("states_matrix.headers.error"),
                  t("states_matrix.headers.selected"),
                ].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border bg-surface-0 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [t("states_matrix.rows.button"),        "Standard",       "Lighten+glow",       "Darken",         "Yellow ring",        "Gray 0.38",   "Spinner",      "—",          "—"],
                [t("states_matrix.rows.input"),          "#111 bg",        "Border ↑",           "—",              "Yellow border+glow", "Gray text",   "—",            "Red border", "—"],
                [t("states_matrix.rows.card"),           "surface-1",      "Lift+yellow",        "surface-active", "Yellow ring",        "opacity:0.5", "Skeleton",     "Red tint",   "Yellow border"],
                [t("states_matrix.rows.link"),           "#4DA8DA",        "#7EC8E3+underline",  "#2A6F97",        "Yellow ring",        "#444",        "—",            "—",          "—"],
                [t("states_matrix.rows.nav_item"),       "#CCC",           "#FFD429",            "—",              "Yellow ring",        "#444",        "—",            "—",          "Yellow+bold"],
                [t("states_matrix.rows.tab"),            "#999",           "#E0E0E0",            "—",              "Yellow ring",        "#444",        "—",            "—",          "#FFD429 line"],
                [t("states_matrix.rows.checkbox"),       "◇ border",      "◇ yellow",           "—",              "Yellow ring",        "Gray ◇",      "—",            "Red border", "#FFD429 bg"],
                [t("states_matrix.rows.table_row"),      "Transparent",    "bg /0.03",           "—",              "—",                  "opacity:0.5", "Skeleton",     "ef-red/0.05","bg /0.06"],
                [t("states_matrix.rows.tag"),            "surface-2",      "border ↑",           "scale-95",       "Yellow ring",        "opacity:0.4", "—",            "red bg",     "primary bg"],
                [t("states_matrix.rows.accordion"),      "Collapsed",      "surface-hover",      "—",              "Yellow ring",        "opacity:0.5", "—",            "—",          "Yellow icon"],
                [t("states_matrix.rows.dropdown_item"),  "#CCC",           "#FFD429 bg",         "—",              "—",                  "#555",        "—",            "—",          "—"],
                [t("states_matrix.rows.sidebar_link"),   "#999",           "#E0E0E0",            "—",              "Yellow ring",        "#444",        "—",            "—",          "◆ border-l"],
              ].map(([el, ...states]) => (
                <tr
                  key={el}
                  className="border-b border-border hover:bg-primary/[0.03]"
                >
                  <td className="py-2 px-3 font-semibold text-card-foreground whitespace-nowrap">
                    {el}
                  </td>
                  {states.map((s, i) => (
                    <td
                      key={i}
                      className="py-2 px-3 text-muted-foreground font-mono text-[10px] whitespace-nowrap"
                    >
                      {s}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Micro-Interactions */}
      <ComponentPreview
        id="micro-interactions"
        title={t("micro_interactions.title")}
        description={t("micro_interactions.description")}
        props={[
          {
            name: "type",
            type: '"ripple" | "copy" | "favorite" | "toggle" | "count-up" | "hover-reveal" | "accordion"',
            required: true,
            description: t("_props.micro-interactions.type"),
          },
          {
            name: "onTrigger",
            type: "() => void",
            required: false,
            description: t("_props.micro-interactions.onTrigger"),
          },
        ]}
        code={`/* Micro-Interaction Patterns */

/* Ripple effect on click (CSS) */
.ripple-btn {
  position: relative;
  overflow: hidden;
}
.ripple-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.4s, opacity 0.4s;
}
.ripple-btn:active::after {
  transform: scale(2.5);
  opacity: 1;
  transition: 0s;
}

/* Copy feedback */
const [copied, setCopied] = useState(false);
const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

/* Count-up animation */
import { useCountUp } from "@/hooks/use-count-up";
const count = useCountUp({ target: 1247, duration: 1500 });`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          {/* Ripple */}
          <div className="space-y-2 text-center">
            <button className="ripple bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-3 tracking-[0.1em] active:scale-95 transition-transform">
              {t("micro_interactions.click_me")}
            </button>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.ripple_effect")}
            </p>
          </div>

          {/* Copy feedback */}
          <CopyDemo />

          {/* Favorite / Like */}
          <div className="space-y-2 text-center">
            <button
              onClick={() => {
                setLiked((v) => !v);
                setLikeKey((k) => k + 1);
              }}
              aria-label={liked ? t("micro_interactions.unlike") : t("micro_interactions.like")}
              aria-pressed={liked}
              className={`text-2xl transition-colors leading-none ${
                liked ? "text-ef-red" : "text-muted-foreground hover:text-ef-red"
              }`}
            >
              <span
                key={likeKey}
                className={liked ? "inline-block animate-scale-in" : "inline-block"}
              >
                {liked ? "♥" : "♡"}
              </span>
            </button>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.favorite")}
            </p>
          </div>

          {/* Diamond toggle spin animation */}
          <div className="space-y-2 text-center">
            <Switch
              checked={toggled}
              onCheckedChange={setToggled}
              offLabel={t("micro_interactions.toggle_off")}
              onLabel={t("micro_interactions.toggle_on")}
              aria-label={toggled ? t("micro_interactions.toggle_on") : t("micro_interactions.toggle_off")}
            />
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.toggle_label")}
            </p>
          </div>

          {/* Count-up */}
          <CountUpDemo countValue={countValue} countRunning={countRunning} setCountRunning={setCountRunning} />

          {/* Hover reveal */}
          <div className="space-y-2 text-center">
            <div className="group relative overflow-hidden border border-border bg-surface-1 w-32 h-20 cursor-default">
              <span className="text-[10px] text-muted-foreground/50 absolute inset-0 flex items-center justify-center font-display tracking-wider uppercase">
                {t("micro_interactions.hover_reveal_label")}
              </span>
              <div className="absolute inset-0 bg-surface-3/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-[10px] text-primary font-display font-bold uppercase tracking-wider">◆ REVEAL</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.hover_reveal_effect")}
            </p>
          </div>

          {/* Accordion expand */}
          <div className="space-y-2 text-center">
            <div className="border border-border bg-surface-1 w-44 text-left">
              <button
                onClick={() => setAccordionOpen((v) => !v)}
                aria-expanded={accordionOpen}
                className="w-full flex items-center justify-between px-3 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-card-foreground hover:bg-primary/[0.04] transition-colors"
              >
                {t("micro_interactions.accordion_trigger")}
                <span
                  className="text-primary transition-transform duration-200 font-mono text-sm leading-none"
                  aria-hidden="true"
                  style={{ transform: accordionOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ maxHeight: accordionOpen ? "80px" : "0px" }}
              >
                <p className="text-[11px] text-muted-foreground px-3 py-2">
                  {t("micro_interactions.accordion_content")}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.accordion_effect")}
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* Hover Effects */}
      <ComponentPreview
        id="hover-effects"
        title={t("hover_effects.title")}
        description={t("hover_effects.description")}
        code={`/* Hover Effect Catalog — Tailwind utilities */

/* Clip corner reveal */
<div className="clip-corner hover:border-primary/40 transition-colors" />

/* Glow on hover */
<div className="hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)] transition-all" />

/* Translate lift */
<div className="hover:-translate-y-1 transition-transform" />

/* Border sweep */
<div className="border border-transparent hover:border-primary/30 transition-colors" />

/* Background reveal */
<div className="hover:bg-primary/5 transition-colors" />

/* Scale */
<div className="hover:scale-[1.02] transition-transform" />

/* Text color shift */
<span className="text-muted-foreground hover:text-primary transition-colors" />`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">
                  {t("hover_effects.headers.element")}
                </th>
                <th className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">
                  {t("hover_effects.headers.effect")}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [t("hover_effects.rows.card"),           t("hover_effects.rows.card_effect")],
                [t("hover_effects.rows.button_primary"), t("hover_effects.rows.button_primary_effect")],
                [t("hover_effects.rows.button_secondary"),t("hover_effects.rows.button_secondary_effect")],
                [t("hover_effects.rows.image"),          t("hover_effects.rows.image_effect")],
                [t("hover_effects.rows.nav_link"),       t("hover_effects.rows.nav_link_effect")],
                [t("hover_effects.rows.link"),           t("hover_effects.rows.link_effect")],
                [t("hover_effects.rows.icon_button"),    t("hover_effects.rows.icon_button_effect")],
                [t("hover_effects.rows.table_row"),      t("hover_effects.rows.table_row_effect")],
                [t("hover_effects.rows.tag"),            t("hover_effects.rows.tag_effect")],
                [t("hover_effects.rows.link_list_item"), t("hover_effects.rows.link_list_item_effect")],
                [t("hover_effects.rows.footer_link"),    t("hover_effects.rows.footer_link_effect")],
                [t("hover_effects.rows.timeline_node"),  t("hover_effects.rows.timeline_node_effect")],
                [t("hover_effects.rows.stat_number"),    t("hover_effects.rows.stat_number_effect")],
                [t("hover_effects.rows.code_block"),     t("hover_effects.rows.code_block_effect")],
                [t("hover_effects.rows.avatar"),         t("hover_effects.rows.avatar_effect")],
              ].map(([el, eff]) => (
                <tr
                  key={el}
                  className="border-b border-border hover:bg-primary/[0.03]"
                >
                  <td className="py-2 px-3 text-card-foreground font-medium">
                    {el}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{eff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Focus & Keyboard */}
      <ComponentPreview
        id="focus-keyboard"
        title={t("focus_keyboard.title")}
        description={t("focus_keyboard.description")}
        code={`/* All focusable elements */
*:focus-visible {
  outline: 2px solid hsl(var(--ef-yellow));
  outline-offset: 2px;
}
/* Inputs use border + glow instead of outline */
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: hsl(var(--ef-yellow));
  box-shadow: 0 0 0 3px hsl(var(--ef-yellow) / 0.15);
}`}
        props={[
          {
            name: "shortcuts",
            type: "{ key: string; action: string }[]",
            required: false,
            description: t("_props.focus-keyboard.shortcuts"),
          },
          {
            name: "trapFocus",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.focus-keyboard.trapFocus"),
          },
        ]}
        api={[
          {
            name: "useFocusTrap",
            signature: "(ref: RefObject<HTMLElement | null>, active?: boolean) => void",
            description: t("_props.focus-keyboard.api.useFocusTrap"),
          },
          {
            name: "useShortcut",
            signature: "(key: string, handler: () => void, options?: { meta?, ctrl?, shift? }) => void",
            description: t("_props.focus-keyboard.api.useShortcut"),
          },
        ]}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-2.5 tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              {t("focus_keyboard.focus_state")}
            </button>
            <input
              className="bg-surface-1 border border-primary text-card-foreground px-4 py-2.5 text-sm shadow-[0_0_0_3px_hsl(47_100%_56%/0.15)] outline-none"
              value="Focus state"
              readOnly
              aria-label="Focus state demo"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              [t("focus_keyboard.shortcuts.tab"),       t("focus_keyboard.shortcuts.tab_desc")],
              [t("focus_keyboard.shortcuts.enter"),     t("focus_keyboard.shortcuts.enter_desc")],
              [t("focus_keyboard.shortcuts.escape"),    t("focus_keyboard.shortcuts.escape_desc")],
              [t("focus_keyboard.shortcuts.cmd_k"),     t("focus_keyboard.shortcuts.cmd_k_desc")],
              [t("focus_keyboard.shortcuts.arrows"),    t("focus_keyboard.shortcuts.arrows_desc")],
              [t("focus_keyboard.shortcuts.home_end"),  t("focus_keyboard.shortcuts.home_end_desc")],
            ].map(([key, action]) => (
              <div key={key} className="flex items-start gap-2 text-xs min-w-0">
                <kbd className="font-mono text-[10px] bg-surface-2 px-2 py-1 border border-border text-muted-foreground shrink-0 whitespace-nowrap">
                  {key}
                </kbd>
                <span className="text-muted-foreground leading-tight">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Drag & Drop */}
      <ComponentPreview
        id="drag-drop"
        title={t("drag_drop.title")}
        description={t("drag_drop.description")}
        props={[
          {
            name: "items",
            type: "T[]",
            required: true,
            description: t("_props.drag-drop.items"),
          },
          {
            name: "onReorder",
            type: "(items: T[]) => void",
            required: true,
            description: t("_props.drag-drop.onReorder"),
          },
          {
            name: "direction",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            required: false,
            description: t("_props.drag-drop.direction"),
          },
        ]}
        code={`/* Native HTML5 Drag & Drop Pattern */
const [dragging, setDragging] = useState<string | null>(null);

// Draggable item
<div
  draggable
  onDragStart={(e) => {
    setDragging(itemId);
    e.dataTransfer.effectAllowed = "move";
  }}
  onDragEnd={() => setDragging(null)}
  className={\`border border-border p-3 cursor-grab \${
    dragging === itemId ? "opacity-50 border-dashed border-primary/40" : ""
  }\`}
>
  Drag me
</div>

// Drop zone
<div
  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
  onDrop={(e) => { e.preventDefault(); handleDrop(itemId); }}
  className="border-2 border-dashed border-border p-8 data-[active=true]:border-primary/40 data-[active=true]:bg-primary/5"
>
  Drop here
</div>`}
      >
        <div className="space-y-4">
          <p className="text-[11px] text-muted-foreground">{t("drag_drop.drop_hint")}</p>
          <div className="flex flex-wrap gap-6 items-start">
            {/* Draggable item */}
            <div
              draggable="true"
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => { setIsDragging(false); setDropState("idle"); }}
              aria-grabbed={isDragging}
              className={`border-2 border-dashed px-6 py-4 text-sm cursor-grab active:cursor-grabbing transition-all select-none ${
                isDragging
                  ? "border-primary opacity-50 bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {isDragging ? t("drag_drop.drag_status") : t("drag_drop.drag_me")}
            </div>

            {/* Accept drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDropState("accept"); }}
              onDragLeave={() => setDropState("idle")}
              onDrop={(e) => { e.preventDefault(); setDropState("idle"); setIsDragging(false); }}
              aria-dropeffect="move"
              className={`border-2 border-dashed px-8 py-8 text-sm flex items-center justify-center transition-all ${
                dropState === "accept"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t("drag_drop.active_zone")}
            </div>

            {/* Reject drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDropState("reject"); }}
              onDragLeave={() => setDropState("idle")}
              onDrop={(e) => { e.preventDefault(); setDropState("idle"); setIsDragging(false); }}
              aria-dropeffect="none"
              className={`border-2 border-dashed px-8 py-8 text-sm flex items-center justify-center transition-all ${
                dropState === "reject"
                  ? "border-ef-red bg-ef-red/5 text-ef-red"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t("drag_drop.reject_zone")}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Selection */}
      <ComponentPreview
        id="selection"
        title={t("selection.title")}
        description={t("selection.description")}
        props={[
          {
            name: "options",
            type: "{ label: string; value: string }[]",
            required: true,
            description: t("_props.selection.options"),
          },
          {
            name: "value",
            type: "string | string[]",
            required: true,
            description: t("_props.selection.value"),
          },
          {
            name: "onChange",
            type: "(value: string | string[]) => void",
            required: true,
            description: t("_props.selection.onChange"),
          },
          {
            name: "multiple",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.selection.multiple"),
          },
          {
            name: "actions",
            type: '{ label: string; onClick: (selected: string[]) => void; variant?: "default" | "danger" }[]',
            required: false,
            description: t("_props.selection.actions"),
          },
        ]}
        code={`/* Multi-Selection Pattern */
const [selected, setSelected] = useState<Set<string>>(new Set());

const toggle = (id: string) =>
  setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

// Item with checkbox-style selection
<div
  role="option"
  aria-selected={selected.has(item.id)}
  onClick={() => toggle(item.id)}
  className={\`border border-border p-3 cursor-pointer transition-all \${
    selected.has(item.id)
      ? "border-primary/40 bg-primary/5"
      : "hover:border-border-default"
  }\`}
>
  {item.label}
</div>

// Floating action bar (appears when items selected)
{selected.size > 0 && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-3 border border-border px-6 py-3 flex items-center gap-4">
    <span>{selected.size} selected</span>
    <button onClick={() => setSelected(new Set())}>CLEAR</button>
  </div>
)}`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md">
            {[
              t("selection.option_a"),
              t("selection.option_b"),
              t("selection.option_c"),
            ].map((o, i) => (
              <button
                key={o}
                onClick={() => toggleSelect(i)}
                aria-pressed={selected.includes(i)}
                className={`border p-4 text-sm text-center transition-all ${
                  selected.includes(i)
                    ? "border-primary bg-primary/[0.06] text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="inline-flex flex-wrap items-center gap-4 bg-surface-3 border border-primary/40 px-6 py-3 shadow-lg max-w-full">
            <span className="text-sm text-card-foreground">
              {selected.length === 0
                ? t("selection.none_selected")
                : t("selection.selected_count", { count: selected.length })}
            </span>
            {selected.length > 0 && (
              <>
                <button
                  onClick={() => setSelected([])}
                  aria-label={t("selection.delete_btn")}
                  className="clip-corner bg-ef-red text-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]"
                >
                  {t("selection.delete_btn")}
                </button>
                <button
                  aria-label={t("selection.export_btn")}
                  className="clip-corner border border-border text-card-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]"
                >
                  {t("selection.export_btn")}
                </button>
              </>
            )}
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

const CountUpDemo = ({
  countValue,
  countRunning,
  setCountRunning,
}: {
  countValue: number;
  countRunning: boolean;
  setCountRunning: (v: boolean) => void;
}) => {
  const { t } = useTranslation("interactive");
  return (
    <div className="space-y-2 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-3xl font-bold text-primary tabular-nums leading-none">
          {countValue.toLocaleString()}
        </p>
        <button
          onClick={() => {
            setCountRunning(false);
            setTimeout(() => setCountRunning(true), 30);
          }}
          className="bg-surface-2 border border-border px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
        >
          {t("micro_interactions.count_up_trigger")}
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground">
        {t("micro_interactions.count_up_label")}
      </p>
    </div>
  );
};

const CopyDemo = () => {
  const { t } = useTranslation("interactive");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  return (
    <div className="space-y-2 text-center">
      <button
        onClick={() => {
          setCopied(true);
          clearTimeout(copyTimer.current);
          copyTimer.current = setTimeout(() => setCopied(false), 2000);
        }}
        className="bg-surface-2 border border-border px-4 py-2.5 flex items-center gap-2 text-sm text-card-foreground hover:border-primary/30 transition-all"
      >
        {copied ? (
          <Check className="w-4 h-4 text-ef-green" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
        {copied ? t("micro_interactions.copied") : t("micro_interactions.copy")}
      </button>
      <p className="text-[10px] text-muted-foreground">
        {t("micro_interactions.copy_feedback")}
      </p>
    </div>
  );
};
