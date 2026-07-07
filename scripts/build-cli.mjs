/**
 * Build script for the reend-ui CLI binary and the Tailwind preset.
 * - src/cli/index.ts        → dist/bin/cli.cjs (standalone CJS, Node 18+)
 * - src/tailwind-preset.ts  → dist/tailwind/index.{mjs,cjs} (loadable from any
 *   tailwind.config.{js,cjs,mjs,ts} — raw .ts only works with TS configs)
 * Run: node scripts/build-cli.mjs
 */
import { build } from "esbuild";
import { mkdirSync, chmodSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "dist", "bin");
const outFile = join(outDir, "cli.cjs");

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

console.log("◆ Building CLI...");

await build({
  entryPoints: [join(root, "src", "cli", "index.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: ["node18"],
  outfile: outFile,
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: [],
  minify: false,
  sourcemap: false,
  logOverride: {
    "commonjs-variable-in-esm": "silent",
  },
});

try {
  chmodSync(outFile, 0o755);
} catch {
  // Windows — no chmod needed
}

console.log("✓ CLI built to dist/bin/cli.cjs");

console.log("◆ Building Tailwind preset...");

const presetEntry = join(root, "src", "tailwind-preset.ts");
const presetOutDir = join(root, "dist", "tailwind");

for (const [format, ext] of [
  ["esm", "mjs"],
  ["cjs", "cjs"],
]) {
  await build({
    entryPoints: [presetEntry],
    bundle: true,
    platform: "node",
    format,
    target: ["node18"],
    outfile: join(presetOutDir, `index.${ext}`),
    // tailwindcss v3 has no package exports map, so bare "tailwindcss/plugin"
    // fails under real ESM — point it at the explicit .js file instead.
    alias: { "tailwindcss/plugin": "tailwindcss/plugin.js" },
    external: ["tailwindcss", "tailwindcss/plugin.js", "tailwindcss-animate"],
    minify: false,
    sourcemap: false,
    // Flatten the ESM default export so a plain `require(...)` returns the
    // preset itself — otherwise `presets: [require("reend-components/tailwind")]`
    // passes `{ default: preset }` and Tailwind silently ignores it.
    footer:
      format === "cjs"
        ? {
            js: "module.exports = module.exports.default;\nmodule.exports.default = module.exports;",
          }
        : undefined,
  });
}

console.log("✓ Tailwind preset built to dist/tailwind/index.{mjs,cjs}");
