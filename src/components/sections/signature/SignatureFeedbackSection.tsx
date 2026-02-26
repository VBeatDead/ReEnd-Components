import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { DiamondLoader } from "./primitives";

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

    </>
  );
}

export default SignatureFeedbackSection;
