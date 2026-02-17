import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";

/**
 * Returns a helper to build paths with the current language prefix.
 * Usage: const lp = useLocalizedPath(); lp("/docs") → "/en/docs"
 */
export const useLocalizedPath = () => {
  const { lang } = useParams<{ lang?: string }>();

  const currentLang: SupportedLang =
    lang && SUPPORTED_LANGS.includes(lang as SupportedLang)
      ? (lang as SupportedLang)
      : "en";

  const lp = useCallback(
    (path: string) => {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return `/${currentLang}${normalizedPath}`;
    },
    [currentLang],
  );

  return lp;
};

export default useLocalizedPath;
