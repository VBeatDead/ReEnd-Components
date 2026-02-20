import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import chalk from "chalk";

/* ── Config ──────────────────────────────────────────────────────────────── */

export interface ReEndConfig {
  version: string;
  framework: string;
  typescript: boolean;
  outputDir: string;
  cssVariables: boolean;
  tailwindConfig?: string;
}

const CONFIG_FILE = "reend-ui.config.json";

export function readConfig(cwd: string): ReEndConfig | null {
  const configPath = join(cwd, CONFIG_FILE);
  if (!existsSync(configPath)) return null;
  try {
    return JSON.parse(readFileSync(configPath, "utf-8")) as ReEndConfig;
  } catch {
    return null;
  }
}

export function writeConfig(cwd: string, config: ReEndConfig): void {
  const configPath = join(cwd, CONFIG_FILE);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

/* ── Framework detection ─────────────────────────────────────────────────── */

export function detectFramework(cwd: string): string {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return "vite";
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as Record<
      string,
      Record<string, string>
    >;
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };
    if (allDeps["next"]) return "next";
    if (allDeps["@remix-run/react"]) return "remix";
    if (allDeps["gatsby"]) return "gatsby";
    return "vite";
  } catch {
    return "vite";
  }
}

export function detectTypeScript(cwd: string): boolean {
  return (
    existsSync(join(cwd, "tsconfig.json")) ||
    existsSync(join(cwd, "tsconfig.app.json"))
  );
}

export function detectTailwindConfig(cwd: string): string | undefined {
  const candidates = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
  ];
  for (const f of candidates) {
    if (existsSync(join(cwd, f))) return f;
  }
  return undefined;
}

/* ── HTTP fetch helper ───────────────────────────────────────────────────── */

export async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`);
  }
  return res.text();
}

/* ── Logging ─────────────────────────────────────────────────────────────── */

export const log = {
  info: (msg: string) => console.log(`  ${chalk.cyan("◆")} ${msg}`),
  success: (msg: string) =>
    console.log(`  ${chalk.green("◆")} ${chalk.green(msg)}`),
  warn: (msg: string) =>
    console.log(`  ${chalk.yellow("◇")} ${chalk.yellow(msg)}`),
  error: (msg: string) =>
    console.error(`  ${chalk.red("✕")} ${chalk.red(msg)}`),
  step: (msg: string) => console.log(`  ${chalk.dim("›")} ${msg}`),
  blank: () => console.log(),
  header: (msg: string) =>
    console.log(
      `\n${chalk.bold.white("◆")} ${chalk.bold.white(msg.toUpperCase())}\n`,
    ),
};
