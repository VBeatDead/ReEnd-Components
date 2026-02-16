import { ComponentPreview } from "../../docs/ComponentPreview";
import { DiamondLoader, WarningBanner } from "./primitives";

const SignatureFeedbackSection = () => (
  <>
    {/* DIAMOND LOADER */}
    <ComponentPreview
      id="diamond-loader"
      title="Diamond Loader"
      description="Loading spinner berbentuk berlian bertumpuk — rotasi berlawanan arah. Signature Endfield yang menggantikan spinner biasa."
      code={`<DiamondLoader size="md" label="LOADING" />`}
      props={[
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          required: false,
          description: "Ukuran loader",
        },
        {
          name: "label",
          type: "string",
          required: false,
          description: "Teks status di bawah loader",
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
        <DiamondLoader size="sm" label="BUFFERING" />
        <DiamondLoader size="md" label="LOADING" />
        <DiamondLoader size="lg" label="INITIALIZING" />
      </div>
    </ComponentPreview>

    {/* WARNING BANNER */}
    <ComponentPreview
      id="warning-banner"
      title="Warning Banner"
      description="Banner peringatan bergaya militer dengan tiga level: caution (kuning), alert (oranye), critical (merah). Clip-corner dengan icon AlertTriangle."
      code={`<WarningBanner level="caution">Area ini dalam pengawasan ketat.</WarningBanner>`}
      props={[
        {
          name: "level",
          type: '"caution" | "alert" | "critical"',
          default: '"caution"',
          required: false,
          description: "Tingkat keparahan peringatan",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Pesan peringatan",
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
          Routine maintenance scheduled at 0300. Expect intermittent
          connectivity.
        </WarningBanner>
        <WarningBanner level="alert">
          Anomaly detected in sector 7-G. Dispatching reconnaissance unit.
        </WarningBanner>
        <WarningBanner level="critical">
          Perimeter breach detected. All units standby for immediate response.
        </WarningBanner>
      </div>
    </ComponentPreview>
  </>
);

export default SignatureFeedbackSection;
