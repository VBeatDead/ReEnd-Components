import { ComponentPreview } from "../docs/ComponentPreview";
import { useState } from "react";
import { ArrowRight, Search, Eye, EyeOff, Plus, Minus, ChevronDown, ChevronRight, Home, X, Menu } from "lucide-react";

export const CoreComponentsSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* 8. Buttons */}
      <ComponentPreview
        id="buttons"
        title="8. Buttons"
        description="clip-path sudut terpotong, BUKAN border-radius. Uppercase, letter-spacing, Orbitron font."
        code={`.btn-primary {
  background: #FFD429;
  color: #0A0A0A;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700; font-size: 14px;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 14px 32px;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}`}
        props={[
          { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger" | "link"', default: '"primary"', required: false, description: "Visual style variant of the button" },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', required: false, description: "Controls padding, font-size, and min-height" },
          { name: "disabled", type: "boolean", default: "false", required: false, description: "Disables interaction and applies muted styling" },
          { name: "loading", type: "boolean", default: "false", required: false, description: "Shows spinning diamond loader and disables click" },
          { name: "icon", type: "ReactNode", required: false, description: "Optional icon element rendered before label" },
          { name: "onClick", type: "() => void", required: false, description: "Click handler callback" },
          { name: "children", type: "ReactNode", required: true, description: "Button label content" },
        ]}
        api={[
          { name: "clip-corner", signature: "className utility", description: "Applies the signature Endfield clipped corner polygon via clip-path. Use on any rectangular element." },
          { name: "hover:brightness-110", signature: "hover state", description: "Standard hover brightening for primary buttons. Pair with shadow glow for full effect." },
          { name: "active:brightness-90", signature: "active state", description: "Press-down darkening effect for tactile feedback." },
        ]}
        playground={{
          componentName: "Button",
          controls: [
            { name: "variant", type: "select", options: ["primary", "secondary", "ghost", "danger"], default: "primary" },
            { name: "size", type: "select", options: ["xs", "sm", "md", "lg", "xl"], default: "md" },
            { name: "label", label: "Label Text", type: "text", default: "BUTTON" },
            { name: "disabled", type: "boolean", default: false },
            { name: "loading", type: "boolean", default: false },
          ],
          render: (v) => {
            const sizeMap: Record<string, { px: string; font: string; h: string }> = {
              xs: { px: "4px 12px", font: "11px", h: "28px" },
              sm: { px: "8px 16px", font: "12px", h: "32px" },
              md: { px: "12px 28px", font: "14px", h: "44px" },
              lg: { px: "16px 36px", font: "16px", h: "52px" },
              xl: { px: "20px 48px", font: "18px", h: "60px" },
            };
            const s = sizeMap[v.size] || sizeMap.md;
            const variantClass: Record<string, string> = {
              primary: "clip-corner bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)]",
              secondary: "clip-corner border border-foreground/25 text-card-foreground hover:border-primary hover:text-primary bg-transparent",
              ghost: "text-muted-foreground hover:text-primary bg-transparent",
              danger: "clip-corner bg-ef-red text-foreground hover:brightness-110",
            };
            return (
              <div className="flex items-center justify-center">
                <button
                  className={`font-display font-bold tracking-[0.1em] uppercase transition-all active:brightness-90 ${variantClass[v.variant] || variantClass.primary} ${v.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
                  disabled={v.disabled}
                >
                  {v.loading && <span className="inline-block w-4 h-4 border-2 border-current clip-corner-sm animate-diamond-spin mr-2" />}
                  {v.label}
                </button>
              </div>
            );
          },
        }}
      >
        <div className="space-y-8">
          {/* Variants */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">VARIANTS</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all active:brightness-90">
                PRIMARY
              </button>
              <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:border-primary hover:text-primary transition-all bg-transparent">
                SECONDARY
              </button>
              <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3.5 hover:text-primary transition-all bg-transparent">
                GHOST
              </button>
              <button className="clip-corner bg-ef-red text-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:brightness-110 transition-all">
                DANGER
              </button>
              <button className="bg-foreground/5 border border-border text-muted-foreground p-3 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
                <Plus className="w-5 h-5" />
              </button>
              <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 hover:gap-3 transition-all group bg-transparent">
                LINK <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">SIZES</h3>
            <div className="flex flex-wrap gap-3 items-end">
              {[
                { size: "XS", px: "4px 12px", font: "11px", h: "28px" },
                { size: "SM", px: "8px 16px", font: "12px", h: "32px" },
                { size: "MD", px: "12px 28px", font: "14px", h: "44px" },
                { size: "LG", px: "16px 36px", font: "16px", h: "52px" },
                { size: "XL", px: "20px 48px", font: "18px", h: "60px" },
              ].map((s) => (
                <button
                  key={s.size}
                  className="clip-corner bg-primary text-primary-foreground font-display font-bold tracking-[0.1em] uppercase transition-all hover:brightness-110"
                  style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">STATES</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5">DEFAULT</button>
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 brightness-110 shadow-[0_0_20px_hsl(47_100%_56%/0.3)]">HOVER</button>
              <button className="clip-corner bg-ef-yellow-dark text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5">ACTIVE</button>
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 ring-2 ring-primary ring-offset-2 ring-offset-background">FOCUS</button>
              <button className="clip-corner bg-ef-gray text-ef-gray-mid font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 cursor-not-allowed" disabled>DISABLED</button>
              <button className="clip-corner bg-primary/80 text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground clip-corner-sm animate-diamond-spin" />
                LOADING
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 9. Cards */}
      <ComponentPreview
        id="cards"
        title="9. Cards"
        description="Corner brackets signature element. Hover: translateY(-4px), yellow border tint, shadow."
        code={`.card {
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  position: relative; overflow: hidden;
  transition: all 0.4s var(--ease-default);
}
.card::before { /* corner bracket: 24px, 2px solid yellow 0.3 */ }
.card:hover { border-color: rgba(255,212,41,0.2); transform: translateY(-4px); }`}
        props={[
          { name: "variant", type: '"content" | "feature" | "stat" | "link" | "interactive"', default: '"content"', required: false, description: "Card layout and purpose variant" },
          { name: "selected", type: "boolean", default: "false", required: false, description: "Shows selected state with primary border highlight" },
          { name: "disabled", type: "boolean", default: "false", required: false, description: "Reduces opacity and disables pointer events" },
          { name: "hoverable", type: "boolean", default: "true", required: false, description: "Enables lift and glow hover animation" },
          { name: "onClick", type: "() => void", required: false, description: "Makes the card clickable with cursor pointer" },
          { name: "children", type: "ReactNode", required: true, description: "Card body content" },
        ]}
        api={[
          { name: "corner-brackets", signature: "className utility", description: "Adds ::before and ::after pseudo-elements creating the signature Endfield corner bracket decoration (24px, primary color at 0.4 opacity)." },
          { name: "hover:-translate-y-1", signature: "hover state", description: "Lifts the card 4px on hover for depth effect. Combine with shadow and border color transition." },
        ]}
        playground={{
          componentName: "Card",
          controls: [
            { name: "variant", type: "select", options: ["content", "feature", "stat"], default: "content" },
            { name: "hoverable", type: "boolean", default: true },
            { name: "selected", type: "boolean", default: false },
            { name: "disabled", type: "boolean", default: false },
            { name: "title", label: "Title", type: "text", default: "CARD TITLE" },
          ],
          render: (v) => (
            <div className="flex justify-center">
              <div
                className={`w-72 border bg-surface-1 transition-all duration-300 ${
                  v.disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${v.hoverable && !v.disabled ? "corner-brackets hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]" : ""} ${
                  v.selected ? "border-2 border-primary/40 bg-primary/[0.06]" : "border-border"
                }`}
              >
                {v.variant === "content" && (
                  <>
                    <div className="aspect-video bg-surface-2 flex items-center justify-center">
                      <span className="font-display text-sm text-muted-foreground">16:9</span>
                    </div>
                    <div className="p-5">
                      <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary mb-2">OVERLINE</p>
                      <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">{v.title}</h4>
                      <p className="text-sm text-muted-foreground">Description text lorem ipsum dolor sit amet.</p>
                    </div>
                  </>
                )}
                {v.variant === "feature" && (
                  <div className="p-6">
                    <span className="font-display text-4xl font-bold text-primary/30">01</span>
                    <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mt-2 mb-2">{v.title}</h4>
                    <p className="text-sm text-muted-foreground">Feature card with numbering.</p>
                    <div className="mt-4 text-primary text-right">◆</div>
                  </div>
                )}
                {v.variant === "stat" && (
                  <div className="p-6">
                    <p className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1">{v.title}</p>
                    <p className="font-display text-4xl font-bold text-primary mb-1">2,847</p>
                    <p className="text-sm text-ef-green flex items-center gap-1"><span>▲</span> 12.5%</p>
                  </div>
                )}
              </div>
            </div>
          ),
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Card */}
          <div className="corner-brackets bg-surface-1 border border-border hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 group">
            <div className="aspect-video bg-surface-2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                <span className="font-display text-sm text-muted-foreground">16:9</span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary mb-2">OVERLINE</p>
              <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">CONTENT CARD TITLE</h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Description text lorem ipsum dolor sit amet consectetur.</p>
              <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all bg-transparent">
                VIEW DETAILS <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Feature Card */}
          <div className="corner-brackets bg-surface-1 border border-border hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between">
            <div>
              <span className="font-display text-4xl font-bold text-primary/30">01</span>
              <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mt-2 mb-2">FEATURE CARD</h4>
              <p className="text-sm text-muted-foreground">Informasi fitur dengan numbering dan icon di sebelah kanan.</p>
            </div>
            <div className="mt-4 self-end text-primary">◆</div>
          </div>

          {/* Stat Card */}
          <div className="corner-brackets bg-surface-1 border border-border hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 p-6">
            <p className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1">OPERATIONS</p>
            <p className="font-display text-4xl font-bold text-primary mb-1">2,847</p>
            <p className="text-sm text-ef-green flex items-center gap-1">
              <span>▲</span> 12.5% from last month
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* 10. Forms & Input */}
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
          { name: "label", type: "string", required: true, description: "Field label displayed in Orbitron uppercase" },
          { name: "type", type: '"text" | "email" | "password" | "search" | "textarea" | "select"', default: '"text"', required: false, description: "Input field type" },
          { name: "placeholder", type: "string", required: false, description: "Placeholder text shown when empty" },
          { name: "required", type: "boolean", default: "false", required: false, description: "Shows red asterisk and enables validation" },
          { name: "error", type: "string", required: false, description: "Error message — triggers red border and glow" },
          { name: "success", type: "string", required: false, description: "Success message — triggers green border" },
          { name: "helperText", type: "string", required: false, description: "Subtle hint text below the input" },
          { name: "disabled", type: "boolean", default: "false", required: false, description: "Disables the input with muted styling" },
          { name: "value", type: "string", required: false, description: "Controlled input value" },
          { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler for controlled input" },
        ]}
        api={[
          { name: "focus:border-primary", signature: "focus state", description: "Applies yellow border on focus. Always pair with focus:shadow glow ring for the complete Endfield focus style." },
          { name: "border-ef-red", signature: "error state", description: "Red border for validation errors. Combine with shadow-[0_0_0_3px_rgba(255,71,87,0.1)] for the error glow." },
        ]}
        playground={{
          componentName: "Input",
          controls: [
            { name: "type", type: "select", options: ["text", "email", "password", "search"], default: "text" },
            { name: "state", label: "State", type: "select", options: ["default", "error", "success", "disabled"], default: "default" },
            { name: "label", label: "Label", type: "text", default: "FIELD LABEL" },
            { name: "placeholder", type: "text", default: "Enter value..." },
            { name: "required", type: "boolean", default: false },
          ],
          render: (v) => {
            const borderClass = v.state === "error" ? "border-ef-red shadow-[0_0_0_3px_rgba(255,71,87,0.1)]"
              : v.state === "success" ? "border-ef-green"
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
                {v.state === "error" && <p className="text-xs text-ef-red">✕ This field has an error.</p>}
                {v.state === "success" && <p className="text-xs text-ef-green">✓ Looks good!</p>}
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
            <p className="text-xs text-muted-foreground">Helper text for additional info</p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 pr-12 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-transparent">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error state */}
          <div className="space-y-2">
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-ef-red">USERNAME</label>
            <input
              type="text"
              value="ab"
              readOnly
              className="w-full bg-surface-1 border border-ef-red text-card-foreground px-4 py-3 text-sm shadow-[0_0_0_3px_rgba(255,71,87,0.1)] outline-none"
            />
            <p className="text-xs text-ef-red">✕ Username must be at least 3 characters.</p>
          </div>

          {/* Success state */}
          <div className="space-y-2">
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">CALLSIGN</label>
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
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">MESSAGE <span className="text-muted-foreground font-normal">(OPTIONAL)</span></label>
            <textarea
              placeholder="Type your message here..."
              rows={4}
              className="w-full bg-surface-1 border border-border text-card-foreground px-4 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all resize-y"
            />
          </div>

          {/* Select */}
          <div className="space-y-2">
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">CATEGORY</label>
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
              <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">CHECKBOX</p>
              {["Option A", "Option B"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center transition-all ${i === 0 ? "border-primary bg-primary" : "border-border group-hover:border-primary"}`}>
                    {i === 0 && <span className="text-primary-foreground text-[10px]">✓</span>}
                  </div>
                  <span className="text-sm text-card-foreground">{opt}</span>
                </label>
              ))}
            </div>
            <div className="space-y-3">
              <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">RADIO (DIAMOND)</p>
              {["Choice A", "Choice B"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <span className={`text-lg ${i === 0 ? "text-primary" : "text-ef-gray group-hover:text-muted-foreground"} transition-colors`}>
                    {i === 0 ? "◆" : "◇"}
                  </span>
                  <span className="text-sm text-card-foreground">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggle */}
          <div className="space-y-2">
            <p className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">TOGGLE</p>
            <button
              onClick={() => setToggled(!toggled)}
              className={`relative w-11 h-6 rounded-none transition-colors ${toggled ? "bg-primary" : "bg-ef-gray"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-foreground transition-transform ${toggled ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">SEARCH</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-surface-1 border border-border text-card-foreground pl-10 pr-16 py-3 text-sm placeholder:text-ef-gray-mid focus:border-primary focus:shadow-[0_0_0_3px_hsl(47_100%_56%/0.1)] outline-none transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border text-muted-foreground">⌘K</kbd>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 11. Nav Header */}
      <ComponentPreview
        id="nav-header"
        title="11. Navigation — Header"
        description="Fixed, blur backdrop, 64px height. Nav link: Orbitron, uppercase, diamond indicator on active."
        code={`.header {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; z-index: 1000;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}`}
        props={[
          { name: "logo", type: "ReactNode", required: true, description: "Logo element or brand mark" },
          { name: "navItems", type: '{ label: string; href: string; active?: boolean }[]', required: true, description: "Navigation link items" },
          { name: "sticky", type: "boolean", default: "true", required: false, description: "Fixed position with backdrop blur" },
          { name: "actions", type: "ReactNode", required: false, description: "Right-side action buttons (search, theme toggle)" },
        ]}
        api={[
          { name: "useScrollDirection", signature: "() => 'up' | 'down'", description: "Hook to auto-hide header on scroll down and reveal on scroll up." },
        ]}
      >
        <div className="bg-background/85 backdrop-blur-xl border border-border p-0 -m-8 mb-0">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary clip-corner-sm flex items-center justify-center">
                <span className="font-display text-[9px] font-bold text-primary-foreground">EF</span>
              </div>
              <span className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground">ENDFIELD</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {["HOME", "DOCS", "BLOG", "ABOUT"].map((item, i) => (
                <button key={item} className={`font-display text-xs font-semibold tracking-[0.08em] uppercase px-4 py-2 transition-colors relative bg-transparent ${i === 1 ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                  {item}
                  {i === 1 && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[6px] text-primary">◆</span>}
                </button>
              ))}
            </div>
            <button className="sm:hidden text-muted-foreground"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </ComponentPreview>

      {/* 12. Nav Sidebar */}
      <ComponentPreview
        id="nav-sidebar"
        title="12. Navigation — Sidebar (Docs)"
        description="Width 280px, fixed. Section label: Orbitron 11px uppercase. Active: yellow left border."
        props={[
          { name: "sections", type: '{ title: string; items: { id: string; label: string }[] }[]', required: true, description: "Grouped navigation sections with items" },
          { name: "activeId", type: "string", required: false, description: "Currently active item ID for highlight" },
          { name: "onNavigate", type: "(id: string) => void", required: true, description: "Callback when a nav item is clicked" },
          { name: "collapsible", type: "boolean", default: "true", required: false, description: "Allow sections to collapse/expand" },
          { name: "width", type: "number", default: "280", required: false, description: "Sidebar width in pixels" },
        ]}
      >
        <div className="max-w-[280px] bg-surface-0 border border-border p-4">
          {[
            { section: "GETTING STARTED", items: [{ l: "Installation", active: false }, { l: "Quick Start", active: true }, { l: "Configuration", active: false }] },
            { section: "COMPONENTS", items: [{ l: "Button", active: false }, { l: "Card", active: false }, { l: "Input", active: false }] },
          ].map((s) => (
            <div key={s.section} className="mb-4">
              <div className="flex items-center justify-between py-2 px-2">
                <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">{s.section}</span>
                <span className="font-mono text-primary text-sm">−</span>
              </div>
              <ul className="space-y-0.5">
                {s.items.map((item) => (
                  <li key={item.l}>
                    <button className={`w-full text-left text-sm py-1.5 px-3 border-l-2 transition-all ${item.active ? "text-primary border-primary font-semibold" : "text-muted-foreground border-transparent hover:text-card-foreground"}`}>
                      {item.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 13. Nav Tabs */}
      <ComponentPreview
        id="nav-tabs"
        title="13. Navigation — Tabs"
        description="Orbitron 13px, uppercase. Active: yellow text + yellow bottom border."
        code={`.tab.active { color: #FFD429; border-bottom-color: #FFD429; }`}
        props={[
          { name: "tabs", type: '{ label: string; content: ReactNode }[]', required: true, description: "Array of tab definitions" },
          { name: "activeIndex", type: "number", default: "0", required: false, description: "Controlled active tab index" },
          { name: "onChange", type: "(index: number) => void", required: false, description: "Callback when tab changes" },
          { name: "variant", type: '"underline" | "pill"', default: '"underline"', required: false, description: "Visual style of tab indicator" },
        ]}
        playground={{
          componentName: "Tabs",
          controls: [
            { name: "variant", type: "select", options: ["underline", "pill"], default: "underline" },
            { name: "tabCount", label: "Tab Count", type: "number", default: 4, min: 2, max: 6 },
          ],
          render: (v) => <TabsPlayground variant={v.variant} tabCount={v.tabCount} />,
        }}
      >
        <div>
          <div className="flex border-b border-border">
            {["OVERVIEW", "USAGE", "API", "EXAMPLES"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`font-display text-[13px] font-semibold tracking-[0.08em] uppercase px-5 py-3 border-b-2 transition-colors bg-transparent ${activeTab === i ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-card-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              {activeTab === 0 && "Tab panel content for Overview section. Padding 24px 0."}
              {activeTab === 1 && "Usage instructions and implementation guide."}
              {activeTab === 2 && "API reference and props documentation."}
              {activeTab === 3 && "Code examples and live demos."}
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* 14. Nav Breadcrumb */}
      <ComponentPreview
        id="nav-breadcrumb"
        title="14. Navigation — Breadcrumb"
        description="Item: Orbitron, 12px, uppercase. Separator: ›. Current: no link, font-weight 600."
        props={[
          { name: "items", type: '{ label: string; href?: string }[]', required: true, description: "Breadcrumb path items, last item is current page" },
          { name: "separator", type: "ReactNode", default: '"›"', required: false, description: "Custom separator element between items" },
        ]}
      >
        <nav className="flex items-center gap-2 text-xs">
          {["HOME", "DOCS", "COMPONENTS"].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="text-[10px] text-muted-foreground">›</span>}
              <button className="font-display tracking-[0.08em] uppercase text-muted-foreground hover:text-primary transition-colors bg-transparent">{item}</button>
            </span>
          ))}
          <span className="text-[10px] text-muted-foreground">›</span>
          <span className="font-display tracking-[0.08em] uppercase text-card-foreground font-semibold">BUTTONS</span>
        </nav>
      </ComponentPreview>

      {/* 15. Nav Pagination */}
      <ComponentPreview
        id="nav-pagination"
        title="15. Navigation — Pagination"
        description="Diamond markers. Orbitron font. Active: yellow bg, black text."
        props={[
          { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
          { name: "currentPage", type: "number", required: true, description: "Current active page (1-indexed)" },
          { name: "onPageChange", type: "(page: number) => void", required: true, description: "Callback when page is changed" },
          { name: "siblingCount", type: "number", default: "1", required: false, description: "Number of sibling pages shown around current" },
        ]}
      >
        <div className="flex items-center gap-2">
          <button className="font-display text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 bg-transparent">◆ PREV</button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`font-ui text-xs w-9 h-9 flex items-center justify-center transition-all ${n === 3 ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5"}`}
            >
              {n}
            </button>
          ))}
          <span className="text-muted-foreground text-xs">...</span>
          <button className="font-ui text-xs w-9 h-9 flex items-center justify-center text-muted-foreground border border-border hover:border-primary/30">24</button>
          <button className="font-display text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 bg-transparent">NEXT ◆</button>
        </div>
      </ComponentPreview>

      {/* 16. Footer */}
      <ComponentPreview
        id="footer"
        title="16. Footer"
        description="Background canvas, border-top. 3-column grid. Column title: Orbitron 12px uppercase."
        props={[
          { name: "columns", type: '{ title: string; links: { label: string; href: string }[] }[]', required: true, description: "Footer link columns" },
          { name: "copyright", type: "string", required: false, description: "Copyright text displayed at bottom" },
          { name: "version", type: "string", required: false, description: "System version displayed bottom-right" },
        ]}
      >
        <div className="bg-background border-t border-border -m-8 p-8 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-8">
            {[
              { title: "PRODUCT", links: ["Features", "Documentation", "Changelog", "Roadmap"] },
              { title: "COMMUNITY", links: ["Discord", "GitHub", "Twitter", "Blog"] },
              { title: "LEGAL", links: ["Privacy", "Terms", "License"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-ef-gray-mid hover:text-primary transition-colors bg-transparent">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <p className="text-xs text-ef-gray-mid">© 2026 Endfield Industries. All rights reserved.</p>
            <p className="font-mono text-[10px] text-ef-gray-mid">EF-SYS v2.0.0</p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};

const TabsPlayground = ({ variant, tabCount }: { variant: string; tabCount: number }) => {
  const [active, setActive] = useState(0);
  const tabLabels = ["OVERVIEW", "USAGE", "API", "EXAMPLES", "CHANGELOG", "FAQ"].slice(0, tabCount);
  return (
    <div>
      <div className={`flex ${variant === "pill" ? "gap-2 p-1 bg-surface-2 border border-border" : "border-b border-border"}`}>
        {tabLabels.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`font-display text-[13px] font-semibold tracking-[0.08em] uppercase px-5 py-3 transition-colors bg-transparent ${
              variant === "pill"
                ? active === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-card-foreground"
                : active === i ? "text-primary border-b-2 border-primary" : "text-muted-foreground border-b-2 border-transparent hover:text-card-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-6 animate-fade-in">
        <p className="text-sm text-muted-foreground">Content for {tabLabels[active >= tabCount ? 0 : active]} tab.</p>
      </div>
    </div>
  );
};
