import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function HUDOverlay({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation("signature");
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative border border-border bg-surface-0 aspect-video flex items-center justify-center overflow-hidden">
      {/* Scanline */}
      <div className="absolute inset-0 scanline-overlay" />
      {/* Corner brackets large */}
      {[
        "top-3 left-3 border-t-2 border-l-2",
        "top-3 right-3 border-t-2 border-r-2",
        "bottom-3 left-3 border-b-2 border-l-2",
        "bottom-3 right-3 border-b-2 border-r-2",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute w-8 h-8 ${pos} border-primary/40 pointer-events-none`}
        />
      ))}
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-6 h-px bg-primary/20"
          style={{ position: "absolute", top: "50%", left: "-12px" }}
        />
        <div
          className="h-6 w-px bg-primary/20"
          style={{ position: "absolute", left: "50%", top: "-12px" }}
        />
      </div>
      {/* Top-left info */}
      <div className="absolute top-4 left-12 font-mono text-[9px] text-muted-foreground/60 space-y-0.5">
        <div>{t("hud.system_label")}</div>
        <div className="text-primary/60">{time}</div>
      </div>
      {/* Top-right info */}
      <div className="absolute top-4 right-12 font-mono text-[9px] text-muted-foreground/60 text-right space-y-0.5">
        <div>{t("hud.lat")}</div>
        <div>{t("hud.lon")}</div>
      </div>
      {/* Bottom status bar */}
      <div className="absolute bottom-4 left-12 right-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 bg-ef-green"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <span className="font-mono text-[9px] text-ef-green/80">
            {t("hud.link_active")}
          </span>
        </div>
        <div className="flex gap-4">
          {[t("hud.fps"), t("hud.mem"), t("hud.net")].map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] text-muted-foreground/50"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HUDOverlay;
