import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Standard semantic tokens (shadcn-compatible)
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#FF4500",
        bgBase: "#1a1a1a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#FF4500",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#242424",
          foreground: "rgba(255, 255, 255, 0.7)",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "rgba(255, 255, 255, 0.5)",
        },
        accent: {
          DEFAULT: "#242424",
          foreground: "#ffffff",
        },
        // Legacy project colors - dark gray
        background: {
          primary: "#1a1a1a",
          secondary: "#242424",
          tertiary: "#2e2e2e",
          elevated: "#383838",
        },
        // Brand color - OpenClaw red
        brand: {
          primary: "#FF4500",
          hover: "#FF5722",
          muted: "rgba(255, 69, 0, 0.15)",
        },
        // Text colors
        text: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.7)",
          tertiary: "rgba(255, 255, 255, 0.5)",
        },
        // Terminal colors - GitHub dark theme
        terminal: {
          bg: "#0d1117",
          header: "#161b22",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
        md: "0 8px 24px rgba(0, 0, 0, 0.4)",
        lg: "0 16px 48px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
