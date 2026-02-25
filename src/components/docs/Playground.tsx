import { useState, useMemo, useRef } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { RotateCcw, Share2, Check, X } from "lucide-react";
import { cn } from "@/components/ui";

/* ── Endfield dark theme for Sandpack ─────────────────────────────────────── */

const ENDFIELD_THEME = {
  colors: {
    surface1: "#0d0d0e",
    surface2: "#141416",
    surface3: "#1e1e21",
    clickable: "#8b8b8d",
    base: "#f0f0f2",
    disabled: "#4a4a4c",
    hover: "#FFD429",
    accent: "#FFD429",
    error: "#ef4444",
    errorSurface: "#1a0505",
  },
  syntax: {
    plain: "#f0f0f2",
    comment: { color: "#5a5a5c", fontStyle: "italic" as const },
    keyword: "#FFD429",
    tag: "#79b8ff",
    punctuation: "#8b8b8d",
    definition: "#85e89d",
    property: "#79b8ff",
    static: "#9ecbff",
    string: "#85e89d",
  },
  font: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "ui-monospace, 'JetBrains Mono', 'Fira Code', monospace",
    size: "13px",
    lineHeight: "1.6",
  },
};

/* ── Default starter code ─────────────────────────────────────────────────── */

const DEFAULT_CODE = `import { Button, Badge } from "reend-components";
import "reend-components/styles.css";

export default function App() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "#0d0d0e",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button>PRIMARY</Button>
        <Button variant="secondary">SECONDARY</Button>
        <Button variant="ghost">GHOST</Button>
        <Button variant="outline">OUTLINE</Button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Badge>DEFAULT</Badge>
        <Badge variant="secondary">SECONDARY</Badge>
        <Badge variant="outline">OUTLINE</Badge>
        <Badge variant="destructive">DESTRUCTIVE</Badge>
      </div>
    </div>
  );
}`;

const SANDPACK_DEPS = {
  "reend-components": "latest",
  tailwindcss: "^3.4.0",
};

/* ── Inner component (needs useSandpack inside SandpackProvider) ──────────── */

interface PlaygroundInnerProps {
  defaultCode: string;
  title?: string;
  onClose?: () => void;
}

function PlaygroundInner({
  defaultCode,
  title,
  onClose,
}: PlaygroundInnerProps) {
  const { sandpack } = useSandpack();
  const [shareCopied, setShareCopied] = useState(false);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleShare = () => {
    const currentCode = sandpack.files["/App.tsx"]?.code ?? defaultCode;
    const encoded = btoa(encodeURIComponent(currentCode));
    const shareUrl = `${window.location.origin}${window.location.pathname}?pg=${encoded}`;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setShareCopied(true);
    clearTimeout(shareTimerRef.current);
    shareTimerRef.current = setTimeout(() => setShareCopied(false), 2000);
  };

  const handleReset = () => {
    sandpack.updateFile("/App.tsx", defaultCode);
  };

  return (
    <div className="border border-border bg-surface-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-1">
        <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-primary">
          ◆ {title ? `${title} — PLAYGROUND` : "PLAYGROUND"}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.1em] uppercase border transition-colors",
              shareCopied
                ? "border-ef-green text-ef-green bg-ef-green/10"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
            )}
            title="Copy share URL"
          >
            {shareCopied ? (
              <>
                <Check className="w-3 h-3" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span>SHARE</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.1em] uppercase border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            title="Reset to default code"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-1 p-1.5 text-muted-foreground hover:text-primary transition-colors"
              title="Close playground"
              aria-label="Close playground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sandpack editor + preview */}
      <SandpackLayout style={{ borderRadius: 0, border: "none" }}>
        <SandpackCodeEditor
          showLineNumbers
          showTabs
          closableTabs={false}
          style={{ height: 420 }}
        />
        <SandpackPreview
          showNavigator={false}
          showOpenInCodeSandbox
          style={{ height: 420 }}
        />
      </SandpackLayout>
    </div>
  );
}

/* ── Public Playground component ──────────────────────────────────────────── */

export interface PlaygroundProps {
  code?: string;
  title?: string;
  onClose?: () => void;
  className?: string;
}

/**
 * Sandpack-powered live code editor embedded in the docs site.
 * Supports share URL via `?pg=<btoa-encoded-code>` param.
 *
 * Lazy-load this component to keep the initial bundle small:
 * ```tsx
 * const Playground = lazy(() => import('./Playground').then(m => ({ default: m.Playground })));
 * ```
 */
export function Playground({
  code,
  title,
  onClose,
  className,
}: PlaygroundProps) {
  const initialCode = useMemo(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("pg");
      if (param) return decodeURIComponent(atob(param));
    } catch {
      // Ignore invalid base64
    }
    return code ?? DEFAULT_CODE;
  }, [code]);

  return (
    <div className={cn("w-full", className)}>
      <SandpackProvider
        template="react-ts"
        theme={ENDFIELD_THEME}
        files={{
          "/App.tsx": {
            code: initialCode,
            active: true,
          },
        }}
        customSetup={{
          dependencies: SANDPACK_DEPS,
          entry: "/index.tsx",
        }}
        options={{
          externalResources: [],
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <PlaygroundInner
          defaultCode={initialCode}
          title={title}
          onClose={onClose}
        />
      </SandpackProvider>
    </div>
  );
}

export default Playground;
