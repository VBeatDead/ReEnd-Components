import { ComponentPreview } from "../../docs/ComponentPreview";
import { useState } from "react";
import { Menu } from "lucide-react";

const TabsPlayground = ({
  variant,
  tabCount,
}: {
  variant: string;
  tabCount: number;
}) => {
  const [active, setActive] = useState(0);
  const tabLabels = [
    "OVERVIEW",
    "USAGE",
    "API",
    "EXAMPLES",
    "CHANGELOG",
    "FAQ",
  ].slice(0, tabCount);
  return (
    <div>
      <div
        className={`flex ${variant === "pill" ? "gap-2 p-1 bg-surface-2 border border-border" : "border-b border-border"}`}
      >
        {tabLabels.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`font-display text-[13px] font-semibold tracking-[0.08em] uppercase px-5 py-3 transition-colors bg-transparent ${
              variant === "pill"
                ? active === i
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-card-foreground"
                : active === i
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground border-b-2 border-transparent hover:text-card-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-6 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          Content for {tabLabels[active >= tabCount ? 0 : active]} tab.
        </p>
      </div>
    </div>
  );
};

const NavigationDemos = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* 11. Nav Header */}
      <ComponentPreview
        id="nav-header"
        title="11. Navigation — Header"
        showViewport
        description="Fixed, blur backdrop, 64px height. Nav link: Orbitron, uppercase, diamond indicator on active."
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
            description: "Logo element or brand mark",
          },
          {
            name: "navItems",
            type: "{ label: string; href: string; active?: boolean }[]",
            required: true,
            description: "Navigation link items",
          },
          {
            name: "sticky",
            type: "boolean",
            default: "true",
            required: false,
            description: "Fixed position with backdrop blur",
          },
          {
            name: "actions",
            type: "ReactNode",
            required: false,
            description: "Right-side action buttons (search, theme toggle)",
          },
        ]}
        api={[
          {
            name: "useScrollDirection",
            signature: "() => 'up' | 'down'",
            description:
              "Hook to auto-hide header on scroll down and reveal on scroll up.",
          },
        ]}
      >
        <div className="bg-background/85 backdrop-blur-xl border border-border p-0 -m-8 mb-0">
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
              {["HOME", "DOCS", "BLOG", "ABOUT"].map((item, i) => (
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
            <button className="sm:hidden text-muted-foreground">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ComponentPreview>

      {/* 12. Nav Sidebar */}
      <ComponentPreview
        id="nav-sidebar"
        title="12. Navigation — Sidebar (Docs)"
        showViewport
        description="Width 280px, fixed. Section label: Orbitron 11px uppercase. Active: yellow left border."
        props={[
          {
            name: "sections",
            type: "{ title: string; items: { id: string; label: string }[] }[]",
            required: true,
            description: "Grouped navigation sections with items",
          },
          {
            name: "activeId",
            type: "string",
            required: false,
            description: "Currently active item ID for highlight",
          },
          {
            name: "onNavigate",
            type: "(id: string) => void",
            required: true,
            description: "Callback when a nav item is clicked",
          },
          {
            name: "collapsible",
            type: "boolean",
            default: "true",
            required: false,
            description: "Allow sections to collapse/expand",
          },
          {
            name: "width",
            type: "number",
            default: "280",
            required: false,
            description: "Sidebar width in pixels",
          },
        ]}
      >
        <div className="max-w-[280px] bg-surface-0 border border-border p-4">
          {[
            {
              section: "GETTING STARTED",
              items: [
                { l: "Installation", active: false },
                { l: "Quick Start", active: true },
                { l: "Configuration", active: false },
              ],
            },
            {
              section: "COMPONENTS",
              items: [
                { l: "Button", active: false },
                { l: "Card", active: false },
                { l: "Input", active: false },
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

      {/* 13. Nav Tabs */}
      <ComponentPreview
        id="nav-tabs"
        title="13. Navigation — Tabs"
        description="Orbitron 13px, uppercase. Active: yellow text + yellow bottom border."
        code={`.tab.active { color: #FFD429; border-bottom-color: #FFD429; }`}
        keyboard={[
          { key: "Arrow ←/→", description: "Move focus between tabs" },
          { key: "Enter / Space", description: "Activate the focused tab" },
          { key: "Home", description: "Move focus to the first tab" },
          { key: "End", description: "Move focus to the last tab" },
        ]}
        props={[
          {
            name: "tabs",
            type: "{ label: string; content: ReactNode }[]",
            required: true,
            description: "Array of tab definitions",
          },
          {
            name: "activeIndex",
            type: "number",
            default: "0",
            required: false,
            description: "Controlled active tab index",
          },
          {
            name: "onChange",
            type: "(index: number) => void",
            required: false,
            description: "Callback when tab changes",
          },
          {
            name: "variant",
            type: '"underline" | "pill"',
            default: '"underline"',
            required: false,
            description: "Visual style of tab indicator",
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
              label: "Tab Count",
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
        <div>
          <div className="flex flex-wrap border-b border-border">
            {["OVERVIEW", "USAGE", "API", "EXAMPLES"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`font-display text-[13px] font-semibold tracking-[0.08em] uppercase px-5 py-3 border-b-2 transition-colors bg-transparent ${activeTab === i ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-card-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              {activeTab === 0 &&
                "Tab panel content for Overview section. Padding 24px 0."}
              {activeTab === 1 &&
                "Usage instructions and implementation guide."}
              {activeTab === 2 && "API reference and props documentation."}
              {activeTab === 3 && "Code examples and live demos."}
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* 14. Nav Breadcrumb */}
      <ComponentPreview
        id="nav-breadcrumb"
        title="14. Navigation — Breadcrumb"
        description="Item: Orbitron, 12px, uppercase. Separator: ›. Current: no link, font-weight 600."
        props={[
          {
            name: "items",
            type: "{ label: string; href?: string }[]",
            required: true,
            description: "Breadcrumb path items, last item is current page",
          },
          {
            name: "separator",
            type: "ReactNode",
            default: '"›"',
            required: false,
            description: "Custom separator element between items",
          },
        ]}
      >
        <nav className="flex items-center gap-2 text-xs">
          {["HOME", "DOCS", "COMPONENTS"].map((item, i) => (
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
            BUTTONS
          </span>
        </nav>
      </ComponentPreview>

      {/* 15. Nav Pagination */}
      <ComponentPreview
        id="nav-pagination"
        title="15. Navigation — Pagination"
        description="Diamond markers. Orbitron font. Active: yellow bg, black text."
        props={[
          {
            name: "totalPages",
            type: "number",
            required: true,
            description: "Total number of pages",
          },
          {
            name: "currentPage",
            type: "number",
            required: true,
            description: "Current active page (1-indexed)",
          },
          {
            name: "onPageChange",
            type: "(page: number) => void",
            required: true,
            description: "Callback when page is changed",
          },
          {
            name: "siblingCount",
            type: "number",
            default: "1",
            required: false,
            description: "Number of sibling pages shown around current",
          },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <button className="font-display text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 bg-transparent">
            ◆ PREV
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
            NEXT ◆
          </button>
        </div>
      </ComponentPreview>
    </>
  );
};

export default NavigationDemos;
