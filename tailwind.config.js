/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mono: {
          base: '#000000',      // Tam Siyah (Zemin)
          surface: '#0a0a0a',   // Çok koyu gri (Kart Zeminleri)
          border: '#262626',    // Silik Çerçeveler
          white: '#ffffff',     // Ana Metin / Logo
          gray: '#a3a3a3',      // İkincil Metin
        }
      },
      fontFamily: {
        tech: ['Chakra Petch', 'sans-serif'], // Başlıklar
        mono: ['JetBrains Mono', 'monospace'], // Kod Yazıları
        sans: ['Inter', 'sans-serif'],        // Düz Yazılar
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}