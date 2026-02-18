import { ComponentPreview } from "../../docs/ComponentPreview";
import { useState } from "react";
import { Search, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

function FormsDemo() {
  const { t } = useTranslation("core");
  const [inputValue, setInputValue] = useState("");
  const [toggled, setToggled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ComponentPreview
      id="forms-input"
      title={t("forms.title")}
      showViewport
      description={t("forms.description")}
      code={`/* Input States */
Default: border rgba(255,255,255,0.12)
Hover:   border rgba(255,255,255,0.2)
Focus:   border #FFD429 + shadow 0 0 0 3px rgba(255,212,41,0.1)
Error:   border #FF4757 + shadow 0 0 0 3px rgba(255,71,87,0.1)
Success: border #2ED573`}
      props={[
        {
          name: "label",
          type: "string",
          required: true,
          description: t("forms.props.label"),
        },
        {
          name: "type",
          type: '"text" | "email" | "password" | "search" | "textarea" | "select"',
          default: '"text"',
          required: false,
          description: t("forms.props.type"),
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          description: t("forms.props.placeholder"),
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          required: false,
          description: t("forms.props.required"),
        },
        {
          name: "error",
          type: "string",
          required: false,
          description: t("forms.props.error"),
        },
        {
          name: "success",
          type: "string",
          required: false,
          description: t("forms.props.success"),
        },
        {
          name: "helperText",
          type: "string",
          required: false,
          description: t("forms.props.helperText"),
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          required: false,
          description: t("forms.props.disabled"),
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: t("forms.props.value"),
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          required: false,
          description: t("forms.props.onChange"),
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
          'import { Input } from "@/components/ui/input";\nimport { Label } from "@/components/ui/label";\nimport { Switch } from "@/components/ui/switch";',
        usage:
          '<div>\n  <Label htmlFor="callsign">CALLSIGN</Label>\n  <Input id="callsign" placeholder="Enter designation" />\n</div>',
      }}
      api={[
        {
          name: "focus:border-primary",
          signature: "focus state",
          description: t("forms.api.focus_border_primary"),
        },
        {
          name: "border-ef-red",
          signature: "error state",
          description: t("forms.api.border_ef_red"),
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
        render: (v) => {
          const borderClass =
            v.state === "error"
              ? "border-ef-red shadow-[0_0_0_3px_rgba(255,71,87,0.1)]"
              : v.state === "success"
                ? "border-ef-green"
                : "border-border focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)]";
          return (
            <div className="max-w-sm mx-auto space-y-2">
              <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                {v.label} {v.required && <span className="text-ef-red">*</span>}
              </label>
              <input
                type={v.type}
                placeholder={v.placeholder}
                disabled={v.state === "disabled"}
                className={`w-full bg-surface-1 border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid outline-none transition-all ${borderClass} ${v.state === "disabled" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {v.state === "error" && (
                <p className="text-xs text-ef-red">
                  {t("forms.playground.error_field")}
                </p>
              )}
              {v.state === "success" && (
                <p className="text-xs text-ef-green">
                  {t("forms.playground.success_field")}
                </p>
              )}
            </div>
          );
        },
      }}
    >
      <div className="max-w-lg space-y-6">
        {/* Text Input */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.email_address")} <span className="text-ef-red">*</span>
          </label>
          <input
            type="email"
            placeholder={t("forms.placeholder_email")}
            className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {t("forms.helper_text")}
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("forms.password_placeholder")}
              className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 pr-12 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-transparent"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Error state */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-ef-red">
            {t("forms.username")}
          </label>
          <input
            type="text"
            value={t("forms.username_value")}
            readOnly
            aria-label="Username"
            aria-invalid="true"
            aria-describedby="username-error"
            className="w-full bg-surface-1 border border-ef-red text-card-foreground px-4 py-3 text-sm shadow-[0_0_0_3px_rgba(255,71,87,0.1)] outline-none"
          />
          <p id="username-error" className="text-xs text-ef-red">
            {t("forms.error_username")}
          </p>
        </div>

        {/* Success state */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.callsign")}
          </label>
          <input
            type="text"
            value={t("forms.callsign_value")}
            readOnly
            aria-label="Callsign"
            className="w-full bg-surface-1 border border-ef-green text-card-foreground px-4 py-3 text-sm outline-none"
          />
          <p className="text-xs text-ef-green">{t("forms.success_callsign")}</p>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.message")}{" "}
            <span className="text-muted-foreground font-normal">
              {t("forms.optional")}
            </span>
          </label>
          <textarea
            placeholder={t("forms.placeholder_message")}
            rows={4}
            className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all resize-y"
          />
        </div>

        {/* Select */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.category")}
          </label>
          <div className="relative">
            <select
              aria-label={t("forms.category")}
              className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm appearance-none outline-none focus:border-primary transition-all"
            >
              <option>{t("forms.select_category")}</option>
              <option>{t("forms.operations")}</option>
              <option>{t("forms.engineering")}</option>
              <option>{t("forms.research")}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Checkbox & Radio */}
        <div className="flex flex-wrap gap-8">
          <div className="space-y-3">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
              {t("forms.checkbox")}
            </p>
            {[t("forms.option_a"), t("forms.option_b")].map((opt, i) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-[18px] h-[18px] border-2 flex items-center justify-center transition-all ${i === 0 ? "border-primary bg-primary" : "border-border group-hover:border-primary"}`}
                >
                  {i === 0 && (
                    <span className="text-primary-foreground text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-sm text-card-foreground">{opt}</span>
              </label>
            ))}
          </div>
          <div className="space-y-3">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
              {t("forms.radio_diamond")}
            </p>
            {[t("forms.choice_a"), t("forms.choice_b")].map((opt, i) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className={`text-lg ${i === 0 ? "text-primary" : "text-ef-gray group-hover:text-muted-foreground"} transition-colors`}
                >
                  {i === 0 ? "◆" : "◇"}
                </span>
                <span className="text-sm text-card-foreground">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div className="space-y-2">
          <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.toggle")}
          </p>
          <button
            onClick={() => setToggled(!toggled)}
            role="switch"
            aria-checked={toggled}
            aria-label={t("forms.toggle_switch")}
            className={`relative w-11 h-6 rounded-none transition-colors ${toggled ? "bg-primary" : "bg-ef-gray"}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-foreground transition-transform ${toggled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {t("forms.search")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("forms.search_placeholder")}
              className="w-full bg-surface-1 border border-border text-card-foreground pl-10 pr-16 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border text-muted-foreground">
              {t("forms.keyboard_shortcut")}
            </kbd>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default FormsDemo;
