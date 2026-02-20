import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import chalk from "chalk";
import { REGISTRY } from "../registry.js";
import { readConfig, fetchText, log } from "../utils.js";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/VBeatDead/ReEnd-Components/main/src/components/ui";

/* ── Add command ─────────────────────────────────────────────────────────── */

export async function runAdd(
  components: string[],
  cwd: string,
  opts: { overwrite?: boolean },
): Promise<void> {
  log.header("ReEnd UI — Add Components");

  const config = readConfig(cwd);
  if (!config) {
    log.error("No reend-ui.config.json found. Run: npx reend-ui init");
    process.exit(1);
  }

  const outputDir = join(cwd, config.outputDir);
  const depsToInstall = new Set<string>();
  const added: string[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];

  for (const name of components) {
    const entry = REGISTRY[name];
    if (!entry) {
      log.error(`Unknown component: "${name}". Run: npx reend-ui list`);
      failed.push(name);
      continue;
    }

    log.info(`Adding ${chalk.cyan(entry.displayName)}...`);

    let componentSuccess = true;
    for (const file of entry.files) {
      const destPath = join(outputDir, file);
      const destDir = dirname(destPath);

      if (existsSync(destPath) && !opts.overwrite) {
        log.warn(`  ${file} already exists — use --overwrite to replace`);
        skipped.push(entry.displayName);
        componentSuccess = false;
        continue;
      }

      try {
        const url = `${GITHUB_RAW_BASE}/${file}`;
        log.step(`Fetching ${file}...`);
        const content = await fetchText(url);

        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }

        writeFileSync(destPath, content, "utf-8");
        log.success(`  Added → ${config.outputDir}/${file}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error(`  Failed to fetch ${file}: ${message}`);
        componentSuccess = false;
        failed.push(entry.displayName);
      }
    }

    if (componentSuccess) {
      added.push(entry.displayName);
      for (const dep of entry.deps) {
        depsToInstall.add(dep);
      }
    }
  }

  log.blank();

  if (added.length > 0) {
    log.success(`Added: ${added.join(", ")}`);
  }
  if (skipped.length > 0) {
    log.warn(`Skipped (existing): ${skipped.join(", ")}`);
  }
  if (failed.length > 0) {
    log.error(`Failed: ${failed.join(", ")}`);
  }

  if (depsToInstall.size > 0) {
    const deps = Array.from(depsToInstall).join(" ");
    log.blank();
    console.log(chalk.bold.yellow("  ⚡ Install peer dependencies:\n"));
    console.log(chalk.cyan(`  npm install ${deps}`) + "\n");
  }

  if (added.length > 0) {
    log.blank();
    console.log(
      chalk.dim(
        "  Components require the cn() utility. Add to your project:\n",
      ),
    );
    console.log(chalk.white("  import { cn } from 'reend-components'") + "\n");
    console.log(
      chalk.dim("  Or copy the cn utility from: lib/utils.ts") + "\n",
    );
  }
}
