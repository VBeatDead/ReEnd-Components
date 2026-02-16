import { ComponentPreview } from "../../docs/ComponentPreview";
import { TacticalBadge, CoordinateTag } from "./primitives";
import RadarChart from "./RadarChart";

const SignatureDataSection = () => (
  <>
    {/* TACTICAL BADGE */}
    <ComponentPreview
      id="tactical-badge"
      title="Tactical Badge"
      description="Badge dengan clip-corner-sm dan diamond marker ◆. Pengganti rounded-pill badge standar — sesuai identitas angular Endfield."
      code={`<TacticalBadge variant="success">VERIFIED</TacticalBadge>`}
      props={[
        {
          name: "variant",
          type: '"default" | "success" | "warning" | "danger" | "info"',
          default: '"default"',
          required: false,
          description: "Warna dan tone badge",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Label badge",
        },
      ]}
      playground={{
        componentName: "TacticalBadge",
        controls: [
          {
            name: "variant",
            type: "select",
            options: ["default", "success", "warning", "danger", "info"],
            default: "default",
          },
          { name: "label", label: "Label", type: "text", default: "ACTIVE" },
        ],
        render: (v) => (
          <div className="flex items-center justify-center py-4">
            <TacticalBadge variant={v.variant}>{v.label}</TacticalBadge>
          </div>
        ),
      }}
    >
      <div className="flex flex-wrap gap-3 items-center">
        <TacticalBadge variant="default">ACTIVE</TacticalBadge>
        <TacticalBadge variant="success">VERIFIED</TacticalBadge>
        <TacticalBadge variant="warning">UNSTABLE</TacticalBadge>
        <TacticalBadge variant="danger">CRITICAL</TacticalBadge>
        <TacticalBadge variant="info">SCANNING</TacticalBadge>
      </div>
    </ComponentPreview>

    {/* COORDINATE TAG */}
    <ComponentPreview
      id="coordinate-tag"
      title="Coordinate Tag"
      description="Label data key-value ringkas bergaya terminal. Cocok untuk metadata, spesifikasi, atau status singkat."
      code={`<CoordinateTag label="LAT" value="37.7749" unit="°N" />`}
      props={[
        {
          name: "label",
          type: "string",
          required: true,
          description: "Key/label data",
        },
        {
          name: "value",
          type: "string",
          required: true,
          description: "Nilai data",
        },
        {
          name: "unit",
          type: "string",
          required: false,
          description: "Satuan opsional",
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
      title="Radar Chart"
      description="Chart radar khas HUD dengan grid poligonal, titik data bercahaya, dan animasi reveal. Pure SVG tanpa library eksternal."
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
          description: "Array data (value 0-100)",
        },
        {
          name: "size",
          type: "number",
          default: "280",
          required: false,
          description: "Ukuran chart (px)",
        },
        {
          name: "color",
          type: "string",
          default: "primary",
          required: false,
          description: "Warna fill area",
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

export default SignatureDataSection;
