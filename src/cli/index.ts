import { Command } from "commander";
import chalk from "chalk";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runUpdate } from "./commands/update.js";

const program = new Command();
const cwd = process.cwd();

/* ── Branding ────────────────────────────────────────────────────────────── */

program
  .name("reend-ui")
  .description(
    chalk.bold.white(
      "◆ ReEnd UI — Arknights: Endfield React Component Library\n",
    ) + chalk.dim("  Shadcn-style copy-paste workflow for ReEnd components.\n"),
  )
  .version("1.0.0");

/* ── init ─────────────────────────────────────────────────────────────────── */

program
  .command("init")
  .description("Initialize ReEnd UI in your project")
  .action(async () => {
    await runInit(cwd);
  });

/* ── add ──────────────────────────────────────────────────────────────────── */

program
  .command("add [components...]")
  .description(
    "Add component(s) to your project\n" +
      "  Example: npx reend-ui add button\n" +
      "  Example: npx reend-ui add button card badge tactical-panel",
  )
  .option("-o, --overwrite", "Overwrite existing files", false)
  .action(async (components: string[], opts: { overwrite: boolean }) => {
    if (components.length === 0) {
      console.log(
        chalk.yellow(
          "\n  Specify components: npx reend-ui add button\n  List available: npx reend-ui list\n",
        ),
      );
      return;
    }
    await runAdd(components, cwd, { overwrite: opts.overwrite });
  });

/* ── list ─────────────────────────────────────────────────────────────────── */

program
  .command("list")
  .description("List all available components")
  .option("--signature", "Show only Signature components")
  .option("--core", "Show only Core components")
  .action((opts: { signature?: boolean; core?: boolean }) => {
    runList(opts);
  });

/* ── update ───────────────────────────────────────────────────────────────── */

program
  .command("update [components...]")
  .description(
    "Update installed component(s) to the latest version\n" +
      "  Example: npx reend-ui update button\n" +
      "  Example: npx reend-ui update  (updates all installed)",
  )
  .action(async (components: string[]) => {
    await runUpdate(components, cwd);
  });

/* ── Parse ────────────────────────────────────────────────────────────────── */

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
