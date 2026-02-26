import { LinkCard } from "../../ui/card";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

function LinkCardDemo() {
  const { t } = useTranslation("core");
  const cards = [
    { title: t("link_card.sample_1", { defaultValue: "OPERATOR DATABASE" }), icon: "◆" },
    { title: t("link_card.sample_2", { defaultValue: "MISSION ARCHIVE" }), icon: "◇" },
    { title: t("link_card.sample_3", { defaultValue: "TACTICAL MANUAL" }), icon: "◆" },
    { title: t("link_card.sample_4", { defaultValue: "SYSTEM PROTOCOLS" }), icon: "◇" },
  ];

  return (
    <ComponentPreview
      id="link-card"
      title={t("link_card.title", { defaultValue: "Link Card" })}
      description={t("link_card.description", { defaultValue: "Navigation card with icon, title, and animated arrow. Wraps in <a> when href is provided, otherwise uses onClick handler." })}
      props={[
        { name: "title", type: "string", required: true, description: "Card label" },
        { name: "icon", type: "ReactNode", required: false, description: "Left icon element" },
        { name: "href", type: "string", required: false, description: "Link URL — wraps in <a>" },
        { name: "external", type: "boolean", required: false, description: "Opens in new tab" },
        { name: "onClick", type: "() => void", required: false, description: "Click handler (no href)" },
      ]}
      code={`import { LinkCard } from "reend-components";

<LinkCard
  title="OPERATOR DATABASE"
  icon={<span className="text-primary">◆</span>}
  href="/docs/operators"
/>`}
    >
      <div className="flex flex-col gap-2 max-w-sm">
        {cards.map(({ title, icon }) => (
          <LinkCard
            key={title}
            title={title}
            icon={<span className="text-primary text-base font-display">{icon}</span>}
            onClick={() => {}}
          />
        ))}
      </div>
    </ComponentPreview>
  );
}

export default LinkCardDemo;
