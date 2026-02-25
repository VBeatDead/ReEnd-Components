import { useState } from "react";
import { ComponentPreview } from "../docs/ComponentPreview";
import { useTranslation } from "react-i18next";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { CHART_COLORS } from "../ui/chart";
import SignatureDataSection from "./signature/SignatureDataSection";

const CHART_DATA = [
  { name: "JAN", operators: 42, missions: 31 },
  { name: "FEB", operators: 58, missions: 45 },
  { name: "MAR", operators: 35, missions: 52 },
  { name: "APR", operators: 71, missions: 38 },
  { name: "MAY", operators: 89, missions: 67 },
  { name: "JUN", operators: 64, missions: 55 },
];

function ChartDemo() {
  return (
    <div className="bg-surface-1 border border-border p-4">
      <p className="font-display text-xs font-bold uppercase tracking-wider text-foreground mb-1">OPERATOR DEPLOYMENT</p>
      <p className="text-[11px] text-muted-foreground mb-4">Monthly active operators vs missions completed</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={CHART_DATA} barGap={2}>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.4} />
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "Orbitron, monospace", fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: "Orbitron, monospace", fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--surface-2))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 0,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
            }}
            cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
          />
          <Bar dataKey="operators" fill={CHART_COLORS[0]} maxBarSize={24} />
          <Bar dataKey="missions" fill={CHART_COLORS[1]} maxBarSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
import { TacticalBadge } from "../ui/signature/tactical-badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Timeline } from "../ui/timeline";
import { Stepper } from "../ui/stepper";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
} from "../ui/table";
import {
  List,
  ListItem,
  NumberedList,
  NumberedListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
  LinkList,
  LinkListItem,
} from "../ui/list";
import { Stat, StatGrid } from "../ui/stat";
import { type SortDirection } from "../ui/table";

