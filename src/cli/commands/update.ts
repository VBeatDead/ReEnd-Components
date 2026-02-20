import { existsSync } from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { REGISTRY } from "../registry.js";
import { readConfig, log } from "../utils.js";
import { runAdd } from "./add.js";

/* ── Update command ──────────────────────────────────────────────────────── */

export async function runUpdate(
  components: string[],
  cwd: string,
): Promise<void> {
  log.header("ReEnd UI — Update Components");

  const config = readConfig(cwd);
  if (!config) {
    log.error("No reend-ui.config.json found. Run: npx reend-ui init");
    process.exit(1);
  }

  const outputDir = join(cwd, config.outputDir);

  let targets = components;
  if (targets.length === 0) {
    targets = Object.keys(REGISTRY).filter((name) => {
      const entry = REGISTRY[name];
      return entry.files.some((f) => existsSync(join(outputDir, f)));
    });

    if (targets.length === 0) {
      log.warn("No installed components found. Use: npx reend-ui add <name>");
      return;
    }

    log.info(
      `Updating ${chalk.cyan(targets.length.toString())} installed component(s)...`,
    );
  }

  const existing: string[] = [];
  const notFound: string[] = [];

  for (const name of targets) {
    const entry = REGISTRY[name];
    if (!entry) {
      log.error(`Unknown component: "${name}"`);
      continue;
    }
    const isInstalled = entry.files.some((f) => existsSync(join(outputDir, f)));
    if (isInstalled) {
      existing.push(name);
    } else {
      notFound.push(name);
    }
  }

  if (notFound.length > 0) {
    log.warn(`Not installed (will skip): ${notFound.join(", ")}`);
  }

  if (existing.length === 0) {
    log.warn("No installed components to update.");
    return;
  }

  await runAdd(existing, cwd, { overwrite: true });
}
