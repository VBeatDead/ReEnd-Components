import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { TacticalPanel, HoloCard } from "./primitives";
import { Shield, Zap, Radio, Crosshair, Activity, Wifi } from "lucide-react";

function SignatureCoreSection() {
  const { t } = useTranslation("signature");

  return (
    <>
      {/* TACTICAL PANEL */}
      <ComponentPreview
        id="tactical-panel"
        title={t("core.tactical_panel.title")}
        showViewport
        description={t("core.tactical_panel.description")}
        code={`<TacticalPanel title="UNIT STATUS" status="online">
  <div>Panel content with scanline overlay
  and 4-corner accent brackets.</div>
</TacticalPanel>`}
        props={[
          {
            name: "title",
            type: "string",
            required: true,
            description: t("core.tactical_panel.prop_title"),
          },
          {
            name: "status",
            type: '"online" | "warning" | "offline" | "scanning"',
            default: '"online"',
            required: false,
            description: t("core.tactical_panel.prop_status"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("core.tactical_panel.prop_children"),
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
                    {t("demo.tp_uptime")}
                  </p>
                  <p className="font-display text-lg font-bold text-primary">
                    99.97%
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    {t("demo.tp_latency")}
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
          <TacticalPanel title={t("demo.tp_sector_alpha")} status="online">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-muted-foreground">
                  {t("demo.tp_units_deployed")}
                </span>
                <span className="font-display text-sm font-bold text-primary">
                  24 / 24
                </span>
              </div>
              <div className="h-1.5 bg-surface-2 overflow-hidden">
                <div className="h-full bg-ef-green w-full" />
              </div>
              <p className="font-mono text-[10px] text-ef-green">
                {t("demo.tp_all_nominal")}
              </p>
            </div>
          </TacticalPanel>
          <TacticalPanel title={t("demo.tp_sector_beta")} status="warning">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-muted-foreground">
                  {t("demo.tp_units_deployed")}
                </span>
                <span className="font-display text-sm font-bold text-ef-yellow">
                  18 / 24
                </span>
              </div>
              <div className="h-1.5 bg-surface-2 overflow-hidden">
                <div className="h-full bg-ef-yellow w-3/4" />
              </div>
              <p className="font-mono text-[10px] text-ef-yellow">
                {t("demo.tp_partial_coverage")}
              </p>
            </div>
          </TacticalPanel>
        </div>
      </ComponentPreview>

      {/* HOLO CARD */}
      <ComponentPreview
        id="holo-card"
        title={t("core.holo_card.title")}
        showViewport
        description={t("core.holo_card.description")}
        code={`<HoloCard title="DEFENSE GRID" subtitle="Automated perimeter scan" icon={Shield} value="A+" />`}
        props={[
          {
            name: "title",
            type: "string",
            required: true,
            description: t("core.holo_card.prop_title"),
          },
          {
            name: "subtitle",
            type: "string",
            required: true,
            description: t("core.holo_card.prop_subtitle"),
          },
          {
            name: "icon",
            type: "LucideIcon",
            required: true,
            description: t("core.holo_card.prop_icon"),
          },
          {
            name: "value",
            type: "string",
            required: false,
            description: t("core.holo_card.prop_value"),
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <HoloCard
            icon={Shield}
            title={t("demo.hc_defense_grid")}
            subtitle={t("demo.hc_defense_sub")}
            value="A+"
          />
          <HoloCard
            icon={Zap}
            title={t("demo.hc_power_output")}
            subtitle={t("demo.hc_power_sub")}
            value="847MW"
          />
          <HoloCard
            icon={Radio}
            title={t("demo.hc_comms_array")}
            subtitle={t("demo.hc_comms_sub")}
            value="12ch"
          />
          <HoloCard
            icon={Activity}
            title={t("demo.hc_vital_signs")}
            subtitle={t("demo.hc_vital_sub")}
          />
          <HoloCard
            icon={Wifi}
            title={t("demo.hc_network")}
            subtitle={t("demo.hc_network_sub")}
            value="99.9%"
          />
          <HoloCard
            icon={Crosshair}
            title={t("demo.hc_targeting")}
            subtitle={t("demo.hc_targeting_sub")}
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export default SignatureCoreSection;
