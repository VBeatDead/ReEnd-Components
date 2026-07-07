import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8")) as {
  version: string;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/ef-api": {
        target: process.env.VITE_EF_API_BASE ?? "https://api.vallov.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ef-api/, ""),
      },
    },
  },
  define: {
    __REEND_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Shared micro-modules → eager vendor chunk ────────────────────
          // These are imported by both the entry and the lazy chunks below.
          // Left unmatched, Rollup hoists them INTO a lazy manual chunk
          // (sandpack/charts), which makes the entry statically depend on it
          // and preloads ~1.3 MB of editor/chart code on first paint.
          if (id.includes("vite/preload-helper")) return "vendor";
          if (id.includes("commonjsHelpers")) return "vendor";
          if (id.includes("node_modules/clsx")) return "vendor";
          if (id.includes("node_modules/tailwind-merge")) return "vendor";
          if (id.includes("node_modules/class-variance-authority"))
            return "vendor";
          if (id.includes("node_modules/@babel/runtime")) return "vendor";

          // ── Core framework ──────────────────────────────────────────────
          if (id.includes("node_modules/react-dom")) return "vendor";
          if (id.includes("node_modules/react/")) return "vendor";
          if (id.includes("node_modules/react-router")) return "router";

          // ── Heavy animation / motion ─────────────────────────────────────
          if (id.includes("node_modules/framer-motion")) return "motion";

          // ── Syntax highlighting (code blocks) ────────────────────────────
          if (id.includes("node_modules/shiki")) return "shiki";

          // ── Live sandbox editor sub-layers (lazy-loaded, Playground tab only)
          if (id.includes("node_modules/@lezer")) return "lezer";
          if (id.includes("node_modules/@codemirror")) return "codemirror";
          if (
            id.includes("node_modules/@codesandbox") ||
            id.includes("node_modules/@babel") ||
            id.includes("node_modules/@stitches")
          )
            return "sandpack";

          // ── Radix UI primitives (shared across all sections) ─────────────
          if (id.includes("node_modules/@radix-ui")) return "radix";

          // ── Charts + D3 internals (only DataDisplaySection) ──────────────
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3-") ||
            id.includes("node_modules/d3/") ||
            id.includes("node_modules/internmap") ||
            id.includes("node_modules/robust-predicates") ||
            id.includes("node_modules/earcut")
          )
            return "charts";

          // ── Icons (tree-shaken lucide subset) ────────────────────────────
          if (id.includes("node_modules/lucide-react")) return "icons";

          // ── i18n (internationalisation runtime) ──────────────────────────
          if (
            id.includes("node_modules/i18next") ||
            id.includes("node_modules/react-i18next")
          )
            return "i18n";
        },
      },
    },
  },
}));
