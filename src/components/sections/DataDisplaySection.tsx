import { ComponentPreview } from "../docs/ComponentPreview";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ArrowRight } from "lucide-react";
import SignatureDataSection from "./signature/SignatureDataSection";

export function DataDisplaySection() {
  const { t } = useTranslation("data");
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);

  return (
    <>
      {/* Table */}
      <ComponentPreview
        id="table"
        title={t("table.title")}
        showViewport
        description={t("table.description")}
        code={`.table th {
  font-family: 'Orbitron'; font-size: 11px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; color: #999;
  background: var(--surface-0); position: sticky; top: 0;
}
.table tr:hover td { background: rgba(255,212,41,0.03); }`}
        props={[
          {
            name: "columns",
            type: "Column[]",
            required: true,
            description:
              "Array of column definitions with header, accessor, and optional width",
          },
          {
            name: "data",
            type: "T[]",
            required: true,
            description: "Array of row data objects",
          },
          {
            name: "sortable",
            type: "boolean",
            default: "false",
            required: false,
            description: "Enables click-to-sort on column headers",
          },
          {
            name: "striped",
            type: "boolean",
            default: "true",
            required: false,
            description:
              "Alternates row background between surface-1 and transparent",
          },
          {
            name: "stickyHeader",
            type: "boolean",
            default: "true",
            required: false,
            description: "Keeps header fixed during vertical scroll",
          },
          {
            name: "onRowClick",
            type: "(row: T) => void",
            required: false,
            description: "Click handler for row selection",
          },
        ]}
        api={[
          {
            name: "Column",
            signature:
              "{ header: string; accessor: string; width?: string; sortable?: boolean }",
            description:
              "Column configuration object defining header label, data key, optional width, and sort capability.",
          },
          {
            name: "SortDirection",
            signature: '"asc" | "desc" | null',
            description:
              "Current sort state returned by the useSortableTable hook.",
          },
        ]}
      >
        <div className="overflow-x-auto border border-border -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-0">
            <thead>
              <tr>
                {[
                  t("table.headers.operator"),
                  t("table.headers.class"),
                  t("table.headers.rarity"),
                  t("table.headers.status"),
                ].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[10px] sm:text-[11px] font-bold tracking-[0.06em] sm:tracking-[0.12em] uppercase text-muted-foreground py-2.5 sm:py-3 px-2 sm:px-4 text-left border-b border-border bg-surface-0 sticky top-0 z-10 cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    <span className="inline-flex items-center gap-0.5 sm:gap-1">
                      {h}
                      <span className="text-[8px] sm:text-[9px] text-muted-foreground/50">
                        ▲▼
                      </span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Amiya", "Caster", "★★★★★", "Active"],
                ["Ch'en", "Guard", "★★★★★★", "Deployed"],
                ["Silverash", "Guard", "★★★★★★", "Standby"],
                ["Exusiai", "Sniper", "★★★★★★", "Active"],
                ["Kal'tsit", "Medic", "★★★★★★", "Deployed"],
              ].map(([name, cls, rarity, status], i) => (
                <tr
                  key={name}
                  className="hover:bg-primary/[0.03] transition-colors border-b border-border last:border-b-0"
                  style={{
                    background:
                      i % 2 === 1 ? "rgba(255,255,255,0.015)" : undefined,
                  }}
                >
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-card-foreground font-medium text-xs sm:text-sm whitespace-nowrap">
                    {name}
                  </td>
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-muted-foreground text-xs sm:text-sm">
                    {cls}
                  </td>
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-primary font-mono text-[10px] sm:text-xs">
                    {rarity}
                  </td>
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                    <span
                      className={`font-ui text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.12em] uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 border whitespace-nowrap ${status === "Active" ? "text-ef-green border-ef-green/40 bg-ef-green/[0.08]" : status === "Deployed" ? "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]" : "text-muted-foreground border-border bg-foreground/[0.03]"}`}
                    >
                      {t(`table.status_labels.${status.toLowerCase()}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-2 sm:px-4 py-2.5 sm:py-3 border-t border-border flex items-center justify-between bg-surface-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {t("table.showing_pagination")}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`font-ui text-[10px] w-7 h-7 flex items-center justify-center ${n === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground border border-border"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* List */}
      <ComponentPreview
        id="list"
        title={t("list.title")}
        showViewport
        description={t("list.description")}
        props={[
          {
            name: "variant",
            type: '"diamond" | "numbered" | "key-value"',
            default: '"diamond"',
            required: false,
            description: "List style variant",
          },
          {
            name: "items",
            type: "string[] | { key: string; value: string }[]",
            required: true,
            description: "List items data",
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.diamond_bullet")}
            </h4>
            <ul className="space-y-2">
              {(
                t("list.diamond_items", { returnObjects: true }) as string[]
              ).map((item) => (
                <li
                  key={item}
                  className="diamond-marker text-sm text-card-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.numbered")}
            </h4>
            <ol className="space-y-2">
              {(
                t("list.numbered_items", { returnObjects: true }) as string[]
              ).map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="font-ui text-[11px] text-primary font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-card-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.key_value")}
            </h4>
            <dl className="space-y-3">
              {[
                [
                  t("list.kv_pairs.version.key"),
                  t("list.kv_pairs.version.value"),
                ],
                [
                  t("list.kv_pairs.status.key"),
                  t("list.kv_pairs.status.value"),
                ],
                [
                  t("list.kv_pairs.uptime.key"),
                  t("list.kv_pairs.uptime.value"),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-sm text-card-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ComponentPreview>

      {/* Stat */}
      <ComponentPreview
        id="stat-metric"
        title={t("stats.title")}
        showViewport
        description={t("stats.description")}
        props={[
          {
            name: "label",
            type: "string",
            required: true,
            description: "Metric label in uppercase",
          },
          {
            name: "value",
            type: "string | number",
            required: true,
            description: "Primary display value",
          },
          {
            name: "trend",
            type: "string",
            required: false,
            description: "Percentage change indicator",
          },
          {
            name: "trendDirection",
            type: '"up" | "down"',
            required: false,
            description: "Controls green (up) or red (down) coloring",
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: t("stats.labels.total_ops"),
              value: "12,847",
              trend: "+12.5%",
              up: true,
            },
            {
              label: t("stats.labels.active_units"),
              value: "342",
              trend: "+3.2%",
              up: true,
            },
            {
              label: t("stats.labels.error_rate"),
              value: "0.02%",
              trend: "-8.1%",
              up: false,
            },
            {
              label: t("stats.labels.uptime"),
              value: "99.97%",
              trend: "0.0%",
              up: true,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="corner-brackets bg-surface-1 border border-border p-5 overflow-hidden"
            >
              <p className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {s.label}
              </p>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary truncate">
                {s.value}
              </p>
              <p
                className={`text-xs mt-1 ${s.up ? "text-ef-green" : "text-ef-red"}`}
              >
                {s.up ? "▲" : "▼"} {s.trend}
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Timeline */}
      <ComponentPreview
        id="timeline"
        title={t("timeline.title")}
        description={t("timeline.description")}
        props={[
          {
            name: "items",
            type: "{ date: string; title: string; description: string; current?: boolean }[]",
            required: true,
            description: "Timeline entries in chronological order",
          },
          {
            name: "orientation",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            required: false,
            description: "Layout direction of the timeline",
          },
        ]}
      >
        <div className="max-w-md pl-6 border-l border-ef-dark-gray space-y-8">
          {[
            {
              date: t("timeline.entries.system_update.date"),
              title: t("timeline.entries.system_update.title"),
              desc: t("timeline.entries.system_update.desc"),
              current: true,
            },
            {
              date: t("timeline.entries.beta_testing.date"),
              title: t("timeline.entries.beta_testing.title"),
              desc: t("timeline.entries.beta_testing.desc"),
              current: false,
            },
            {
              date: t("timeline.entries.project_kickoff.date"),
              title: t("timeline.entries.project_kickoff.title"),
              desc: t("timeline.entries.project_kickoff.desc"),
              current: false,
            },
          ].map((item) => (
            <div key={item.date} className="relative">
              <span
                className={`absolute -left-[30px] top-1 text-sm ${item.current ? "text-primary" : "text-ef-gray-mid"}`}
              >
                {item.current ? "◆" : "◇"}
              </span>
              <p className="font-ui text-[11px] text-muted-foreground tracking-wider mb-1">
                {item.date}
              </p>
              <h4 className="font-display text-base font-bold tracking-[0.02em] uppercase text-foreground">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Accordion */}
      <ComponentPreview
        id="accordion"
        title={t("accordion.title")}
        description={t("accordion.description")}
        props={[
          {
            name: "items",
            type: "{ title: string; content: ReactNode }[]",
            required: true,
            description: "Accordion panel definitions",
          },
          {
            name: "defaultOpen",
            type: "number",
            required: false,
            description: "Index of initially open panel",
          },
          {
            name: "multiple",
            type: "boolean",
            default: "false",
            required: false,
            description: "Allow multiple panels open simultaneously",
          },
          {
            name: "onChange",
            type: "(index: number | null) => void",
            required: false,
            description: "Callback when open panel changes",
          },
        ]}
      >
        <div className="max-w-lg space-y-1">
          {[
            t("accordion.questions.what_is_endfield"),
            t("accordion.questions.how_to_install"),
            t("accordion.questions.is_production_ready"),
          ].map((q, i) => (
            <div key={q} className="border border-border">
              <button
                onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-surface-1 hover:bg-surface-hover transition-colors"
                aria-expanded={accordionOpen === i}
                aria-controls={`accordion-panel-${i}`}
                id={`accordion-trigger-${i}`}
              >
                <span className="font-display text-sm font-semibold tracking-[0.02em] uppercase text-foreground">
                  {q}
                </span>
                <span className="font-mono text-primary text-base">
                  {accordionOpen === i ? "−" : "+"}
                </span>
              </button>
              {accordionOpen === i && (
                <div
                  className="px-5 py-4 border-t border-border text-sm text-muted-foreground animate-fade-in"
                  role="region"
                  id={`accordion-panel-${i}`}
                  aria-labelledby={`accordion-trigger-${i}`}
                >
                  {t("accordion.answer_placeholder")}
                </div>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Avatar */}
      <ComponentPreview
        id="avatar"
        title={t("avatar.title")}
        description={t("avatar.description")}
        props={[
          {
            name: "src",
            type: "string",
            required: false,
            description: "Image URL for the avatar",
          },
          {
            name: "fallback",
            type: "string",
            required: false,
            description: "Fallback text or icon when no image",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl"',
            default: '"md"',
            required: false,
            description: "Avatar dimensions (24-80px)",
          },
          {
            name: "status",
            type: '"online" | "offline" | "busy"',
            required: false,
            description: "Status diamond indicator color",
          },
        ]}
      >
        <div className="flex items-end gap-6 flex-wrap">
          {[
            { size: "xs", px: 24 },
            { size: "sm", px: 32 },
            { size: "md", px: 40 },
            { size: "lg", px: 56 },
            { size: "xl", px: 80 },
          ].map((a) => (
            <div key={a.size} className="flex flex-col items-center gap-2">
              <div className="relative">
                <div
                  className="clip-corner-sm bg-surface-2 flex items-center justify-center text-muted-foreground"
                  style={{ width: a.px, height: a.px }}
                >
                  <span style={{ fontSize: a.px * 0.35 }}>◆</span>
                </div>
                {a.size === "md" && (
                  <span className="absolute -bottom-0.5 -right-0.5 text-ef-green text-[10px]">
                    ◆
                  </span>
                )}
                {a.size === "lg" && (
                  <span className="absolute -bottom-0.5 -right-0.5 text-ef-red text-[10px]">
                    ◆
                  </span>
                )}
              </div>
              <span className="font-display text-[10px] text-muted-foreground uppercase">
                {a.size}
              </span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Tags & Badges */}
      <ComponentPreview
        id="tags-badges"
        title={t("tags.title")}
        description={t("tags.description")}
        props={[
          {
            name: "label",
            type: "string",
            required: true,
            description: "Tag display text",
          },
          {
            name: "variant",
            type: '"default" | "primary" | "info" | "success" | "warning" | "danger" | "rare"',
            default: '"default"',
            required: false,
            description: "Semantic color variant",
          },
          {
            name: "removable",
            type: "boolean",
            default: "false",
            required: false,
            description: "Shows × remove button",
          },
          {
            name: "onRemove",
            type: "() => void",
            required: false,
            description: "Callback when remove button is clicked",
          },
          {
            name: "count",
            type: "number",
            required: false,
            description: "Badge count number (renders as count badge)",
          },
        ]}
        playground={{
          componentName: "Badge",
          controls: [
            {
              name: "variant",
              type: "select",
              options: [
                "default",
                "primary",
                "info",
                "success",
                "warning",
                "danger",
                "rare",
              ],
              default: "default",
            },
            { name: "label", label: "Label", type: "text", default: "BADGE" },
            { name: "removable", type: "boolean", default: false },
          ],
          render: (v) => {
            const variantCls: Record<string, string> = {
              default:
                "text-muted-foreground border-foreground/15 bg-foreground/[0.03]",
              primary: "text-primary border-primary/40 bg-primary/[0.08]",
              info: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]",
              success: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]",
              warning: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]",
              danger: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]",
              rare: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]",
            };
            return (
              <div className="flex justify-center">
                <span
                  className={`font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border ${variantCls[v.variant] || variantCls.default} flex items-center gap-2`}
                >
                  {v.label}
                  {v.removable && (
                    <button className="opacity-50 hover:opacity-100 text-xs">
                      ×
                    </button>
                  )}
                </span>
              </div>
            );
          },
        }}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: t("tags.labels.default"),
                cls: "text-muted-foreground border-foreground/15 bg-foreground/[0.03]",
              },
              {
                label: t("tags.labels.primary"),
                cls: "text-primary border-primary/40 bg-primary/[0.08]",
              },
              {
                label: t("tags.labels.info"),
                cls: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]",
              },
              {
                label: t("tags.labels.success"),
                cls: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]",
              },
              {
                label: t("tags.labels.warning"),
                cls: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]",
              },
              {
                label: t("tags.labels.danger"),
                cls: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]",
              },
              {
                label: t("tags.labels.rare"),
                cls: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]",
              },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border ${tag.cls}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          {/* Removable */}
          <div className="flex gap-3">
            <span className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border text-primary border-primary/40 bg-primary/[0.08] flex items-center gap-2">
              {t("tags.removable")}{" "}
              <button className="text-primary/50 hover:text-primary text-xs">
                ×
              </button>
            </span>
          </div>
          {/* Badge count */}
          <div className="flex items-center gap-4">
            <span className="font-display text-xs text-muted-foreground">
              {t("tags.badge_count")}
            </span>
            <span className="clip-corner-sm bg-ef-red text-foreground font-ui text-[10px] font-bold px-2 py-0.5 min-w-[20px] text-center">
              3
            </span>
            <span className="clip-corner-sm bg-ef-red text-foreground font-ui text-[10px] font-bold px-2 py-0.5 min-w-[20px] text-center">
              99+
            </span>
          </div>
          {/* Status dots */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 bg-ef-green shadow-[0_0_6px_hsl(147_71%_51%/0.5)]"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("tags.status.online")}
            </span>
            <span className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 bg-ef-gray-mid"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("tags.status.offline")}
            </span>
            <span className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 bg-ef-red shadow-[0_0_6px_hsl(355_100%_64%/0.5)]"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />{" "}
              {t("tags.status.busy")}
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* Progress & Stepper */}
      <ComponentPreview
        id="progress-stepper"
        title={t("progress.title")}
        description={t("progress.description")}
        props={[
          {
            name: "value",
            type: "number",
            required: true,
            description: "Progress percentage (0-100)",
          },
          {
            name: "variant",
            type: '"bar" | "stepper"',
            default: '"bar"',
            required: false,
            description: "Display mode",
          },
          {
            name: "steps",
            type: '{ label: string; status: "complete" | "current" | "upcoming" }[]',
            required: false,
            description: "Step definitions for stepper variant",
          },
          {
            name: "color",
            type: '"primary" | "danger"',
            default: '"primary"',
            required: false,
            description: "Progress bar color",
          },
          {
            name: "showLabel",
            type: "boolean",
            default: "true",
            required: false,
            description: "Show percentage label",
          },
        ]}
      >
        <div className="space-y-8">
          {/* Progress bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  {t("progress.deployment")}
                </span>
                <span className="font-ui text-[11px] text-muted-foreground">
                  75%
                </span>
              </div>
              <div className="h-1 bg-ef-dark-gray w-full">
                <div className="h-full bg-primary w-3/4 transition-all" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  {t("progress.danger")}
                </span>
                <span className="font-ui text-[11px] text-muted-foreground">
                  90%
                </span>
              </div>
              <div className="h-1 bg-ef-dark-gray w-full">
                <div className="h-full bg-ef-red w-[90%]" />
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-6">
              {t("progress.stepper")}
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 max-w-lg">
              {(
                t("progress.step_labels", { returnObjects: true }) as string[]
              ).map((step, i) => (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-sm ${i < 2 ? "text-primary" : "text-ef-gray"} ${i === 1 ? "animate-pulse-glow rounded-sm" : ""}`}
                    >
                      {i < 2 ? "◆" : "◇"}
                    </span>
                    <span
                      className={`font-display text-[10px] uppercase mt-2 ${i === 1 ? "text-primary" : i < 1 ? "text-card-foreground" : "text-ef-gray-mid"}`}
                    >
                      {step}
                    </span>
                    <span className="text-[9px] text-muted-foreground">
                      {i < 1
                        ? t("progress.step_states.complete")
                        : i === 1
                          ? t("progress.step_states.current")
                          : t("progress.step_states.upcoming")}
                    </span>
                  </div>
                  {i < 3 && (
                    <div
                      className={`flex-1 h-px mx-2 ${i < 1 ? "bg-primary" : "bg-ef-gray"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>
      <SignatureDataSection />
    </>
  );
}
