import { useState } from "react";
import type { PlaygroundControl } from "./ComponentPreview";

const PlaygroundControlField = ({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: string | number | boolean;
  onChange: (v: string | number | boolean) => void;
}) => {
  const label = control.label ?? control.name;
  // spinKey drives the one-shot diamond rotation on each boolean toggle
  const [spinKey, setSpinKey] = useState(0);

  if (control.type === "boolean") {
    const isOn = Boolean(value);
    return (
      <label className="flex items-center justify-between gap-2 cursor-pointer group">
        <span className="text-xs text-card-foreground">{label}</span>
        <button
          type="button"
          onClick={() => {
            setSpinKey((k) => k + 1);
            onChange(!value);
          }}
          aria-pressed={isOn}
          aria-label={label}
          className={`w-9 h-5 relative transition-colors ${
            isOn ? "bg-primary" : "bg-surface-3 border border-border"
          }`}
        >
          <span
            key={spinKey}
            aria-hidden="true"
            className={`absolute top-0.5 w-4 h-4 transition-transform ${
              isOn
                ? "bg-primary-foreground left-[18px]"
                : "bg-foreground left-0.5"
            }${spinKey > 0 ? " animate-switch-spin" : ""}`}
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        </button>
      </label>
    );
  }

  if (control.type === "select" && control.options) {
    return (
      <div className="space-y-1.5">
        <span className="text-xs text-card-foreground">{label}</span>
        <div className="flex flex-wrap gap-1">
          {control.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                value === opt
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (control.type === "text") {
    return (
      <div className="space-y-1.5">
        <span className="text-xs text-card-foreground">{label}</span>
        <input
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          maxLength={100}
          aria-label={label}
          className="w-full bg-surface-1 border border-border text-sm text-foreground px-3 py-1.5 outline-none focus:border-primary transition-colors"
        />
      </div>
    );
  }

  if (control.type === "number" || control.type === "range") {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-card-foreground">{label}</span>
          <span className="font-mono text-[11px] text-primary">{value}</span>
        </div>
        <input
          type="range"
          value={value as number}
          min={control.min ?? 0}
          max={control.max ?? 100}
          step={control.step ?? 1}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="w-full accent-primary h-1"
        />
      </div>
    );
  }

  if (control.type === "color") {
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs text-card-foreground">{label}</span>
        <input
          type="color"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-8 h-6 border border-border cursor-pointer"
        />
      </div>
    );
  }

  return null;
};

export default PlaygroundControlField;
