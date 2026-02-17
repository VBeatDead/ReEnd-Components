/**
 * ReEnd-Components — Tailwind CSS Preset
 * Arknights: Endfield Design System
 *
 * Usage:
 *   // tailwind.config.ts
 *   import reendPreset from "reend-components/tailwind";
 *   export default {
 *     presets: [reendPreset],
 *     content: [
 *       "./src/**\/*.{ts,tsx}",
 *       "./node_modules/reend-components/dist/**\/*.{js,mjs}",
 *     ],
 *   };
 */

import type { Config } from "tailwindcss";

const reendPreset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "monospace"],
        ui: ["Orbitron", "monospace"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
        body: ["Source Han Sans", "Noto Sans SC", "Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ef: {
          black: "hsl(var(--ef-black))",
          "black-soft": "hsl(var(--ef-black-soft))",
          "black-muted": "hsl(var(--ef-black-muted))",
          "dark-gray": "hsl(var(--ef-dark-gray))",
          gray: "hsl(var(--ef-gray))",
          "gray-mid": "hsl(var(--ef-gray-mid))",
          "gray-light": "hsl(var(--ef-gray-light))",
          "white-muted": "hsl(var(--ef-white-muted))",
          "white-soft": "hsl(var(--ef-white-soft))",
          white: "hsl(var(--ef-white))",
          yellow: "hsl(var(--ef-yellow))",
          "yellow-dark": "hsl(var(--ef-yellow-dark))",
          "yellow-glow": "hsl(var(--ef-yellow-glow))",
          blue: "hsl(var(--ef-blue))",
          "blue-light": "hsl(var(--ef-blue-light))",
          "blue-dark": "hsl(var(--ef-blue-dark))",
          cyan: "hsl(var(--ef-cyan))",
          red: "hsl(var(--ef-red))",
          green: "hsl(var(--ef-green))",
          orange: "hsl(var(--ef-orange))",
          purple: "hsl(var(--ef-purple))",
        },
        surface: {
          canvas: "hsl(var(--surface-canvas))",
          0: "hsl(var(--surface-0))",
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
          hover: "hsl(var(--surface-hover))",
          active: "hsl(var(--surface-active))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default reendPreset;
