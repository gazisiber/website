// src/data/content.js

export const heroContent = {
  title: "GAZISIBER",
  subtitle: "< CYBER_SECURITY_COMMUNITY />",
  description: "Gazi Üniversitesi'nin dijital kalesi. Siber güvenlik, yapay zeka, özgür yazılım ve ileri Ar-Ge çalışmalarının merkezi.",
  ctaPrimary: "Aramıza Katıl",
  ctaSecondary: "Takımlarımız",
};

export const aboutContent = {
  title: "system_info",
  text: "2015'ten beri 'Hacktrick', 'SiberVatan' ve uluslararası CTF başarılarıyla bilinen, Türkiye'nin en aktif teknoloji topluluğuyuz.",
  stats: [
    { number: "4", label: "Aktif Takım" },
    { number: "50+", label: "Yıllık Etkinlik" },
    { number: "1500+", label: "Topluluk Üyesi" },
  ]
};

// GÜNCELLENEN KISIM: 4 ANA TAKIM
export const teams = [
  {
    id: "siber",
    name: "Siber Güvenlik Takımı",
    role: "Blue & Red Teaming",
    desc: "CTF yarışmaları, penetrasyon testleri ve ağ güvenliği çalışmaları.",
    color: "cyan", // Neon Mavi
    icon: "ShieldCheck"
  },
  {
    id: "ai",
    name: "Yapay Zeka Takımı",
    role: "AI & Data Science",
    desc: "Makine öğrenmesi, derin öğrenme ve veri analitiği projeleri.",
    color: "purple", // Mor
    icon: "BrainCircuit"
  },
  {
    id: "pardus",
    name: "Pardus & Özgür Yazılım",
    role: "Open Source",
    desc: "Linux sistem yönetimi, açık kaynak geliştirme ve Pardus ekosistemi.",
    color: "green", // Terminal Yeşili
    icon: "Terminal"
  },
  {
    id: "ergenekon",
    name: "Ergenekon R&D Team",
    role: "Defense Tech",
    desc: "Savunma sanayii, İHA/SİHA sistemleri ve donanım güvenliği.",
    color: "red", // Ergenekon Kırmızısı
    icon: "Rocket"
  }
];

export const activities = [
  {
    title: "HACKTRICK",
    date: "Mayıs 2025",
    type: "Konferans",
    desc: "Siber güvenlik dünyasının devleri Gazi'de buluşuyor.",
  },
  {
    title: "TEA & TALK",
    date: "Her Ay",
    type: "Networking",
    desc: "Sektör liderleriyle çay eşliğinde kariyer sohbetleri.",
  },
  {
    title: "BOOTCAMPS",
    date: "Dönem Boyunca",
    type: "Eğitim",
    desc: "Sıfırdan ileri seviyeye teknik eğitim maratonları.",
  }
];

export const contactInfo = {
  email: "info@gazisiber.org",
  socials: {
    instagram: "instagram.com/gazisiber",
    twitter: "twitter.com/gazisiber",
    linkedin: "linkedin.com/company/gazisiber"
  }
};