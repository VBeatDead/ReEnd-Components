import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { LanguageSwitcher } from "@/components/docs/LanguageSwitcher";
import { ChapterIndicator } from "@/components/home/scroll-storytelling";
import { TopoBg } from "@/components/home/signature";
import ChapterAwakening from "@/components/home/chapters/ChapterAwakening";
import ChapterSystemOnline from "@/components/home/chapters/ChapterSystemOnline";
import ChapterArsenal from "@/components/home/chapters/ChapterArsenal";
import ChapterModules from "@/components/home/chapters/ChapterModules";
import ChapterDeploy from "@/components/home/chapters/ChapterDeploy";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("home");
  const lp = useLocalizedPath();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const CHAPTER_LABELS = [
    t("chapter_labels.awaken"),
    t("chapter_labels.status"),
    t("chapter_labels.arsenal"),
    t("chapter_labels.modules"),
    t("chapter_labels.deploy"),
  ];

  // Hide browser scrollbar for immersive storytelling.
  // The page still scrolls — scroll-progress drives pinned-section animations.
  useEffect(() => {
    document.documentElement.classList.add("storytelling-mode");
    return () => document.documentElement.classList.remove("storytelling-mode");
  }, []);

  return (
    // overflow-x-clip prevents horizontal overflow from wide Arsenal panels
    // WITHOUT creating a new scroll container (unlike overflow-x-hidden which
    // implicitly sets overflow-y:auto per CSS spec, potentially breaking position:sticky).
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* Skip navigation for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-ui focus:text-xs focus:tracking-widest focus:uppercase focus:clip-corner-sm"
      >
        {t("skip_to_main")}
      </a>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Chapter navigation dots */}
      <ChapterIndicator chapters={5} labels={CHAPTER_LABELS} />

      {/* ═══ CHAPTERS ═══ */}
      <main id="main-content">
        <ChapterAwakening />
        <ChapterSystemOnline />
        <ChapterArsenal />
        <ChapterModules />
        <ChapterDeploy />
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative border-t border-border py-12">
        <TopoBg className="opacity-15" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground">
                {t("footer.brand")}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                {t("footer.license")}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/VBeatDead/ReEnd-Components"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em]"
              >
                {t("footer.github")}
              </a>
              <button
                onClick={() => navigate(lp("/docs"))}
                className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em]"
              >
                {t("footer.docs")}
              </button>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="gradient-line-h my-6" />
          <p className="font-mono text-[9px] text-muted-foreground/40 text-center leading-relaxed">
            {t("footer.disclaimer")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
