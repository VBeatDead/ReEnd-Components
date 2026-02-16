import { ComponentPreview } from "../../docs/ComponentPreview";
import { useState } from "react";
import { Search, Eye, EyeOff, ChevronDown } from "lucide-react";

const FormsDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [toggled, setToggled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ComponentPreview
      id="forms-input"
      title="10. Forms & Input"
      description="Label: Orbitron 12px uppercase. Focus: yellow border + glow ring. Error: red border."
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
          description: "Field label displayed in Orbitron uppercase",
        },
        {
          name: "type",
          type: '"text" | "email" | "password" | "search" | "textarea" | "select"',
          default: '"text"',
          required: false,
          description: "Input field type",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          description: "Placeholder text shown when empty",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          required: false,
          description: "Shows red asterisk and enables validation",
        },
        {
          name: "error",
          type: "string",
          required: false,
          description: "Error message — triggers red border and glow",
        },
        {
          name: "success",
          type: "string",
          required: false,
          description: "Success message — triggers green border",
        },
        {
          name: "helperText",
          type: "string",
          required: false,
          description: "Subtle hint text below the input",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          required: false,
          description: "Disables the input with muted styling",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "Controlled input value",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          required: false,
          description: "Change handler for controlled input",
        },
      ]}
      keyboard={[
        { key: "Tab", description: "Move focus to the next form field" },
        {
          key: "Shift + Tab",
          description: "Move focus to the previous form field",
        },
        { key: "Enter", description: "Submit the form or toggle checkbox" },
        {
          key: "Space",
          description: "Toggle checkbox/switch, open select dropdown",
        },
        { key: "Escape", description: "Close dropdown / cancel edit" },
        { key: "Arrow ↑/↓", description: "Navigate select dropdown options" },
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
          description:
            "Applies yellow border on focus. Always pair with focus:shadow glow ring for the complete Endfield focus style.",
        },
        {
          name: "border-ef-red",
          signature: "error state",
          description:
            "Red border for validation errors. Combine with shadow-[0_0_0_3px_rgba(255,71,87,0.1)] for the error glow.",
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
            label: "State",
            type: "select",
            options: ["default", "error", "success", "disabled"],
            default: "default",
          },
          {
            name: "label",
            label: "Label",
            type: "text",
            default: "FIELD LABEL",
          },
          { name: "placeholder", type: "text", default: "Enter value..." },
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
                  ✕ This field has an error.
                </p>
              )}
              {v.state === "success" && (
                <p className="text-xs text-ef-green">✓ Looks good!</p>
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
            EMAIL ADDRESS <span className="text-ef-red">*</span>
          </label>
          <input
            type="email"
            placeholder="endministrator@endfield.icu"
            className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Helper text for additional info
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
            USERNAME
          </label>
          <input
            type="text"
            value="ab"
            readOnly
            className="w-full bg-surface-1 border border-ef-red text-card-foreground px-4 py-3 text-sm shadow-[0_0_0_3px_rgba(255,71,87,0.1)] outline-none"
          />
          <p className="text-xs text-ef-red">
            ✕ Username must be at least 3 characters.
          </p>
        </div>

        {/* Success state */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            CALLSIGN
          </label>
          <input
            type="text"
            value="Endministrator"
            readOnly
            className="w-full bg-surface-1 border border-ef-green text-card-foreground px-4 py-3 text-sm outline-none"
          />
          <p className="text-xs text-ef-green">✓ Callsign is available.</p>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            MESSAGE{" "}
            <span className="text-muted-foreground font-normal">
              (OPTIONAL)
            </span>
          </label>
          <textarea
            placeholder="Type your message here..."
            rows={4}
            className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all resize-y"
          />
        </div>

        {/* Select */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            CATEGORY
          </label>
          <div className="relative">
            <select className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm appearance-none outline-none focus:border-primary transition-all">
              <option>Select category...</option>
              <option>Operations</option>
              <option>Engineering</option>
              <option>Research</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Checkbox & Radio */}
        <div className="flex gap-8">
          <div className="space-y-3">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
              CHECKBOX
            </p>
            {["Option A", "Option B"].map((opt, i) => (
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
              RADIO (DIAMOND)
            </p>
            {["Choice A", "Choice B"].map((opt, i) => (
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
            TOGGLE
          </p>
          <button
            onClick={() => setToggled(!toggled)}
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
            SEARCH
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-surface-1 border border-border text-card-foreground pl-10 pr-16 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
};

export default FormsDemo;
