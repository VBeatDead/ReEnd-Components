import { ReactNode, useState, useMemo } from "react";
import { Search, FileJson, FileText, RotateCcw, Copy, Check } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ApiDefinition {
  name: string;
  signature: string;
  description: string;
}

export interface PlaygroundControl {
  name: string;
  label?: string;
  type: "select" | "boolean" | "text" | "number" | "color" | "range";
  options?: string[];
  default: any;
  min?: number;
  max?: number;
  step?: number;
}

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
  id: string;
  props?: PropDefinition[];
  api?: ApiDefinition[];
  playground?: {
    controls: PlaygroundControl[];
    render: (values: Record<string, any>) => ReactNode;
    componentName?: string;
    codeTemplate?: (values: Record<string, any>) => string;
  };
}

type TabKey = "preview" | "playground" | "code" | "props" | "api";

export const ComponentPreview = ({ title, description, children, code, id, props: propDefs, api, playground }: ComponentPreviewProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>(playground ? "playground" : "preview");
  const [propsFilter, setPropsFilter] = useState("");

  // Playground state
  const defaultValues = playground?.controls.reduce((acc, c) => ({ ...acc, [c.name]: c.default }), {} as Record<string, any>) ?? {};
  const [pgValues, setPgValues] = useState<Record<string, any>>(defaultValues);
  const [codeCopied, setCodeCopied] = useState(false);

  // Auto-generate code from playground values
  const generatedCode = useMemo(() => {
    if (!playground || !activeTab.startsWith("playground")) return "";
    if (playground.codeTemplate) return playground.codeTemplate(pgValues);
    const name = playground.componentName || title.replace(/^\d+\.\s*/, "").replace(/\s+/g, "");
    const propsStr = playground.controls
      .filter(c => pgValues[c.name] !== c.default)
      .map(c => {
        const val = pgValues[c.name];
        if (c.type === "boolean") return val ? `  ${c.name}` : null;
        if (c.type === "number" || c.type === "range") return `  ${c.name}={${val}}`;
        return `  ${c.name}="${val}"`;
      })
      .filter(Boolean)
      .join("\n");
    const labelCtrl = playground.controls.find(c => c.name === "label" || c.name === "children" || c.name === "title");
    const childText = labelCtrl ? pgValues[labelCtrl.name] : name;
    if (propsStr) return `<${name}\n${propsStr}\n>\n  ${childText}\n</${name}>`;
    return `<${name}>${childText}</${name}>`;
  }, [pgValues, playground, activeTab, title]);

  const tabs: { key: TabKey; label: string; available: boolean }[] = [
    { key: "playground", label: "Playground", available: !!playground },
    { key: "preview", label: "Preview", available: true },
    { key: "code", label: "Code", available: !!code },
    { key: "props", label: "Props", available: !!propDefs?.length },
    { key: "api", label: "API", available: !!api?.length },
  ];

  const updatePg = (name: string, value: any) => setPgValues(prev => ({ ...prev, [name]: value }));
  const resetPg = () => setPgValues(defaultValues);

  return (
    <section id={id} className="scroll-mt-20 mb-14">
      {/* Section header */}
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold tracking-[0.02em] uppercase text-foreground mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>

      {/* Component showcase — tabs + content as one unit (Shadcn/MUI pattern) */}
      <div className="border border-border">
        {/* Tab bar */}
        <div className="flex flex-wrap bg-surface-0 border-b border-border">
          {tabs.filter(t => t.available).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative font-display text-[11px] font-bold tracking-[0.08em] uppercase px-4 sm:px-5 py-3 transition-colors bg-transparent whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Playground panel */}
        {activeTab === "playground" && playground && (
          <div className="bg-surface-1">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 sm:p-10 min-h-[220px] flex items-center justify-center">
                <div className="w-full">{playground.render(pgValues)}</div>
              </div>
              <div className="lg:w-[280px] border-t lg:border-t-0 lg:border-l border-border bg-surface-2 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">Controls</span>
                  <button onClick={resetPg} className="p-1 text-muted-foreground hover:text-primary transition-colors" title="Reset">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
                {playground.controls.map((ctrl) => (
                  <PlaygroundControlField key={ctrl.name} control={ctrl} value={pgValues[ctrl.name]} onChange={(v) => updatePg(ctrl.name, v)} />
                ))}
              </div>
            </div>
            {generatedCode && (
              <div className="border-t border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-2">
                  <span className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">Generated Code</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      setCodeCopied(true);
                      setTimeout(() => setCodeCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono transition-colors hover:text-primary"
                  >
                    {codeCopied ? (
                      <><Check className="w-3 h-3 text-ef-green" /><span className="text-ef-green">Copied!</span></>
                    ) : (
                      <><Copy className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">Copy</span></>
                    )}
                  </button>
                </div>
                <pre className="px-4 py-3 font-mono text-xs text-card-foreground bg-surface-0 leading-relaxed whitespace-pre-wrap break-words">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Preview panel */}
        {activeTab === "preview" && (
          <div className="bg-surface-1 p-6 sm:p-10">
            {children}
          </div>
        )}

        {/* Code panel */}
        {activeTab === "code" && code && (
          <CodeBlock code={code} />
        )}

        {/* Props panel */}
        {activeTab === "props" && propDefs?.length && (() => {
          const filtered = propDefs.filter(p =>
            !propsFilter ||
            p.name.toLowerCase().includes(propsFilter.toLowerCase()) ||
            p.type.toLowerCase().includes(propsFilter.toLowerCase()) ||
            p.description.toLowerCase().includes(propsFilter.toLowerCase())
          );

          const exportJSON = () => {
            const data = { component: title, props: propDefs.map(({ name, type, default: def, required, description }) => ({ name, type, default: def ?? null, required: !!required, description })) };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = `${id}-props.json`; a.click();
            URL.revokeObjectURL(url);
          };

          const exportMarkdown = () => {
            let md = `# ${title} — Props\n\n`;
            md += `| Prop | Type | Default | Required | Description |\n`;
            md += `|------|------|---------|----------|-------------|\n`;
            propDefs.forEach(p => {
              md += `| \`${p.name}\` | \`${p.type}\` | ${p.default ? `\`${p.default}\`` : "—"} | ${p.required ? "✓" : "—"} | ${p.description} |\n`;
            });
            if (api?.length) {
              md += `\n## API\n\n`;
              api.forEach(a => { md += `### \`${a.name}\`\n\n\`\`\`\n${a.signature}\n\`\`\`\n\n${a.description}\n\n`; });
            }
            const blob = new Blob([md], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = `${id}-props.md`; a.click();
            URL.revokeObjectURL(url);
          };

          return (
            <div className="bg-surface-1">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input
                  value={propsFilter}
                  onChange={(e) => setPropsFilter(e.target.value)}
                  placeholder="Filter props..."
                  className="bg-transparent text-sm text-foreground outline-none flex-1 placeholder:text-muted-foreground"
                />
                {propsFilter && (
                  <button onClick={() => setPropsFilter("")} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
                )}
                <TooltipProvider delayDuration={200}>
                  <div className="flex items-center gap-1 ml-2 border-l border-border pl-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={exportJSON} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <FileJson className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">Export as JSON</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={exportMarkdown} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">Export as Markdown</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-2">
                      <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">Prop</th>
                      <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">Type</th>
                      <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">Default</th>
                      <th className="text-left font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground px-5 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length ? filtered.map((p) => (
                      <tr key={p.name} className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-primary whitespace-nowrap">
                          {p.name}{p.required && <span className="text-destructive ml-1">*</span>}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-ef-blue-light whitespace-nowrap">{p.type}</td>
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.default ?? "—"}</td>
                        <td className="px-5 py-3 text-xs text-card-foreground">{p.description}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-5 py-6 text-center text-xs text-muted-foreground">No props matching "{propsFilter}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* API panel */}
        {activeTab === "api" && api?.length && (
          <div className="bg-surface-1 p-5 sm:p-6 space-y-4">
            {api.map((item) => (
              <div key={item.name} className="border border-border bg-surface-2 p-4">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="font-mono text-sm font-bold text-primary">{item.name}</span>
                  <span className="font-mono text-xs text-ef-blue-light">{item.signature}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Individual control field renderer
const PlaygroundControlField = ({ control, value, onChange }: { control: PlaygroundControl; value: any; onChange: (v: any) => void }) => {
  const label = control.label ?? control.name;

  if (control.type === "boolean") {
    return (
      <label className="flex items-center justify-between gap-2 cursor-pointer group">
        <span className="text-xs text-card-foreground">{label}</span>
        <button
          onClick={() => onChange(!value)}
          className={`w-9 h-5 rounded-full relative transition-colors ${value ? "bg-primary" : "bg-surface-3 border border-border"}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${value ? "left-[18px]" : "left-0.5"}`} />
        </button>
      </label>
    );
  }

  if (control.type === "select" && control.options) {
    return (
      <div className="space-y-1.5">
        <span className="text-xs text-card-foreground">{label}</span>
        <div className="flex flex-wrap gap-1">
          {control.options.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                value === opt
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (control.type === "text") {
    return (
      <div className="space-y-1.5">
        <span className="text-xs text-card-foreground">{label}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={100}
          className="w-full bg-surface-1 border border-border text-sm text-foreground px-3 py-1.5 outline-none focus:border-primary transition-colors"
        />
      </div>
    );
  }

  if (control.type === "number" || control.type === "range") {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-card-foreground">{label}</span>
          <span className="font-mono text-[11px] text-primary">{value}</span>
        </div>
        <input
          type="range"
          value={value}
          min={control.min ?? 0}
          max={control.max ?? 100}
          step={control.step ?? 1}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-primary h-1"
        />
      </div>
    );
  }

  if (control.type === "color") {
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs text-card-foreground">{label}</span>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-6 border border-border cursor-pointer" />
      </div>
    );
  }

  return null;
};
