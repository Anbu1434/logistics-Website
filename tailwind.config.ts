import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "var(--cream-50)",
          100: "var(--cream-100)",
          200: "var(--cream-200)",
        },
        sage: {
          100: "var(--sage-100)",
          300: "var(--sage-300)",
          500: "var(--sage-500)",
        },
        forest: {
          600: "var(--forest-600)",
          800: "var(--forest-800)",
          900: "var(--forest-900)",
        },
        ink: {
          500: "var(--ink-500)",
          900: "var(--ink-900)",
        },
        clay: {
          400: "var(--clay-400)",
          500: "var(--clay-500)",
        },
        gold: {
          500: "var(--gold-500)",
        },
        brand: {
          success: "var(--success)",
          warning: "var(--warning)",
          danger: "var(--danger)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        input: "12px",
        card: "20px",
        hero: "30px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28,31,26,.04), 0 12px 32px rgba(28,31,26,.08)",
        floating: "0 8px 30px rgba(36,53,27,0.12)",
        subtle: "0 2px 10px rgba(28,31,26,0.05)",
      },
      scale: {
        102: "1.02",
        104: "1.04",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeUp: "fadeUp 0.4s ease-out forwards",
        slideInRight: "slideInRight 0.3s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
