import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TopoBg } from "@/components/home/signature";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 — Endfield Design System";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
    return () => {
      document.title = "Arknights: Endfield — Design System v2.0";
    };
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background">
      <TopoBg className="opacity-40" />
      <div className="relative text-center">
        <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
          EF-SYS // ERROR
        </span>
        <h1 className="font-display text-6xl font-bold text-foreground mt-4 mb-2">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-8">Route not found</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to="/"
            className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-[1px] transition-all duration-300"
          >
            RETURN HOME ◆
          </Link>
          <Link
            to="/docs"
            className="clip-corner border border-border bg-surface-1 text-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-primary/50 transition-colors"
          >
            OPEN DOCS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
