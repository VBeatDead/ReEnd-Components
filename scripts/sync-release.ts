/**
 * sync-release.ts
 *
 * Automated release sync script. Runs automatically via the `version` npm lifecycle
 * hook (triggered after `npm version patch/minor/major` updates package.json).
 *
 * What it syncs automatically:
 *   1. public/llms.txt          → regenerated with the new version number
 *   2. CHANGELOG.md footer      → comparison links updated for the new version
 *
 * What you still write manually (before running `npm version`):
 *   1. src/locales/en/changelog.json  → add new version object at top of `versions` array
 *   2. src/locales/id/changelog.json  → same in Indonesian
 *   3. CHANGELOG.md body              → add new `## [x.y.z] - date` section content
 *
 * Usage (automatic — triggered by npm lifecycle):
 *   npm version patch   # 0.4.0 → 0.4.1
 *   npm version minor   # 0.4.0 → 0.5.0
 *   npm version major   # 0.4.0 → 1.0.0
 *
 * Usage (manual run):
 *   node --experimental-strip-types scripts/sync-release.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { DOC_SECTIONS, BASE_URL } from "../src/config/routes.ts";
import { generateLlmsContent } from "../src/lib/llms-generator.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ─── 1. Read package.json ────────────────────────────────────────────────────

interface PackageJson {
  version: string;
  repository?: { url?: string };
}

let pkg: PackageJson;
try {
  pkg = JSON.parse(
    readFileSync(join(root, "package.json"), "utf-8"),
  ) as PackageJson;
} catch {
  console.error("✗ Could not read package.json");
  process.exit(1);
}

const version = pkg.version;
const vVersion = `v${version}`;

// ─── 2. Read en/changelog.json (source of truth for docs site) ───────────────

interface VersionEntry {
  version: string;
  date: string;
  items: string[];
}

interface ChangelogJson {
  versions: VersionEntry[];
}

let changelogJson: ChangelogJson;
try {
  changelogJson = JSON.parse(
    readFileSync(join(root, "src", "locales", "en", "changelog.json"), "utf-8"),
  ) as ChangelogJson;
} catch {
  console.error("✗ Could not read src/locales/en/changelog.json");
  process.exit(1);
}

// ─── 3. Validate version consistency ─────────────────────────────────────────

const latestEntry = changelogJson.versions[0];

if (!latestEntry) {
  console.error("✗ No versions found in en/changelog.json");
  process.exit(1);
}

if (latestEntry.version !== vVersion) {
  console.warn(`\n⚠  Version mismatch detected:`);
  console.warn(`   package.json     → "${vVersion}"`);
  console.warn(`   changelog.json  → "${latestEntry.version}" (first entry)`);
  console.warn(
    `\n   Add a new entry for ${vVersion} at the top of the versions array in:`,
  );
  console.warn(`   • src/locales/en/changelog.json`);
  console.warn(`   • src/locales/id/changelog.json\n`);
}

// ─── 4. Regenerate public/llms.txt ───────────────────────────────────────────

try {
  const llmsContent = generateLlmsContent(DOC_SECTIONS, {
    baseUrl: BASE_URL,
    version,
    defaultLang: "en",
  });
  writeFileSync(join(root, "public", "llms.txt"), llmsContent, "utf-8");
  console.log(`✓ public/llms.txt  → version ${version}`);
} catch (err) {
  console.error("✗ Failed to generate public/llms.txt:", err);
  process.exit(1);
}

// ─── 5. Update CHANGELOG.md footer links ─────────────────────────────────────

const repoUrl = "https://github.com/VBeatDead/ReEnd-Components";
const allVersions = changelogJson.versions.map((v) => v.version);

const footerLines: string[] = [
  `[Unreleased]: ${repoUrl}/compare/${allVersions[0]}...HEAD`,
  ...allVersions.map((v, i) => {
    const bare = v.replace(/^v/, "");
    if (i === allVersions.length - 1) {
      return `[${bare}]: ${repoUrl}/releases/tag/${v}`;
    }
    const prev = allVersions[i + 1];
    return `[${bare}]: ${repoUrl}/compare/${prev}...${v}`;
  }),
];

const newFooter = footerLines.join("\n");

try {
  const changelogPath = join(root, "CHANGELOG.md");
  let md = readFileSync(changelogPath, "utf-8");

  const footerStart = md.search(/^\[Unreleased\]:/m);

  if (footerStart !== -1) {
    md = md.slice(0, footerStart).trimEnd() + "\n\n" + newFooter + "\n";
  } else {
    md = md.trimEnd() + "\n\n" + newFooter + "\n";
  }

  writeFileSync(changelogPath, md, "utf-8");
  console.log(`✓ CHANGELOG.md     → footer links updated`);
} catch (err) {
  console.error("✗ Failed to update CHANGELOG.md:", err);
  process.exit(1);
}

// ─── Done ────────────────────────────────────────────────────────────────────

console.log(`\n✅ sync-release complete for ${vVersion}\n`);

if (latestEntry.version === vVersion) {
  console.log(`   All files are in sync. Ready to publish.`);
} else {
  console.log(
    `   ⚠  Don't forget to update the changelog JSON files before publishing.`,
  );
}

console.log(`\n📋 Release checklist:`);
console.log(
  `   [${latestEntry.version === vVersion ? "x" : " "}] src/locales/en/changelog.json — ${vVersion} entry present`,
);
console.log(
  `   [ ] src/locales/id/changelog.json — ${vVersion} entry present (Indonesian)`,
);
console.log(`   [ ] CHANGELOG.md — ${vVersion} content written`);
console.log(`   [x] public/llms.txt — regenerated`);
console.log(`   [x] CHANGELOG.md footer links — updated`);
