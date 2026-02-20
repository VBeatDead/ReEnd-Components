import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import prompts from "prompts";
import chalk from "chalk";
import {
  detectFramework,
  detectTypeScript,
  detectTailwindConfig,
  writeConfig,
  log,
} from "../utils.js";

/* ── Init command ────────────────────────────────────────────────────────── */

export async function runInit(cwd: string): Promise<void> {
  log.header("ReEnd UI — Initialize");

  if (existsSync(join(cwd, "reend-ui.config.json"))) {
    log.warn("reend-ui.config.json already exists.");
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Overwrite existing config?",
      initial: false,
    });
    if (!overwrite) {
      log.info("Init cancelled.");
      return;
    }
  }

  const framework = detectFramework(cwd);
  const isTypescript = detectTypeScript(cwd);
  const tailwindCfg = detectTailwindConfig(cwd);

  log.step(`Detected framework: ${chalk.cyan(framework)}`);
  log.step(
    `TypeScript: ${isTypescript ? chalk.green("yes") : chalk.yellow("no")}`,
  );
  if (tailwindCfg) log.step(`Tailwind config: ${chalk.cyan(tailwindCfg)}`);
  log.blank();

  const response = await prompts([
    {
      type: "text",
      name: "outputDir",
      message: "Component output directory:",
      initial: "components/ui",
    },
    {
      type: "confirm",
      name: "cssVariables",
      message: "Copy CSS design tokens (variables.css)?",
      initial: true,
    },
  ]);

  if (!response.outputDir) {
    log.error("Init cancelled.");
    return;
  }

  writeConfig(cwd, {
    version: "1.0",
    framework,
    typescript: isTypescript,
    outputDir: response.outputDir as string,
    cssVariables: response.cssVariables as boolean,
    tailwindConfig: tailwindCfg,
  });
  log.success("Created reend-ui.config.json");

  const outDir = join(cwd, response.outputDir as string);
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
    log.success(`Created directory: ${response.outputDir as string}`);
  }

  if (response.cssVariables) {
    await copyVariablesCss(cwd, response.outputDir as string);
  }

  log.blank();
  console.log(chalk.bold.white("  ◆ NEXT STEPS\n"));
  console.log(
    chalk.dim("  Add the ReEnd Tailwind preset to your tailwind config:\n"),
  );
  console.log(
    chalk.cyan(`  // ${tailwindCfg ?? "tailwind.config.ts"}`) +
      "\n" +
      chalk.white("  import reendPreset from 'reend-components/tailwind'\n") +
      chalk.white("  export default {\n") +
      chalk.white("    presets: [reendPreset],\n") +
      chalk.white("    // ...your config\n") +
      chalk.white("  }") +
      "\n",
  );
  console.log(chalk.dim("  Import CSS variables in your global CSS:\n"));
  console.log(chalk.white(`  @import 'reend-components/styles.css';`) + "\n");
  console.log(chalk.dim("  Add components:\n"));
  console.log(chalk.cyan("  npx reend-ui add button") + "\n");
}

async function copyVariablesCss(cwd: string, outputDir: string): Promise<void> {
  const stylesDir = join(cwd, "styles");
  if (!existsSync(stylesDir)) {
    mkdirSync(stylesDir, { recursive: true });
  }
  const destPath = join(stylesDir, "reend-variables.css");

  try {
    const candidates = [
      join(
        cwd,
        "node_modules",
        "reend-components",
        "src",
        "styles",
        "variables.css",
      ),
    ];
    for (const src of candidates) {
      if (existsSync(src)) {
        const content = readFileSync(src, "utf-8");
        writeFileSync(destPath, content, "utf-8");
        log.success("Copied variables.css → styles/reend-variables.css");
        return;
      }
    }
    const url =
      "https://raw.githubusercontent.com/VBeatDead/ReEnd-Components/main/src/styles/variables.css";
    const res = await fetch(url);
    if (res.ok) {
      const content = await res.text();
      writeFileSync(destPath, content, "utf-8");
      log.success("Copied variables.css → styles/reend-variables.css");
    } else {
      log.warn(
        "Could not copy variables.css — add manually from reend-components/styles.css",
      );
    }
  } catch {
    log.warn(
      "Could not copy variables.css — add manually from reend-components/styles.css",
    );
  }
}
