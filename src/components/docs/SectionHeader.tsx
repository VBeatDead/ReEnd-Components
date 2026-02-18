import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSidebarData } from "./sidebarData";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface SectionHeaderProps {
  onNavigate: (id: string) => void;
}

export const SectionHeader = ({ onNavigate }: SectionHeaderProps) => {
  const location = useLocation();
  const { t } = useTranslation(["common", "docs"]);
  const lp = useLocalizedPath();

  const sidebarData = useMemo(
    () => getSidebarData((key, opts) => t(key, { ns: "docs", ...opts })),
    [t],
  );

  const section = useMemo(() => {
    const match = location.pathname.match(
      /(?:\/(?:en|id))?\/docs\/(.+?)(?:\/|$)/,
    );
    const slug = match?.[1] ?? null;
    return sidebarData.find((s) => s.slug === slug) ?? null;
  }, [location.pathname, sidebarData]);

  if (!section) return null;

  const signatureCount = section.items.filter((i) => i.signature).length;

  return (
    <div className="mb-10">
      {/* Breadcrumb */}
      <nav
        aria-label={t("common:breadcrumb.docs")}
        className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground mb-4"
      >
        <Link
          to={lp("/docs")}
          className="hover:text-primary transition-colors uppercase tracking-[0.1em]"
        >
          {t("common:nav.docs")}
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground uppercase tracking-[0.1em]">
          {section.title}
        </span>
      </nav>

      {/* Title + meta */}
      <div className="mb-4">
        <h1 className="font-display text-xl md:text-2xl font-bold tracking-[0.08em] uppercase text-foreground">
          ◆ {section.title}
        </h1>
        <p className="font-body text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          {section.description}
        </p>
        <div className="flex items-center gap-4 mt-3 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
          <span>
            {section.items.length}{" "}
            {section.items.length !== 1
              ? t("common:section_meta.components")
              : t("common:section_meta.component")}
          </span>
          {signatureCount > 0 && (
            <>
              <span className="text-border">|</span>
              <span className="text-primary">
                ◆ {signatureCount} {t("common:section_meta.signature")}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="h-px bg-border mb-6" />

      {/* Quick-jump pills */}
      <div className="flex flex-wrap gap-2">
        {section.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-1 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          >
            {item.signature && (
              <span className="text-primary text-[9px] opacity-60 group-hover:opacity-100">
                ◆
              </span>
            )}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
