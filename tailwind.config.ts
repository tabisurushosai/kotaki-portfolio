import type { Config } from "tailwindcss";

/**
 * デザイントークン（Tailwind テーマ）
 * セクション改修時はここで定義した語彙（brand-* 等）を使う。
 */
const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./portfolio.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A5F",
          "primary-deep": "#152a45",
          accent: "#C9A961",
          "accent-soft": "#d4b978",
          ink: "#2C3E50",
          paper: "#F8F9FA",
          line: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', "system-ui", "sans-serif"],
        serif: ['"Noto Serif JP"', "ui-serif", "serif"],
      },
      spacing: {
        section: "7rem",
        "section-mobile": "3.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(30, 58, 95, 0.06)",
        soft: "0 4px 14px rgba(30, 58, 95, 0.08)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
