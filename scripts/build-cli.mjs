/**
 * Build script for the reend-ui CLI binary.
 * Bundles src/cli/index.ts → dist/bin/cli.cjs (standalone CJS, Node 18+)
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
