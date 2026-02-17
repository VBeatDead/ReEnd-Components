import { useState, useMemo, useEffect, useRef } from "react";
import { getSidebarData } from "./sidebarData";
import { Search, X } from "lucide-react";
import { HighlightText } from "./HighlightText";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface DocsSidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export const DocsSidebar = ({ activeId, onNavigate }: DocsSidebarProps) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);
  const { t } = useTranslation(["common", "docs"]);
  const lp = useLocalizedPath();

  const sidebarData = useMemo(() => getSidebarData((key, opts) => t(key, { ns: "docs", ...opts })), [t]);

  // Derive active slug from current path
  const activeSlug = useMemo(() => {
    const match = location.pathname.match(/(?:\/(?:en|id))?\/docs\/(.+?)(?:\/|$)/);
    return match?.[1] ?? null;
  }, [location.pathname]);

  // Auto-scroll sidebar to keep active item visible
  useEffect(() => {
    if (!activeId || !sidebarRef.current) return;

    // Small delay to ensure DOM is updated after potential section expand
    const timer = setTimeout(() => {
      const activeEl = sidebarRef.current?.querySelector(
        `[data-sidebar-id="${activeId}"]`,
      );
      if (activeEl) {
        const sidebar = sidebarRef.current!;
        const elRect = activeEl.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();

        // Only scroll if the active item is outside the visible area of the sidebar
        const isAbove = elRect.top < sidebarRect.top + 60; // 60px buffer for search
        const isBelow = elRect.bottom > sidebarRect.bottom - 20;

        if (isAbove || isBelow) {
          activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeId]);

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return sidebarData;
    const q = searchQuery.toLowerCase();
    return sidebarData
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  return (
    <aside
      ref={sidebarRef}
      className="fixed top-[64px] left-0 bottom-0 w-[280px] bg-surface-0 border-r border-border overflow-y-auto py-4 px-4 hidden lg:block z-10"
      aria-label={t("common:aria.doc_sidebar")}
    >
      {/* Search filter */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("common:search.filter_placeholder")}
          className="w-full bg-surface-1 border border-border text-sm text-foreground pl-9 pr-8 py-2 outline-none placeholder:text-muted-foreground focus:border-primary/30 transition-colors font-body"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={t("common:actions.clear_filter")}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <nav role="tree" aria-label={t("common:aria.doc_sections")}>
        {filteredData.map((section) => {
          const isSectionActive = activeSlug === section.slug;
          return (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => {
                  if (isSectionActive) {
                    toggle(section.title);
                  } else {
                    navigate(lp(`/docs/${section.slug}`));
                  }
                }}
                className={`w-full flex items-center justify-between py-2 px-2 group ${
                  isSectionActive ? "bg-primary/5" : ""
                }`}
                role="treeitem"
                aria-expanded={!collapsed[section.title]}
              >
                <span
                  className={`font-display text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                    isSectionActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {section.title}
                </span>
                <span className="font-mono text-primary text-sm">
                  {collapsed[section.title] ? "+" : "−"}
                </span>
              </button>
              {!collapsed[section.title] && (
                <ul role="group" className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.id} role="treeitem">
                      <button
                        onClick={() => onNavigate(item.id)}
                        data-sidebar-id={item.id}
                        className={`w-full text-left text-sm py-1.5 px-3 transition-all border-l-2 flex items-center gap-1.5 ${
                          activeId === item.id
                            ? "text-primary border-primary font-semibold"
                            : "text-muted-foreground border-transparent hover:text-card-foreground hover:border-muted-foreground/30"
                        }`}
                      >
                        <HighlightText text={item.label} query={searchQuery} />
                        {item.signature && (
                          <span
                            className="text-primary text-[9px] leading-none opacity-60"
                            title={t("common:section_meta.signature")}
                          >
                            ◆
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        {filteredData.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            {t("common:search.no_results")}
          </p>
        )}
      </nav>
    </aside>
  );
};
