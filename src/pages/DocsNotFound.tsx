import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TopoBg } from "@/components/home/signature";

/**
 * Catches invalid /docs/* slugs and shows a helpful message
 * with redirect option back to docs overview.
 */
const DocsNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Section Not Found — Endfield Design System v2.0";
    return () => {
      document.title = "Arknights: Endfield — Design System v2.0";
    };
  }, []);

  // Auto-redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/docs", { replace: true });
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const attemptedSlug = location.pathname.replace(/^\/docs\/?/, "");

  return (
    <div className="relative py-20 text-center">
      <TopoBg className="opacity-30" />
      <span className="relative font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
        EF-SYS // SECTION NOT FOUND
      </span>
      <h1 className="font-display text-3xl font-bold text-foreground mt-4 mb-2">
        INVALID ROUTE
      </h1>
      <p className="text-muted-foreground font-body mb-2">
        The section{" "}
        <code className="font-mono text-sm text-primary bg-primary/10 px-2 py-0.5">
          /docs/{attemptedSlug}
        </code>{" "}
        does not exist.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Redirecting to docs overview in a few seconds...
      </p>
      <Link
        to="/docs"
        className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-shadow"
      >
        GO TO DOCS ◆
      </Link>
    </div>
  );
};

export default DocsNotFound;
