import type { DocSection } from "../config/routes";

export interface LlmsMeta {
  baseUrl: string;
  version: string;
  defaultLang: string;
}

/**
 * Pure function: transforms route metadata into llms.txt content.
 * Kept separate from the Node.js script so it can be unit tested via Vitest.
 */
export function generateLlmsContent(
  sections: DocSection[],
  meta: LlmsMeta,
): string {
  const { baseUrl, version, defaultLang } = meta;
  const docsBase = `${baseUrl}/${defaultLang}/docs`;

  const sectionLinks = sections
    .map((s) => `- [${s.title}](${docsBase}/${s.slug}) — ${s.description}`)
    .join("\n");

  return `# ReEnd-Components

> Arknights: Endfield inspired React component library with Tailwind CSS. Sci-Fi Industrial Futurism design system.

**URL**: ${baseUrl}
**Version**: ${version}
**License**: MIT
**Repository**: https://github.com/VBeatDead/ReEnd-Components

## What is this?

ReEnd-Components is a React component library and documentation site inspired by the visual aesthetic of Arknights: Endfield. It provides production-ready UI components with a Sci-Fi Industrial Futurism theme, built with React, TypeScript, Tailwind CSS, and Radix UI primitives.

## Tech Stack

- React 18/19 + TypeScript
- Tailwind CSS with custom design tokens (ef-* color palette, surface-* layers)
- Radix UI primitives (accessible headless components)
- Framer Motion (animation system)
- i18next (English + Indonesian / Bahasa Indonesia)

## Available Languages

- English: ${baseUrl}/en/
- Indonesian (Bahasa Indonesia): ${baseUrl}/id/

## Documentation Sections

${sectionLinks}

## npm Package

Install via npm: \`npm install reend-components\`
Exports: React components, Tailwind CSS preset (\`reend-components/tailwind\`), CSS variables (\`reend-components/styles.css\`).
`;
}
