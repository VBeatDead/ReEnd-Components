import { OperatorCard } from "../../ui/card";
import { ViewToggle } from "../../ui/view-toggle";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

const API_BASE = import.meta.env.DEV ? "/ef-api" : "https://api.infgame.site";

interface CharacterListItem {
  slug: string;
  name: string;
  rarity: number;
  class: string;
  element: string;
  card_image_url: string;
  small_image_url: string;
  icons: {
    element?: string;
    class?: string;
    weapon?: string;
  };
}

const FALLBACK_OPERATORS: CharacterListItem[] = [
  { slug: "laevatain", name: "Laevatain", rarity: 6, class: "Guard", element: "Heat", card_image_url: "https://cdn.infgame.site/characters/laevatain/card.webp", small_image_url: "https://cdn.infgame.site/characters/laevatain/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/heat.webp" } },
  { slug: "ardelia", name: "Ardelia", rarity: 6, class: "Caster", element: "Electric", card_image_url: "https://cdn.infgame.site/characters/ardelia/card.webp", small_image_url: "https://cdn.infgame.site/characters/ardelia/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/electric.webp" } },
  { slug: "ember", name: "Ember", rarity: 6, class: "Defender", element: "Heat", card_image_url: "https://cdn.infgame.site/characters/ember/card.webp", small_image_url: "https://cdn.infgame.site/characters/ember/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/heat.webp" } },
  { slug: "chen-qianyu", name: "Chen Qianyu", rarity: 6, class: "Striker", element: "Physical", card_image_url: "https://cdn.infgame.site/characters/chen-qianyu/card.webp", small_image_url: "https://cdn.infgame.site/characters/chen-qianyu/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/physical.webp" } },
  { slug: "lifeng", name: "Lifeng", rarity: 6, class: "Supporter", element: "Nature", card_image_url: "https://cdn.infgame.site/characters/lifeng/card.webp", small_image_url: "https://cdn.infgame.site/characters/lifeng/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/nature.webp" } },
  { slug: "akekuri", name: "Akekuri", rarity: 4, class: "Vanguard", element: "Heat", card_image_url: "https://cdn.infgame.site/characters/akekuri/card.webp", small_image_url: "https://cdn.infgame.site/characters/akekuri/icon.webp", icons: { element: "https://cdn.infgame.site/icons/elements/heat.webp" } },
];

function OperatorCardDemo() {
  const { t } = useTranslation("core");
  const [selected, setSelected] = useState<string | null>("laevatain");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [operators, setOperators] = useState<CharacterListItem[]>(FALLBACK_OPERATORS);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/characters?page_size=6&sort=rarity&order=desc`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (data.data?.length) setOperators(data.data.slice(0, 6));
      })
      .catch(() => {
        // API unreachable or aborted — FALLBACK_OPERATORS stays rendered
      });
    return () => controller.abort();
  }, []);

  return (
    <ComponentPreview
      id="operator-card"
      title={t("operator_card.title", { defaultValue: "Operator Card & View Toggle" })}
      description={t("operator_card.description", { defaultValue: "Portrait 3:4 operator selection card with rarity diamonds (◆/◇). Includes ViewToggle for grid/list layout switching with localStorage persistence." })}
      props={[
        { name: "name", type: "string", required: true, description: "Operator name displayed on the card" },
        { name: "faction", type: "string", required: false, description: "Faction/affiliation label below name" },
        { name: "rarity", type: "1 | 2 | 3 | 4 | 5 | 6", required: false, description: "Rarity shown as ◆/◇ diamonds (1–6)", default: "5" },
        { name: "imageSrc", type: "string", required: false, description: "Portrait image URL — fills the 3:4 card media area" },
        { name: "selected", type: "boolean", required: false, description: "Selected/active state — highlights border in primary color" },
        { name: "onClick", type: "() => void", required: false, description: "Click handler — enables selection interaction" },
        { name: "value", type: '"grid" | "list"', required: false, description: "[ViewToggle] Controlled value" },
        { name: "defaultValue", type: '"grid" | "list"', required: false, description: "[ViewToggle] Initial value", default: '"grid"' },
        { name: "storageKey", type: "string", required: false, description: "[ViewToggle] localStorage key for persistence" },
        { name: "onChange", type: "(value) => void", required: false, description: "[ViewToggle] Change handler" },
      ]}
      code={`import { OperatorCard } from "reend-components";
import { ViewToggle } from "reend-components";

const [selected, setSelected] = useState(null);
const [view, setView] = useState("grid");

// Header with toggle
<div className="flex items-center justify-between">
  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
    ◆ OPERATOR ROSTER
  </p>
  <ViewToggle value={view} onChange={setView} storageKey="ef-op-view" />
</div>

// Grid or list of OperatorCards
{view === "grid" ? (
  <div className="flex flex-wrap gap-3">
    <OperatorCard
      name="Laevatain"
      faction="Guard"
      rarity={6}
      imageSrc="https://cdn.infgame.site/characters/laevatain/card.webp"
      selected={selected === "Laevatain"}
      onClick={() => setSelected("Laevatain")}
    />
  </div>
) : (
  <div className="border border-border divide-y divide-border">
    {/* list rows */}
  </div>
)}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {t("operator_card.label", { defaultValue: "◆ OPERATOR ROSTER — CLICK TO SELECT" })}{" "}
            <span className="text-primary ml-2">◆ {operators.length} {t("operator_card.units_label", { defaultValue: "UNITS" })}</span>
          </p>
          <ViewToggle value={view} onChange={setView} storageKey="ef-demo-op-view" />
        </div>

        {view === "grid" ? (
          <div className="flex flex-wrap gap-3">
            {operators.map((op) => (
              <OperatorCard
                key={op.slug}
                name={op.name.toUpperCase()}
                faction={op.class.toUpperCase()}
                rarity={op.rarity as 1 | 2 | 3 | 4 | 5 | 6}
                imageSrc={op.card_image_url}
                selected={selected === op.slug}
                onClick={() => setSelected(op.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {operators.map((op) => (
              <div
                key={op.slug}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors cursor-pointer"
                onClick={() => setSelected(op.slug)}
              >
                {op.small_image_url ? (
                  <img
                    src={op.small_image_url}
                    alt={op.name}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-surface-2 flex items-center justify-center shrink-0">
                    <span className="text-primary/30 text-xs">◆</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className={`font-display text-xs font-semibold uppercase ${selected === op.slug ? "text-primary" : "text-foreground"}`}>
                    {op.name}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">{op.class} · {op.element}</p>
                </div>
                {op.icons.element && (
                  <img src={op.icons.element} alt={op.element} loading="lazy" decoding="async" className="w-4 h-4 shrink-0 opacity-70" />
                )}
                <span className="font-mono text-[9px] text-primary/60 shrink-0">
                  {"◆".repeat(op.rarity)}{"◇".repeat(6 - op.rarity)}
                </span>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <p className="font-mono text-[11px] text-primary animate-fade-in">
            {t("operator_card.selected_prefix", { defaultValue: "◆ SELECTED:" })} {operators.find(o => o.slug === selected)?.name?.toUpperCase() ?? selected.toUpperCase()}
          </p>
        )}

        <p className="font-mono text-[9px] text-muted-foreground/50 text-right pt-1 border-t border-border/30">
          <a href="https://endfield.gryphline.com/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground underline">Arknights: Endfield</a> © HyperGryph Co., Ltd.
        </p>
      </div>
    </ComponentPreview>
  );
}

export default OperatorCardDemo;
