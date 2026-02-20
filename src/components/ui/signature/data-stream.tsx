import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Speed map ───────────────────────────────────────────────────────────── */

const SPEED_INTERVALS: Record<number, number> = {
  1: 2000,
  2: 1500,
  3: 1000,
  4: 600,
  5: 300,
};

/* ── Message type config ─────────────────────────────────────────────────── */

type MessageColorMode = "mono" | "classified" | "transmission";

const STREAM_COLOR_OVERRIDES: Record<MessageColorMode, string> = {
  mono: "text-muted-foreground",
  classified: "text-primary",
  transmission: "text-ef-cyan",
};

const MSG_TYPE_COLORS: Record<string, string> = {
  system: "text-muted-foreground",
  data: "text-ef-cyan",
  warning: "text-ef-orange",
  classified: "text-primary",
};

/* ── Types ───────────────────────────────────────────────────────────────── */

export type DataStreamMessage =
  | string
  | { text: string; type?: "system" | "data" | "warning" | "classified" };

/* ── Defaults ────────────────────────────────────────────────────────────── */

const DEFAULT_MESSAGES: DataStreamMessage[] = [
  "[SYS] Initializing ENDFIELD protocol...",
  "[NET] Connection established — latency: 12ms",
  "[SEC] Authentication verified ◆ Level: ALPHA",
  "[DAT] Loading design tokens: 94 variables mapped",
  "[GPU] Render pipeline: Optimized (60fps locked)",
  "[SYS] Component registry: 70 modules online",
  "[NET] Sync complete — all nodes operational",
  "[DAT] Color system: HSL-based, 9 neutrals, 9 accents",
  "[SEC] Encryption: AES-256 ◆ Status: ACTIVE",
  "[SYS] ENDFIELD DESIGN SYSTEM v2.0 ◆ READY",
];

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface DataStreamProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  messages?: DataStreamMessage[];
  speed?: 1 | 2 | 3 | 4 | 5;
  messageType?: MessageColorMode;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function msgText(m: DataStreamMessage): string {
  return typeof m === "string" ? m : m.text;
}

function msgColor(m: DataStreamMessage, override?: MessageColorMode): string {
  if (override) return STREAM_COLOR_OVERRIDES[override];

  if (typeof m !== "string" && m.type) {
    return MSG_TYPE_COLORS[m.type] ?? "text-muted-foreground";
  }

  const txt = typeof m === "string" ? m : m.text;
  if (txt.includes("[SEC]")) return "text-ef-green";
  if (txt.includes("[NET]")) return "text-ef-blue";
  if (txt.includes("[DAT]")) return "text-ef-cyan";
  if (txt.includes("[GPU]")) return "text-ef-purple";
  return "text-muted-foreground";
}

/* ── Component ───────────────────────────────────────────────────────────── */

const DataStream = React.forwardRef<HTMLDivElement, DataStreamProps>(
  (
    {
      messages = DEFAULT_MESSAGES,
      speed = 3,
      messageType,
      className,
      ...props
    },
    ref,
  ) => {
    const intervalMs = SPEED_INTERVALS[speed] ?? SPEED_INTERVALS[3];

    const [lines, setLines] = React.useState<DataStreamMessage[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      let i = 0;
      const id = setInterval(() => {
        setLines((prev) => {
          const next = [...prev, messages[i % messages.length]];
          return next.length > 8 ? next.slice(-8) : next;
        });
        i++;
      }, intervalMs);
      return () => clearInterval(id);
    }, [messages, intervalMs]);

    React.useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [lines]);

    return (
      <div
        ref={ref}
        className={cn(
          "border border-border bg-background clip-corner overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-0">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            LIVE FEED
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 bg-ef-green animate-pulse"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            <span className="font-mono text-[10px] text-ef-green">ACTIVE</span>
          </div>
        </div>

        {/* Stream body */}
        <div
          ref={containerRef}
          className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1"
        >
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={`${msgText(line)}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={msgColor(line, messageType)}
              >
                {msgText(line)}
              </motion.div>
            ))}
          </AnimatePresence>
          <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
        </div>
      </div>
    );
  },
);
DataStream.displayName = "DataStream";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { DataStream };
