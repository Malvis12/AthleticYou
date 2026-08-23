/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          DEFAULT: "#08080A",
          light: "#121214",
          surface: "#1A1A1E",
          hover: "#24242A"
        },
        brand: {
          purple: "#7B2CBF",
          "purple-light": "#9D4EDD",
          "purple-dark": "#5A189A",
          glow: "rgba(123, 44, 191, 0.4)",
          gold: "#E2B874",
          "gold-light": "#F3D5A3",
        },
        slate: {
          850: "#121214",
          900: "#0D0D0F",
          950: "#08080A"
        }
      },
      fontFamily: {
        heading: ["Syne", "Outfit", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        price: ["Plus Jakarta Sans", "Outfit", "sans-serif"],
        nav: ["Plus Jakarta Sans", "Outfit", "sans-serif"],
        mono: ["Space Grotesk", "Space Mono", "monospace"],
      },
      boxShadow: {
        "glow-purple": "0 0 40px -10px rgba(123, 44, 191, 0.5)",
        "glow-gold": "0 0 40px -10px rgba(226, 184, 116, 0.4)",
        "glass": "0 20px 40px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(123, 44, 191, 0.18), transparent 70%)',
        'radial-gold-glow': 'radial-gradient(circle at 50% 50%, rgba(226, 184, 116, 0.12), transparent 60%)',
      }
    },
  },
  plugins: [],
}
