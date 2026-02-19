import { ComponentPreview } from "../../docs/ComponentPreview";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";

function TabsPlayground({
  variant,
  tabCount,
}: {
  variant: "underline" | "pill" | "bordered";
  tabCount: number;
}) {
  const { t } = useTranslation("core");
  const tabLabels = [
    t("navigation.tab_overview"),
    t("navigation.tab_usage"),
    t("navigation.tab_api"),
    t("navigation.tab_examples"),
    t("navigation.tab_changelog"),
    t("navigation.tab_faq"),
  ].slice(0, tabCount);

  return (
    <Tabs defaultValue={tabLabels[0]}>
      <TabsList variant={variant}>
        {tabLabels.map((tab) => (
          <TabsTrigger key={tab} value={tab} variant={variant}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabLabels.map((tab) => (
        <TabsContent key={tab} value={tab}>
          <p className="text-sm text-muted-foreground">
            {t("navigation.content_for_tab", { tab })}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function NavigationDemos() {
  const { t } = useTranslation("core");

  return (
    <>
      {/* Nav Header */}
      <ComponentPreview
        id="nav-header"
        title={t("navigation.header_title")}
        showViewport
        description={t("navigation.header_description")}
        code={`.header {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; z-index: 1000;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}`}
        props={[
          {
            name: "logo",
            type: "ReactNode",
            required: true,
            description: t("navigation.header_props.logo"),
          },
          {
            name: "navItems",
            type: "{ label: string; href: string; active?: boolean }[]",
            required: true,
            description: t("navigation.header_props.navItems"),
          },
          {
            name: "sticky",
            type: "boolean",
            default: "true",
            required: false,
            description: t("navigation.header_props.sticky"),
          },
          {
            name: "actions",
            type: "ReactNode",
            required: false,
            description: t("navigation.header_props.actions"),
          },
        ]}
        api={[
          {
            name: "useScrollDirection",
            signature: "() => 'up' | 'down'",
            description: t("navigation.header_api.useScrollDirection"),
          },
        ]}
      >
        <div className="bg-background/85 backdrop-blur-xl border border-border p-0 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-0">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary clip-corner-sm flex items-center justify-center">
                <span className="font-display text-[9px] font-bold text-primary-foreground">
                  EF
                </span>
              </div>
              <span className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground">
                ENDFIELD
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[
                t("navigation.home"),
                t("navigation.docs"),
                t("navigation.blog"),
                t("navigation.about"),
              ].map((item, i) => (
                <button
                  key={item}
                  className={`font-display text-xs font-semibold tracking-[0.08em] uppercase px-4 py-2 transition-colors relative bg-transparent ${i === 1 ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  {item}
                  {i === 1 && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[6px] text-primary">
                      ◆
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              className="sm:hidden text-muted-foreground"
              aria-label={t("navigation.open_menu")}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ComponentPreview>

      {/* Nav Sidebar */}
      <ComponentPreview
        id="nav-sidebar"
        title={t("navigation.sidebar_title")}
        showViewport
        description={t("navigation.sidebar_description")}
        props={[
          {
            name: "sections",
            type: "{ title: string; items: { id: string; label: string }[] }[]",
            required: true,
            description: t("navigation.sidebar_props.sections"),
          },
          {
            name: "activeId",
            type: "string",
            required: false,
            description: t("navigation.sidebar_props.activeId"),
          },
          {
            name: "onNavigate",
            type: "(id: string) => void",
            required: true,
            description: t("navigation.sidebar_props.onNavigate"),
          },
          {
            name: "collapsible",
            type: "boolean",
            default: "true",
            required: false,
            description: t("navigation.sidebar_props.collapsible"),
          },
          {
            name: "width",
            type: "number",
            default: "280",
            required: false,
            description: t("navigation.sidebar_props.width"),
          },
        ]}
      >
        <div className="max-w-[280px] bg-surface-0 border border-border p-4">
          {[
            {
              section: t("navigation.getting_started"),
              items: [
                { l: t("navigation.installation"), active: false },
                { l: t("navigation.quick_start"), active: true },
                { l: t("navigation.configuration"), active: false },
              ],
            },
            {
              section: t("navigation.components"),
              items: [
                { l: t("navigation.button"), active: false },
                { l: t("navigation.card"), active: false },
                { l: t("navigation.input"), active: false },
              ],
            },
          ].map((s) => (
            <div key={s.section} className="mb-4">
              <div className="flex items-center justify-between py-2 px-2">
                <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                  {s.section}
                </span>
                <span className="font-mono text-primary text-sm">−</span>
              </div>
              <ul className="space-y-0.5">
                {s.items.map((item) => (
                  <li key={item.l}>
                    <button
                      className={`w-full text-left text-sm py-1.5 px-3 border-l-2 transition-all ${item.active ? "text-primary border-primary font-semibold" : "text-muted-foreground border-transparent hover:text-card-foreground"}`}
                    >
                      {item.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Nav Tabs */}
      <ComponentPreview
        id="nav-tabs"
        title={t("navigation.tabs_title")}
        description={t("navigation.tabs_description")}
        code={`.tab.active { color: #FFD429; border-bottom-color: #FFD429; }`}
        keyboard={[
          {
            key: "Arrow ←/→",
            description: t("navigation.tabs_keyboard.arrow_lr"),
          },
          {
            key: "Enter / Space",
            description: t("navigation.tabs_keyboard.enter_space"),
          },
          { key: "Home", description: t("navigation.tabs_keyboard.home") },
          { key: "End", description: t("navigation.tabs_keyboard.end") },
        ]}
        props={[
          {
            name: "tabs",
            type: "{ label: string; content: ReactNode }[]",
            required: true,
            description: t("navigation.tabs_props.tabs"),
          },
          {
            name: "activeIndex",
            type: "number",
            default: "0",
            required: false,
            description: t("navigation.tabs_props.activeIndex"),
          },
          {
            name: "onChange",
            type: "(index: number) => void",
            required: false,
            description: t("navigation.tabs_props.onChange"),
          },
          {
            name: "variant",
            type: '"underline" | "pill"',
            default: '"underline"',
            required: false,
            description: t("navigation.tabs_props.variant"),
          },
        ]}
        playground={{
          componentName: "Tabs",
          controls: [
            {
              name: "variant",
              type: "select",
              options: ["underline", "pill"],
              default: "underline",
            },
            {
              name: "tabCount",
              label: t("navigation.tabs_playground.tab_count_label"),
              type: "number",
              default: 4,
              min: 2,
              max: 6,
            },
          ],
          render: (v) => (
            <TabsPlayground variant={v.variant} tabCount={v.tabCount} />
          ),
        }}
      >
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">{t("navigation.tab_overview")}</TabsTrigger>
            <TabsTrigger value="usage">{t("navigation.tab_usage")}</TabsTrigger>
            <TabsTrigger value="api">{t("navigation.tab_api")}</TabsTrigger>
            <TabsTrigger value="examples">{t("navigation.tab_examples")}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">{t("navigation.overview_content")}</TabsContent>
          <TabsContent value="usage">{t("navigation.usage_content")}</TabsContent>
          <TabsContent value="api">{t("navigation.api_content")}</TabsContent>
          <TabsContent value="examples">{t("navigation.examples_content")}</TabsContent>
        </Tabs>
      </ComponentPreview>

      {/* Nav Breadcrumb */}
      <ComponentPreview
        id="nav-breadcrumb"
        title={t("navigation.breadcrumb_title")}
        description={t("navigation.breadcrumb_description")}
        props={[
          {
            name: "items",
            type: "{ label: string; href?: string }[]",
            required: true,
            description: t("navigation.breadcrumb_props.items"),
          },
          {
            name: "separator",
            type: "ReactNode",
            default: '"›"',
            required: false,
            description: t("navigation.breadcrumb_props.separator"),
          },
        ]}
      >
        <nav className="flex items-center gap-2 text-xs">
          {[
            t("navigation.breadcrumb_home"),
            t("navigation.breadcrumb_docs"),
            t("navigation.breadcrumb_components"),
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-[10px] text-muted-foreground">›</span>
              )}
              <button className="font-display tracking-[0.08em] uppercase text-muted-foreground hover:text-primary transition-colors bg-transparent">
                {item}
              </button>
            </span>
          ))}
          <span className="text-[10px] text-muted-foreground">›</span>
          <span className="font-display tracking-[0.08em] uppercase text-card-foreground font-semibold">
            {t("navigation.breadcrumb_buttons")}
          </span>
        </nav>
      </ComponentPreview>

      {/* Nav Pagination */}
      <ComponentPreview
        id="nav-pagination"
        title={t("navigation.pagination_title")}
        description={t("navigation.pagination_description")}
        props={[
          {
            name: "totalPages",
            type: "number",
            required: true,
            description: t("navigation.pagination_props.totalPages"),
          },
          {
            name: "currentPage",
            type: "number",
            required: true,
            description: t("navigation.pagination_props.currentPage"),
          },
          {
            name: "onPageChange",
            type: "(page: number) => void",
            required: true,
            description: t("navigation.pagination_props.onPageChange"),
          },
          {
            name: "siblingCount",
            type: "number",
            default: "1",
            required: false,
            description: t("navigation.pagination_props.siblingCount"),
          },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <button className="font-display text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 bg-transparent">
            ◆ {t("navigation.prev")}
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`font-ui text-xs w-9 h-9 flex items-center justify-center transition-all ${n === 3 ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5"}`}
            >
              {n}
            </button>
          ))}
          <span className="text-muted-foreground text-xs">...</span>
          <button className="font-ui text-xs w-9 h-9 flex items-center justify-center text-muted-foreground border border-border hover:border-primary/30">
            24
          </button>
          <button className="font-display text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 bg-transparent">
            {t("navigation.next")} ◆
          </button>
        </div>
      </ComponentPreview>
    </>
  );
}

export default NavigationDemos;
