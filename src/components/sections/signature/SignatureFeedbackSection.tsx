import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { DiamondLoader, WarningBanner } from "./primitives";

function SignatureFeedbackSection() {
  const { t } = useTranslation("signature");

  return (
    <>
      {/* DIAMOND LOADER */}
      <ComponentPreview
        id="diamond-loader"
        title={t("feedback.diamond_loader.title")}
        description={t("feedback.diamond_loader.description")}
        code={`<DiamondLoader size="md" label="LOADING" />`}
        props={[
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            required: false,
            description: t("feedback.diamond_loader.prop_size"),
          },
          {
            name: "label",
            type: "string",
            required: false,
            description: t("feedback.diamond_loader.prop_label"),
          },
        ]}
        playground={{
          componentName: "DiamondLoader",
          controls: [
            {
              name: "size",
              type: "select",
              options: ["sm", "md", "lg"],
              default: "md",
            },
            { name: "label", label: "Label", type: "text", default: "LOADING" },
          ],
          render: (v) => (
            <div className="flex items-center justify-center py-8">
              <DiamondLoader size={v.size} label={v.label} />
            </div>
          ),
        }}
      >
        <div className="flex items-center justify-around py-8">
          <DiamondLoader size="sm" label={t("demo.loader_buffering")} />
          <DiamondLoader size="md" label={t("demo.loader_loading")} />
          <DiamondLoader size="lg" label={t("demo.loader_initializing")} />
        </div>
      </ComponentPreview>

      {/* WARNING BANNER */}
      <ComponentPreview
        id="warning-banner"
        title={t("feedback.warning_banner.title")}
        description={t("feedback.warning_banner.description")}
        code={`<WarningBanner level="caution">Area ini dalam pengawasan ketat.</WarningBanner>`}
        props={[
          {
            name: "level",
            type: '"caution" | "alert" | "critical"',
            default: '"caution"',
            required: false,
            description: t("feedback.warning_banner.prop_level"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("feedback.warning_banner.prop_children"),
          },
        ]}
        playground={{
          componentName: "WarningBanner",
          controls: [
            {
              name: "level",
              type: "select",
              options: ["caution", "alert", "critical"],
              default: "caution",
            },
            {
              name: "message",
              label: "Message",
              type: "text",
              default: "System integrity compromised.",
            },
          ],
          render: (v) => (
            <WarningBanner level={v.level}>{v.message}</WarningBanner>
          ),
        }}
      >
        <div className="space-y-4">
          <WarningBanner level="caution">
            {t("demo.warning_caution_msg")}
          </WarningBanner>
          <WarningBanner level="alert">
            {t("demo.warning_alert_msg")}
          </WarningBanner>
          <WarningBanner level="critical">
            {t("demo.warning_critical_msg")}
          </WarningBanner>
        </div>
      </ComponentPreview>
    </>
  );
}

export default SignatureFeedbackSection;
