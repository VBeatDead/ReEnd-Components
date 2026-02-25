import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";

export default function AccordionDemo() {
  const { t } = useTranslation("data");

  return (
    <ComponentPreview
      id="accordion"
      title={t("accordion.title")}
      description={t("accordion.description")}
      code={`import {
  Accordion, AccordionItem,
  AccordionTrigger, AccordionContent,
} from "reend-components";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>MISSION PARAMETERS</AccordionTrigger>
    <AccordionContent>
      Primary objective: Stabilize Sector 7 anomaly.
      Secondary: Recover EF-SYS logs.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>OPERATOR BRIEFING</AccordionTrigger>
    <AccordionContent>
      Three Endministrators assigned. Clearance level: ALPHA.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      props={[
        {
          name: "items",
          type: "{ title: string; content: ReactNode }[]",
          required: true,
          description: t("_props.accordion.items"),
        },
        {
          name: "defaultOpen",
          type: "number",
          required: false,
          description: t("_props.accordion.defaultOpen"),
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          required: false,
          description: t("_props.accordion.multiple"),
        },
        {
          name: "onChange",
          type: "(index: number | null) => void",
          required: false,
          description: t("_props.accordion.onChange"),
        },
      ]}
    >
      <div className="max-w-lg">
        <Accordion type="single" collapsible defaultValue="item-0">
          {[
            t("accordion.questions.what_is_endfield"),
            t("accordion.questions.how_to_install"),
            t("accordion.questions.is_production_ready"),
          ].map((q, i) => (
            <AccordionItem key={q} value={`item-${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>
                {t("accordion.answer_placeholder")}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ComponentPreview>
  );
}
