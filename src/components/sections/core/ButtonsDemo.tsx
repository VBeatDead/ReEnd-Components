import { Button } from "../../ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

function ButtonsDemo() {
  const { t } = useTranslation("core");
  return (
    <ComponentPreview
      id="buttons"
      title={t("buttons.title")}
      description={t("buttons.description")}
      code={`import { Button } from "reend-components";

// Primary — Endfield CTA
<Button variant="primary" size="md">DEPLOY ◆</Button>

// asChild — render as anchor
<Button asChild variant="secondary">
  <a href="/page">NAVIGATE</a>
</Button>

// Loading state
<Button loading>PROCESSING</Button>`}
      props={[
        {
          name: "variant",
          type: '"primary" | "secondary" | "ghost" | "danger" | "link" | "icon"',
          default: '"primary"',
          required: false,
          description: t("buttons.props.variant"),
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon"',
          default: '"md"',
          required: false,
          description: t("buttons.props.size"),
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          required: false,
          description: "Render as child element via Radix Slot. Use to wrap <a> or custom elements with button styling.",
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
        importPath: 'import { Button } from "reend-components";',
        usage:
          '<Button variant="primary" size="md" onClick={handleClick}>\n  DEPLOY ◆\n</Button>',
        dependencies: ["reend-components"],
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (v: any) => (
          <div className="flex items-center justify-center">
            <Button
              variant={v.variant}
              size={v.size}
              disabled={!!v.disabled}
              loading={!!v.loading}
            >
              {String(v.label)}
            </Button>
          </div>
        ),
      }}
    >
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.variants_heading")}
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">{t("buttons.primary")}</Button>
            <Button variant="secondary">{t("buttons.secondary")}</Button>
            <Button variant="ghost">{t("buttons.ghost")}</Button>
            <Button variant="danger">{t("buttons.danger")}</Button>
            <Button variant="icon" size="icon" aria-label={t("buttons.add_item")}>
              <Plus className="w-5 h-5" />
            </Button>
            <Button variant="link">
              {t("buttons.link")}{" "}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.sizes_heading")}
          </h3>
          <div className="flex flex-wrap gap-3 items-end">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <Button key={size} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* States */}
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("buttons.states_heading")}
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button>{t("buttons.default")}</Button>
            <Button className="brightness-110 shadow-glow pointer-events-none">
              {t("buttons.hover")}
            </Button>
            <Button className="brightness-90 pointer-events-none">
              {t("buttons.active")}
            </Button>
            <Button className="ring-2 ring-primary ring-offset-2 ring-offset-background pointer-events-none">
              {t("buttons.focus")}
            </Button>
            <Button disabled>{t("buttons.disabled")}</Button>
            <Button loading>{t("buttons.loading")}</Button>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default ButtonsDemo;
