import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TopoBg } from "@/components/home/signature";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

/**
 * Catches invalid /docs/* slugs and shows a helpful message
 * with redirect option back to docs overview.
 */
const DocsNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");
  const lp = useLocalizedPath();

  useEffect(() => {
    document.title = t("errors.page_title_doc_404");
    return () => {
      document.title = t("meta.title");
    };
  }, [t]);

  // Auto-redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(lp("/docs"), { replace: true });
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate, lp]);

  const attemptedSlug = location.pathname.replace(
    /^(?:\/(?:en|id))?\/docs\/?/,
    "",
  );

  return (
    <div className="relative py-20 text-center">
      <TopoBg className="opacity-30" />
      <span className="relative font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
        {t("errors.doc_not_found_label")}
      </span>
      <h1 className="font-display text-3xl font-bold text-foreground mt-4 mb-2">
        {t("errors.doc_not_found_title")}
      </h1>
      <p className="text-muted-foreground font-body mb-2">
        {t("errors.doc_not_found_desc", { slug: attemptedSlug })}
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        {t("errors.doc_not_found_redirect")}
      </p>
      <Link
        to={lp("/docs")}
        className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-shadow"
      >
        {t("actions.go_to_docs")}
      </Link>
    </div>
  );
};

export default DocsNotFound;
