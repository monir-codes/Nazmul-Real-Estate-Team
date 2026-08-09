/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a202c', // Deep navy / charcoal
          light: '#2d3748',
        },
        accent: {
          DEFAULT: '#d4af37', // Muted gold
          hover: '#b5952f',
        },
        surface: {
          DEFAULT: '#f7fafc', // Soft gray
          dark: '#e2e8f0'
        },
        background: '#fffdfa', // Warm white / ivory
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern premium sans-serif
        serif: ['Playfair Display', 'serif'], // Elegant serif for headlines
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
