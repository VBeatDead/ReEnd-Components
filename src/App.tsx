import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/docs/ThemeProvider";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/docs/ErrorFallback";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const DocsLayout = lazy(() => import("./layouts/DocsLayout"));
const DocsOverview = lazy(() => import("./pages/DocsOverview"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DocsNotFound = lazy(() => import("./pages/DocsNotFound"));

// Lazy-loaded section pages
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

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-3">
      <div className="w-10 h-10 bg-primary clip-corner-sm" />
      <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
        LOADING
      </span>
    </div>
  </div>
);

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<DocsOverview />} />
                <Route path="foundations" element={<FoundationsSection />} />
                <Route
                  path="core-components"
                  element={<CoreComponentsSection />}
                />
                <Route path="data-display" element={<DataDisplaySection />} />
                <Route path="feedback" element={<FeedbackSection />} />
                <Route path="interactive" element={<InteractiveSection />} />
                <Route path="content-media" element={<ContentMediaSection />} />
                <Route
                  path="overlay-utility"
                  element={<OverlayUtilitySection />}
                />
                <Route path="animation" element={<AnimationSection />} />
                <Route
                  path="content-strategy"
                  element={<ContentStrategySection />}
                />
                <Route path="patterns" element={<PatternsSection />} />
                <Route path="changelog" element={<ChangelogPage />} />
                <Route path="*" element={<DocsNotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
