import React, { useState } from "react";
import { ComponentPreview } from "../../docs/ComponentPreview";
import { NumberInput } from "../../ui/number-input";

function NumberInputDemo() {
  const [qty, setQty] = useState(1);
  const [hp, setHp] = useState(850);

  return (
    <ComponentPreview
      id="number-input"
      title="Number Input"
      description="Increment/decrement numeric input with keyboard support (Arrow ↑/↓), min/max clamping, step control, and three size variants."
      code={`import { NumberInput } from "reend-components";

// Uncontrolled
<NumberInput defaultValue={1} min={0} max={99} />

// Controlled
const [value, setValue] = useState(50);
<NumberInput value={value} onChange={setValue} min={0} max={100} step={5} />

// Sizes
<NumberInput size="sm" defaultValue={10} />
<NumberInput size="md" defaultValue={10} />
<NumberInput size="lg" defaultValue={10} />`}
      props={[
        {
          name: "value",
          type: "number",
          required: false,
          description: "Controlled value (makes component controlled).",
        },
        {
          name: "defaultValue",
          type: "number",
          default: "0",
          required: false,
          description: "Initial value for uncontrolled usage.",
        },
        {
          name: "onChange",
          type: "(value: number) => void",
          required: false,
          description: "Called with the new clamped numeric value on every change.",
        },
        {
          name: "min",
          type: "number",
          required: false,
          description: "Minimum allowed value. Decrement button disables at this boundary.",
        },
        {
          name: "max",
          type: "number",
          required: false,
          description: "Maximum allowed value. Increment button disables at this boundary.",
        },
        {
          name: "step",
          type: "number",
          default: "1",
          required: false,
          description: "Amount to increment or decrement per interaction.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          required: false,
          description: "Height variant — sm (32px), md (36px), lg (40px).",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          required: false,
          description: "Disables both buttons and the input field.",
        },
      ]}
      keyboard={[
        { key: "Arrow ↑", description: "Increment by step amount" },
        { key: "Arrow ↓", description: "Decrement by step amount" },
        { key: "Tab", description: "Move focus to input field" },
      ]}
      install={{
        importPath: 'import { NumberInput } from "reend-components";',
        usage:
          'const [qty, setQty] = useState(1);\n\n<NumberInput\n  value={qty}\n  onChange={setQty}\n  min={1}\n  max={99}\n/>',
      }}
    >
      <div className="space-y-8">
        {/* Controlled example */}
        <div className="space-y-2">
          <p className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
            QUANTITY{" "}
            <span className="text-primary font-mono">→ {qty}</span>
          </p>
          <NumberInput value={qty} onChange={setQty} min={1} max={99} />
        </div>

        {/* Step example */}
        <div className="space-y-2">
          <p className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
            HP POOL <span className="text-white/40">(step 50)</span>{" "}
            <span className="text-primary font-mono">→ {hp}</span>
          </p>
          <NumberInput
            value={hp}
            onChange={setHp}
            min={0}
            max={2000}
            step={50}
            size="lg"
          />
        </div>

        {/* Size variants */}
        <div className="space-y-3">
          <p className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
            SIZE VARIANTS
          </p>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-muted-foreground/60">SM</p>
              <NumberInput size="sm" defaultValue={10} />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-muted-foreground/60">MD</p>
              <NumberInput size="md" defaultValue={10} />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-muted-foreground/60">LG</p>
              <NumberInput size="lg" defaultValue={10} />
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div className="space-y-2">
          <p className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
            DISABLED STATE
          </p>
          <NumberInput defaultValue={42} disabled />
        </div>
      </div>
    </ComponentPreview>
  );
}

export default NumberInputDemo;
