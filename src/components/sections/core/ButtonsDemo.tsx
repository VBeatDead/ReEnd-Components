import { ComponentPreview } from "../../docs/ComponentPreview";
import { ArrowRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

function ButtonsDemo() {
  const { t } = useTranslation("core");
  return (
    <ComponentPreview
      id="buttons"
      title={t("buttons.title")}
      description={t("buttons.description")}
      code={`.btn-primary {
  background: #FFD429;
  color: #0A0A0A;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700; font-size: 14px;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 14px 32px;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}`}
      props={[
        {
          name: "variant",
          type: '"primary" | "secondary" | "ghost" | "danger" | "link"',
          default: '"primary"',
          required: false,
          description: t("buttons.props.variant"),
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          required: false,
          description: t("buttons.props.size"),
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          required: false,
          description: t("buttons.props.disabled"),
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          required: false,
          description: t("buttons.props.loading"),
        },
        {
          name: "icon",
          type: "ReactNode",
          required: false,
          description: t("buttons.props.icon"),
        },
        {
          name: "onClick",
          type: "() => void",
          required: false,
          description: t("buttons.props.onClick"),
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: t("buttons.props.children"),
        },
      ]}
      keyboard={[
        { key: "Enter", description: t("buttons.keyboard.enter") },
        { key: "Space", description: t("buttons.keyboard.space") },
        { key: "Tab", description: t("buttons.keyboard.tab") },
        {
          key: "Shift + Tab",
          description: t("buttons.keyboard.shift_tab"),
        },
      ]}
      install={{
        importPath: 'import { Button } from "@/components/ui/button";',
        usage:
          '<Button variant="primary" size="md" onClick={handleClick}>\n  DEPLOY ◆\n</Button>',
        dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
      }}
      api={[
        {
          name: "clip-corner",
          signature: "className utility",
          description: t("buttons.api.clip_corner"),
        },
        {
          name: "hover:brightness-110",
          signature: "hover state",
          description: t("buttons.api.hover_brightness_110"),
        },
        {
          name: "active:brightness-90",
          signature: "active state",
          description: t("buttons.api.active_brightness_90"),
        },
      ]}
      playground={{
        componentName: "Button",
        controls: [
          {
            name: "variant",
            type: "select",
            options: ["primary", "secondary", "ghost", "danger"],
            default: "primary",
          },
          {
            name: "size",
            type: "select",
            options: ["xs", "sm", "md", "lg", "xl"],
            default: "md",
          },
          {
            name: "label",
            label: t("buttons.playground.label_text"),
            type: "text",
            default: t("buttons.playground.button_default"),
          },
          { name: "disabled", type: "boolean", default: false },
          { name: "loading", type: "boolean", default: false },
        ],
        render: (v) => {
          const sizeMap: Record<
            string,
            { px: string; font: string; h: string }
          > = {
            xs: { px: "4px 12px", font: "11px", h: "28px" },
            sm: { px: "8px 16px", font: "12px", h: "32px" },
            md: { px: "12px 28px", font: "14px", h: "44px" },
            lg: { px: "16px 36px", font: "16px", h: "52px" },
            xl: { px: "20px 48px", font: "18px", h: "60px" },
          };
          const s = sizeMap[v.size] || sizeMap.md;
          const variantClass: Record<string, string> = {
            primary:
              "clip-corner bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)]",
            secondary:
              "clip-corner border border-foreground/25 text-card-foreground hover:border-primary hover:text-primary bg-transparent",
            ghost: "text-muted-foreground hover:text-primary bg-transparent",
            danger:
              "clip-corner bg-ef-red text-foreground hover:brightness-110",
          };
          return (
            <div className="flex items-center justify-center">
              <button
                className={`font-display font-bold tracking-[0.1em] uppercase transition-all active:brightness-90 ${variantClass[v.variant] || variantClass.primary} ${v.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
                disabled={v.disabled}
              >
                {v.loading && (
                  <span className="inline-block w-4 h-4 border-2 border-current clip-corner-sm animate-diamond-spin mr-2" />
                )}
                {v.label}
              </button>
            </div>
          );
        },
      }}
    >
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.variants_heading")}
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all active:brightness-90">
              {t("buttons.primary")}
            </button>
            <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:border-primary hover:text-primary transition-all bg-transparent">
              {t("buttons.secondary")}
            </button>
            <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3.5 hover:text-primary transition-all bg-transparent">
              {t("buttons.ghost")}
            </button>
            <button className="clip-corner bg-ef-red text-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:brightness-110 transition-all">
              {t("buttons.danger")}
            </button>
            <button
              className="bg-foreground/5 border border-border text-muted-foreground p-3 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              aria-label={t("buttons.add_item")}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 hover:gap-3 transition-all group bg-transparent">
              {t("buttons.link")}{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.sizes_heading")}
          </h3>
          <div className="flex flex-wrap gap-3 items-end">
            {[
              { size: "XS", px: "4px 12px", font: "11px", h: "28px" },
              { size: "SM", px: "8px 16px", font: "12px", h: "32px" },
              { size: "MD", px: "12px 28px", font: "14px", h: "44px" },
              { size: "LG", px: "16px 36px", font: "16px", h: "52px" },
              { size: "XL", px: "20px 48px", font: "18px", h: "60px" },
            ].map((s) => (
              <button
                key={s.size}
                className="clip-corner bg-primary text-primary-foreground font-display font-bold tracking-[0.1em] uppercase transition-all hover:brightness-110"
                style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.states_heading")}
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5">
              {t("buttons.default")}
            </button>
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 brightness-110 shadow-[0_0_20px_hsl(47_100%_56%/0.3)]">
              {t("buttons.hover")}
            </button>
            <button className="clip-corner bg-ef-yellow-dark text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5">
              {t("buttons.active")}
            </button>
            <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 ring-2 ring-primary ring-offset-2 ring-offset-background">
              {t("buttons.focus")}
            </button>
            <button
              className="clip-corner bg-ef-gray text-ef-gray-mid font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 cursor-not-allowed"
              disabled
            >
              {t("buttons.disabled")}
            </button>
            <button className="clip-corner bg-primary/80 text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground clip-corner-sm animate-diamond-spin" />
              {t("buttons.loading")}
            </button>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default ButtonsDemo;
