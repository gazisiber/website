/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ergenekon: {
          red: '#8B0000',      // Ergenekon Logosu Koyu Kırmızı
          bright: '#DC2626',   // Butonlar için Parlak Kırmızı
          dark: '#050505',     // Çok koyu siyah (Arka plan)
          panel: '#121212',    // Kart arka planları
          silver: '#E5E7EB',   // Metin rengi
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], // Başlık Fontu
        exo: ['Exo 2', 'sans-serif'],         // Yazı Fontu
      },
      backgroundImage: {
        // GÜNCELLENDİ: Senin belirlediğin görsel ismi
        'hero-pattern': "url('/images/hero-bg.jpg')",
      }
    },
  },
  plugins: [],
}