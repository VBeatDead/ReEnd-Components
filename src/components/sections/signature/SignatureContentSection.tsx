import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { GlitchText, DataStream, ScanDivider } from "./primitives";
import TopoPatternDemo from "./TopoPatternDemo";
import HUDOverlay from "./HUDOverlay";

function SignatureContentSection() {
  const { t } = useTranslation("signature");

  return (
    <>
      {/* GLITCH TEXT */}
      <ComponentPreview
        id="glitch-text"
        title={t("content.glitch_text.title")}
        description={t("content.glitch_text.description")}
        code={`.glitch-text { position: relative; }
.glitch-text::before { color: hsl(var(--ef-cyan)); clip-path: inset(20% 0 50% 0); }
.glitch-text::after { color: hsl(var(--ef-red)); clip-path: inset(50% 0 20% 0); }`}
        props={[
          {
            name: "children",
            type: "string",
            required: true,
            description: t("content.glitch_text.prop_children"),
          },
          {
            name: "className",
            type: "string",
            required: false,
            description: t("content.glitch_text.prop_className"),
          },
        ]}
      >
        <div className="flex flex-col items-center gap-8 py-8">
          <GlitchText className="font-display text-2xl sm:text-4xl font-bold tracking-[0.08em] uppercase text-foreground">
            {t("demo.glitch_endfield")}
          </GlitchText>
          <GlitchText className="font-display text-lg font-bold tracking-[0.12em] uppercase text-primary">
            {t("demo.glitch_system_online")}
          </GlitchText>
          <GlitchText className="font-mono text-sm text-muted-foreground">
            {t("demo.glitch_error")}
          </GlitchText>
        </div>
      </ComponentPreview>

      {/* DATA STREAM */}
      <ComponentPreview
        id="data-stream"
        title={t("content.data_stream.title")}
        description={t("content.data_stream.description")}
        code={`<DataStream /> // Auto-scrolling terminal with categorized color-coded messages`}
        props={[]}
      >
        <DataStream />
      </ComponentPreview>

      {/* SCAN DIVIDER */}
      <ComponentPreview
        id="scan-divider"
        title={t("content.scan_divider.title")}
        description={t("content.scan_divider.description")}
        code={`<ScanDivider label="SECTION BREAK" />`}
        props={[
          {
            name: "label",
            type: "string",
            required: false,
            description: t("content.scan_divider.prop_label"),
          },
        ]}
      >
        <div className="space-y-8 py-4">
          <ScanDivider />
          <ScanDivider label={t("demo.scan_classified")} />
          <ScanDivider label={t("demo.scan_end_transmission")} />
        </div>
      </ComponentPreview>

      {/* TOPOGRAPHIC PATTERN */}
      <ComponentPreview
        id="topo-pattern"
        title={t("content.topo_pattern.title")}
        description={t("content.topo_pattern.description")}
        code={`<TopoPattern width={600} height={300} layers={8} />`}
        props={[
          {
            name: "width",
            type: "number",
            default: "600",
            required: false,
            description: t("content.topo_pattern.prop_width"),
          },
          {
            name: "height",
            type: "number",
            default: "300",
            required: false,
            description: t("content.topo_pattern.prop_height"),
          },
          {
            name: "layers",
            type: "number",
            default: "8",
            required: false,
            description: t("content.topo_pattern.prop_layers"),
          },
        ]}
      >
        <TopoPatternDemo />
      </ComponentPreview>

      {/* HUD OVERLAY */}
      <ComponentPreview
        id="hud-overlay"
        title={t("content.hud_overlay.title")}
        description={t("content.hud_overlay.description")}
        showViewport
        code={`<HUDOverlay><YourContent /></HUDOverlay>`}
        props={[
          {
            name: "children",
            type: "ReactNode",
            required: false,
            description: t("content.hud_overlay.prop_children"),
          },
          {
            name: "showCoords",
            type: "boolean",
            default: "true",
            required: false,
            description: t("content.hud_overlay.prop_showCoords"),
          },
          {
            name: "showCrosshair",
            type: "boolean",
            default: "true",
            required: false,
            description: t("content.hud_overlay.prop_showCrosshair"),
          },
        ]}
      >
        <HUDOverlay>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-foreground">
              {t("demo.hud_field")}{" "}
              <span className="text-primary">{t("demo.hud_operative")}</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              {t("demo.hud_clearance")}
            </p>
          </div>
        </HUDOverlay>
      </ComponentPreview>
    </>
  );
}

export default SignatureContentSection;
