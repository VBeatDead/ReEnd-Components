import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMeta,
  CardTitle,
} from "../../ui/card";
import { Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

function CardsDemo() {
  const { t } = useTranslation("core");
  return (
    <ComponentPreview
      id="cards"
      title={t("cards.title")}
      showViewport
      description={t("cards.description")}
      code={`import {
  Card, CardHeader, CardMeta, CardTitle,
  CardDescription, CardBody, CardFooter,
} from "reend-components";

<Card hoverable>
  <CardBody>
    <CardMeta>TACTICAL</CardMeta>
    <CardTitle>Deployment Alpha</CardTitle>
    <CardDescription>Mission briefing for the next cycle.</CardDescription>
  </CardBody>
  <CardFooter>
    <Button size="sm">Confirm</Button>
  </CardFooter>
</Card>`}
      props={[
        {
          name: "hoverable",
          type: "boolean",
          default: "false",
          required: false,
          description: t("cards.props.hoverable"),
        },
        {
          name: "selected",
          type: "boolean",
          default: "false",
          required: false,
          description: t("cards.props.selected"),
        },
        {
          name: "onClick",
          type: "() => void",
          required: false,
          description: t("cards.props.onClick"),
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: t("cards.props.children"),
        },
      ]}
      api={[
        {
          name: "before:/after: corner brackets",
          signature: "Tailwind pseudo-element utilities",
          description: t("cards.api.corner_brackets"),
        },
        {
          name: "hover:-translate-y-1",
          signature: "hover state (hoverable=true)",
          description: t("cards.api.hover_translate_y"),
        },
      ]}
      playground={{
        componentName: "Card",
        controls: [
          {
            name: "variant",
            type: "select",
            options: ["content", "feature", "stat"],
            default: "content",
          },
          { name: "hoverable", type: "boolean", default: true },
          { name: "selected", type: "boolean", default: false },
          { name: "disabled", type: "boolean", default: false },
          {
            name: "title",
            label: t("cards.playground.title_label"),
            type: "text",
            default: t("cards.playground.card_title_default"),
          },
        ],
        render: (v: Record<string, unknown>) => (
          <div className="flex justify-center">
            <Card
              hoverable={!!v.hoverable && !v.disabled}
              selected={!!v.selected}
              className={`w-72${v.disabled ? " opacity-50 pointer-events-none" : ""}`}
            >
              {v.variant === "content" && (
                <>
                  <div className="aspect-video bg-surface-2 flex items-center justify-center overflow-hidden">
                    <span className="font-display text-sm text-muted-foreground">
                      {t("cards.aspect_ratio")}
                    </span>
                  </div>
                  <CardBody>
                    <CardMeta>{t("cards.overline")}</CardMeta>
                    <CardTitle>{String(v.title)}</CardTitle>
                    <CardDescription>
                      {t("cards.playground_desc")}
                    </CardDescription>
                  </CardBody>
                </>
              )}
              {v.variant === "feature" && (
                <CardBody>
                  <div className="w-10 h-10 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
                    <Minus className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>{String(v.title)}</CardTitle>
                  <CardDescription>
                    {t("cards.playground_feature_desc")}
                  </CardDescription>
                </CardBody>
              )}
              {v.variant === "stat" && (
                <CardBody className="text-center flex flex-col items-center justify-center">
                  <p className="font-display text-3xl font-bold text-primary mb-1">
                    {t("cards.stat_value")}
                  </p>
                  <p className="font-display text-xs tracking-[0.1em] uppercase text-muted-foreground">
                    {String(v.title)}
                  </p>
                </CardBody>
              )}
            </Card>
          </div>
        ),
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content Card */}
        <Card hoverable className="overflow-hidden">
          <div className="aspect-video bg-surface-2 flex items-center justify-center">
            <span className="font-display text-2xl text-muted-foreground">
              {t("cards.aspect_ratio")}
            </span>
          </div>
          <CardBody>
            <CardMeta>{t("cards.tactical")}</CardMeta>
            <CardTitle>{t("cards.content_card")}</CardTitle>
            <CardDescription>{t("cards.content_card_desc")}</CardDescription>
          </CardBody>
        </Card>

        {/* Feature Card */}
        <Card hoverable>
          <CardBody>
            <div className="w-10 h-10 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
              <Minus className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>{t("cards.feature_card")}</CardTitle>
            <CardDescription>{t("cards.feature_card_desc")}</CardDescription>
          </CardBody>
        </Card>

        {/* Stat Card */}
        <Card hoverable>
          <CardBody className="text-center flex flex-col items-center justify-center">
            <p className="font-display text-4xl font-bold text-primary mb-1">
              {t("cards.stat_value")}
            </p>
            <p className="font-display text-xs tracking-[0.1em] uppercase text-muted-foreground">
              {t("cards.uptime")}
            </p>
            <div className="mt-3 w-full h-1 bg-surface-2">
              <div className="h-full bg-primary w-[99.9%]" />
            </div>
          </CardBody>
        </Card>
      </div>
    </ComponentPreview>
  );
}

export default CardsDemo;
