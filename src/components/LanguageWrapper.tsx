import { useEffect } from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";

/**
 * Reads the optional :lang param from the URL, syncs i18next,
 * and updates <html lang="…">. Invalid languages redirect to /en/…
 */
export const LanguageWrapper = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const resolved: SupportedLang =
      lang && SUPPORTED_LANGS.includes(lang as SupportedLang)
        ? (lang as SupportedLang)
        : "en";

    if (lang && !SUPPORTED_LANGS.includes(lang as SupportedLang)) {
      const rest = location.pathname.replace(`/${lang}`, "") || "/";
      navigate(`/en${rest}${location.search}${location.hash}`, {
        replace: true,
      });
      return;
    }

    if (i18n.language !== resolved) {
      i18n.changeLanguage(resolved);
    }

    document.documentElement.lang = resolved;

    localStorage.setItem("ef-lang", resolved);
  }, [lang, i18n, navigate, location]);

  return <Outlet />;
};

export default LanguageWrapper;
