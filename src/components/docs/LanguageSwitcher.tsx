import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";

/**
 * EN / ID language switcher with Endfield aesthetic.
 * Displays as inline toggle buttons.
 */
export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang?: string }>();

  const currentLang = (i18n.language || "en") as SupportedLang;

  const switchTo = (target: SupportedLang) => {
    if (target === currentLang) return;

    // Build new path: strip current lang prefix and prepend target
    let path = location.pathname;

    // Remove current lang prefix if present
    if (lang) {
      path = path.replace(new RegExp(`^/${lang}`), "");
    }

    // Ensure path starts with /
    if (!path.startsWith("/")) path = `/${path}`;

    const newPath = `/${target}${path}${location.search}${location.hash}`;
    navigate(newPath, { replace: true });
  };

  return (
    <div className="flex items-center gap-0.5 border border-border bg-surface-1">
      {SUPPORTED_LANGS.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`font-display text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1.5 transition-all duration-200 ${
            currentLang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={t(`lang.switch_${l}`)}
          aria-current={currentLang === l ? "true" : undefined}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
