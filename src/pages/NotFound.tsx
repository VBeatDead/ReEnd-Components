import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TopoBg } from "@/components/home/signature";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation("common");
  const lp = useLocalizedPath();

  useEffect(() => {
    document.title = t("errors.page_title_404");
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
    return () => {
      document.title = t("meta.title");
    };
  }, [location.pathname, t]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background">
      <TopoBg className="opacity-40" />
      <div className="relative text-center">
        <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
          {t("errors.not_found_label")}
        </span>
        <h1 className="font-display text-6xl font-bold text-foreground mt-4 mb-2">
          {t("errors.not_found_title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("errors.not_found_desc")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to={lp("/")}
            className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-[1px] transition-all duration-300"
          >
            {t("actions.return_home")}
          </Link>
          <Link
            to={lp("/docs")}
            className="clip-corner border border-border bg-surface-1 text-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-primary/50 transition-colors"
          >
            {t("actions.open_docs")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
