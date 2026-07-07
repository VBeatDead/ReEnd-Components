import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import chalk from "chalk";
import {
  REGISTRY,
  BASE_DEPS,
  CLI_VERSION,
  getFileUrl,
  getHookUrl,
} from "../registry.js";
import { readConfig, fetchText, log } from "../utils.js";

/**
 * Fetch a registry file pinned to this CLI's release tag so installed CLIs
 * keep working even after main moves on. Falls back to main when the tag
 * does not exist yet (e.g. pre-release builds).
 */
async function fetchRegistryFile(
  urlFor: (ref: string) => string,
): Promise<string> {
  try {
    return await fetchText(urlFor(`v${CLI_VERSION}`));
  } catch {
    return fetchText(urlFor("main"));
  }
}

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
  // Components import cn from "../../lib/utils" and hooks from "../../hooks",
  // so both live two levels above the component output directory.
  const projectBase = join(outputDir, "..", "..");
  const hooksDir = join(projectBase, "hooks");
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

    const targets: Array<{ file: string; dest: string; hook: boolean }> = [
      ...entry.files.map((file) => ({
        file,
        dest: join(outputDir, file),
        hook: false,
      })),
      ...(entry.hooks ?? []).map((file) => ({
        file,
        dest: join(hooksDir, file),
        hook: true,
      })),
    ];

    let componentSuccess = true;
    for (const { file, dest, hook } of targets) {
      const destDir = dirname(dest);
      const label = hook ? `hooks/${file}` : file;

      if (existsSync(dest) && !opts.overwrite) {
        log.warn(`  ${label} already exists — use --overwrite to replace`);
        skipped.push(entry.displayName);
        componentSuccess = false;
        continue;
      }

      try {
        log.step(`Fetching ${label}...`);
        const content = await fetchRegistryFile((ref) =>
          hook ? getHookUrl(file, ref) : getFileUrl(file, ref),
        );

        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }

        writeFileSync(dest, content, "utf-8");
        log.success(`  Added → ${label}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error(`  Failed to fetch ${label}: ${message}`);
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

  if (added.length > 0) {
    for (const dep of BASE_DEPS) {
      depsToInstall.add(dep);
    }
  }

  if (depsToInstall.size > 0) {
    const deps = Array.from(depsToInstall).join(" ");
    log.blank();
    console.log(chalk.bold.yellow("  ⚡ Install dependencies:\n"));
    console.log(chalk.cyan(`  npm install ${deps}`) + "\n");
  }

  if (added.length > 0 && !existsSync(join(projectBase, "lib", "utils.ts"))) {
    log.blank();
    log.warn(
      "lib/utils.ts (cn helper) not found — run `npx reend-ui init` to create it.",
    );
  }
}
