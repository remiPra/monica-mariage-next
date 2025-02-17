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
        // Ajout d'images de fond personnalisées
        contact: "url('/contact.jpg')", // Image pour le fond
      },
      colors: {
        // Ajout de couleurs personnalisées
        customBrown: "rgba(181, 116, 75, 0.7)", // Couleur personnalisée
      },
    },
  },
  plugins: [],
};
