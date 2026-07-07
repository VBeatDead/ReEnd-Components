import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { CoordinateTag } from "./primitives";
import RadarChart from "./RadarChart";

import { EF_API_BASE } from "@/config/api";

const EMBER_ATTRS = [
  { label: "STR", value: 100 },
  { label: "WILL", value: 68 },
  { label: "AGI", value: 55 },
  { label: "INT", value: 49 },
];

const LIFENG_ATTRS = [
  { label: "WILL", value: 100 },
  { label: "INT", value: 88 },
  { label: "AGI", value: 65 },
  { label: "STR", value: 42 },
];

interface ApiMeta {
  total_characters: number;
  version: string;
  scraper_status: string;
  last_scraped: string | null;
}

const FALLBACK_META: ApiMeta = {
  total_characters: 23,
  version: "1.3.0",
  scraper_status: "completed",
  last_scraped: "2026-02-12T18:13:42.803716Z",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "< 1H AGO";
  if (hours < 24) return `${hours}H AGO`;
  const days = Math.floor(hours / 24);
  return `${days}D AGO`;
}

function SignatureDataSection() {
  const { t } = useTranslation("signature");
  const [meta, setMeta] = useState<ApiMeta>(FALLBACK_META);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${EF_API_BASE}/api/meta`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (data.data) {
          setMeta({
            total_characters: data.data.total_characters,
            version: data.data.version,
            scraper_status: data.data.scraper_status,
            last_scraped: data.data.last_scraped,
          });
        }
      })
      .catch(() => {
        // API unreachable or aborted — FALLBACK_META stays rendered
      });
    return () => controller.abort();
  }, []);

  const scraperActive = meta.scraper_status === "completed" || meta.scraper_status === "idle";

  return (
    <>
      <ComponentPreview
        id="coordinate-tag"
        title={t("data.coordinate_tag.title")}
        description={t("data.coordinate_tag.description")}
        code={`<CoordinateTag label="VER" value="1.3.0" />
<CoordinateTag label="CHARS" value="23" />
<CoordinateTag label="STATUS" value="ACTIVE" />`}
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
          <CoordinateTag label="API" value={`v${meta.version}`} />
          <CoordinateTag label="CHARS" value={String(meta.total_characters)} />
          <CoordinateTag label="STATUS" value={scraperActive ? "ACTIVE" : meta.scraper_status.toUpperCase()} />
          <CoordinateTag label="SCRAPED" value={meta.last_scraped ? timeAgo(meta.last_scraped) : "—"} />
          <CoordinateTag label="ELM" value="5" />
          <CoordinateTag label="CLASS" value="6" />
        </div>
        <p className="font-mono text-[9px] text-muted-foreground/50 mt-3 text-right">
          <a href="https://endfield.gryphline.com/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground underline">Arknights: Endfield</a> © HyperGryph Co., Ltd.
        </p>
      </ComponentPreview>

      <ComponentPreview
        id="radar-chart"
        title={t("data.radar_chart.title")}
        description={t("data.radar_chart.description")}
        code={`<RadarChart data={[
  { label: "STR", value: 100 },
  { label: "WILL", value: 68 },
  { label: "AGI", value: 55 },
  { label: "INT", value: 49 },
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
          <div className="flex flex-col items-center gap-2">
            <RadarChart data={EMBER_ATTRS} />
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              EMBER — DEFENDER / HEAT
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RadarChart data={LIFENG_ATTRS} color="cyan" />
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              LIFENG — SUPPORTER / NATURE
            </p>
          </div>
        </div>
        <p className="font-mono text-[9px] text-muted-foreground/50 mt-3 text-right">
          <a href="https://endfield.gryphline.com/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground underline">Arknights: Endfield</a> © HyperGryph Co., Ltd.
        </p>
      </ComponentPreview>
    </>
  );
}

export default SignatureDataSection;
