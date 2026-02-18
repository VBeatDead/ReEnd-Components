import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const DEFAULT_MESSAGES = [
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

export interface DataStreamProps {
  messages?: string[];
  className?: string;
}

export const DataStream = React.forwardRef<HTMLDivElement, DataStreamProps>(
  ({ messages = DEFAULT_MESSAGES, className }, ref) => {
    const [lines, setLines] = React.useState<string[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setLines((prev) => {
          const next = [...prev, messages[i % messages.length]];
          return next.length > 8 ? next.slice(-8) : next;
        });
        i++;
      }, 1200);
      return () => clearInterval(interval);
    }, [messages]);

    React.useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [lines]);

    return (
      <div
        ref={ref}
        className={`border border-border bg-background clip-corner overflow-hidden${className ? ` ${className}` : ""}`}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-0">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            LIVE FEED
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 bg-ef-green animate-pulse"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
            <span className="font-mono text-[10px] text-ef-green">ACTIVE</span>
          </div>
        </div>
        <div
          ref={containerRef}
          className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1"
        >
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line.includes("[SEC]")
                    ? "text-ef-green"
                    : line.includes("[NET]")
                      ? "text-ef-blue"
                      : line.includes("[DAT]")
                        ? "text-ef-cyan"
                        : line.includes("[GPU]")
                          ? "text-ef-purple"
                          : "text-muted-foreground"
                }
              >
                {line}
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
