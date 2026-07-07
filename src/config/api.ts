/**
 * Live-demo data endpoints, overridable via .env (see .env.example):
 *   VITE_EF_API_BASE — REST API origin (default: https://api.vallov.com)
 *   VITE_EF_CDN_BASE — asset CDN origin (default: https://cdn.vallov.com)
 *
 * In dev the API is reached through the /ef-api proxy (vite.config.ts)
 * to avoid CORS; the proxy target honours VITE_EF_API_BASE as well.
 */
export const EF_API_BASE: string = import.meta.env.DEV
  ? "/ef-api"
  : (import.meta.env.VITE_EF_API_BASE ?? "https://api.vallov.com");

export const EF_CDN_BASE: string =
  import.meta.env.VITE_EF_CDN_BASE ?? "https://cdn.vallov.com";

export const cdnCharacterAsset = (
  slug: string,
  file: "card.webp" | "icon.webp",
): string => `${EF_CDN_BASE}/characters/${slug}/${file}`;

export const cdnElementIcon = (element: string): string =>
  `${EF_CDN_BASE}/icons/elements/${element}.webp`;
