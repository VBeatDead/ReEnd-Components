/**
 * Generates public/llms.txt from centralized route metadata.
 * Run via: node --experimental-strip-types scripts/generate-llms.ts
 * Invoked automatically by the `prebuild` npm hook.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { DOC_SECTIONS, BASE_URL } from "../src/config/routes.ts";
import { generateLlmsContent } from "../src/lib/llms-generator.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

let pkg: { version: string };
try {
  pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8")) as {
    version: string;
  };
} catch (err) {
  console.error("✗ Could not read package.json:", err);
  process.exit(1);
}

try {
  const content = generateLlmsContent(DOC_SECTIONS, {
    baseUrl: BASE_URL,
    version: pkg.version,
    defaultLang: "en",
  });

  const outputPath = join(root, "public", "llms.txt");
  writeFileSync(outputPath, content, "utf-8");
  console.log("✓ Generated public/llms.txt");
} catch (err) {
  console.error("✗ Failed to generate llms.txt:", err);
  process.exit(1);
}
