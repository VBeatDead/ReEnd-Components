import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getSidebarData } from "@/components/docs/sidebarData";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const DocsOverview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "docs"]);
  const lp = useLocalizedPath();

  const sidebarData = useMemo(() => getSidebarData((key, opts) => t(key, { ns: "docs", ...opts })), [t]);

  // Exclude changelog from grid cards
  const sections = sidebarData.filter((s) => s.slug !== "changelog");
  const changelogSection = sidebarData.find((s) => s.slug === "changelog");

  return (
    <>
      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">
            {t("docs:overview.badge")}
          </span>
          <span className="font-mono text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 tracking-wider">
            {t("docs:overview.version")}
          </span>
        </div>
        <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-[0.04em] uppercase text-foreground mt-2 mb-4">
          {t("docs:overview.title_prefix")} <span className="text-primary">{t("docs:overview.title_accent")}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("docs:overview.subtitle")}
        </p>
        <div className="gradient-line-h mt-8 opacity-50" />
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const signatureCount = section.items.filter(
            (i) => i.signature,
          ).length;
          return (
            <button
              key={section.slug}
              onClick={() => navigate(lp(`/docs/${section.slug}`))}
              className="group text-left border border-border bg-surface-1 p-5 hover:border-primary/40 hover:bg-surface-2 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-xs">◆</span>
                <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {section.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t("docs:overview.items_count", { count: section.items.length })}
                </span>
                {signatureCount > 0 && (
                  <span className="font-mono text-[10px] text-primary/60">
                    {t("docs:overview.signature_count", { count: signatureCount })}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Changelog link */}
      <div className="mt-8">
        <button
          onClick={() => navigate(lp("/docs/changelog"))}
          className="text-left border border-border bg-surface-1 p-5 hover:border-primary/40 hover:bg-surface-2 transition-all duration-200 w-full"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary text-xs">◆</span>
            <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-foreground">
              {changelogSection?.title ?? t("docs:sidebar.sections.changelog.title")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {changelogSection?.description ?? t("docs:overview.changelog_description")}
          </p>
        </button>
      </div>
    </>
  );
};

export default DocsOverview;
