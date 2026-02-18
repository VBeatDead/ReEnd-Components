import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSidebarData } from "./sidebarData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export const SectionNav = () => {
  const location = useLocation();
  const { t } = useTranslation(["common", "docs"]);
  const lp = useLocalizedPath();

  const sidebarData = useMemo(() => getSidebarData((key, opts) => t(key, { ns: "docs", ...opts })), [t]);

  const { prev, next } = useMemo(() => {
    const match = location.pathname.match(/(?:\/(?:en|id))?\/docs\/(.+?)(?:\/|$)/);
    const slug = match?.[1] ?? null;

    // Exclude changelog from navigation sequence
    const navSections = sidebarData.filter((s) => s.slug !== "changelog");
    const currentIndex = navSections.findIndex((s) => s.slug === slug);

    if (currentIndex === -1) return { prev: null, next: null };

    return {
      prev: currentIndex > 0 ? navSections[currentIndex - 1] : null,
      next:
        currentIndex < navSections.length - 1
          ? navSections[currentIndex + 1]
          : null,
    };
  }, [location.pathname, sidebarData]);

  if (!prev && !next) return null;

  return (
    <nav
      aria-label={t("common:aria.section_nav")}
      className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          to={lp(`/docs/${prev.slug}`)}
          className="group flex items-center gap-3 p-4 bg-surface-1 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          <div className="min-w-0">
            <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
              {t("common:actions.previous")}
            </span>
            <span className="block font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground group-hover:text-primary transition-colors truncate">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={lp(`/docs/${next.slug}`)}
          className="group flex items-center justify-end gap-3 p-4 bg-surface-1 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-right"
        >
          <div className="min-w-0">
            <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
              {t("common:actions.next")}
            </span>
            <span className="block font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground group-hover:text-primary transition-colors truncate">
              {next.title}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};
