import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import { CodeBlock } from "../docs/CodeBlock";

export function InstallationSection() {
  const { t } = useTranslation("install");

  return (
    <>
      {/* Getting Started */}
      <ComponentPreview
        id="getting-started"
        title={t("getting_started.title")}
        description={t("getting_started.description")}
      >
        <div className="space-y-6">
          <div className="border border-border bg-surface-1 p-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
              {t("getting_started.prerequisites_heading")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground [&_strong]:text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("getting_started.prereq_react"),
                  }}
                />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("getting_started.prereq_node"),
                  }}
                />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("getting_started.prereq_tailwind"),
                  }}
                />
              </li>
            </ul>
          </div>

          <div className="border border-border bg-surface-1 p-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
              {t("getting_started.npm_package_heading")}
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.npmjs.com/package/reend-components"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ef-blue hover:text-ef-blue-light transition-colors underline underline-offset-2"
              >
                {t("getting_started.npm_link_text")}
              </a>
              <span className="font-mono text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5">
                v{__REEND_VERSION__}
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Install Package */}
      <ComponentPreview
        id="install-package"
        title={t("step1.title")}
        description={t("step1.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step1.npm_heading")}
            </h4>
            <CodeBlock code="npm install reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step1.pnpm_heading")}
            </h4>
            <CodeBlock code="pnpm add reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step1.yarn_heading")}
            </h4>
            <CodeBlock code="yarn add reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step1.bun_heading")}
            </h4>
            <CodeBlock code="bun add reend-components" language="bash" />
          </div>

          <div className="border border-border bg-surface-1 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground mb-3">
              {t("step1.peer_deps_heading")}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {t("step1.peer_deps_note")}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      {t("step1.table_package")}
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      {t("step1.table_version")}
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      {t("step1.table_status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-mono text-foreground">
                      react
                    </td>
                    <td className="py-2 px-3">≥18.0.0</td>
                    <td className="py-2 px-3 text-ef-red">
                      {t("step1.status_required")}
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-mono text-foreground">
                      react-dom
                    </td>
                    <td className="py-2 px-3">≥18.0.0</td>
                    <td className="py-2 px-3 text-ef-red">
                      {t("step1.status_required")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-foreground">
                      tailwindcss
                    </td>
                    <td className="py-2 px-3">≥3.4.0</td>
                    <td className="py-2 px-3 text-ef-green">
                      {t("step1.status_optional")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Tailwind Setup */}
      <ComponentPreview
        id="tailwind-setup"
        title={t("step2.title")}
        description={t("step2.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step2.config_heading")}
            </h4>
            <CodeBlock
              code={`import reendPreset from "reend-components/tailwind";

export default {
  presets: [reendPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    // Include ReEnd component classes
    "./node_modules/reend-components/dist/**/*.{js,mjs}",
  ],
};`}
              language="tsx"
              title="tailwind.config.ts"
            />
          </div>

          <div className="border border-border bg-surface-1 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground mb-2">
              {t("step2.preset_includes_heading")}
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{t("step2.preset_color_palette")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{t("step2.preset_semantic_tokens")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{t("step2.preset_custom_fonts")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{t("step2.preset_animations")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{t("step2.preset_dark_mode")}</span>
              </li>
            </ul>
          </div>
        </div>
      </ComponentPreview>

      {/* Import Styles */}
      <ComponentPreview
        id="import-styles"
        title={t("step3.title")}
        description={t("step3.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step3.option_a_heading")}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {t("step3.option_a_desc")}
            </p>
            <CodeBlock
              code={`/* src/index.css or src/globals.css */
@import "reend-components/variables.css";

/* Your Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
              language="css"
              title="index.css"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step3.option_b_heading")}
            </h4>
            <p
              className="text-sm text-muted-foreground mb-3"
              dangerouslySetInnerHTML={{ __html: t("step3.option_b_desc") }}
            />
            <CodeBlock
              code={`// In your entry file (main.tsx / App.tsx)
import "reend-components/styles.css";`}
              language="tsx"
              title="main.tsx"
            />
          </div>

          <div className="border border-ef-yellow/20 bg-ef-yellow/5 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-ef-yellow mb-2">
              {t("step3.note_heading")}
            </h4>
            <p className="text-sm text-muted-foreground [&_strong]:text-foreground">
              <span
                dangerouslySetInnerHTML={{ __html: t("step3.note_desc") }}
              />{" "}
              <code className="text-xs bg-surface-2 px-1.5 py-0.5 text-foreground">
                background: hsl(var(--primary) / 0.5);
              </code>
            </p>
          </div>
        </div>
      </ComponentPreview>

      {/* Use Components */}
      <ComponentPreview
        id="use-components"
        title={t("step4.title")}
        description={t("step4.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step4.tooltip_example_heading")}
            </h4>
            <CodeBlock
              code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "reend-components";

function App() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-primary text-primary-foreground">
            Hover me
          </button>
        </TooltipTrigger>
        <TooltipContent>
          Styled with Endfield design tokens
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`}
              language="tsx"
              title="App.tsx"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step4.toast_heading")}
            </h4>
            <CodeBlock
              code={`import { useToast, Toaster } from "reend-components";

function MyComponent() {
  const { toast } = useToast();

  return (
    <>
      <Toaster />
      <button
        onClick={() =>
          toast({
            title: "Mission Update",
            description: "Operation deployed successfully.",
          })
        }
        className="px-4 py-2 bg-primary text-primary-foreground"
      >
        Show Toast
      </button>
    </>
  );
}`}
              language="tsx"
              title="MyComponent.tsx"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("step4.sonner_heading")}
            </h4>
            <CodeBlock
              code={`import { SonnerToaster, toast } from "reend-components";

function App() {
  return (
    <>
      <SonnerToaster theme="dark" />
      <button
        onClick={() => toast("Operation complete")}
        className="px-4 py-2 bg-primary text-primary-foreground"
      >
        Notify
      </button>
    </>
  );
}`}
              language="tsx"
              title="App.tsx"
            />
          </div>
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <ComponentPreview
        id="api-reference"
        title={t("api_reference.title")}
        description={t("api_reference.description")}
      >
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    {t("api_reference.table_export")}
                  </th>
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    {t("api_reference.table_type")}
                  </th>
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    {t("api_reference.table_description")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Tooltip", "Component", t("api_reference.exports.Tooltip")],
                  [
                    "TooltipTrigger",
                    "Component",
                    t("api_reference.exports.TooltipTrigger"),
                  ],
                  [
                    "TooltipContent",
                    "Component",
                    t("api_reference.exports.TooltipContent"),
                  ],
                  [
                    "TooltipProvider",
                    "Component",
                    t("api_reference.exports.TooltipProvider"),
                  ],
                  ["Toast", "Component", t("api_reference.exports.Toast")],
                  [
                    "ToastAction",
                    "Component",
                    t("api_reference.exports.ToastAction"),
                  ],
                  [
                    "ToastClose",
                    "Component",
                    t("api_reference.exports.ToastClose"),
                  ],
                  [
                    "ToastTitle",
                    "Component",
                    t("api_reference.exports.ToastTitle"),
                  ],
                  [
                    "ToastDescription",
                    "Component",
                    t("api_reference.exports.ToastDescription"),
                  ],
                  [
                    "ToastProvider",
                    "Component",
                    t("api_reference.exports.ToastProvider"),
                  ],
                  [
                    "ToastViewport",
                    "Component",
                    t("api_reference.exports.ToastViewport"),
                  ],
                  ["Toaster", "Component", t("api_reference.exports.Toaster")],
                  [
                    "SonnerToaster",
                    "Component",
                    t("api_reference.exports.SonnerToaster"),
                  ],
                  ["toast", "Function", t("api_reference.exports.toast")],
                  [
                    "toastAction",
                    "Function",
                    t("api_reference.exports.toastAction"),
                  ],
                  ["useToast()", "Hook", t("api_reference.exports.useToast")],
                  ["cn()", "Utility", t("api_reference.exports.cn")],
                ].map(([name, type, desc]) => (
                  <tr key={name} className="border-b border-border/50">
                    <td className="py-2 px-4 font-mono text-foreground">
                      {name}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`text-[10px] font-display tracking-wider uppercase px-1.5 py-0.5 ${
                          type === "Component"
                            ? "bg-ef-blue/10 text-ef-blue border border-ef-blue/20"
                            : type === "Hook"
                              ? "bg-ef-purple/10 text-ef-purple border border-ef-purple/20"
                              : type === "Function"
                                ? "bg-ef-green/10 text-ef-green border border-ef-green/20"
                                : "bg-ef-yellow/10 text-ef-yellow border border-ef-yellow/20"
                        }`}
                      >
                        {type}
                      </span>
                    </td>
                    <td className="py-2 px-4">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("api_reference.entry_points_heading")}
            </h4>
            <CodeBlock
              code={`// Main entry — all components & utilities
import { ... } from "reend-components";

// Pre-built CSS (includes design tokens + base styles)
import "reend-components/styles.css";

// CSS Variables only (for Tailwind users)
import "reend-components/variables.css";

// Tailwind preset (use in tailwind.config.ts)
import reendPreset from "reend-components/tailwind";`}
              language="tsx"
              title="Import paths"
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Theming */}
      <ComponentPreview
        id="theming-guide"
        title={t("theming.title")}
        description={t("theming.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("theming.override_heading")}
            </h4>
            <CodeBlock
              code={`:root {
  /* Override primary accent */
  --primary: 200 80% 55%;
  --primary-foreground: 0 0% 4%;

  /* Override background */
  --background: 220 15% 8%;
  --foreground: 0 0% 95%;

  /* Override accent color */
  --accent: 200 80% 55%;
  --accent-foreground: 200 80% 55%;
}

/* Light mode overrides */
.light {
  --primary: 200 80% 40%;
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
}`}
              language="css"
              title="custom-theme.css"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("theming.dark_light_heading")}
            </h4>
            <p
              className="text-sm text-muted-foreground mb-3 [&_code]:text-xs [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-foreground"
              dangerouslySetInnerHTML={{ __html: t("theming.dark_light_desc") }}
            />
            <CodeBlock
              code={`// Toggle theme
document.documentElement.classList.toggle("light");

// Set specific theme
document.documentElement.classList.remove("light"); // → dark
document.documentElement.classList.add("light");    // → light`}
              language="tsx"
              title="theme-toggle.ts"
            />
          </div>

          <div className="border border-border bg-surface-1 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground mb-3">
              {t("theming.token_categories_heading")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { token: "--ef-yellow", desc: t("theming.tokens.ef_yellow") },
                { token: "--ef-blue", desc: t("theming.tokens.ef_blue") },
                { token: "--ef-red", desc: t("theming.tokens.ef_red") },
                { token: "--ef-green", desc: t("theming.tokens.ef_green") },
                { token: "--background", desc: t("theming.tokens.background") },
                { token: "--foreground", desc: t("theming.tokens.foreground") },
                { token: "--primary", desc: t("theming.tokens.primary") },
                { token: "--muted", desc: t("theming.tokens.muted") },
                { token: "--border", desc: t("theming.tokens.border") },
                { token: "--surface-0..3", desc: t("theming.tokens.surface") },
              ].map((item) => (
                <div
                  key={item.token}
                  className="flex items-center gap-2 text-sm"
                >
                  <code className="text-xs bg-surface-2 px-1.5 py-0.5 text-primary font-mono shrink-0">
                    {item.token}
                  </code>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Full Example */}
      <ComponentPreview
        id="full-example"
        title={t("full_example.title")}
        description={t("full_example.description")}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step1_heading")}
            </h4>
            <CodeBlock
              code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step2_heading")}
            </h4>
            <CodeBlock
              code={`npm install reend-components
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step3_heading")}
            </h4>
            <CodeBlock
              code={`// tailwind.config.ts
import reendPreset from "reend-components/tailwind";

export default {
  presets: [reendPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/reend-components/dist/**/*.{js,mjs}",
  ],
};`}
              language="tsx"
              title="tailwind.config.ts"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step4_heading")}
            </h4>
            <CodeBlock
              code={`/* src/index.css */
@import "reend-components/variables.css";

@tailwind base;
@tailwind components;
@tailwind utilities;`}
              language="css"
              title="src/index.css"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step5_heading")}
            </h4>
            <CodeBlock
              code={`import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SonnerToaster,
  toast,
} from "reend-components";

export default function App() {
  return (
    <TooltipProvider>
      <SonnerToaster theme="dark" />

      <div className="min-h-screen bg-background text-foreground p-8">
        <h1 className="font-display text-2xl text-primary mb-6">
          My Endfield App
        </h1>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => toast("Mission initiated")}
              className="px-6 py-3 bg-primary text-primary-foreground
                         font-display text-sm tracking-wider uppercase
                         hover:brightness-110 transition-all"
            >
              DEPLOY OPERATION
            </button>
          </TooltipTrigger>
          <TooltipContent>Click to trigger notification</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}`}
              language="tsx"
              title="src/App.tsx"
            />
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              {t("full_example.step6_heading")}
            </h4>
            <CodeBlock code="npm run dev" language="bash" />
          </div>

          <div className="border border-ef-green/20 bg-ef-green/5 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-ef-green mb-2">
              {t("full_example.done")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("full_example.done_desc")}
            </p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
