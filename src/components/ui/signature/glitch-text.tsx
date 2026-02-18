import * as React from "react";

export interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = React.forwardRef<HTMLSpanElement, GlitchTextProps>(
  ({ children, className = "" }, ref) => (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 text-ef-cyan opacity-70 animate-glitch"
        style={{
          clipPath: "inset(20% 0 50% 0)",
          transform: "translate(-2px, 0)",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-ef-red opacity-70 animate-glitch"
        style={{
          clipPath: "inset(50% 0 20% 0)",
          transform: "translate(2px, 0)",
          animationDelay: "0.1s",
        }}
      >
        {children}
      </span>
    </span>
  ),
);
GlitchText.displayName = "GlitchText";
