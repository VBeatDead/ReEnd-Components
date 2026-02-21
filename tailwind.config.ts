import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
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
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        slower: "700ms",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
        smooth: "cubic-bezier(0.45, 0, 0.55, 1)",
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
  plugins: [tailwindcssAnimate],
} satisfies Config;
