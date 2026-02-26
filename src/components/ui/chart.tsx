export {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  RadarChart as RechartsRadarChart,
} from "recharts";
export {
  Line,
  Bar,
  Area,
  Pie,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
