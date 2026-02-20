/**
 * ReEnd-Components — Tailwind CSS Preset
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
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

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
          "pure-white": "hsl(var(--ef-pure-white))",
          yellow: "hsl(var(--ef-yellow))",
          "yellow-dark": "hsl(var(--ef-yellow-dark))",
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
      // ─── Shadows referencing CSS vars ───────────────────────────────────
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      // ─── Z-Index scale matching CSS vars ────────────────────────────────
      zIndex: {
        base: "0",
        dropdown: "10",
        sticky: "20",
        overlay: "30",
        modal: "40",
        popover: "50",
        toast: "60",
        tooltip: "70",
      },
      // ─── Transition durations matching CSS vars ──────────────────────────
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        slower: "700ms",
      },
      // ─── Transition easing matching CSS vars ─────────────────────────────
      transitionTimingFunction: {
        default: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
        smooth: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      // ─── Keyframes ───────────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDown: {
          from: { transform: "scaleY(0)", opacity: "0" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": { transform: "translate(-2px, 1px)" },
          "94%": { transform: "translate(2px, -1px)" },
          "96%": { transform: "translate(-1px, -1px)" },
          "98%": { transform: "translate(1px, 1px)" },
        },
        cursorBlink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        diamondSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" },
        },
        scanLine: {
          "0%": { top: "-5%" },
          "100%": { top: "105%" },
        },
        skeletonShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shrink: {
          from: { transform: "scaleX(1)" },
          to: { transform: "scaleX(0)" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dialog-in": {
          from: { opacity: "0", scale: "0.96" },
          to: { opacity: "1", scale: "1" },
        },
        "frequency-bar": {
          "0%": { transform: "scaleY(0.15)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      // ─── Animation utilities ─────────────────────────────────────────────
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.3s ease forwards",
        "fade-in-up": "fadeInUp 0.4s var(--ease-default, ease) forwards",
        "slide-in-right": "slideInRight 0.3s var(--ease-smooth, ease) forwards",
        "slide-down": "slideDown 0.3s ease forwards",
        glitch: "glitch 3s infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "diamond-spin": "diamondSpin 0.8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 2s linear infinite",
        skeleton: "skeletonShimmer 1.5s infinite",
        shrink: "shrink 5s linear forwards",
        "count-up": "countUp 0.4s var(--ease-default, ease) forwards",
        "dialog-in": "dialog-in 0.2s var(--ease-default, ease) forwards",
        "frequency-bar": "frequency-bar 0.8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    // ─── Endfield Signature Utilities ────────────────────────────────────
    plugin(
      ({
        addUtilities,
        addComponents,
      }: {
        addUtilities: (
          utilities: Record<string, Record<string, string>>,
        ) => void;
        addComponents: (
          components: Record<string, Record<string, string>>,
        ) => void;
      }) => {
        addComponents({
          ".clip-corner": {
            "clip-path":
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          },
          ".clip-corner-sm": {
            "clip-path":
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          },
          ".clip-corner-lg": {
            "clip-path":
              "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          },
        });

        addComponents({
          ".scanline-overlay": {
            position: "relative",
          },
          ".scanline-overlay::after": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.015) 2px, rgba(255, 255, 255, 0.015) 4px)",
            "pointer-events": "none",
            "z-index": "1",
          },
        });

        addUtilities({
          ".animate-skeleton": {
            background:
              "linear-gradient(90deg, hsl(var(--surface-1)) 0%, hsl(var(--surface-2)) 50%, hsl(var(--surface-1)) 100%)",
            "background-size": "200% 100%",
            animation: "skeletonShimmer 1.5s infinite",
          },
        });

        addUtilities({
          ".animate-slide-down": {
            animation: "slideDown 0.3s ease forwards",
            "transform-origin": "top",
            overflow: "hidden",
          },
        });

        addUtilities({
          ".glow-yellow": {
            "box-shadow": "0 0 20px hsl(var(--primary) / 0.2)",
          },
          ".glow-yellow-strong": {
            "box-shadow": "0 0 40px hsl(var(--primary) / 0.3)",
          },
          ".text-glow-yellow": {
            "text-shadow": "0 0 20px hsl(var(--primary) / 0.3)",
          },
        });

        addUtilities({
          ".gradient-line-h": {
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
          },
          ".gradient-line-v": {
            width: "1px",
            background:
              "linear-gradient(180deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
          },
        });
      },
    ),
  ],
};

export default reendPreset;
