import { ComponentPreview } from "../../docs/ComponentPreview";
import { TacticalPanel, HoloCard } from "./primitives";
import { Shield, Zap, Radio, Crosshair, Activity, Wifi } from "lucide-react";

const SignatureCoreSection = () => (
  <>
    {/* TACTICAL PANEL */}
    <ComponentPreview
      id="tactical-panel"
      title="Tactical Panel"
      description="Panel HUD dengan scanline overlay, corner accent 4-sisi, dan status indicator. Cocok untuk dashboard atau monitoring UI."
      code={`<TacticalPanel title="UNIT STATUS" status="online">
  <div>Panel content with scanline overlay
  and 4-corner accent brackets.</div>
</TacticalPanel>`}
      props={[
        {
          name: "title",
          type: "string",
          required: true,
          description: "Judul panel di header bar",
        },
        {
          name: "status",
          type: '"online" | "warning" | "offline" | "scanning"',
          default: '"online"',
          required: false,
          description: "Status indicator dengan warna dan label",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Konten panel",
        },
      ]}
      playground={{
        componentName: "TacticalPanel",
        controls: [
          {
            name: "title",
            label: "Title",
            type: "text",
            default: "UNIT STATUS",
          },
          {
            name: "status",
            type: "select",
            options: ["online", "warning", "offline", "scanning"],
            default: "online",
          },
        ],
        render: (v) => (
          <TacticalPanel title={v.title} status={v.status}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  UPTIME
                </p>
                <p className="font-display text-lg font-bold text-primary">
                  99.97%
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  LATENCY
                </p>
                <p className="font-display text-lg font-bold text-foreground">
                  12ms
                </p>
              </div>
            </div>
          </TacticalPanel>
        ),
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TacticalPanel title="SECTOR ALPHA" status="online">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-muted-foreground">
                UNITS DEPLOYED
              </span>
              <span className="font-display text-sm font-bold text-primary">
                24 / 24
              </span>
            </div>
            <div className="h-1.5 bg-surface-2 overflow-hidden">
              <div className="h-full bg-ef-green w-full" />
            </div>
            <p className="font-mono text-[10px] text-ef-green">
              ALL SYSTEMS NOMINAL ◆
            </p>
          </div>
        </TacticalPanel>
        <TacticalPanel title="SECTOR BETA" status="warning">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-muted-foreground">
                UNITS DEPLOYED
              </span>
              <span className="font-display text-sm font-bold text-ef-yellow">
                18 / 24
              </span>
            </div>
            <div className="h-1.5 bg-surface-2 overflow-hidden">
              <div className="h-full bg-ef-yellow w-3/4" />
            </div>
            <p className="font-mono text-[10px] text-ef-yellow">
              PARTIAL COVERAGE ◆
            </p>
          </div>
        </TacticalPanel>
      </div>
    </ComponentPreview>

    {/* HOLO CARD */}
    <ComponentPreview
      id="holo-card"
      title="Holo Card"
      description="Card dengan efek holographic scan line — garis cahaya bergerak vertikal saat hover. Clip-corner + shimmer gradient."
      code={`<HoloCard title="DEFENSE GRID" subtitle="Automated perimeter scan" icon={Shield} value="A+" />`}
      props={[
        {
          name: "title",
          type: "string",
          required: true,
          description: "Judul card",
        },
        {
          name: "subtitle",
          type: "string",
          required: true,
          description: "Deskripsi singkat",
        },
        {
          name: "icon",
          type: "LucideIcon",
          required: true,
          description: "Icon dari Lucide",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "Nilai/metrik besar opsional",
        },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <HoloCard
          icon={Shield}
          title="DEFENSE GRID"
          subtitle="Perimeter fully secured"
          value="A+"
        />
        <HoloCard
          icon={Zap}
          title="POWER OUTPUT"
          subtitle="Reactor at optimal level"
          value="847MW"
        />
        <HoloCard
          icon={Radio}
          title="COMMS ARRAY"
          subtitle="12 channels active"
          value="12ch"
        />
        <HoloCard
          icon={Activity}
          title="VITAL SIGNS"
          subtitle="All operators nominal"
        />
        <HoloCard
          icon={Wifi}
          title="NETWORK"
          subtitle="Mesh topology online"
          value="99.9%"
        />
        <HoloCard
          icon={Crosshair}
          title="TARGETING"
          subtitle="Lock-on calibrated"
        />
      </div>
    </ComponentPreview>
  </>
);

export default SignatureCoreSection;
