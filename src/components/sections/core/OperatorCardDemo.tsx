import { OperatorCard } from "../../ui/card";
import { ViewToggle } from "../../ui/view-toggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

const OPERATORS = [
  { name: "CORAX", faction: "RHODES ISLAND", rarity: 6 as const },
  { name: "PERLICA", faction: "ENDFIELD", rarity: 5 as const },
  { name: "THALES", faction: "ENDFIELD", rarity: 6 as const },
  { name: "RECRUIT", faction: "UNAFFILIATED", rarity: 3 as const },
  { name: "SENTINEL", faction: "ENDFIELD", rarity: 4 as const },
  { name: "VAGRANT", faction: "RHODES ISLAND", rarity: 5 as const },
];

function OperatorCardDemo() {
  const { t } = useTranslation("core");
  const [selected, setSelected] = useState<string | null>("CORAX");
  const [view, setView] = useState<"grid" | "list">("grid");

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
      name="Corax"
      faction="Rhodes Island"
      rarity={6}
      selected={selected === "Corax"}
      onClick={() => setSelected("Corax")}
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
            <span className="text-primary ml-2">◆ {OPERATORS.length} {t("operator_card.units_label", { defaultValue: "UNITS" })}</span>
          </p>
          <ViewToggle value={view} onChange={setView} storageKey="ef-demo-op-view" />
        </div>

        {view === "grid" ? (
          <div className="flex flex-wrap gap-3">
            {OPERATORS.map((op) => (
              <OperatorCard
                key={op.name}
                name={op.name}
                faction={op.faction}
                rarity={op.rarity}
                selected={selected === op.name}
                onClick={() => setSelected(op.name)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {OPERATORS.map((op) => (
              <div
                key={op.name}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors cursor-pointer"
                onClick={() => setSelected(op.name)}
              >
                <div className="w-8 h-8 bg-surface-2 flex items-center justify-center shrink-0">
                  <span className="text-primary/30 text-xs">◆</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-display text-xs font-semibold uppercase ${selected === op.name ? "text-primary" : "text-foreground"}`}>
                    {op.name}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">{op.faction}</p>
                </div>
                <span className="font-mono text-[9px] text-primary/60 shrink-0">
                  {"◆".repeat(op.rarity)}{"◇".repeat(6 - op.rarity)}
                </span>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <p className="font-mono text-[11px] text-primary animate-fade-in">
            {t("operator_card.selected_prefix", { defaultValue: "◆ SELECTED:" })} {selected}
          </p>
        )}
      </div>
    </ComponentPreview>
  );
}

export default OperatorCardDemo;
