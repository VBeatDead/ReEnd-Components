import { ComponentPreview } from "../docs/ComponentPreview";
import { ArrowRight, Copy, Check, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function InteractiveSection() {
  const { t } = useTranslation("interactive");
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
                ].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border bg-surface-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  t("states_matrix.rows.button"),
                  "Standard",
                  "Lighten+glow",
                  "Darken",
                  "Yellow ring",
                  "Gray 0.38",
                ],
                [
                  t("states_matrix.rows.input"),
                  "#111 bg",
                  "Border lighten",
                  "—",
                  "Yellow border",
                  "Gray text",
                ],
                [
                  t("states_matrix.rows.card"),
                  "surface-1",
                  "Lift+yellow",
                  "surface-active",
                  "Yellow ring",
                  "opacity:0.5",
                ],
                [
                  t("states_matrix.rows.link"),
                  "#4DA8DA",
                  "Underline",
                  "#2A6F97",
                  "Yellow ring",
                  "#444",
                ],
                [
                  t("states_matrix.rows.nav_item"),
                  "#CCC",
                  "#FFD429",
                  "—",
                  "Yellow ring",
                  "#444",
                ],
                [
                  t("states_matrix.rows.tab"),
                  "#999",
                  "#E0E0E0",
                  "—",
                  "Yellow ring",
                  "#FFD429+line",
                ],
              ].map(([el, ...states]) => (
                <tr
                  key={el}
                  className="border-b border-border hover:bg-primary/[0.03]"
                >
                  <td className="py-2 px-3 font-semibold text-card-foreground">
                    {el}
                  </td>
                  {states.map((s, i) => (
                    <td
                      key={i}
                      className="py-2 px-3 text-muted-foreground font-mono text-[10px]"
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
            type: '"ripple" | "copy" | "favorite" | "toggle"',
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
      >
        <div className="flex flex-wrap gap-6 items-start">
          <div className="space-y-2 text-center">
            <button className="bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-3 tracking-[0.1em] active:scale-95 transition-transform">
              {t("micro_interactions.click_me")}
            </button>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.ripple_effect")}
            </p>
          </div>
          <CopyDemo />
          <div className="space-y-2 text-center">
            <button className="text-muted-foreground hover:text-ef-red text-2xl transition-colors active:scale-125">
              ♡
            </button>
            <p className="text-[10px] text-muted-foreground">
              {t("micro_interactions.favorite")}
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* Hover Effects */}
      <ComponentPreview
        id="hover-effects"
        title={t("hover_effects.title")}
        description={t("hover_effects.description")}
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
                [
                  t("hover_effects.rows.card"),
                  t("hover_effects.rows.card_effect"),
                ],
                [
                  t("hover_effects.rows.button_primary"),
                  t("hover_effects.rows.button_primary_effect"),
                ],
                [
                  t("hover_effects.rows.button_secondary"),
                  t("hover_effects.rows.button_secondary_effect"),
                ],
                [
                  t("hover_effects.rows.image"),
                  t("hover_effects.rows.image_effect"),
                ],
                [
                  t("hover_effects.rows.nav_link"),
                  t("hover_effects.rows.nav_link_effect"),
                ],
                [
                  t("hover_effects.rows.table_row"),
                  t("hover_effects.rows.table_row_effect"),
                ],
                [
                  t("hover_effects.rows.code_block"),
                  t("hover_effects.rows.code_block_effect"),
                ],
                [
                  t("hover_effects.rows.avatar"),
                  t("hover_effects.rows.avatar_effect"),
                ],
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
            signature: "(ref: RefObject) => void",
            description: t("_props.focus-keyboard.api.useFocusTrap"),
          },
          {
            name: "useShortcut",
            signature: "(key: string, handler: () => void) => void",
            description: t("_props.focus-keyboard.api.useShortcut"),
          },
        ]}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground clip-corner font-display text-xs font-bold uppercase px-6 py-2.5 tracking-[0.1em] ring-2 ring-primary ring-offset-2 ring-offset-background">
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
              [
                t("focus_keyboard.shortcuts.tab"),
                t("focus_keyboard.shortcuts.tab_desc"),
              ],
              [
                t("focus_keyboard.shortcuts.enter"),
                t("focus_keyboard.shortcuts.enter_desc"),
              ],
              [
                t("focus_keyboard.shortcuts.escape"),
                t("focus_keyboard.shortcuts.escape_desc"),
              ],
              [
                t("focus_keyboard.shortcuts.cmd_k"),
                t("focus_keyboard.shortcuts.cmd_k_desc"),
              ],
              [
                t("focus_keyboard.shortcuts.arrows"),
                t("focus_keyboard.shortcuts.arrows_desc"),
              ],
              [
                t("focus_keyboard.shortcuts.home_end"),
                t("focus_keyboard.shortcuts.home_end_desc"),
              ],
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
      >
        <div className="flex flex-wrap gap-6 items-start">
          <div className="border-2 border-dashed border-ef-gray px-6 py-4 text-sm text-muted-foreground cursor-grab active:cursor-grabbing active:opacity-50 active:border-primary transition-all">
            {t("drag_drop.drag_me")}
          </div>
          <div className="border-2 border-dashed border-ef-gray px-8 py-8 text-sm text-muted-foreground flex items-center justify-center">
            {t("drag_drop.drop_zone")}
          </div>
          <div className="border-2 border-dashed border-primary bg-primary/5 px-8 py-8 text-sm text-primary flex items-center justify-center">
            {t("drag_drop.active_zone")}
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
                className={`border p-4 text-sm text-center transition-all ${i === 1 ? "border-primary bg-primary/[0.06] text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="inline-flex flex-wrap items-center gap-4 bg-surface-3 border border-primary/40 px-6 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.5)] max-w-full">
            <span className="text-sm text-card-foreground">
              {t("selection.selected_count")}
            </span>
            <button className="clip-corner bg-ef-red text-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]">
              {t("selection.delete_btn")}
            </button>
            <button className="clip-corner border border-border text-card-foreground font-display text-[10px] font-bold uppercase px-4 py-1.5 tracking-[0.1em]">
              {t("selection.export_btn")}
            </button>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

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
          <Check className="w-4 h-4 text-ef-green" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {copied ? t("micro_interactions.copied") : t("micro_interactions.copy")}
      </button>
      <p className="text-[10px] text-muted-foreground">
        {t("micro_interactions.copy_feedback")}
      </p>
    </div>
  );
};
