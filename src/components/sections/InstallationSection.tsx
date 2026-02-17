import { ComponentPreview } from "../docs/ComponentPreview";
import { CodeBlock } from "../docs/CodeBlock";

export const InstallationSection = () => {
  return (
    <>
      {/* Getting Started */}
      <ComponentPreview
        id="getting-started"
        title="Getting Started"
        description="Install ReEnd-Components into your React project in minutes. Available on npm as a public package."
      >
        <div className="space-y-6">
          <div className="border border-border bg-surface-1 p-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
              ◆ PREREQUISITES
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">React 18+</strong> or
                  React 19
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Node.js 18+</strong>{" "}
                  recommended
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Tailwind CSS 3.4+</strong>{" "}
                  (optional — pre-built CSS available)
                </span>
              </li>
            </ul>
          </div>

          <div className="border border-border bg-surface-1 p-6">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-4">
              ◆ NPM PACKAGE
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.npmjs.com/package/reend-components"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ef-blue hover:text-ef-blue-light transition-colors underline underline-offset-2"
              >
                npmjs.com/package/reend-components ↗
              </a>
              <span className="font-mono text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5">
                v0.1.0
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Install Package */}
      <ComponentPreview
        id="install-package"
        title="Step 1 — Install Package"
        description="Install reend-components and its peer dependencies using your preferred package manager."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ NPM
            </h4>
            <CodeBlock code="npm install reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ PNPM
            </h4>
            <CodeBlock code="pnpm add reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ YARN
            </h4>
            <CodeBlock code="yarn add reend-components" language="bash" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ BUN
            </h4>
            <CodeBlock code="bun add reend-components" language="bash" />
          </div>

          <div className="border border-border bg-surface-1 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground mb-3">
              PEER DEPENDENCIES
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              These must be installed in your project (most React projects
              already have them):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      PACKAGE
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      VERSION
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-mono text-foreground">
                      react
                    </td>
                    <td className="py-2 px-3">≥18.0.0</td>
                    <td className="py-2 px-3 text-ef-red">Required</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-mono text-foreground">
                      react-dom
                    </td>
                    <td className="py-2 px-3">≥18.0.0</td>
                    <td className="py-2 px-3 text-ef-red">Required</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-foreground">
                      tailwindcss
                    </td>
                    <td className="py-2 px-3">≥3.4.0</td>
                    <td className="py-2 px-3 text-ef-green">Optional</td>
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
        title="Step 2 — Configure Tailwind CSS"
        description="ReEnd ships a Tailwind preset with the Endfield design system tokens. Add it to your config for seamless integration."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ TAILWIND.CONFIG.TS
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
              WHAT THE PRESET INCLUDES
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  Endfield color palette (ef-yellow, ef-blue, ef-red, ef-green,
                  etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  Semantic tokens (background, foreground, primary, muted, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>Custom fonts (Saira, Chakra Petch, JetBrains Mono)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>
                  Animations (accordion, collapsible, fade-in/out, zoom, slide)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>Dark mode support via class strategy</span>
              </li>
            </ul>
          </div>
        </div>
      </ComponentPreview>

      {/* Import Styles */}
      <ComponentPreview
        id="import-styles"
        title="Step 3 — Import Styles"
        description="Import the CSS design tokens to get the Endfield visual language. Choose between CSS variables or the pre-built stylesheet."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ OPTION A — CSS VARIABLES (RECOMMENDED)
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Import the variables file in your global CSS. Works with any
              styling solution.
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
              ◆ OPTION B — PRE-BUILT STYLESHEET
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you're <strong>not using Tailwind</strong>, import the
              pre-built CSS that includes all design tokens and base styles.
            </p>
            <CodeBlock
              code={`// In your entry file (main.tsx / App.tsx)
import "reend-components/styles.css";`}
              language="tsx"
              title="main.tsx"
            />
          </div>

          <div className="border border-ef-yellow/20 bg-ef-yellow/5 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-ef-yellow mb-2">
              ⚠ NOTE
            </h4>
            <p className="text-sm text-muted-foreground">
              All color values use{" "}
              <strong className="text-foreground">
                HSL without the wrapper
              </strong>
              , enabling alpha channel support:{" "}
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
        title="Step 4 — Use Components"
        description="Import and use ReEnd components in your React application. All components are tree-shakeable and fully typed."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ TOOLTIP EXAMPLE
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
              ◆ TOAST NOTIFICATION
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
              ◆ SONNER TOAST (ALTERNATIVE)
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
        title="API Reference"
        description="Complete list of all exported components, utilities, and hooks available in reend-components."
      >
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    EXPORT
                  </th>
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    TYPE
                  </th>
                  <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  [
                    "Tooltip",
                    "Component",
                    "Radix Tooltip root (controlled/uncontrolled)",
                  ],
                  [
                    "TooltipTrigger",
                    "Component",
                    "Element that triggers the tooltip on hover/focus",
                  ],
                  [
                    "TooltipContent",
                    "Component",
                    "Styled tooltip popup with animations",
                  ],
                  [
                    "TooltipProvider",
                    "Component",
                    "Context provider for tooltip delay/skip settings",
                  ],
                  [
                    "Toast",
                    "Component",
                    "Radix Toast notification with variant support",
                  ],
                  ["ToastAction", "Component", "Action button inside a toast"],
                  [
                    "ToastClose",
                    "Component",
                    "Close button for dismissing toast",
                  ],
                  [
                    "ToastTitle",
                    "Component",
                    "Title text within a toast notification",
                  ],
                  [
                    "ToastDescription",
                    "Component",
                    "Description text within a toast",
                  ],
                  [
                    "ToastProvider",
                    "Component",
                    "Context provider for Radix toast system",
                  ],
                  [
                    "ToastViewport",
                    "Component",
                    "Fixed viewport container for toasts",
                  ],
                  [
                    "Toaster",
                    "Component",
                    "Pre-configured toast container (renders all toasts)",
                  ],
                  [
                    "SonnerToaster",
                    "Component",
                    "Sonner-based toast container with Endfield styling",
                  ],
                  ["toast", "Function", "Sonner toast trigger function"],
                  [
                    "toastAction",
                    "Function",
                    "Radix toast dispatch (programmatic trigger)",
                  ],
                  [
                    "useToast()",
                    "Hook",
                    "Returns { toasts, toast, dismiss } for Radix toasts",
                  ],
                  [
                    "cn()",
                    "Utility",
                    "clsx + tailwind-merge class name helper",
                  ],
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
              ◆ PACKAGE ENTRY POINTS
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
        title="Theming & Customization"
        description="Override design tokens to match your brand while keeping the Endfield visual language."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ OVERRIDE CSS VARIABLES
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
              ◆ DARK / LIGHT MODE
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Toggle{" "}
              <code className="text-xs bg-surface-2 px-1.5 py-0.5 text-foreground">
                .light
              </code>{" "}
              class on your document root to switch modes. All tokens
              auto-update.
            </p>
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
              AVAILABLE TOKEN CATEGORIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { token: "--ef-yellow", desc: "Primary brand accent" },
                { token: "--ef-blue", desc: "Info / links" },
                { token: "--ef-red", desc: "Destructive / error" },
                { token: "--ef-green", desc: "Success / confirm" },
                { token: "--background", desc: "Page background" },
                { token: "--foreground", desc: "Primary text" },
                { token: "--primary", desc: "Brand color (buttons, links)" },
                { token: "--muted", desc: "Subdued backgrounds" },
                { token: "--border", desc: "Edge/divider color" },
                { token: "--surface-0..3", desc: "Elevation surfaces" },
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
        title="Full Project Example"
        description="A complete setup from scratch — new Vite + React project with ReEnd-Components integrated."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-primary mb-3">
              ◆ 1. CREATE PROJECT
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
              ◆ 2. INSTALL DEPENDENCIES
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
              ◆ 3. CONFIGURE TAILWIND
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
              ◆ 4. SETUP CSS
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
              ◆ 5. BUILD YOUR APP
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
              ◆ 6. RUN
            </h4>
            <CodeBlock code="npm run dev" language="bash" />
          </div>

          <div className="border border-ef-green/20 bg-ef-green/5 p-5">
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-ef-green mb-2">
              ✓ DONE
            </h4>
            <p className="text-sm text-muted-foreground">
              Your app is now running with the Endfield design system. All
              components, design tokens, and animations are available. Visit the
              component sections in the sidebar to explore more components and
              usage patterns.
            </p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};
