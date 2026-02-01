import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0b",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
        },
        border: "#1f1f1f",
        muted: "#1f1f1f",
        card: "#0a0a0b",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
