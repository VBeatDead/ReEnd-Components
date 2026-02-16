import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/docs/ThemeProvider";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/docs/ErrorFallback";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
