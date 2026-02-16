import {
  useState,
  useCallback,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { LazySection } from "@/components/docs/LazySection";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/docs/ErrorFallback";
import { sidebarData } from "@/components/docs/sidebarData";

// Lazy load all sections
const FoundationsSection = lazy(() =>
  import("@/components/sections/FoundationsSection").then((m) => ({
    default: m.FoundationsSection,
  })),
);
const CoreComponentsSection = lazy(() =>
  import("@/components/sections/CoreComponentsSection").then((m) => ({
    default: m.CoreComponentsSection,
  })),
);
const DataDisplaySection = lazy(() =>
  import("@/components/sections/DataDisplaySection").then((m) => ({
    default: m.DataDisplaySection,
  })),
);
const FeedbackSection = lazy(() =>
  import("@/components/sections/FeedbackSection").then((m) => ({
    default: m.FeedbackSection,
  })),
);
const InteractiveSection = lazy(() =>
  import("@/components/sections/InteractiveSection").then((m) => ({
    default: m.InteractiveSection,
  })),
);
const ContentMediaSection = lazy(() =>
  import("@/components/sections/ContentMediaSection").then((m) => ({
    default: m.ContentMediaSection,
  })),
);
const OverlayUtilitySection = lazy(() =>
  import("@/components/sections/OverlayUtilitySection").then((m) => ({
    default: m.OverlayUtilitySection,
  })),
);
const AnimationSection = lazy(() =>
  import("@/components/sections/AnimationSection").then((m) => ({
    default: m.AnimationSection,
  })),
);
const ContentStrategySection = lazy(() =>
  import("@/components/sections/ContentStrategySection").then((m) => ({
    default: m.ContentStrategySection,
  })),
);
const PatternsSection = lazy(() =>
  import("@/components/sections/PatternsSection").then((m) => ({
    default: m.PatternsSection,
  })),
);
const SignatureSection = lazy(
  () => import("@/components/sections/SignatureSection"),
);

// Build a map: component ID → section title (for smart navigation)
const idToSectionMap: Record<string, string> = {};
sidebarData.forEach((section) => {
  section.items.forEach((item) => {
    idToSectionMap[item.id] = section.title;
  });
});

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

const DocsPage = () => {
  const [activeId, setActiveId] = useState("design-philosophy");
  const [forcedSections, setForcedSections] = useState<Set<string>>(new Set());
  const scrollRetryRef = useRef<number | null>(null);

  useEffect(() => {
    const allIds = sidebarData.flatMap((s) => s.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && allIds.includes(id)) {
              setActiveId(id);
              history.replaceState(null, "", `#${id}`);
            }
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    const observeAll = () => {
      allIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeAll();
    const interval = setInterval(observeAll, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    let timer: ReturnType<typeof setTimeout>;
    if (hash) {
      timer = setTimeout(() => handleNavigate(hash), 300);
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "Docs — Endfield Design System v2.0";
    return () => {
      document.title = "Arknights: Endfield — Design System v2.0";
    };
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setActiveId(id);

    // Clear any pending retry
    if (scrollRetryRef.current) {
      clearTimeout(scrollRetryRef.current);
      scrollRetryRef.current = null;
    }

    // Try immediate scroll
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Element not found — force-load the target section
    const targetSection = idToSectionMap[id];
    if (targetSection) {
      setForcedSections((prev) => {
        const next = new Set(prev);
        next.add(targetSection);
        return next;
      });
    }

    // Retry scroll with increasing delays (wait for Suspense + render)
    const retryScroll = (attempt: number) => {
      scrollRetryRef.current = window.setTimeout(
        () => {
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            scrollRetryRef.current = null;
          } else if (attempt < 8) {
            // Exponential backoff: 100, 200, 400, 800...
            retryScroll(attempt + 1);
          }
        },
        100 * Math.pow(1.5, attempt),
      );
    };
    retryScroll(0);
  }, []);

  const isForced = (sectionTitle: string) => forcedSections.has(sectionTitle);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:tracking-[0.1em] focus:uppercase"
      >
        Skip to main content
      </a>
      <DocsHeader onNavigate={handleNavigate} />
      <DocsSidebar activeId={activeId} onNavigate={handleNavigate} />

      <main id="main-content" className="lg:ml-[280px] pt-[64px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">
                COMPLETE EDITION
              </span>
              <span className="font-mono text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 tracking-wider">
                v2.0.0
              </span>
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-[0.04em] uppercase text-foreground mt-2 mb-4">
              DESIGN SYSTEM <span className="text-primary">v2.0</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Arknights: Endfield — Sci-Fi Industrial Futurism component
              library. Seluruh 70+ section dengan live preview dan code
              reference.
            </p>
            <div className="gradient-line-h mt-8 opacity-50" />
          </div>

          {/* ═══ FOUNDATIONS ═══ */}
          <div className="mb-8">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ FOUNDATIONS
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("FOUNDATIONS")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <FoundationsSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ CORE COMPONENTS ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ CORE COMPONENTS
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CORE COMPONENTS")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <CoreComponentsSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ DATA DISPLAY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ DATA DISPLAY
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("DATA DISPLAY")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <DataDisplaySection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ FEEDBACK & STATES ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ FEEDBACK & STATES
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("FEEDBACK & STATES")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <FeedbackSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ INTERACTIVE STATES ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ INTERACTIVE STATES
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("INTERACTIVE STATES")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <InteractiveSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ CONTENT & MEDIA ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ CONTENT & MEDIA
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CONTENT & MEDIA")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <ContentMediaSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ OVERLAY & UTILITY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ OVERLAY & UTILITY
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("OVERLAY & UTILITY")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <OverlayUtilitySection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ ANIMATION ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ ANIMATION
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("ANIMATION")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <AnimationSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ CONTENT STRATEGY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ CONTENT STRATEGY
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CONTENT STRATEGY")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <ContentStrategySection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ PATTERNS ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ PATTERNS
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("PATTERNS")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <PatternsSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ SIGNATURE ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ SIGNATURE COMPONENTS
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("SIGNATURE")}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoader />}>
                <SignatureSection />
              </Suspense>
            </ErrorBoundary>
          </LazySection>

          {/* ═══ CHANGELOG ═══ */}
          <div id="changelog" className="mb-8 mt-16 scroll-mt-20">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
              ◆ CHANGELOG
            </h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <div className="space-y-6">
            <div className="border border-border bg-surface-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm font-bold text-primary">
                  v2.0.0
                </span>
                <span className="font-mono text-[10px] bg-ef-green/10 border border-ef-green/20 text-ef-green px-2 py-0.5">
                  LATEST
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  February 2026
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>
                    Complete redesign with Sci-Fi Industrial Futurism theme
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>
                    87+ component previews across 11 thematic sections
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>Shiki syntax highlighting with dual theme support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>Interactive playgrounds with live code generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>Fuzzy search command palette (⌘K)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>
                    Full accessibility support — ARIA roles, focus traps,
                    keyboard navigation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>
                    Responsive preview toggle (Desktop / Tablet / Mobile)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">◆</span>
                  <span>Keyboard interaction documentation per component</span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-surface-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm font-bold text-muted-foreground">
                  v1.0.0
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  January 2025
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">◇</span>
                  <span>Initial release with basic component library</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">◇</span>
                  <span>Dark mode support with custom ThemeProvider</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">◇</span>
                  <span>Landing page with cinematic animations</span>
                </li>
              </ul>
            </div>
          </div>

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

export default DocsPage;
