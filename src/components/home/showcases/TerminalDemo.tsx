import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export const TerminalDemo = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const msgs = [
      "$ npm install reend-components",
      "[1/4] Resolving packages...",
      "[2/4] Fetching packages...",
      "[3/4] Linking dependencies...",
      "[4/4] Building fresh packages...",
      "✓ Installed 70+ components",
      "✓ Design tokens loaded",
      "✓ Ready to use",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < msgs.length) {
        const msg = msgs[i];
        setLines((prev) => [...prev, msg]);
        i++;
      } else {
        i = 0;
        setLines([]);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-0">
        <Terminal className="w-3 h-3 text-primary" />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
          TERMINAL
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-2 h-2 bg-ef-red/60"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <div
            className="w-2 h-2 bg-ef-yellow/60"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <div
            className="w-2 h-2 bg-ef-green/60"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        </div>
      </div>
      <div className="p-4 h-[180px] overflow-hidden font-mono text-[11px] space-y-0.5">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.startsWith("$")
                  ? "text-primary"
                  : line.startsWith("✓")
                    ? "text-ef-green"
                    : "text-muted-foreground"
              }
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-1.5 h-3 bg-primary animate-cursor-blink" />
      </div>
    </div>
  );
};
