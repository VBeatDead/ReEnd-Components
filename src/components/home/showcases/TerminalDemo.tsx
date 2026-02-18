import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TerminalDemo = () => {
  const { t } = useTranslation("home");
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const msgs = [
      "$ npm install reend-components",
      t("showcase.terminal.step_1"),
      t("showcase.terminal.step_2"),
      t("showcase.terminal.step_3"),
      t("showcase.terminal.step_4"),
      t("showcase.terminal.done_1"),
      t("showcase.terminal.done_2"),
      t("showcase.terminal.done_3"),
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
  }, [t]);

  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-0">
        <Terminal className="w-3 h-3 text-primary" />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
          {t("showcase.terminal.title")}
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
