import * as React from "react";

export interface DiamondLoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const SIZE_MAP = { sm: 16, md: 28, lg: 44 } as const;

export const DiamondLoader = React.forwardRef<
  HTMLDivElement,
  DiamondLoaderProps
>(({ size = "md", label, className }, ref) => {
  const s = SIZE_MAP[size];
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-3${className ? ` ${className}` : ""}`}
    >
      <div className="relative" style={{ width: s * 2, height: s * 2 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-primary"
            style={{
              transform: `rotate(45deg) scale(${1 - i * 0.25})`,
              animation: `diamondSpin ${1.2 + i * 0.4}s linear infinite${i === 1 ? " reverse" : ""}`,
              opacity: 1 - i * 0.25,
            }}
          />
        ))}
      </div>
      {label && (
        <span className="font-mono text-xs text-muted-foreground tracking-[0.15em] uppercase">
          {label}
        </span>
      )}
    </div>
  );
});
DiamondLoader.displayName = "DiamondLoader";
