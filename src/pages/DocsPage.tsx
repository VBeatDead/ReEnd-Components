import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { LazySection } from "@/components/docs/LazySection";
import { FoundationsSection } from "@/components/sections/FoundationsSection";
import { sidebarData } from "@/components/docs/sidebarData";

// Lazy load heavy sections
const CoreComponentsSection = lazy(() => import("@/components/sections/CoreComponentsSection").then(m => ({ default: m.CoreComponentsSection })));
const DataDisplaySection = lazy(() => import("@/components/sections/DataDisplaySection").then(m => ({ default: m.DataDisplaySection })));
const FeedbackSection = lazy(() => import("@/components/sections/FeedbackSection").then(m => ({ default: m.FeedbackSection })));
const InteractiveSection = lazy(() => import("@/components/sections/InteractiveSection").then(m => ({ default: m.InteractiveSection })));
const ContentMediaSection = lazy(() => import("@/components/sections/ContentMediaSection").then(m => ({ default: m.ContentMediaSection })));
const OverlayUtilitySection = lazy(() => import("@/components/sections/OverlayUtilitySection").then(m => ({ default: m.OverlayUtilitySection })));
const AnimationSection = lazy(() => import("@/components/sections/AnimationSection").then(m => ({ default: m.AnimationSection })));
const ContentStrategySection = lazy(() => import("@/components/sections/ContentStrategySection").then(m => ({ default: m.ContentStrategySection })));
const PatternsSection = lazy(() => import("@/components/sections/PatternsSection").then(m => ({ default: m.PatternsSection })));
const SignatureCoreSection = lazy(() => import("@/components/sections/SignatureSection").then(m => ({ default: m.SignatureCoreSection })));
const SignatureDataSection = lazy(() => import("@/components/sections/SignatureSection").then(m => ({ default: m.SignatureDataSection })));
const SignatureFeedbackSection = lazy(() => import("@/components/sections/SignatureSection").then(m => ({ default: m.SignatureFeedbackSection })));
const SignatureContentSection = lazy(() => import("@/components/sections/SignatureSection").then(m => ({ default: m.SignatureContentSection })));

// Build a map: component ID → section title (for smart navigation)
const idToSectionMap: Record<string, string> = {};
sidebarData.forEach((section) => {
  section.items.forEach((item) => {
    idToSectionMap[item.id] = section.title;
  });
});

// Map section titles to section keys used for forceVisible
const SECTION_KEYS = [
  "FOUNDATIONS", "CORE COMPONENTS", "DATA DISPLAY", "FEEDBACK & STATES",
  "INTERACTIVE STATES", "CONTENT & MEDIA", "OVERLAY & UTILITY",
  "ANIMATION", "CONTENT STRATEGY", "PATTERNS",
] as const;

const SectionLoader = () => (
  <div className="space-y-8 py-4 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i} className="space-y-4">
        <div className="h-5 w-52 bg-surface-2" />
        <div className="h-3 w-80 max-w-full bg-surface-1" />
        <div className="h-40 bg-surface-1 border border-border" />
      </div>
    ))}
  </div>
);

const Index = () => {
  const [activeId, setActiveId] = useState("design-philosophy");
  const [forcedSections, setForcedSections] = useState<Set<string>>(new Set());
  const scrollRetryRef = useRef<number | null>(null);

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
      scrollRetryRef.current = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          scrollRetryRef.current = null;
        } else if (attempt < 8) {
          // Exponential backoff: 100, 200, 400, 800...
          retryScroll(attempt + 1);
        }
      }, 100 * Math.pow(1.5, attempt));
    };
    retryScroll(0);
  }, []);

  const isForced = (sectionTitle: string) => forcedSections.has(sectionTitle);

  return (
    <div className="min-h-screen bg-background">
      <DocsHeader onNavigate={handleNavigate} />
      <DocsSidebar activeId={activeId} onNavigate={handleNavigate} />

      <main className="lg:ml-[280px] pt-[64px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero */}
          <div className="mb-16">
            <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">COMPLETE EDITION</span>
            <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-[0.04em] uppercase text-foreground mt-2 mb-4">
              DESIGN SYSTEM <span className="text-primary">v2.0</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Arknights: Endfield — Sci-Fi Industrial Futurism component library. Seluruh 70+ section dengan live preview dan code reference.
            </p>
            <div className="gradient-line-h mt-8 opacity-50" />
          </div>

          {/* ═══ FOUNDATIONS ═══ */}
          <div className="mb-8">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ FOUNDATIONS</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <FoundationsSection />

          {/* ═══ CORE COMPONENTS ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ CORE COMPONENTS</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CORE COMPONENTS")}>
            <Suspense fallback={<SectionLoader />}>
              <CoreComponentsSection />
              <SignatureCoreSection />
            </Suspense>
          </LazySection>

          {/* ═══ DATA DISPLAY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ DATA DISPLAY</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("DATA DISPLAY")}>
            <Suspense fallback={<SectionLoader />}>
              <DataDisplaySection />
              <SignatureDataSection />
            </Suspense>
          </LazySection>

          {/* ═══ FEEDBACK & STATES ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ FEEDBACK & STATES</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("FEEDBACK & STATES")}>
            <Suspense fallback={<SectionLoader />}>
              <FeedbackSection />
              <SignatureFeedbackSection />
            </Suspense>
          </LazySection>

          {/* ═══ INTERACTIVE STATES ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ INTERACTIVE STATES</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("INTERACTIVE STATES")}>
            <Suspense fallback={<SectionLoader />}>
              <InteractiveSection />
            </Suspense>
          </LazySection>

          {/* ═══ CONTENT & MEDIA ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ CONTENT & MEDIA</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CONTENT & MEDIA")}>
            <Suspense fallback={<SectionLoader />}>
              <ContentMediaSection />
              <SignatureContentSection />
            </Suspense>
          </LazySection>

          {/* ═══ OVERLAY & UTILITY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ OVERLAY & UTILITY</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("OVERLAY & UTILITY")}>
            <Suspense fallback={<SectionLoader />}>
              <OverlayUtilitySection />
            </Suspense>
          </LazySection>

          {/* ═══ ANIMATION ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ ANIMATION</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("ANIMATION")}>
            <Suspense fallback={<SectionLoader />}>
              <AnimationSection />
            </Suspense>
          </LazySection>

          {/* ═══ CONTENT STRATEGY ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ CONTENT STRATEGY</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("CONTENT STRATEGY")}>
            <Suspense fallback={<SectionLoader />}>
              <ContentStrategySection />
            </Suspense>
          </LazySection>

          {/* ═══ PATTERNS ═══ */}
          <div className="mb-8 mt-16">
            <h2 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">◆ PATTERNS</h2>
            <div className="h-px bg-border mb-8" />
          </div>
          <LazySection forceVisible={isForced("PATTERNS")}>
            <Suspense fallback={<SectionLoader />}>
              <PatternsSection />
            </Suspense>
          </LazySection>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-border text-center">
            <p className="font-mono text-xs text-muted-foreground">Design System v2.0 — Complete Edition — Compiled February 2026</p>
            <p className="font-mono text-[10px] text-ef-gray-mid mt-2">EF-SYS // ENDFIELD INDUSTRIES</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
