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
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
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
          lime: "hsl(var(--ef-lime))",
          "lime-dark": "hsl(var(--ef-lime-dark))",
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
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
          7: "var(--chart-7)",
          8: "var(--chart-8)",
        },
      },
      // ─── Opacity scale ────────────────────────────────────────────────────
      opacity: {
        overlay: "var(--opacity-overlay)",
        hover: "var(--opacity-hover)",
        disabled: "var(--opacity-disabled)",
        border: "var(--opacity-border)",
        focus: "var(--opacity-focus)",
        muted: "var(--opacity-muted)",
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
        "glow-sm": "var(--shadow-glow-sm)",
        "glow-md": "var(--shadow-glow-md)",
        "glow-lg": "var(--shadow-glow-lg)",
        accent: "var(--shadow-accent)",
      },
      // ─── Z-Index scale matching CSS vars ────────────────────────────────
      zIndex: {
        below: "-1",
        base: "0",
        raised: "1",
        dropdown: "100",
        sticky: "200",
        header: "1000",
        overlay: "1500",
        modal: "2000",
        toast: "3000",
        tooltip: "4000",
        max: "9999",
      },
      // ─── Transition durations matching CSS vars ──────────────────────────
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        slower: "800ms",
      },
      // ─── Transition easing matching CSS vars ─────────────────────────────
      transitionTimingFunction: {
        default: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
        smooth: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      // ─── Type scale (v3.0) ───────────────────────────────────────────────
      fontSize: {
        "display-xl": [
          "var(--type-display-xl-size,72px)",
          { lineHeight: "var(--lh-display,0.95)" },
        ],
        "display-lg": [
          "var(--type-display-lg-size,56px)",
          { lineHeight: "var(--lh-display,0.95)" },
        ],
        h1: [
          "var(--type-h1-size,48px)",
          { lineHeight: "var(--lh-heading,1.0)" },
        ],
        h2: [
          "var(--type-h2-size,36px)",
          { lineHeight: "var(--lh-heading,1.0)" },
        ],
        h3: [
          "var(--type-h3-size,28px)",
          { lineHeight: "var(--lh-heading,1.0)" },
        ],
        h4: [
          "var(--type-h4-size,22px)",
          { lineHeight: "var(--lh-heading,1.0)" },
        ],
        "body-lg": [
          "var(--type-body-lg-size,18px)",
          { lineHeight: "var(--lh-body,1.6)" },
        ],
        body: [
          "var(--type-body-size,16px)",
          { lineHeight: "var(--lh-body,1.6)" },
        ],
        "body-sm": [
          "var(--type-body-sm-size,14px)",
          { lineHeight: "var(--lh-body,1.6)" },
        ],
        caption: [
          "var(--type-caption-size,12px)",
          { lineHeight: "var(--lh-caption,1.4)" },
        ],
        overline: [
          "var(--type-overline-size,11px)",
          { lineHeight: "1.2", letterSpacing: "0.12em" },
        ],
      },
      // ─── Line heights (v3.0) ─────────────────────────────────────────────
      lineHeight: {
        heading: "var(--lh-heading, 1.0)",
        display: "var(--lh-display, 0.95)",
        body: "var(--lh-body, 1.6)",
        caption: "var(--lh-caption, 1.4)",
      },
      // ─── Aspect ratios (v3.0) ────────────────────────────────────────────
      aspectRatio: {
        banner: "21 / 9",
        feature: "16 / 9",
        portrait: "3 / 4",
        cinematic: "21 / 9",
      },
      // ─── Spacing tokens (v3.0 reference) ────────────────────────────────
      spacing: {
        "space-1": "var(--space-1,  4px)",
        "space-2": "var(--space-2,  8px)",
        "space-3": "var(--space-3,  12px)",
        "space-4": "var(--space-4,  16px)",
        "space-5": "var(--space-5,  20px)",
        "space-6": "var(--space-6,  24px)",
        "space-8": "var(--space-8,  32px)",
        "space-10": "var(--space-10, 40px)",
        "space-12": "var(--space-12, 48px)",
        "space-16": "var(--space-16, 64px)",
        "space-20": "var(--space-20, 80px)",
        "space-24": "var(--space-24, 96px)",
        "space-32": "var(--space-32, 128px)",
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
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        loadingDot: {
          "0%, 80%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
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
          from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        "switch-thumb-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "frequency-bar": {
          "0%": { transform: "scaleY(0.15)" },
          "100%": { transform: "scaleY(1)" },
        },
        slideUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
        particleDrift: {
          "0%":   { transform: "translate(0, 0)" },
          "33%":  { transform: "translate(2px, -3px)" },
          "66%":  { transform: "translate(-2px, 2px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      // ─── Animation utilities ─────────────────────────────────────────────
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.3s ease forwards",
        "fade-in-up": "fadeInUp 0.4s var(--ease-default, ease) forwards",
        "fade-in-down": "fadeInDown 0.4s var(--ease-default, ease) forwards",
        "slide-in-right": "slideInRight 0.4s var(--ease-default, ease) forwards",
        "scale-in": "scaleIn 0.3s var(--ease-default, ease) forwards",
        rotate: "rotate 1s linear infinite",
        "loading-dot": "loadingDot 1.4s ease-in-out infinite both",
        "slide-down": "slideDown 0.3s ease forwards",
        glitch: "glitch 3s infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "diamond-spin": "diamondSpin 0.8s linear infinite",
        "switch-spin": "switch-thumb-spin 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 2s linear infinite",
        skeleton: "skeletonShimmer 1.5s infinite",
        shrink: "shrink 5s linear forwards",
        "count-up": "countUp 0.4s var(--ease-default, ease) forwards",
        "dialog-in": "dialog-in 0.3s var(--ease-default, ease) forwards",
        "frequency-bar": "frequency-bar 0.8s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.3s var(--ease-sharp, ease) forwards",
        shake: "shake 0.4s var(--ease-sharp, ease)",
        "slide-up": "slideUp 0.3s var(--ease-sharp, ease) forwards",
        "particle-drift": "particleDrift 3s ease-in-out infinite",
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
          ".glow-lime": {
            "box-shadow": "0 0 20px hsl(var(--ef-lime) / 0.2)",
          },
          ".text-glow-lime": {
            "text-shadow": "0 0 16px hsl(var(--ef-lime) / 0.4)",
          },
        });

        addUtilities({
          ".bg-grid-pattern": {
            "background-image":
              "linear-gradient(var(--bg-grid-color,rgba(255,255,255,0.03)) 1px, transparent 1px), linear-gradient(90deg, var(--bg-grid-color,rgba(255,255,255,0.03)) 1px, transparent 1px)",
            "background-size":
              "var(--bg-grid-size,60px) var(--bg-grid-size,60px)",
          },
          ".bg-radial-glow": {
            "background-image": "var(--bg-glow-primary)",
            "background-repeat": "no-repeat",
            "background-position": "center top",
            "background-size": "100% 600px",
          },
          ".bg-radial-glow-lime": {
            "background-image": "var(--bg-glow-lime)",
            "background-repeat": "no-repeat",
            "background-position": "center top",
            "background-size": "100% 600px",
          },
          ".bg-diagonal-lines": {
            "background-image": "var(--bg-diagonal)",
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
