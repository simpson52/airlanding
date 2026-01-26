import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (MISO Brand Color: #5542F6)
        brand: {
          blue: "#5542F6",
          "blue-light": "#E8E5FF",
        },
        // Backgrounds
        bg: {
          base: "#F2F4F6",
          surface: "#FFFFFF",
          input: "#F9FAFB",
        },
        // Text Colors
        text: {
          primary: "#191F28",
          secondary: "#4E5968",
          tertiary: "#8B95A1",
          white: "#FFFFFF",
        },
        // Semantic Colors
        semantic: {
          error: "#F04452",
          success: "#5542F6",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "super-ellipse": "24px",
        "card": "24px",
        "button": "18px",
        "input": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
