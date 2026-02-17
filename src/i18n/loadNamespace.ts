import i18n from "./index";

type NamespaceLoader = () => Promise<{ default?: Record<string, unknown> }>;

const namespaceLoaders: Record<string, Record<string, NamespaceLoader>> = {
  en: {
    home: () => import("@/locales/en/home.json"),
    docs: () => import("@/locales/en/docs.json"),
    foundations: () => import("@/locales/en/foundations.json"),
    core: () => import("@/locales/en/core.json"),
    data: () => import("@/locales/en/data.json"),
    feedback: () => import("@/locales/en/feedback.json"),
    interactive: () => import("@/locales/en/interactive.json"),
    content: () => import("@/locales/en/content.json"),
    overlay: () => import("@/locales/en/overlay.json"),
    animation: () => import("@/locales/en/animation.json"),
    strategy: () => import("@/locales/en/strategy.json"),
    patterns: () => import("@/locales/en/patterns.json"),
    changelog: () => import("@/locales/en/changelog.json"),
    install: () => import("@/locales/en/install.json"),
    signature: () => import("@/locales/en/signature.json"),
  },
  id: {
    home: () => import("@/locales/id/home.json"),
    docs: () => import("@/locales/id/docs.json"),
    foundations: () => import("@/locales/id/foundations.json"),
    core: () => import("@/locales/id/core.json"),
    data: () => import("@/locales/id/data.json"),
    feedback: () => import("@/locales/id/feedback.json"),
    interactive: () => import("@/locales/id/interactive.json"),
    content: () => import("@/locales/id/content.json"),
    overlay: () => import("@/locales/id/overlay.json"),
    animation: () => import("@/locales/id/animation.json"),
    strategy: () => import("@/locales/id/strategy.json"),
    patterns: () => import("@/locales/id/patterns.json"),
    changelog: () => import("@/locales/id/changelog.json"),
    install: () => import("@/locales/id/install.json"),
    signature: () => import("@/locales/id/signature.json"),
  },
};

export async function loadNamespace(lang: string, ns: string): Promise<void> {
  if (i18n.hasResourceBundle(lang, ns)) return;
  const loader = namespaceLoaders[lang]?.[ns];
  if (!loader) return;
  const resources = await loader();
  i18n.addResourceBundle(lang, ns, resources.default || resources, true, true);
}

export async function loadNamespaces(
  lang: string,
  nsList: string[],
): Promise<void> {
  await Promise.all(nsList.map((ns) => loadNamespace(lang, ns)));
}
