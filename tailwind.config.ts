import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0B1F3A", 700: "#12335C" },
        ocean: { 600: "#1F5F9E" },
        orange: { 500: "#E8590C", 600: "#C94A08" },
        sky: { 50: "#F2F6FB" },
        ink: "#0F172A",
        slate: { 600: "#475569" },
        line: "#E2E8F0",
        success: "#16A34A",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: { card: "12px", input: "8px", btn: "10px" },
      boxShadow: {
        soft: "0 8px 30px rgba(11,31,58,0.08)",
        lift: "0 14px 40px rgba(11,31,58,0.14)",
      },
      maxWidth: { container: "1200px" },
    },
  },
} satisfies Config;

