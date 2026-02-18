import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FormShowcase = () => {
  const { t } = useTranslation("home");
  const [inputVal, setInputVal] = useState("ReEnd");
  const [showPw, setShowPw] = useState(false);
  const [toggled, setToggled] = useState(true);

  return (
    <div className="space-y-5">
      <div>
        <label className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2">
          {t("showcase.form.operator_name")}
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-surface-0 border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] outline-none transition-all"
            placeholder={t("showcase.form.enter_name")}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-muted-foreground/40" />
          </div>
        </div>
      </div>
      <div>
        <label className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2">
          {t("showcase.form.access_code")}{" "}
          <span className="text-ef-red">*</span>
        </label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            defaultValue="Endfield2026"
            className="w-full bg-surface-0 border border-ef-green px-4 py-3 font-body text-sm text-foreground shadow-[0_0_0_3px_hsl(var(--ef-green)/0.1)] outline-none transition-all"
          />
          <button
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="font-mono text-[10px] text-ef-green mt-1.5 flex items-center gap-1">
          <span style={{ fontSize: "6px" }}>◆</span>{" "}
          {t("showcase.form.verified")}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setToggled(!toggled)}
            className={`relative w-11 h-6 transition-colors duration-300 ${toggled ? "bg-primary" : "bg-surface-3"}`}
          >
            <motion.div
              animate={{ x: toggled ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-background shadow-sm"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </button>
          <span className="font-display text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
            {toggled ? t("showcase.form.enabled") : t("showcase.form.disabled")}
          </span>
        </div>
        <div className="flex-1">
          <div className="relative">
            <select className="w-full bg-surface-0 border border-border px-4 py-2.5 font-body text-sm text-foreground outline-none appearance-none cursor-pointer hover:border-primary/50 transition-colors">
              <option>{t("showcase.form.alpha")}</option>
              <option>{t("showcase.form.beta")}</option>
              <option>{t("showcase.form.gamma")}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
