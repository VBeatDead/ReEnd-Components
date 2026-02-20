import chalk from "chalk";
import { REGISTRY } from "../registry.js";
import { log } from "../utils.js";

/* ── List command ────────────────────────────────────────────────────────── */

export function runList(opts: { signature?: boolean; core?: boolean }): void {
  log.header("ReEnd UI — Available Components");

  const entries = Object.values(REGISTRY);
  const filter = opts.signature ? "signature" : opts.core ? "core" : null;

  const filtered = filter ? entries.filter((e) => e.type === filter) : entries;

  const coreComponents = filtered.filter((e) => e.type === "core");
  const signatureComponents = filtered.filter((e) => e.type === "signature");

  if (coreComponents.length > 0) {
    console.log(chalk.bold.white("  CORE COMPONENTS\n"));
    for (const entry of coreComponents) {
      const nameCol = chalk.cyan(entry.name.padEnd(20));
      const descCol = chalk.dim(entry.description);
      console.log(`  ${nameCol}  ${descCol}`);
    }
    log.blank();
  }

  if (signatureComponents.length > 0) {
    console.log(
      chalk.bold.yellow("  SIGNATURE COMPONENTS  ") +
        chalk.dim("(Endfield-exclusive)\n"),
    );
    for (const entry of signatureComponents) {
      const nameCol = chalk.yellow(entry.name.padEnd(20));
      const descCol = chalk.dim(entry.description);
      console.log(`  ${nameCol}  ${descCol}`);
    }
    log.blank();
  }

  console.log(
    chalk.dim(
      `  ${filtered.length} components total. Add with: npx reend-ui add <name>\n`,
    ),
  );
}
