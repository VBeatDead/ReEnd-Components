import { useState } from "react";
import { Search, FileJson, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PropDefinition, ApiDefinition } from "./ComponentPreview";
import { useTranslation } from "react-i18next";

interface PropsPanelProps {
  id: string;
  title: string;
  propDefs: PropDefinition[];
  api?: ApiDefinition[];
}

const PropsPanel = ({ id, title, propDefs, api }: PropsPanelProps) => {
  const [propsFilter, setPropsFilter] = useState("");
  const { t } = useTranslation("common");

  const filtered = propDefs.filter(
    (p) =>
      !propsFilter ||
      p.name.toLowerCase().includes(propsFilter.toLowerCase()) ||
      p.type.toLowerCase().includes(propsFilter.toLowerCase()) ||
      p.description.toLowerCase().includes(propsFilter.toLowerCase()),
  );

  const exportJSON = () => {
    const data = {
      component: title,
      props: propDefs.map(
        ({ name, type, default: def, required, description }) => ({
          name,
          type,
          default: def ?? null,
          required: !!required,
          description,
        }),
      ),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-props.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    let md = `# ${title} — Props\n\n`;
    md += `| Prop | Type | Default | Required | Description |\n`;
    md += `|------|------|---------|----------|-------------|\n`;
    propDefs.forEach((p) => {
      md += `| \`${p.name}\` | \`${p.type}\` | ${p.default ? `\`${p.default}\`` : "—"} | ${p.required ? "✓" : "—"} | ${p.description} |\n`;
    });
    if (api?.length) {
      md += `\n## API\n\n`;
      api.forEach((a) => {
        md += `### \`${a.name}\`\n\n\`\`\`\n${a.signature}\n\`\`\`\n\n${a.description}\n\n`;
      });
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-props.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="tabpanel"
      id={`${id}-panel-props`}
      aria-labelledby={`${id}-tab-props`}
      className="bg-surface-1"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <input
          value={propsFilter}
          onChange={(e) => setPropsFilter(e.target.value)}
          placeholder={t("props_panel.filter")}
          className="bg-transparent text-sm text-foreground outline-none flex-1 placeholder:text-muted-foreground"
        />
        {propsFilter && (
          <button
            onClick={() => setPropsFilter("")}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ✕
          </button>
        )}
        <TooltipProvider delayDuration={200}>
          <div className="flex items-center gap-1 ml-2 border-l border-border pl-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={exportJSON}
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t("props_panel.export_json")}
                >
                  <FileJson className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {t("props_panel.export_json")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={exportMarkdown}
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t("props_panel.export_md")}
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {t("props_panel.export_md")}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">
                {t("props_panel.prop")}
              </th>
              <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">
                {t("props_panel.type")}
              </th>
              <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">
                {t("props_panel.default")}
              </th>
              <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">
                {t("props_panel.description")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-xs text-primary whitespace-nowrap">
                    {p.name}
                    {p.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-ef-blue-light whitespace-nowrap">
                    {p.type}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                    {p.default ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-xs text-card-foreground">
                    {p.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-6 text-center text-xs text-muted-foreground"
                >
                  {t("props_panel.no_match")} &ldquo;{propsFilter}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsPanel;
