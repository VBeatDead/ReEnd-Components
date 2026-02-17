import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "@/locales/en/common.json";
import idCommon from "@/locales/id/common.json";

export const SUPPORTED_LANGS = ["en", "id"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      id: { common: idCommon },
    },
    supportedLngs: ["en", "id"],
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],

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
