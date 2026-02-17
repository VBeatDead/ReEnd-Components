import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SUPPORTED_LANGS } from "@/i18n";

const BASE_URL = "https://reend-components.pages.dev";

/**
 * Manages <head> meta tags for SEO — hreflang, og:locale,
 * canonical URL. Uses react-i18next for current language.
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

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${BASE_URL}/${lang}${cleanPath}`;
    canonical.setAttribute("data-seo-i18n", "");
    head.appendChild(canonical);

    SUPPORTED_LANGS.forEach((l) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l;
      link.href = `${BASE_URL}/${l}${cleanPath}`;
      link.setAttribute("data-seo-i18n", "");
      head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${BASE_URL}/en${cleanPath}`;
    xDefault.setAttribute("data-seo-i18n", "");
    head.appendChild(xDefault);

    const ogLocale = document.createElement("meta");
    ogLocale.setAttribute("property", "og:locale");
    ogLocale.content = lang === "id" ? "id_ID" : "en_US";
    ogLocale.setAttribute("data-seo-i18n", "");
    head.appendChild(ogLocale);

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

    return () => {
      head.querySelectorAll("[data-seo-i18n]").forEach((el) => el.remove());
    };
  }, [lang, location.pathname, t]);

  return null;
};

export default SEOHead;
