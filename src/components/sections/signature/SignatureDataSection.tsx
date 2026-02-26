import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { CoordinateTag } from "./primitives";
import RadarChart from "./RadarChart";

function SignatureDataSection() {
  const { t } = useTranslation("signature");

  return (
    <>
      {/* COORDINATE TAG */}
      <ComponentPreview
        id="coordinate-tag"
        title={t("data.coordinate_tag.title")}
        description={t("data.coordinate_tag.description")}
        code={`<CoordinateTag label="LAT" value="37.7749" unit="°N" />`}
        props={[
          {
            name: "label",
            type: "string",
            required: true,
            description: t("data.coordinate_tag.prop_label"),
          },
          {
            name: "value",
            type: "string",
            required: true,
            description: t("data.coordinate_tag.prop_value"),
          },
          {
            name: "unit",
            type: "string",
            required: false,
            description: t("data.coordinate_tag.prop_unit"),
          },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <CoordinateTag label="LAT" value="37.7749" unit="°N" />
          <CoordinateTag label="LON" value="122.4194" unit="°W" />
          <CoordinateTag label="ALT" value="2,400" unit="M" />
          <CoordinateTag label="VER" value="2.0.0" />
          <CoordinateTag label="STATUS" value="ACTIVE" />
          <CoordinateTag label="FPS" value="60" />
        </div>
      </ComponentPreview>

      {/* RADAR CHART */}
      <ComponentPreview
        id="radar-chart"
        title={t("data.radar_chart.title")}
        description={t("data.radar_chart.description")}
        code={`<RadarChart data={[
  { label: "ATK", value: 85 },
  { label: "DEF", value: 70 },
  { label: "SPD", value: 92 },
]} />`}
        props={[
          {
            name: "data",
            type: "{ label: string; value: number }[]",
            required: true,
            description: t("data.radar_chart.prop_data"),
          },
          {
            name: "size",
            type: "number",
            default: "280",
            required: false,
            description: t("data.radar_chart.prop_size"),
          },
          {
            name: "color",
            type: "string",
            default: "primary",
            required: false,
            description: t("data.radar_chart.prop_color"),
          },
        ]}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <RadarChart
            data={[
              { label: "ATK", value: 85 },
              { label: "DEF", value: 70 },
              { label: "SPD", value: 92 },
              { label: "RNG", value: 60 },
              { label: "HP", value: 78 },
              { label: "CRIT", value: 88 },
            ]}
          />
          <RadarChart
            data={[
              { label: "POWER", value: 95 },
              { label: "SPEED", value: 40 },
              { label: "ARMOR", value: 90 },
              { label: "RANGE", value: 30 },
              { label: "HEAL", value: 55 },
              { label: "UTIL", value: 65 },
            ]}
            color="cyan"
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export default SignatureDataSection;
