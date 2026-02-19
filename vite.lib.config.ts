import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      outDir: "dist/lib",
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/lib",
    lib: {
      entry: resolve(__dirname, "src/components/ui/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/react-slot",
        "@radix-ui/react-toast",
        "@radix-ui/react-tooltip",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-switch",
        "@radix-ui/react-select",
        "@radix-ui/react-avatar",
        "@radix-ui/react-progress",
        "@radix-ui/react-accordion",
        "@radix-ui/react-tabs",
        "@radix-ui/react-popover",
        "@radix-ui/react-dialog",
        "@radix-ui/react-separator",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
        "sonner",
        "tailwindcss-animate",
        "framer-motion",
        /^framer-motion\/.*/,
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
