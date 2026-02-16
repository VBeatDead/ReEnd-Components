import { ComponentPreview } from "../docs/ComponentPreview";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export const DataDisplaySection = () => {
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);

  return (
    <>
      {/* 17. Table */}
      <ComponentPreview
        id="table"
        title="17. Table (Data Table)"
        showViewport
        description="Header: Orbitron 11px uppercase sticky. Striped rows. Hover: yellow tint."
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
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["OPERATOR", "CLASS", "RARITY", "STATUS"].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left border-b border-border bg-surface-0"
                  >
                    {h}
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
                  <td className="py-3 px-4 text-card-foreground font-medium">
                    {name}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{cls}</td>
                  <td className="py-3 px-4 text-primary font-mono text-xs">
                    {rarity}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-ui text-[10px] tracking-[0.12em] uppercase px-2 py-1 border ${status === "Active" ? "text-ef-green border-ef-green/40 bg-ef-green/[0.08]" : status === "Deployed" ? "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]" : "text-muted-foreground border-border bg-foreground/[0.03]"}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-surface-0">
            <span className="text-xs text-muted-foreground">
              Showing 1-5 of 124
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

      {/* 18. List */}
      <ComponentPreview
        id="list"
        title="18. List & List Item"
        showViewport
        description="Diamond bullet ◆ #FFD429. Numbered: Orbitron, counter leading-zero."
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
              DIAMOND BULLET
            </h4>
            <ul className="space-y-2">
              {["Reconnaissance", "Deployment", "Extraction", "Analysis"].map(
                (item) => (
                  <li
                    key={item}
                    className="diamond-marker text-sm text-card-foreground"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              NUMBERED
            </h4>
            <ol className="space-y-2">
              {[
                "Initialize System",
                "Configure Modules",
                "Deploy Assets",
                "Monitor Output",
              ].map((item, i) => (
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
              KEY-VALUE
            </h4>
            <dl className="space-y-3">
              {[
                ["VERSION", "2.4.1"],
                ["STATUS", "Operational"],
                ["UPTIME", "99.97%"],
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

      {/* 19. Stat */}
      <ComponentPreview
        id="stat-metric"
        title="19. Stat & Metric Display"
        showViewport
        description="Value: Orbitron 48px bold yellow. Label: Orbitron 11px uppercase gray. Trend: ▲/▼."
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
            { label: "TOTAL OPS", value: "12,847", trend: "+12.5%", up: true },
            { label: "ACTIVE UNITS", value: "342", trend: "+3.2%", up: true },
            { label: "ERROR RATE", value: "0.02%", trend: "-8.1%", up: false },
            { label: "UPTIME", value: "99.97%", trend: "0.0%", up: true },
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

      {/* 20. Timeline */}
      <ComponentPreview
        id="timeline"
        title="20. Timeline"
        description="Vertical line 1px. Node: ◆ current yellow, ◇ past gray. Date: Orbitron 11px."
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
              date: "2026.02.15",
              title: "SYSTEM UPDATE V2.0",
              desc: "Major redesign deployed.",
              current: true,
            },
            {
              date: "2026.01.28",
              title: "BETA TESTING",
              desc: "Component library beta released.",
              current: false,
            },
            {
              date: "2025.12.10",
              title: "PROJECT KICKOFF",
              desc: "Initial design system created.",
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
              <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 21. Accordion */}
      <ComponentPreview
        id="accordion"
        title="21. Accordion / Collapsible"
        description="Indicator: +/− in yellow (JetBrains Mono). NOT chevron. Content slides down."
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
            "WHAT IS ENDFIELD?",
            "HOW TO INSTALL?",
            "IS IT PRODUCTION READY?",
          ].map((q, i) => (
            <div key={q} className="border border-border">
              <button
                onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-surface-1 hover:bg-surface-hover transition-colors"
              >
                <span className="font-display text-sm font-semibold tracking-[0.02em] uppercase text-foreground">
                  {q}
                </span>
                <span className="font-mono text-primary text-lg">
                  {accordionOpen === i ? "−" : "+"}
                </span>
              </button>
              {accordionOpen === i && (
                <div className="px-5 py-4 border-t border-border text-sm text-muted-foreground animate-fade-in">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 22. Avatar */}
      <ComponentPreview
        id="avatar"
        title="22. Avatar & Profile"
        description="Shape: Square with clipped corner (clip-path) — NOT circle. Status: diamond shape."
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

      {/* 23. Tags & Badges */}
      <ComponentPreview
        id="tags-badges"
        title="23. Tags, Badges & Labels"
        description="Tag font: Orbitron 10px, uppercase. Diamond-shaped badges. Semantic colors."
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
                label: "DEFAULT",
                cls: "text-muted-foreground border-foreground/15 bg-foreground/[0.03]",
              },
              {
                label: "PRIMARY",
                cls: "text-primary border-primary/40 bg-primary/[0.08]",
              },
              {
                label: "INFO",
                cls: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]",
              },
              {
                label: "SUCCESS",
                cls: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]",
              },
              {
                label: "WARNING",
                cls: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]",
              },
              {
                label: "DANGER",
                cls: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]",
              },
              {
                label: "RARE",
                cls: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]",
              },
            ].map((t) => (
              <span
                key={t.label}
                className={`font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border ${t.cls}`}
              >
                {t.label}
              </span>
            ))}
          </div>
          {/* Removable */}
          <div className="flex gap-3">
            <span className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border text-primary border-primary/40 bg-primary/[0.08] flex items-center gap-2">
              REMOVABLE{" "}
              <button className="text-primary/50 hover:text-primary text-xs">
                ×
              </button>
            </span>
          </div>
          {/* Badge count */}
          <div className="flex items-center gap-4">
            <span className="font-display text-xs text-muted-foreground">
              BADGE COUNT:
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
              <span className="w-2 h-2 rounded-full bg-ef-green shadow-[0_0_6px_hsl(147_71%_51%/0.5)]" />{" "}
              Online
            </span>
            <span className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-ef-gray-mid" /> Offline
            </span>
            <span className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-ef-red shadow-[0_0_6px_hsl(355_100%_64%/0.5)]" />{" "}
              Busy
            </span>
          </div>
        </div>
      </ComponentPreview>

      {/* 24. Progress & Stepper */}
      <ComponentPreview
        id="progress-stepper"
        title="24. Progress & Stepper"
        description="Progress bar: 4px track. Stepper: Diamond nodes, connector lines."
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
                  DEPLOYMENT
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
                <span className="text-xs text-muted-foreground">DANGER</span>
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
              STEPPER
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 max-w-lg">
              {["Step 1", "Step 2", "Step 3", "Step 4"].map((step, i) => (
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
                      {i < 1 ? "Complete" : i === 1 ? "Current" : "Upcoming"}
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
    </>
  );
};
