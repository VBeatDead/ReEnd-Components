/*
 * This module must not import recharts: the library barrel re-exports it,
 * and any recharts import here becomes an unconditional require in the CJS
 * build — breaking `require("reend-components")` for consumers without the
 * optional recharts peer installed. Import chart primitives from recharts
 * directly; this file only provides the Endfield theme tokens.
 */

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
] as const;

export const endfieldChartTheme = {
  backgroundColor: "transparent",
  style: { fontFamily: "JetBrains Mono, monospace", fontSize: 11 },
  tick: { fill: "hsl(var(--muted-foreground))" },
  grid: { stroke: "hsl(var(--border))" },
} as const;
