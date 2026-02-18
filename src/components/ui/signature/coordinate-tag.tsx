import * as React from "react";

export interface CoordinateTagProps {
  label: string;
  value: string;
  unit?: string;
  className?: string;
}

export const CoordinateTag = React.forwardRef<
  HTMLDivElement,
  CoordinateTagProps
>(({ label, value, unit, className }, ref) => (
  <div
    ref={ref}
    className={`inline-flex items-center border border-border bg-surface-0 overflow-hidden${className ? ` ${className}` : ""}`}
  >
    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground bg-surface-2 px-2.5 py-1.5 border-r border-border">
      {label}
    </span>
    <span className="font-mono text-xs text-primary px-2.5 py-1.5 font-bold">
      {value}
    </span>
    {unit && (
      <span className="font-mono text-[10px] text-muted-foreground pr-2.5">
        {unit}
      </span>
    )}
  </div>
));
CoordinateTag.displayName = "CoordinateTag";
