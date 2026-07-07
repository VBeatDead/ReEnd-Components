import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SUPPORTED_LANGS } from "@/i18n";

const BASE_URL = "https://reend-components.pages.dev";

/** EN is served at the bare path; other languages get a /:lang prefix.
 *  Must stay consistent with public/sitemap.xml hreflang entries. */
function localizedUrl(lang: string, cleanPath: string): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  // Home pages carry a trailing slash ("/", "/id/"), deeper paths don't —
  // exactly the shapes listed in sitemap.xml.
  return `${BASE_URL}${prefix}${cleanPath}${cleanPath ? "" : "/"}`;
}

/**
 * Manages <head> meta tags for SEO — hreflang, og:locale,
 * canonical URL. Uses react-i18next for current language.
 *
 * Per-docs-section title/description/og tags are owned by usePageMeta
 * (DocsLayout); this component must not overwrite them there.
 */
export const SEOHead = () => {
  const { i18n, t } = useTranslation("common");
  const location = useLocation();
  const lang = i18n.language || "en";

  useEffect(() => {
    const head = document.head;
    head.querySelectorAll("[data-seo-i18n]").forEach((el) => el.remove());

    const pathWithoutLang = location.pathname.replace(/^\/(en|id)(\/|$)/, "/");
    const cleanPath =
      pathWithoutLang === "/" ? "" : pathWithoutLang.replace(/\/$/, "");

    // Single canonical: update the static tag from index.html in place —
    // appending a second one would give crawlers two conflicting canonicals.
    let canonical = head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }
    canonical.href = localizedUrl(lang, cleanPath);

    SUPPORTED_LANGS.forEach((l) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l;
      link.href = localizedUrl(l, cleanPath);
      link.setAttribute("data-seo-i18n", "");
      head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = localizedUrl("en", cleanPath);
    xDefault.setAttribute("data-seo-i18n", "");
    head.appendChild(xDefault);

    const ogLocale = document.createElement("meta");
    ogLocale.setAttribute("property", "og:locale");
    ogLocale.content = lang === "id" ? "id_ID" : "en_US";
    ogLocale.setAttribute("data-seo-i18n", "");
    head.appendChild(ogLocale);

    // Docs section pages get section-specific description/og tags from
    // usePageMeta — this (parent) effect runs after that one and would
    // clobber them with the generic copy, so skip those routes here.
    const isDocsSection = /^\/docs\/.+/.test(pathWithoutLang);
    if (!isDocsSection) {
      const metaDesc = head.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", t("meta.description"));
      }

      const ogTitle = head.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", t("meta.og_title"));
      }

      const ogDesc = head.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", t("meta.og_description"));
      }
    }

    return () => {
      head.querySelectorAll("[data-seo-i18n]").forEach((el) => el.remove());
    };
  }, [lang, location.pathname, t]);

  return null;
};

export default SEOHead;