export function DataDisplaySection() {
  const { t } = useTranslation("data");
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (col: string) => {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortCol(null);
      setSortDir(null);
    }
  };

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
            description: t("_props.table.columns"),
          },
          {
            name: "data",
            type: "T[]",
            required: true,
            description: t("_props.table.data"),
          },
          {
            name: "sortable",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.table.sortable"),
          },
          {
            name: "striped",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.table.striped"),
          },
          {
            name: "stickyHeader",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.table.stickyHeader"),
          },
          {
            name: "onRowClick",
            type: "(row: T) => void",
            required: false,
            description: t("_props.table.onRowClick"),
          },
        ]}
        api={[
          {
            name: "Column",
            signature:
              "{ header: string; accessor: string; width?: string; sortable?: boolean }",
            description: t("_props.table.api.Column"),
          },
          {
            name: "SortDirection",
            signature: '"asc" | "desc" | null',
            description: t("_props.table.api.SortDirection"),
          },
        ]}
      >
        <div className="border border-border -mx-6 sm:mx-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead sortable sortDirection={sortCol === "operator" ? sortDir : null} onSort={() => handleSort("operator")}>{t("table.headers.operator")}</TableHead>
                <TableHead sortable sortDirection={sortCol === "class" ? sortDir : null} onSort={() => handleSort("class")}>{t("table.headers.class")}</TableHead>
                <TableHead sortable sortDirection={sortCol === "rarity" ? sortDir : null} onSort={() => handleSort("rarity")}>{t("table.headers.rarity")}</TableHead>
                <TableHead sortable sortDirection={sortCol === "status" ? sortDir : null} onSort={() => handleSort("status")}>{t("table.headers.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Amiya", "Caster", "\u2605\u2605\u2605\u2605\u2605", "Active"],
                ["Ch'en", "Guard", "\u2605\u2605\u2605\u2605\u2605\u2605", "Deployed"],
                ["Silverash", "Guard", "\u2605\u2605\u2605\u2605\u2605\u2605", "Standby"],
                ["Exusiai", "Sniper", "\u2605\u2605\u2605\u2605\u2605\u2605", "Active"],
                ["Kal'tsit", "Medic", "\u2605\u2605\u2605\u2605\u2605\u2605", "Deployed"],
              ].map(([name, cls, rarity, status]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {cls}
                  </TableCell>
                  <TableCell className="text-primary font-mono text-xs">
                    {rarity}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-ui text-[10px] tracking-[0.12em] uppercase px-2 py-1 border whitespace-nowrap ${status === "Active" ? "text-ef-green border-ef-green/40 bg-ef-green/[0.08]" : status === "Deployed" ? "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]" : "text-muted-foreground border-border bg-foreground/[0.03]"}`}
                    >
                      {t(`table.status_labels.${status.toLowerCase()}`)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="border-0 hover:bg-transparent even:bg-transparent">
                <TableCell colSpan={2}>
                  <span className="text-xs text-muted-foreground">
                    {t("table.showing_pagination")}
                  </span>
                </TableCell>
                <TableCell colSpan={2} className="text-right">
                  <div className="flex gap-1 justify-end">
                    {[1, 2, 3].map((n) => (
                      <button
                        key={n}
                        className={`font-ui text-[10px] w-7 h-7 flex items-center justify-center ${n === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground border border-border"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </ComponentPreview>

      {/* List */}
      <ComponentPreview
        id="list"
        title={t("list.title")}
        showViewport
        description={t("list.description")}
        code={`import {
  List, ListItem,
  NumberedList, NumberedListItem,
  DescriptionList, DescriptionTerm, DescriptionDetail,
  LinkList, LinkListItem,
} from "reend-components";

// Diamond bullet list
<List>
  <ListItem>Deploy EF-SYS v2.4.1</ListItem>
  <ListItem>Run diagnostics on Sector 7</ListItem>
  <ListItem>Archive mission logs</ListItem>
</List>

// Numbered list (01 / 02 format)
<NumberedList>
  <NumberedListItem>Initialize operator profile</NumberedListItem>
  <NumberedListItem>Configure clearance level</NumberedListItem>
</NumberedList>

// Link list
<LinkList>
  <LinkListItem href="/docs">Documentation</LinkListItem>
  <LinkListItem href="/changelog">Changelog</LinkListItem>
</LinkList>`}
        props={[
          {
            name: "variant",
            type: '"diamond" | "numbered" | "key-value"',
            default: '"diamond"',
            required: false,
            description: t("_props.list.variant"),
          },
          {
            name: "items",
            type: "string[] | { key: string; value: string }[]",
            required: true,
            description: t("_props.list.items"),
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.diamond_bullet")}
            </h4>
            <List>
              {(
                t("list.diamond_items", { returnObjects: true }) as string[]
              ).map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.numbered")}
            </h4>
            <NumberedList>
              {(
                t("list.numbered_items", { returnObjects: true }) as string[]
              ).map((item) => (
                <NumberedListItem key={item}>{item}</NumberedListItem>
              ))}
            </NumberedList>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.key_value")}
            </h4>
            <DescriptionList>
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
                  <DescriptionTerm>{k}</DescriptionTerm>
                  <DescriptionDetail>{v}</DescriptionDetail>
                </div>
              ))}
            </DescriptionList>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("list.link_list")}
            </h4>
            <LinkList>
              {(
                t("list.link_items", { returnObjects: true }) as string[]
              ).map((item) => (
                <LinkListItem key={item} href="#">
                  {item}
                </LinkListItem>
              ))}
            </LinkList>
          </div>
        </div>
      </ComponentPreview>

      {/* Stat */}
      <ComponentPreview
        id="stat-metric"
        title={t("stats.title")}
        showViewport
        description={t("stats.description")}
        code={`import { Stat, StatGrid } from "reend-components";

<StatGrid cols={4}>
  <Stat
    label="ACTIVE OPERATORS"
    value="1,247"
    trend="up"
    trendValue="+12%"
  />
  <Stat
    label="MISSION SUCCESS"
    value="94.3%"
    trend="up"
    trendValue="+2.1%"
  />
  <Stat
    label="RESPONSE TIME"
    value="< 2s"
    trend="neutral"
  />
  <Stat
    label="SYSTEM UPTIME"
    value="99.9%"
    trend="down"
    trendValue="-0.1%"
  />
</StatGrid>`}
        props={[
          {
            name: "label",
            type: "string",
            required: true,
            description: t("_props.stat-metric.label"),
          },
          {
            name: "value",
            type: "string | number",
            required: true,
            description: t("_props.stat-metric.value"),
          },
          {
            name: "trend",
            type: "string",
            required: false,
            description: t("_props.stat-metric.trend"),
          },
          {
            name: "trendDirection",
            type: '"up" | "down"',
            required: false,
            description: t("_props.stat-metric.trendDirection"),
          },
        ]}
      >
        <StatGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label={t("stats.labels.total_ops")}
            value="12,847"
            trend="up"
            trendValue="+12.5%"
          />
          <Stat
            label={t("stats.labels.active_units")}
            value="342"
            trend="up"
            trendValue="+3.2%"
          />
          <Stat
            label={t("stats.labels.error_rate")}
            value="0.02%"
            trend="down"
            trendValue="-8.1%"
          />
          <Stat
            label={t("stats.labels.uptime")}
            value="99.97%"
            trend="neutral"
            trendValue="0.0%"
          />
        </StatGrid>
      </ComponentPreview>

      {/* Timeline */}
      <ComponentPreview
        id="timeline"
        title={t("timeline.title")}
        description={t("timeline.description")}
        code={`import { Timeline, TimelineItem } from "reend-components";

<Timeline>
  <TimelineItem
    status="complete"
    label="2026.02.15 / 08:00 UTC"
    title="MISSION INITIALIZED"
    description="EF-SYS deployment confirmed. All sectors online."
  />
  <TimelineItem
    status="current"
    label="2026.02.15 / 14:32 UTC"
    title="FIELD OPERATIONS ACTIVE"
    description="Endministrator assigned to Sector 7."
  />
  <TimelineItem
    status="pending"
    label="2026.02.16 / 00:00 UTC"
    title="DEBRIEF SCHEDULED"
  />
</Timeline>`}
        props={[
          {
            name: "items",
            type: "{ date: string; title: string; description: string; current?: boolean }[]",
            required: true,
            description: t("_props.timeline.items"),
          },
          {
            name: "orientation",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            required: false,
            description: t("_props.timeline.orientation"),
          },
        ]}
      >
        <div className="max-w-md">
          <Timeline
            items={[
              {
                date: t("timeline.entries.system_update.date"),
                title: t("timeline.entries.system_update.title"),
                description: t("timeline.entries.system_update.desc"),
                status: "current",
              },
              {
                date: t("timeline.entries.beta_testing.date"),
                title: t("timeline.entries.beta_testing.title"),
                description: t("timeline.entries.beta_testing.desc"),
                status: "complete",
              },
              {
                date: t("timeline.entries.project_kickoff.date"),
                title: t("timeline.entries.project_kickoff.title"),
                description: t("timeline.entries.project_kickoff.desc"),
                status: "complete",
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* Avatar */}
      <ComponentPreview
        id="avatar"
        title={t("avatar.title")}
        description={t("avatar.description")}
        code={`import { Avatar, AvatarImage, AvatarFallback, avatarVariants } from "reend-components";

// With image
<Avatar size="md" status="online">
  <AvatarImage src="/operator.png" alt="Operator" />
  <AvatarFallback>OP</AvatarFallback>
</Avatar>

// Fallback only (shows initials)
<Avatar size="lg" status="busy">
  <AvatarFallback>EX</AvatarFallback>
</Avatar>

// Sizes: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
// Status: "online" | "busy" | "away" | "offline"`}
        props={[
          {
            name: "src",
            type: "string",
            required: false,
            description: t("_props.avatar.src"),
          },
          {
            name: "fallback",
            type: "string",
            required: false,
            description: t("_props.avatar.fallback"),
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl"',
            default: '"md"',
            required: false,
            description: t("_props.avatar.size"),
          },
          {
            name: "status",
            type: '"online" | "offline" | "busy"',
            required: false,
            description: t("_props.avatar.status"),
          },
        ]}
      >
        <div className="flex items-end gap-6 flex-wrap">
          {(
            [
              { size: "xs" as const },
              { size: "sm" as const },
              { size: "md" as const, status: "online" as const },
              { size: "lg" as const, status: "busy" as const },
              { size: "xl" as const },
            ] as const
          ).map((a) => (
            <div key={a.size} className="flex flex-col items-center gap-2">
              <Avatar size={a.size} status={"status" in a ? a.status : undefined}>
                <AvatarFallback>◆</AvatarFallback>
              </Avatar>
              <span className="font-display text-[10px] text-muted-foreground uppercase">
                {a.size}
              </span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Tags, Badges & Labels */}
      <ComponentPreview
        id="tags-badges"
        title={t("tags.title")}
        description={t("tags.description")}
        install={{
          importPath: `// ◆ TacticalBadge (Tag) — installed component
import { TacticalBadge } from "reend-components";

// ◆ Badge & Label — inline Tailwind patterns (no install)
// Requires: reend-components/variables.css + tailwind preset`,
          usage: `{/* Tag — TacticalBadge */}
<TacticalBadge variant="success">DEPLOYED</TacticalBadge>
<TacticalBadge variant="danger">CRITICAL</TacticalBadge>
<TacticalBadge variant="info">RECON</TacticalBadge>

{/* Badge — inline pattern */}
<span className="font-ui text-[10px] font-semibold tracking-[0.12em]
  uppercase px-3 py-1 border
  text-primary border-primary/40 bg-primary/[0.08]">
  ALPHA SQUAD
</span>

{/* Label — inline pattern */}
<span className="font-ui text-[10px] font-semibold tracking-[0.15em] uppercase text-ef-green">
  ACTIVE
</span>

{/* Count chip */}
<span className="clip-corner-sm bg-ef-red text-white font-ui text-[10px] font-bold px-2 py-0.5">
  99+
</span>`,
        }}
        api={[
          {
            name: "TacticalBadge",
            signature: 'variant?: "default" | "success" | "warning" | "danger" | "info"',
            description: t("_props.tags-badges.tactical_badge"),
          },
          {
            name: "Badge (pattern)",
            signature: '"font-ui text-[10px] tracking-[0.12em] uppercase px-3 py-1 border {variant-cls}"',
            description: t("_props.tags-badges.badge"),
          },
          {
            name: "Label (pattern)",
            signature: '"font-ui text-[10px] tracking-[0.15em] uppercase {color-cls}"',
            description: t("_props.tags-badges.label_style"),
          },
          {
            name: "Count (pattern)",
            signature: '"clip-corner-sm bg-ef-red text-white font-ui text-[10px] font-bold px-2 py-0.5"',
            description: t("_props.tags-badges.count"),
          },
        ]}
        props={[
          {
            name: "variant",
            type: '"default" | "success" | "warning" | "danger" | "info"',
            default: '"default"',
            required: false,
            description: t("_props.tags-badges.variant"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.tags-badges.label"),
          },
          {
            name: "removable",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.tags-badges.removable"),
          },
          {
            name: "onRemove",
            type: "() => void",
            required: false,
            description: t("_props.tags-badges.onRemove"),
          },
        ]}
        code={`import { TacticalBadge } from "reend-components";
// Tactical badge (signature component)
<TacticalBadge variant="active">ACTIVE</TacticalBadge>
<TacticalBadge variant="standby">STANDBY</TacticalBadge>
<TacticalBadge variant="critical">CRITICAL</TacticalBadge>
<TacticalBadge variant="offline">OFFLINE</TacticalBadge>
<TacticalBadge variant="classified">CLASSIFIED</TacticalBadge>

// Inline badge (pure Tailwind)
<span className="inline-flex items-center px-2 py-0.5 text-[10px] font-display font-bold uppercase tracking-[0.1em] bg-ef-green/10 text-ef-green border border-ef-green/20">
  OPERATIONAL
</span>

// Removable badge
import { Badge } from "reend-components";
<Badge variant="primary" removable onRemove={() => {}}>EF-7B</Badge>`}
        playground={{
          componentName: "Tag / Badge / Label",
          controls: [
            {
              name: "type",
              label: t("tags.playground.type_label"),
              type: "select",
              options: ["tag", "badge", "label"],
              default: "tag",
            },
            {
              name: "variant",
              type: "select",
              options: ["default", "success", "warning", "danger", "info", "primary", "rare"],
              default: "default",
            },
            {
              name: "label",
              label: "Text",
              type: "text",
              default: t("tags.playground.text_default"),
            },
            { name: "removable", type: "boolean", default: false },
          ],
          codeTemplate: (v) => {
            const text = (v.label as string) || "ALPHA SQUAD";
            const variant = v.variant as string;
            const removableBadge = v.removable
              ? `\n  <button onClick={onRemove} className="opacity-50 hover:opacity-100 text-xs">×</button>`
              : "";

            if (v.type === "tag") {
              const tagV = ["default", "success", "warning", "danger", "info"].includes(variant)
                ? variant : "default";
              const removableTag = v.removable
                ? `\n  {/* add your onRemove handler */}\n  <button onClick={onRemove} style={{ fontSize: "10px" }}>×</button>`
                : "";
              return `// ◆ TacticalBadge — npm install reend-components
// CLI: npx reend-cli add tactical-badge

import { TacticalBadge } from "reend-components";

<TacticalBadge variant="${tagV}">${removableTag}
  ${text}
</TacticalBadge>`;
            }

            if (v.type === "badge") {
              const clsMap: Record<string, string> = {
                default: "text-muted-foreground border-foreground/15 bg-foreground/[0.03]",
                primary: "text-primary border-primary/40 bg-primary/[0.08]",
                info: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]",
                success: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]",
                warning: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]",
                danger: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]",
                rare: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]",
              };
              const cls = clsMap[variant] ?? clsMap.default;
              return `// ◆ Badge — inline Tailwind pattern (no install)
// Requires: reend-components/variables.css + tailwind preset

<span className="font-ui text-[10px] font-semibold
  tracking-[0.12em] uppercase px-3 py-1 border
  flex items-center gap-2 ${cls}">${removableBadge}
  ${text}
</span>`;
            }

            // label
            const clsMap: Record<string, string> = {
              default: "text-foreground",
              primary: "text-primary",
              success: "text-ef-green",
              warning: "text-ef-orange",
              danger: "text-ef-red",
              info: "text-ef-blue",
              rare: "text-ef-purple",
            };
            const cls = clsMap[variant] ?? clsMap.default;
            return `// ◆ Label — inline Tailwind pattern (no install)
// Requires: reend-components/variables.css + tailwind preset

<span className="font-ui text-[10px] font-semibold
  tracking-[0.15em] uppercase ${cls}">
  ${text}
</span>`;
          },
          render: (v) => {
            const text = (v.label as string) || t("tags.playground.text_default");
            const badgeVariantCls: Record<string, string> = {
              default: "text-muted-foreground border-foreground/15 bg-foreground/[0.03]",
              primary: "text-primary border-primary/40 bg-primary/[0.08]",
              info: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]",
              success: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]",
              warning: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]",
              danger: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]",
              rare: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]",
            };
            const labelColorCls: Record<string, string> = {
              default: "text-foreground",
              primary: "text-primary",
              success: "text-ef-green",
              warning: "text-ef-orange",
              danger: "text-ef-red",
              info: "text-ef-blue",
              rare: "text-ef-purple",
            };
            const tagVariantMap: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
              default: "default", success: "success", warning: "warning",
              danger: "danger", info: "info", primary: "default", rare: "default",
            };

            if (v.type === "tag") {
              const tagV = tagVariantMap[v.variant as string] ?? "default";
              return (
                <div className="flex flex-col items-center gap-4">
                  <TacticalBadge variant={tagV}>
                    {text}
                    {v.removable && (
                      <button
                        className="ml-0.5 opacity-50 hover:opacity-100 leading-none"
                        style={{ fontSize: "10px" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        ×
                      </button>
                    )}
                  </TacticalBadge>
                  <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
                    ◆ from reend-components
                  </span>
                </div>
              );
            }
            if (v.type === "label") {
              return (
                <div className="flex flex-col items-center gap-4">
                  <span className={`font-ui text-[10px] font-semibold tracking-[0.15em] uppercase ${labelColorCls[v.variant as string] || "text-foreground"}`}>
                    {text}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
                    ◆ inline tailwind pattern
                  </span>
                </div>
              );
            }
            return (
              <div className="flex flex-col items-center gap-4">
                <span className={`font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border ${badgeVariantCls[v.variant as string] || badgeVariantCls.default} flex items-center gap-2`}>
                  {text}
                  {v.removable && (
                    <button className="opacity-50 hover:opacity-100 text-xs">×</button>
                  )}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
                  ◆ inline tailwind pattern
                </span>
              </div>
            );
          },
        }}
      >
        <div className="space-y-7">
          {/* TAGS — TacticalBadge */}
          <div>
            <h4 className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("tags.section_tags")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(["default", "success", "warning", "danger", "info"] as const).map((v) => (
                <TacticalBadge key={v} variant={v}>
                  {t(`tags.tag_labels.${v}`)}
                </TacticalBadge>
              ))}
            </div>
          </div>

          {/* BADGES — inline semantic spans */}
          <div>
            <h4 className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("tags.section_badges")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: t("tags.labels.default"), cls: "text-muted-foreground border-foreground/15 bg-foreground/[0.03]" },
                { label: t("tags.labels.primary"), cls: "text-primary border-primary/40 bg-primary/[0.08]" },
                { label: t("tags.labels.info"), cls: "text-ef-blue border-ef-blue/40 bg-ef-blue/[0.08]" },
                { label: t("tags.labels.success"), cls: "text-ef-green border-ef-green/40 bg-ef-green/[0.08]" },
                { label: t("tags.labels.warning"), cls: "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]" },
                { label: t("tags.labels.danger"), cls: "text-ef-red border-ef-red/40 bg-ef-red/[0.08]" },
                { label: t("tags.labels.rare"), cls: "text-ef-purple border-ef-purple/40 bg-ef-purple/[0.08]" },
              ].map((badge) => (
                <span key={badge.label} className={`font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border ${badge.cls}`}>
                  {badge.label}
                </span>
              ))}
              <span className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 border text-primary border-primary/40 bg-primary/[0.08] flex items-center gap-2">
                {t("tags.removable")}
                <button className="text-primary/50 hover:text-primary text-xs leading-none">×</button>
              </span>
            </div>
          </div>

          {/* LABELS — minimal colored text */}
          <div>
            <h4 className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("tags.section_labels")}
            </h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
              {[
                { key: "active",   cls: "text-ef-green" },
                { key: "pending",  cls: "text-ef-orange" },
                { key: "complete", cls: "text-ef-blue" },
                { key: "archived", cls: "text-muted-foreground" },
                { key: "draft",    cls: "text-muted-foreground/50" },
              ].map(({ key, cls }) => (
                <span key={key} className={`font-ui text-[10px] font-semibold tracking-[0.15em] uppercase ${cls}`}>
                  {t(`tags.label_texts.${key}`)}
                </span>
              ))}
            </div>
          </div>

          {/* BADGE COUNT */}
          <div>
            <h4 className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("tags.section_badge_count")}
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              {[3, 12, 99, "99+"].map((n) => (
                <span key={n} className="clip-corner-sm bg-ef-red text-white font-ui text-[10px] font-bold px-2 py-0.5 min-w-[20px] text-center leading-5">
                  {n}
                </span>
              ))}
              <span className="clip-corner-sm bg-primary text-primary-foreground font-ui text-[10px] font-bold px-2 py-0.5 min-w-[20px] text-center leading-5">
                7
              </span>
            </div>
          </div>

          {/* STATUS DOTS */}
          <div>
            <h4 className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {t("tags.section_status_dots")}
            </h4>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="flex items-center gap-2 text-xs text-foreground">
                <span
                  className="w-2 h-2 bg-ef-green shadow-[0_0_6px_hsl(147_71%_51%/0.5)]"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
                {t("tags.status.online")}
              </span>
              <span className="flex items-center gap-2 text-xs text-foreground">
                <span
                  className="w-2 h-2 bg-ef-gray-mid"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
                {t("tags.status.offline")}
              </span>
              <span className="flex items-center gap-2 text-xs text-foreground">
                <span
                  className="w-2 h-2 bg-ef-red shadow-[0_0_6px_hsl(355_100%_64%/0.5)]"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
                {t("tags.status.busy")}
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Progress & Stepper */}
      <ComponentPreview
        id="progress-stepper"
        title={t("progress.title")}
        description={t("progress.description")}
        code={`import { Progress } from "reend-components";
import { Stepper } from "reend-components";
import type { StepItem } from "reend-components";

// Progress bar
<Progress value={67} showLabel />
<Progress value={100} variant="success" showLabel />
<Progress value={30} variant="danger" showLabel />
<Progress variant="indeterminate" />

// Stepper
const steps: StepItem[] = [
  { label: "INITIALIZATION", description: "Configure EF-SYS" },
  { label: "CALIBRATION", description: "Run diagnostics" },
  { label: "DEPLOYMENT", description: "Activate field ops" },
];
<Stepper steps={steps} currentStep={1} orientation="horizontal" />`}
        props={[
          {
            name: "value",
            type: "number",
            required: true,
            description: t("_props.progress-stepper.value"),
          },
          {
            name: "variant",
            type: '"bar" | "stepper"',
            default: '"bar"',
            required: false,
            description: t("_props.progress-stepper.variant"),
          },
          {
            name: "steps",
            type: '{ label: string; status: "complete" | "current" | "upcoming" }[]',
            required: false,
            description: t("_props.progress-stepper.steps"),
          },
          {
            name: "color",
            type: '"primary" | "danger"',
            default: '"primary"',
            required: false,
            description: t("_props.progress-stepper.color"),
          },
          {
            name: "showLabel",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.progress-stepper.showLabel"),
          },
        ]}
      >
        <div className="space-y-8">
          {/* Progress bars */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                {t("progress.deployment")}
              </span>
              <Progress value={75} showLabel />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                {t("progress.danger")}
              </span>
              <Progress value={90} variant="danger" showLabel />
            </div>
          </div>

          {/* Stepper */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-6">
              {t("progress.stepper")}
            </h4>
            <Stepper
              steps={(t("progress.step_labels", { returnObjects: true }) as string[]).map(
                (label) => ({ label }),
              )}
              currentStep={1}
              orientation="horizontal"
            />
          </div>
        </div>
      </ComponentPreview>
      {/* Charts */}
      <ComponentPreview
        id="charts"
        title={t("charts.title", { defaultValue: "Charts (Recharts)" })}
        description={t("charts.description", { defaultValue: "Recharts integration with Endfield design tokens. Use CHART_COLORS array and endfieldChartTheme for consistent styling. Chart colors map to --chart-1 through --chart-8." })}
        code={`import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CHART_COLORS, endfieldChartTheme } from "reend-components";

<ResponsiveContainer width="100%" height={200}>
  <BarChart data={data}>
    <XAxis dataKey="name" {...endfieldChartTheme} />
    <YAxis {...endfieldChartTheme} />
    <Bar dataKey="value" fill={CHART_COLORS[0]} />
  </BarChart>
</ResponsiveContainer>`}
      >
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">&#9670; CHART COLOR PALETTE</p>
            <div className="flex flex-wrap gap-2">
              {[
                { token: "--chart-1", hex: "#FFD429", label: "Series 1" },
                { token: "--chart-2", hex: "#00E5FF", label: "Series 2" },
                { token: "--chart-3", hex: "#A55EEA", label: "Series 3" },
                { token: "--chart-4", hex: "#2ED573", label: "Series 4" },
                { token: "--chart-5", hex: "#FFA502", label: "Series 5" },
                { token: "--chart-6", hex: "#4DA8DA", label: "Series 6" },
                { token: "--chart-7", hex: "#FF4757", label: "Series 7" },
                { token: "--chart-8", hex: "#7EC8E3", label: "Series 8" },
              ].map(({ token, hex, label }) => (
                <div key={token} className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <div className="w-3 h-3 border border-white/10" style={{ backgroundColor: hex }} />
                  <span className="text-foreground/40">{label}</span>
                  <span>{token}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">&#9670; LIVE DEMO — BAR CHART</p>
            <ChartDemo />
          </div>
          <p className="text-xs text-muted-foreground">
            Install recharts as a peer dep: <code className="font-mono text-primary">npm install recharts</code>.
            Import <code className="font-mono text-primary">CHART_COLORS</code>, <code className="font-mono text-primary">endfieldChartTheme</code>, and chart components from <code className="font-mono text-primary">reend-components</code>.
          </p>
        </div>
      </ComponentPreview>

      <SignatureDataSection />
    </>
  );
}
