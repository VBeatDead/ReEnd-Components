import { useEffect, useMemo, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { sidebarData, idToSlugMap } from "@/components/docs/sidebarData";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/docs/ErrorFallback";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { SectionNav } from "@/components/docs/SectionNav";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

const SectionLoader = () => (
  <div className="space-y-8 py-4 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i} className="space-y-4">
        <div className="h-5 w-52 bg-surface-2 rounded" />
        <div className="h-3 w-80 max-w-full bg-surface-1 rounded" />
        <div className="h-40 bg-surface-1 border border-border rounded" />
      </div>
    ))}
  </div>
);

const DocsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract slug from path: /docs/core-components → "core-components"
  const slug = useMemo(() => {
    const match = location.pathname.match(/^\/docs\/(.+?)(?:\/|$)/);
    return match?.[1] ?? null;
  }, [location.pathname]);

  // Determine active section from current route
  const activeSection = useMemo(() => {
    return sidebarData.find((s) => s.slug === slug) ?? null;
  }, [slug]);

  // Determine active item from hash
  const hashActiveId = useMemo(() => {
    const hash = location.hash.slice(1);
    if (hash) return hash;
    // Default to first item of the active section
    return activeSection?.items[0]?.id ?? "";
  }, [location.hash, activeSection]);

  // Scroll spy: observe items in current section
  const sectionItemIds = useMemo(
    () => activeSection?.items.map((i) => i.id) ?? [],
    [activeSection],
  );
  const scrollSpyId = useScrollSpy(sectionItemIds);

  // Scroll spy takes priority when user is scrolling within a section
  const activeId = scrollSpyId ?? hashActiveId;

  // Handle navigation from sidebar/header/command palette
  const handleNavigate = useCallback(
    (id: string) => {
      const targetSlug = idToSlugMap[id];
      if (!targetSlug) return;

      if (targetSlug === slug) {
        // Same section: just scroll to the element
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", `#${id}`);
        }
      } else {
        // Different section: navigate to route with hash
        navigate(`/docs/${targetSlug}#${id}`);
      }
    },
    [slug, navigate],
  );

  // Scroll to hash after route change
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Wait for Suspense to resolve and section to render
    const scrollToHash = (attempt: number) => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 5) {
        setTimeout(() => scrollToHash(attempt + 1), 100 * (attempt + 1));
      }
    };

    // Small delay for initial render
    setTimeout(() => scrollToHash(0), 50);
  }, [location.pathname, location.hash]);

  // Update document title per section
  useEffect(() => {
    if (activeSection) {
      document.title = `${activeSection.title} — Endfield Design System v2.0`;
    } else {
      document.title = "Docs — Endfield Design System v2.0";
    }
    return () => {
      document.title = "Arknights: Endfield — Design System v2.0";
    };
  }, [activeSection]);

  // Backward compat: redirect old /docs#item-id to /docs/slug#item-id
  useEffect(() => {
    if (!slug && location.hash) {
      const hash = location.hash.slice(1);
      const targetSlug = idToSlugMap[hash];
      if (targetSlug) {
        navigate(`/docs/${targetSlug}#${hash}`, { replace: true });
      }
    }
  }, [slug, location.hash, navigate]);

  // Keyboard navigation: Alt+← / Alt+→ for prev/next section
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const currentIndex = sidebarData.findIndex((s) => s.slug === slug);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight" && currentIndex < sidebarData.length - 1) {
        e.preventDefault();
        navigate(`/docs/${sidebarData[currentIndex + 1].slug}`);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        navigate(`/docs/${sidebarData[currentIndex - 1].slug}`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slug, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:tracking-[0.1em] focus:uppercase"
      >
        Skip to main content
      </a>
      <DocsHeader onNavigate={handleNavigate} activeId={activeId} />
      <DocsSidebar activeId={activeId} onNavigate={handleNavigate} />

      <main id="main-content" className="lg:ml-[280px] pt-[64px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slug ?? "overview"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <SectionHeader onNavigate={handleNavigate} />
                  <Outlet />
                  <SectionNav />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-border text-center">
            <p className="font-mono text-xs text-muted-foreground">
              Design System v2.0 — Complete Edition — Compiled February 2026
            </p>
            <p className="font-mono text-[10px] text-ef-gray-mid mt-2">
              EF-SYS // ENDFIELD INDUSTRIES
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
