import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      sm: "480px",
      md: "744px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1728px",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        textGrey: "hsl(var(--text-grey))",
        favorite: "hsl(var(--favorite))",
        watching: "hsl(var(--watching))",
        progressBarBg: "hsl(var(--progress-bar-bg))",
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
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fireFlicker: {
          "0%": {
            textShadow:
              "0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 69, 0, 0.8)",
          },
          "25%": {
            textShadow:
              "0 0 8px rgba(255, 140, 0, 0.8), 0 0 15px rgba(255, 69, 0, 0.8)",
          },
          "50%": {
            textShadow:
              "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 140, 0, 0.8)",
          },
          "75%": {
            textShadow:
              "0 0 12px rgba(255, 105, 0, 0.8), 0 0 25px rgba(255, 69, 0, 0.8)",
          },
          "100%": {
            textShadow:
              "0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 69, 0, 0.8)",
          },
        },
        glow: {
          "0%": {
            textShadow:
              "0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.7)",
          },
          "100%": {
            textShadow:
              "0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fire-flicker": "fireFlicker 1.5s infinite",
        glowing: "glow 1.5s ease-in-out infinite",
      },
    },
    darkMode: ["class"],
    safelist: ["dark"],
    plugins: [tailwindAnimate],
  },
};

export default config;
