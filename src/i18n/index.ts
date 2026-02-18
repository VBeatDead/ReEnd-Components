import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Always-needed namespaces (eager)
import enCommon from "@/locales/en/common.json";
import idCommon from "@/locales/id/common.json";

// Section & page namespaces — all eager-loaded since loadNamespace() was
// never called anywhere, causing every component to render raw keys.
import enHome from "@/locales/en/home.json";
import idHome from "@/locales/id/home.json";

import enDocs from "@/locales/en/docs.json";
import idDocs from "@/locales/id/docs.json";

import enInstall from "@/locales/en/install.json";
import idInstall from "@/locales/id/install.json";

import enFoundations from "@/locales/en/foundations.json";
import idFoundations from "@/locales/id/foundations.json";

import enCore from "@/locales/en/core.json";
import idCore from "@/locales/id/core.json";

import enData from "@/locales/en/data.json";
import idData from "@/locales/id/data.json";

import enFeedback from "@/locales/en/feedback.json";
import idFeedback from "@/locales/id/feedback.json";

import enInteractive from "@/locales/en/interactive.json";
import idInteractive from "@/locales/id/interactive.json";

import enContent from "@/locales/en/content.json";
import idContent from "@/locales/id/content.json";

import enOverlay from "@/locales/en/overlay.json";
import idOverlay from "@/locales/id/overlay.json";

import enAnimation from "@/locales/en/animation.json";
import idAnimation from "@/locales/id/animation.json";

import enStrategy from "@/locales/en/strategy.json";
import idStrategy from "@/locales/id/strategy.json";

import enPatterns from "@/locales/en/patterns.json";
import idPatterns from "@/locales/id/patterns.json";

import enChangelog from "@/locales/en/changelog.json";
import idChangelog from "@/locales/id/changelog.json";

import enSignature from "@/locales/en/signature.json";
import idSignature from "@/locales/id/signature.json";

export const SUPPORTED_LANGS = ["en", "id"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        docs: enDocs,
        install: enInstall,
        foundations: enFoundations,
        core: enCore,
        data: enData,
        feedback: enFeedback,
        interactive: enInteractive,
        content: enContent,
        overlay: enOverlay,
        animation: enAnimation,
        strategy: enStrategy,
        patterns: enPatterns,
        changelog: enChangelog,
        signature: enSignature,
      },
      id: {
        common: idCommon,
        home: idHome,
        docs: idDocs,
        install: idInstall,
        foundations: idFoundations,
        core: idCore,
        data: idData,
        feedback: idFeedback,
        interactive: idInteractive,
        content: idContent,
        overlay: idOverlay,
        animation: idAnimation,
        strategy: idStrategy,
        patterns: idPatterns,
        changelog: idChangelog,
        signature: idSignature,
      },
    },
    supportedLngs: ["en", "id"],
    fallbackLng: "en",
    defaultNS: "common",
    ns: [
      "common",
      "home",
      "docs",
      "install",
      "foundations",
      "core",
      "data",
      "feedback",
      "interactive",
      "content",
      "overlay",
      "animation",
      "strategy",
      "patterns",
      "changelog",
      "signature",
    ],

    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
      lookupLocalStorage: "ef-lang",
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
