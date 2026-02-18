import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { getSidebarData } from "./sidebarData";
import { CommandPalette } from "./CommandPalette";
import { useTheme } from "./ThemeProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { TopoBg } from "@/components/home/signature";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface DocsHeaderProps {
  onNavigate: (id: string) => void;
  activeId?: string;
}

export const DocsHeader = ({ onNavigate, activeId }: DocsHeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileFilter, setMobileFilter] = useState("");
  const { t } = useTranslation(["common", "docs"]);
  const lp = useLocalizedPath();

  const sidebarData = useMemo(() => getSidebarData((key, opts) => t(key, { ns: "docs", ...opts })), [t]);

  // Track which sidebar sections are collapsed (by section title)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Derive active slug from path
  const activeSlug = useMemo(() => {
    const match = location.pathname.match(/(?:\/(?:en|id))?\/docs\/(.+?)(?:\/|$)/);
    return match?.[1] ?? null;
  }, [location.pathname]);

  // Auto-expand section containing activeId
  const activeSectionTitle = useMemo(() => {
    if (!activeSlug) return null;
    const section = sidebarData.find((s) => s.slug === activeSlug);
    return section?.title ?? null;
  }, [activeSlug]);

  useEffect(() => {
    if (activeSectionTitle) {
      setCollapsed((prev) => ({ ...prev, [activeSectionTitle]: false }));
    }
  }, [activeSectionTitle]);

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Cleanup animation timer on unmount
  useEffect(() => () => clearTimeout(animTimerRef.current), []);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[64px] z-50 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={mobileOpen ? t("common:aria.close_menu") : t("common:aria.open_menu")}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(lp("/"))}
              role="link"
              title={t("common:actions.back_to_home")}
            >
              <img
                src="/icon.png"
                alt={t("common:header.logo_alt")}
                width={32}
                height={32}
                loading="eager"
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground">
                  {t("common:header.title")}
                </h1>
                <p className="font-ui text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                  {t("common:header.subtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: t("common:nav.docs"), target: lp("/docs") },
              { label: t("common:nav.components"), target: lp("/docs/core-components") },
              { label: t("common:nav.tokens"), target: lp("/docs/foundations") },
              { label: t("common:nav.patterns"), target: lp("/docs/patterns") },
            ].map(({ label, target }) => (
              <button
                key={label}
                onClick={() => navigate(target)}
                className="font-display text-xs font-semibold tracking-[0.08em] uppercase text-muted-foreground hover:text-primary px-4 py-2 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => {
                setIsAnimating(true);
                toggleTheme();
                const tm = setTimeout(() => setIsAnimating(false), 500);
                animTimerRef.current = tm;
              }}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors overflow-hidden"
              aria-label={t("common:theme.toggle")}
            >
              <span
                className={`block transition-all duration-500 ${isAnimating ? "rotate-[360deg] scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)" }}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </span>
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-1 border border-border text-muted-foreground text-xs hover:border-primary/30 hover:text-foreground transition-colors cursor-pointer"
              aria-label={t("common:actions.search")}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t("common:search.placeholder")}...</span>
              <kbd className="font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onNavigate={onNavigate}
      />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/95"
            onClick={() => setMobileOpen(false)}
          />
          <TopoBg className="opacity-15" />
          <div className="relative w-[min(280px,calc(100vw-48px))] h-full bg-surface-0 border-r border-border overflow-y-auto pt-20 px-4">
            {/* Inline filter */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={mobileFilter}
                onChange={(e) => setMobileFilter(e.target.value)}
                placeholder={t("common:search.filter_placeholder")}
                className="w-full bg-surface-1 border border-border text-sm text-foreground pl-9 pr-8 py-2 outline-none placeholder:text-muted-foreground focus:border-primary/30 transition-colors font-body"
              />
              {mobileFilter && (
                <button
                  onClick={() => setMobileFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={t("common:actions.clear_filter")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {(mobileFilter.trim()
              ? sidebarData
                  .map((s) => ({
                    ...s,
                    items: s.items.filter((i) =>
                      i.label
                        .toLowerCase()
                        .includes(mobileFilter.toLowerCase()),
                    ),
                  }))
                  .filter((s) => s.items.length > 0)
              : sidebarData
            ).map((section) => {
              const isCollapsed = collapsed[section.title] ?? false;
              const isSectionActive = activeSlug === section.slug;
              return (
                <div key={section.title} className="mb-4">
                  <button
                    onClick={() => {
                      if (isSectionActive) {
                        toggleSection(section.title);
                      } else {
                        navigate(lp(`/docs/${section.slug}`));
                        setMobileOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2 py-2 group ${
                      isSectionActive ? "bg-primary/5" : ""
                    }`}
                    aria-expanded={!isCollapsed}
                  >
                    <span
                      className={`font-display text-[11px] font-bold tracking-[0.15em] uppercase ${
                        isSectionActive
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`}
                    />
                  </button>
                  {!isCollapsed && (
                    <ul className="mt-1 space-y-0.5">
                      {section.items.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                onNavigate(item.id);
                                setMobileOpen(false);
                              }}
                              className={`w-full text-left text-sm py-1.5 px-3 transition-colors flex items-center gap-1.5 ${
                                isActive
                                  ? "text-primary border-l-2 border-primary font-semibold bg-primary/5"
                                  : "text-muted-foreground hover:text-primary"
                              }`}
                            >
                              {item.label}
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
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
