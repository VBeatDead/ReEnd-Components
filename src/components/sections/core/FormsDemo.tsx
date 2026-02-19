import { ComponentPreview } from "../../docs/ComponentPreview";
import { useState } from "react";
import { Search, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input, Label, HelperText } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";

function FormsDemo() {
  const { t } = useTranslation("core");
  const [inputValue, setInputValue] = useState("");
  const [toggled, setToggled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [radioValue, setRadioValue] = useState("choice_a");

  return (
    <ComponentPreview
      id="forms-input"
      title={t("forms.title")}
      showViewport
      description={t("forms.description")}
      code={`import { Input, Label, HelperText } from "reend-components";
import { Textarea } from "reend-components";

<div className="space-y-2">
  <Label htmlFor="callsign">CALLSIGN</Label>
  <Input id="callsign" placeholder="Enter designation" />
  <HelperText>4–8 characters required</HelperText>
</div>

{/* Error state */}
<Input state="error" value="taken_name" />
<HelperText state="error">Username already taken</HelperText>

{/* Textarea with counter */}
<Textarea showCount maxLength={200} placeholder="Enter message" />`}
      props={[
        {
          name: "state",
          type: '"default" | "error" | "success"',
          default: '"default"',
          required: false,
          description: t("forms.props.state"),
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          required: false,
          description: t("forms.props.size"),
        },
        {
          name: "leftElement",
          type: "ReactNode",
          required: false,
          description: t("forms.props.leftElement"),
        },
        {
          name: "rightElement",
          type: "ReactNode",
          required: false,
          description: t("forms.props.rightElement"),
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          required: false,
          description: t("forms.props.disabled"),
        },
        {
          name: "showCount",
          type: "boolean",
          default: "false",
          required: false,
          description: t("forms.props.showCount"),
        },
        {
          name: "maxLength",
          type: "number",
          required: false,
          description: t("forms.props.maxLength"),
        },
      ]}
      keyboard={[
        { key: "Tab", description: t("forms.keyboard.tab") },
        {
          key: "Shift + Tab",
          description: t("forms.keyboard.shift_tab"),
        },
        { key: "Enter", description: t("forms.keyboard.enter") },
        {
          key: "Space",
          description: t("forms.keyboard.space"),
        },
        { key: "Escape", description: t("forms.keyboard.escape") },
        { key: "Arrow ↑/↓", description: t("forms.keyboard.arrow_up_down") },
      ]}
      install={{
        importPath:
          'import { Input, Label, HelperText } from "reend-components";\nimport { Textarea } from "reend-components";',
        usage:
          '<div className="space-y-2">\n  <Label htmlFor="callsign">CALLSIGN</Label>\n  <Input id="callsign" placeholder="Enter designation" />\n  <HelperText>4–8 characters required</HelperText>\n</div>',
      }}
      api={[
        {
          name: "focus-within:border-primary",
          signature: "focus state (Input wrapper)",
          description: t("forms.api.focus_border_primary"),
        },
        {
          name: "border-ef-red",
          signature: "error state",
          description: t("forms.api.border_ef_red"),
        },
        {
          name: "showCount + maxLength",
          signature: "Textarea counter",
          description: t("forms.api.show_count"),
        },
      ]}
      playground={{
        componentName: "Input",
        controls: [
          {
            name: "type",
            type: "select",
            options: ["text", "email", "password", "search"],
            default: "text",
          },
          {
            name: "state",
            label: t("forms.playground.state_label"),
            type: "select",
            options: ["default", "error", "success", "disabled"],
            default: "default",
          },
          {
            name: "size",
            type: "select",
            options: ["sm", "md", "lg"],
            default: "md",
          },
          {
            name: "label",
            label: t("forms.playground.label_label"),
            type: "text",
            default: t("forms.playground.field_label_default"),
          },
          {
            name: "placeholder",
            type: "text",
            default: t("forms.playground.placeholder_default"),
          },
          { name: "required", type: "boolean", default: false },
        ],
        render: (v: Record<string, unknown>) => {
          const isDisabled = v.state === "disabled";
          const inputState =
            v.state === "error"
              ? "error"
              : v.state === "success"
                ? "success"
                : "default";
          return (
            <div className="max-w-sm mx-auto space-y-2">
              <Label>
                {String(v.label)}{" "}
                {v.required && <span className="text-ef-red">*</span>}
              </Label>
              <Input
                type={String(v.type) as React.HTMLInputTypeAttribute}
                placeholder={String(v.placeholder)}
                disabled={isDisabled}
                state={inputState}
                size={v.size as "sm" | "md" | "lg"}
                className="w-full"
              />
              {v.state === "error" && (
                <HelperText state="error">
                  {t("forms.playground.error_field")}
                </HelperText>
              )}
              {v.state === "success" && (
                <HelperText state="success">
                  {t("forms.playground.success_field")}
                </HelperText>
              )}
            </div>
          );
        },
      }}
    >
      <div className="max-w-lg space-y-6">
        {/* Text Input with helper text */}
        <div className="space-y-2">
          <Label htmlFor="ef-email">
            {t("forms.email_address")} <span className="text-ef-red">*</span>
          </Label>
          <Input
            id="ef-email"
            type="email"
            placeholder={t("forms.placeholder_email")}
            className="w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <HelperText>{t("forms.helper_text")}</HelperText>
        </div>

        {/* Password with toggle */}
        <div className="space-y-2">
          <Label htmlFor="ef-password">{t("forms.password")}</Label>
          <Input
            id="ef-password"
            type={showPassword ? "text" : "password"}
            placeholder={t("forms.password_placeholder")}
            className="w-full"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
        </div>

        {/* Error state */}
        <div className="space-y-2">
          <Label htmlFor="ef-username" className="text-ef-red">
            {t("forms.username")}
          </Label>
          <Input
            id="ef-username"
            type="text"
            state="error"
            value={t("forms.username_value")}
            readOnly
            aria-invalid="true"
            aria-describedby="username-error"
            className="w-full"
          />
          <HelperText id="username-error" state="error">
            {t("forms.error_username")}
          </HelperText>
        </div>

        {/* Success state */}
        <div className="space-y-2">
          <Label htmlFor="ef-callsign">{t("forms.callsign")}</Label>
          <Input
            id="ef-callsign"
            type="text"
            state="success"
            value={t("forms.callsign_value")}
            readOnly
            aria-label="Callsign"
            className="w-full"
          />
          <HelperText state="success">{t("forms.success_callsign")}</HelperText>
        </div>

        {/* Textarea with character counter */}
        <div className="space-y-2">
          <Label htmlFor="ef-message">
            {t("forms.message")}{" "}
            <span className="text-muted-foreground font-normal">
              {t("forms.optional")}
            </span>
          </Label>
          <Textarea
            id="ef-message"
            placeholder={t("forms.placeholder_message")}
            rows={4}
            showCount
            maxLength={300}
            className="w-full"
          />
        </div>

        {/* Select */}
        <div className="space-y-2">
          <Label htmlFor="ef-category">{t("forms.category")}</Label>
          <Select>
            <SelectTrigger id="ef-category" className="w-full">
              <SelectValue placeholder={t("forms.select_category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operations">{t("forms.operations")}</SelectItem>
              <SelectItem value="engineering">{t("forms.engineering")}</SelectItem>
              <SelectItem value="research">{t("forms.research")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Checkbox & Radio */}
        <div className="flex flex-wrap gap-8">
          <div className="space-y-3">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
              {t("forms.checkbox")}
            </p>
            <Checkbox label={t("forms.option_a")} defaultChecked />
            <Checkbox label={t("forms.option_b")} />
          </div>
          <div className="space-y-3">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
              {t("forms.radio_diamond")}
            </p>
            <RadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
            >
              <RadioGroupItem value="choice_a" label={t("forms.choice_a")} />
              <RadioGroupItem value="choice_b" label={t("forms.choice_b")} />
            </RadioGroup>
          </div>
        </div>

        {/* Toggle */}
        <div className="space-y-2">
          <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.toggle")}
          </p>
          <Switch
            checked={toggled}
            onCheckedChange={setToggled}
            aria-label={t("forms.toggle_switch")}
          />
        </div>

        {/* Search with icon + keyboard hint */}
        <div className="space-y-2">
          <Label htmlFor="ef-search">{t("forms.search")}</Label>
          <Input
            id="ef-search"
            type="text"
            placeholder={t("forms.search_placeholder")}
            className="w-full"
            leftElement={<Search className="w-4 h-4" />}
            rightElement={
              <kbd className="font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border text-muted-foreground">
                {t("forms.keyboard_shortcut")}
              </kbd>
            }
          />
        </div>
      </div>
    </ComponentPreview>
  );
}

export default FormsDemo;
