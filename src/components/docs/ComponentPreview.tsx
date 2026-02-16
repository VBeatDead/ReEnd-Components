import { ReactNode, useState, useMemo, useRef, useEffect } from "react";
import {
  RotateCcw,
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import PlaygroundControlField from "./PlaygroundControlField";
import PropsPanel from "./PropsPanel";

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

export interface KeyboardInteraction {
  key: string;
  description: string;
}

export interface InstallGuide {
  importPath: string;
  usage: string;
  dependencies?: string[];
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
  keyboard?: KeyboardInteraction[];
  install?: InstallGuide;
  showViewport?: boolean;
  playground?: {
    controls: PlaygroundControl[];
    render: (values: Record<string, any>) => ReactNode;
    componentName?: string;
    codeTemplate?: (values: Record<string, any>) => string;
  };
}

type TabKey =
  | "preview"
  | "playground"
  | "code"
  | "props"
  | "api"
  | "keyboard"
  | "install";

export const ComponentPreview = ({
  title,
  description,
  children,
  code,
  id,
  props: propDefs,
  api,
  keyboard,
  install,
  showViewport = false,
  playground,
}: ComponentPreviewProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>(
    playground ? "playground" : "preview",
  );

  // Playground state
  const defaultValues = useMemo(
    () =>
      playground?.controls.reduce(
        (acc, c) => ({ ...acc, [c.name]: c.default }),
        {} as Record<string, any>,
      ) ?? {},
    [playground?.controls],
  );
  const [pgValues, setPgValues] = useState<Record<string, any>>(defaultValues);
  const [codeCopied, setCodeCopied] = useState(false);
  const [viewport, setViewport] = useState<"full" | "tablet" | "mobile">(
    "full",
  );
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  // Auto-generate code from playground values
  const generatedCode = useMemo(() => {
    if (!playground || !activeTab.startsWith("playground")) return "";
    if (playground.codeTemplate) return playground.codeTemplate(pgValues);
    const name =
      playground.componentName ||
      title.replace(/^\d+\.\s*/, "").replace(/\s+/g, "");
    const propsStr = playground.controls
      .filter((c) => pgValues[c.name] !== c.default)
      .map((c) => {
        const val = pgValues[c.name];
        if (c.type === "boolean") return val ? `  ${c.name}` : null;
        if (c.type === "number" || c.type === "range")
          return `  ${c.name}={${val}}`;
        return `  ${c.name}="${val}"`;
      })
      .filter(Boolean)
      .join("\n");
    const labelCtrl = playground.controls.find(
      (c) => c.name === "label" || c.name === "children" || c.name === "title",
    );
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
    { key: "keyboard", label: "Keys", available: !!keyboard?.length },
    { key: "install", label: "Install", available: !!install },
  ];

  const updatePg = (name: string, value: any) =>
    setPgValues((prev) => ({ ...prev, [name]: value }));
  const resetPg = () => setPgValues(defaultValues);

  return (
    <section id={id} className="scroll-mt-20 mb-14">
      {/* Section header */}
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold tracking-[0.02em] uppercase text-foreground mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Component showcase — tabs + content as one unit (Shadcn/MUI pattern) */}
      <div className="border border-border">
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label={`${title} tabs`}
          className="flex flex-wrap bg-surface-0 border-b border-border"
        >
          {tabs
            .filter((t) => t.available)
            .map((tab) => (
              <button
                key={tab.key}
                role="tab"
                id={`${id}-tab-${tab.key}`}
                aria-selected={activeTab === tab.key}
                aria-controls={`${id}-panel-${tab.key}`}
                tabIndex={activeTab === tab.key ? 0 : -1}
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
          <div
            role="tabpanel"
            id={`${id}-panel-playground`}
            aria-labelledby={`${id}-tab-playground`}
            className="bg-surface-1"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 sm:p-10 min-h-[220px] flex items-center justify-center">
                <div className="w-full">{playground.render(pgValues)}</div>
              </div>
              <div className="lg:w-[280px] border-t lg:border-t-0 lg:border-l border-border bg-surface-2 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
                    Controls
                  </span>
                  <button
                    onClick={resetPg}
                    className="p-1 text-muted-foreground hover:text-primary transition-colors"
                    title="Reset"
                    aria-label="Reset playground"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
                {playground.controls.map((ctrl) => (
                  <PlaygroundControlField
                    key={ctrl.name}
                    control={ctrl}
                    value={pgValues[ctrl.name]}
                    onChange={(v) => updatePg(ctrl.name, v)}
                  />
                ))}
              </div>
            </div>
            {generatedCode && (
              <div className="border-t border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-2">
                  <span className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
                    Generated Code
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      setCodeCopied(true);
                      clearTimeout(copyTimerRef.current);
                      copyTimerRef.current = setTimeout(
                        () => setCodeCopied(false),
                        2000,
                      );
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono transition-colors hover:text-primary"
                  >
                    {codeCopied ? (
                      <>
                        <Check className="w-3 h-3 text-ef-green" />
                        <span className="text-ef-green">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Copy</span>
                      </>
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
          <div
            role="tabpanel"
            id={`${id}-panel-preview`}
            aria-labelledby={`${id}-tab-preview`}
            className="bg-surface-1"
          >
            {/* Responsive viewport toggle — only when showViewport is true */}
            {showViewport && (
              <div className="flex items-center justify-end gap-1 px-4 py-2 border-b border-border bg-surface-0">
                <span className="font-ui text-[9px] tracking-[0.1em] uppercase text-muted-foreground mr-2">
                  Viewport
                </span>
                {(
                  [
                    { key: "full", icon: Monitor, label: "Desktop" },
                    { key: "tablet", icon: Tablet, label: "Tablet (768px)" },
                    {
                      key: "mobile",
                      icon: Smartphone,
                      label: "Mobile (375px)",
                    },
                  ] as const
                ).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setViewport(key)}
                    aria-label={label}
                    title={label}
                    className={`p-1.5 rounded transition-colors ${
                      viewport === key
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            )}
            {/* Responsive container */}
            <div className="flex justify-center p-6 sm:p-10">
              <div
                className="w-full transition-all duration-300 overflow-hidden"
                style={{
                  maxWidth: showViewport
                    ? viewport === "mobile"
                      ? "375px"
                      : viewport === "tablet"
                        ? "768px"
                        : "100%"
                    : "100%",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        )}

        {/* Code panel */}
        {activeTab === "code" && code && (
          <div
            role="tabpanel"
            id={`${id}-panel-code`}
            aria-labelledby={`${id}-tab-code`}
          >
            <CodeBlock code={code} />
          </div>
        )}

        {/* Props panel */}
        {activeTab === "props" && propDefs?.length && (
          <PropsPanel id={id} title={title} propDefs={propDefs} api={api} />
        )}

        {/* API panel */}
        {activeTab === "api" && api?.length && (
          <div
            role="tabpanel"
            id={`${id}-panel-api`}
            aria-labelledby={`${id}-tab-api`}
            className="bg-surface-1 p-5 sm:p-6 space-y-4"
          >
            {api.map((item) => (
              <div
                key={item.name}
                className="border border-border bg-surface-2 p-4"
              >
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="font-mono text-sm font-bold text-primary">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-ef-blue-light">
                    {item.signature}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Keyboard interaction panel */}
        {activeTab === "keyboard" && keyboard?.length && (
          <div
            role="tabpanel"
            id={`${id}-panel-keyboard`}
            aria-labelledby={`${id}-tab-keyboard`}
            className="bg-surface-1 p-5 sm:p-6"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground pb-3 pr-4 w-40">
                    Key
                  </th>
                  <th className="text-left font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground pb-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {keyboard.map((k) => (
                  <tr
                    key={k.key}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-2.5 pr-4">
                      <kbd className="font-mono text-xs bg-surface-2 border border-border px-2 py-0.5 text-primary">
                        {k.key}
                      </kbd>
                    </td>
                    <td className="py-2.5 text-xs text-muted-foreground">
                      {k.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Install panel */}
        {activeTab === "install" && install && (
          <div
            role="tabpanel"
            id={`${id}-panel-install`}
            aria-labelledby={`${id}-tab-install`}
            className="bg-surface-1 p-5 sm:p-6 space-y-5"
          >
            {/* Import */}
            <div>
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground block mb-2">
                Import
              </span>
              <CodeBlock
                code={install.importPath}
                language="tsx"
                title="Import"
              />
            </div>
            {/* Usage */}
            <div>
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground block mb-2">
                Usage
              </span>
              <CodeBlock code={install.usage} language="tsx" title="Usage" />
            </div>
            {/* Dependencies */}
            {install.dependencies?.length ? (
              <div>
                <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground block mb-2">
                  Dependencies
                </span>
                <CodeBlock
                  code={`npm install ${install.dependencies.join(" ")}`}
                  language="bash"
                  title="Install"
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};
