/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["var(--font-great-vibes)", "cursive"],
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        contact: "url('/contact.jpg')",
      },
      colors: {
        customBrown: "rgba(181, 116, 75, 0.7)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.5)",
        soft: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-in-out",
        pulseGlow: "pulseGlow 2s infinite",
        bounceSlow: "bounce 3s infinite",
        // Ajout de l’animation text-fade
        "text-fade": "text-fade 1s forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(255, 255, 255, 1)",
          },
        },
        // Keyframes pour le text-fade
        "text-fade": {
          "0%": {
            color: "#A67B5B",
            opacity: 1,
          },
          "100%": {
            color: "#ffffff",
            opacity: 1,
          },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      backdropFilter: {
        blurSoft: "blur(4px)",
        brightnessSoft: "brightness(0.8)",
      },
    },
  },
  plugins: [],
};
