import { DatePicker } from "../../ui/date-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

function DatePickerDemo() {
  const { t } = useTranslation("core");
  const [missionDate, setMissionDate] = useState("");
  const [deployDate, setDeployDate] = useState("2026-02-21");

  return (
    <ComponentPreview
      id="date-picker"
      title={t("date_picker.title", { defaultValue: "Date Picker" })}
      description={t("date_picker.description", { defaultValue: "Full custom calendar picker with Endfield aesthetics. Diamond-shaped selected day (◆ clip-path), year/month navigation with ◂◂/◂/▸/▸▸, TODAY and CLEAR actions, and minDate/maxDate support." })}
      props={[
        { name: "value", type: "string", required: false, description: "ISO date YYYY-MM-DD" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "label", type: "string", required: false, description: "Field label" },
        { name: "size", type: '"sm" | "md" | "lg"', required: false, description: "Height variant", default: '"md"' },
        { name: "error", type: "boolean", required: false, description: "Error border + ring" },
        { name: "disabled", type: "boolean", required: false, description: "Disabled state" },
        { name: "minDate", type: "string", required: false, description: "Disable dates before this ISO date" },
        { name: "maxDate", type: "string", required: false, description: "Disable dates after this ISO date" },
        { name: "placeholder", type: "string", required: false, description: "Trigger placeholder text", default: '"YYYY.MM.DD"' },
      ]}
      code={`import { DatePicker } from "reend-components";

<DatePicker
  label="MISSION DATE"
  value={date}
  onChange={setDate}
  minDate="2026-01-01"
/>`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
        <DatePicker
          label={t("date_picker.label_mission", { defaultValue: "MISSION DATE" })}
          value={missionDate}
          onChange={setMissionDate}
        />
        <DatePicker
          label={t("date_picker.label_deployment", { defaultValue: "DEPLOYMENT DATE" })}
          value={deployDate}
          onChange={setDeployDate}
        />
        <DatePicker
          label={t("date_picker.state_error", { defaultValue: "ERROR STATE" })}
          error
          placeholder="YYYY-MM-DD"
        />
        <DatePicker
          label={t("date_picker.state_disabled", { defaultValue: "DISABLED" })}
          disabled
          value="2026-01-01"
        />
        <DatePicker
          label={t("date_picker.state_compact", { defaultValue: "COMPACT (SM)" })}
          size="sm"
        />
        <DatePicker
          label={t("date_picker.state_expanded", { defaultValue: "EXPANDED (LG)" })}
          size="lg"
        />
      </div>
    </ComponentPreview>
  );
}

export default DatePickerDemo;
