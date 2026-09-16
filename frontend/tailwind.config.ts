import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Surface / Elevation scale ──────────────────────────────────────
        // surface-0  page canvas (deepest background)
        // surface-1  card / panel (one step up)
        // surface-2  elevated surface — active rows, modals, dropdowns
        // surface-3  overlay / scrim
        "surface-0": "#0A0C10",
        "surface-1": "#13161C",
        "surface-2": "#1D212B",
        "surface-3": "rgba(10,12,16,0.85)",

        // Legacy bg-* aliases — kept for backward-compat, map to surface tokens
        "bg-primary": "#0A0C10", // → surface-0
        "bg-card": "#13161C", // → surface-1
        "bg-elevated": "#1D212B", // → surface-2
        "bg-input": "#0E1117",
        "bg-overlay": "rgba(10,12,16,0.85)", // → surface-3

        "accent-primary": "#7C6FEF",
        "accent-primary-hover": "#9184F5",
        "accent-primary-muted": "rgba(124,111,239,0.15)",
        emerald: "#34D399",
        "emerald-muted": "rgba(52,211,153,0.15)",
        "accent-emerald": "#34D399",
        teal: "#14B8A6",
        "text-primary": "#F5F6F8",
        "text-secondary": "#9AA3B2",
        "text-muted": "#626B7A",
        "text-inverse": "#0A0C10",

        // Status chip tokens
        "status-success": "#34D399",
        "status-warning": "#F59E0B",
        "status-danger": "#EF4444",
        "status-info": "#3B82F6",
        "status-locked": "#7C6FEF",
        "status-draft": "#6B7280",

        // ── Border tokens — elevation-aware ───────────────────────────────
        "border-subtle": "rgba(154,163,178,0.12)", // surface-0 dividers
        "border-default": "rgba(154,163,178,0.2)", // surface-1 card borders
        "border-raised": "rgba(154,163,178,0.32)", // surface-2 elevated borders
        "border-hover": "rgba(154,163,178,0.4)",
        "border-focus": "rgba(124,111,239,0.6)",
      },
      backgroundColor: {
        // Surface scale
        "surface-0": "#0A0C10",
        "surface-1": "#13161C",
        "surface-2": "#1D212B",
        "surface-3": "rgba(10,12,16,0.85)",
        // Legacy aliases
        primary: "#0A0C10",
        card: "#13161C",
        elevated: "#1D212B",
        input: "#0E1117",
        overlay: "rgba(10,12,16,0.85)",
      },
      textColor: {
        primary: "#F5F6F8",
        secondary: "#9AA3B2",
        muted: "#626B7A",
        inverse: "#0A0C10",
      },
      borderColor: {
        subtle: "rgba(154,163,178,0.12)",
        default: "rgba(154,163,178,0.2)",
        raised: "rgba(154,163,178,0.32)",
        hover: "rgba(154,163,178,0.4)",
        focus: "rgba(124,111,239,0.6)",
      },
      // ── Elevation / shadow scale ─────────────────────────────────────────
      // elev-0  flat — surface-0 canvas, no lift
      // elev-1  subtle lift — cards, panels, sidebar (surface-1)
      // elev-2  raised — active rows, dropdowns, modals (surface-2)
      // elev-3  overlay — dialogs, scrim (surface-3)
      boxShadow: {
        "elev-0": "none",
        "elev-1": "0 1px 4px rgba(0,0,0,0.25), 0 4px 24px rgba(0,0,0,0.3)",
        "elev-2": "0 4px 12px rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.4)",
        "elev-3": "0 16px 48px rgba(0,0,0,0.5)",
        // Legacy aliases
        card: "0 1px 4px rgba(0,0,0,0.25), 0 4px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.4)",
        "glow-accent": "0 0 20px rgba(124,111,239,0.2)",
        "glow-emerald": "0 0 20px rgba(52,211,153,0.15)",
        modal: "0 16px 48px rgba(0,0,0,0.5)",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
      },
      borderRadius: {
        none: "0",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Geist",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
        mono: [
          "var(--font-geist-mono)",
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      // #444 — Figma type scale tokens: display → 3xl → 2xl → xl for headings;
      // lg → base → sm for body and metadata. No ad-hoc sizes in components.
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.6" }],
        xl: ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.25" }],
        "4xl": ["36px", { lineHeight: "1.2" }],
        "5xl": ["48px", { lineHeight: "1.15" }],
        display: ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      lineHeight: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.75",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0A0C10 0%, #13161C 50%, #1D212B 100%)",
        "gradient-accent-cta":
          "linear-gradient(135deg, #7C6FEF 0%, #9184F5 100%)",
        "gradient-card-glow":
          "linear-gradient(135deg, rgba(52,211,153,0.05) 0%, rgba(124,111,239,0.05) 100%)",
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
