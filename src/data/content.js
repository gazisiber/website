// src/data/content.js

// Hero Bölümü Verileri
export const heroContent = {
  title: "ERGENEKON R&D TEAM",
  subtitle: "GAZİ ÜNİVERSİTESİ",
  description: "Milli Savunma ve İleri Teknoloji için Yenilikçi, Yerli ve Milli Çözümler.",
  ctaPrimary: "Projelerimiz",
  ctaSecondary: "İletişim",
};

// Hakkımızda ve İstatistikler
export const aboutContent = {
  title: "Biz Kimiz?",
  text: "2024 yılında Gazi Üniversitesi'nde kurulan, modern dünyanın dijital tehditlerine boyun eğmeyen, donanımlı bireyler yetiştirmeyi amaçlayan bir AR-GE takımıyız. Savunma sanayii, uzay havacılık ve siber güvenlik alanlarında projeler geliştiriyoruz.",
  stats: [
    { number: "5", label: "BAP Projesi" },
    { number: "4", label: "TÜBİTAK Projesi" },
    { number: "3", label: "TEKNOFEST Finali" },
    { number: "1", label: "TÜBİTAK 1001 Projesi" },
    { number: "2", label: "Hackathon Ödülü" },
    { number: "1", label: "Fikir Yarışması Ödülü" },
    { number: "420K", label: "Ödül Desteği" },
  ]
};

// Projeler Listesi
export const projects = [
  {
    id: 1,
    slug: "burkay",
    title: "BURKAY",
    category: "Air Defense Systems",
    description: "Lazer güdümlü ve yapay zeka tabanlı akıllı hava savunma sistemi. Video Kabiliyet Gösterimi aşamasına kadar ilerlemiştir.",
    fullDescription: "BURKAY projesi, lazer güdümlü ve yapay zeka tabanlı akıllı hava savunma sistemi olarak tasarlanmıştır. Proje, düşman insansız hava araçlarını tespit etmek ve etkisiz hale getirmek için geliştirilen yenilikçi bir sistemdir. Video Kabiliyet Gösterimi aşamasına kadar başarıyla ilerlemiştir.",
    image: "/images/logo-full.png",
    status: "Aktif Geliştirme",
    year: "2024",
    achievements: ["Video Kabiliyet Gösterimi", "BAP Desteği"]
  },
  {
    id: 2,
    slug: "kizilyel",
    title: "KIZILYEL",
    category: "5G Positioning",
    description: "TEKNOFEST 5G Konumlandırma Yarışması'nda 'En Özgün Yazılım' ödülü alan projemiz.",
    fullDescription: "KIZILYEL projesi, 5G teknolojileri kullanarak yüksek hassasiyetli konum belirleme sistemi geliştirmektedir. TEKNOFEST 5G Konumlandırma Yarışması'nda 'En Özgün Yazılım' ödülünü kazanmış olan proje, savunma, lojistik ve acil müdahale senaryolarında kullanılmak üzere tasarlanmıştır.",
    image: "/images/logo-full.png",
    status: "Tamamlandı",
    year: "2024",
    achievements: ["TEKNOFEST En Özgün Yazılım Ödülü", "5G İnovasyon"]
  },
  {
    id: 3,
    slug: "gokyel",
    title: "GÖKYEL",
    category: "Satellite Communication",
    description: "Güvenli Uydu Haberleşmesi projesi. Fikir detay raporu aşamasına kadar başarıyla gelmiştir.",
    fullDescription: "GÖKYEL projesi, güvenli ve şifreli uydu haberleşmesi sağlamak amacıyla geliştirilmektedir. Milli ve yerli çözümlerle donatılan sistem, kritik altyapı ve savunma haberleşmesinde kullanılmak üzere tasarlanmıştır. Fikir detay raporu aşamasına kadar başarıyla ilerlemiştir.",
    image: "/images/logo-full.png",
    status: "Planlama",
    year: "2024",
    achievements: ["Fikir Detay Raporu", "TÜBİTAK Başvurusu"]
  },
  {
    id: 4,
    slug: "kuant-us",
    title: "KUANT-US",
    category: "Quantum Security",
    description: "Kuantum Dirençli, Otonom ve Donanım Uyumlu Uydu Güvenliği Sistemi. UDHAM mansiyon ödülü sahibi.",
    fullDescription: "KUANT-US, kuantum bilgisayarlara karşı dirençli şifreleme algoritmaları kullanarak uydu haberleşmesinin güvenliğini sağlamayı hedefleyen bir projedir. Otonom çalışma kapasitesi ve mevcut donanımlarla uyumlu tasarımıyla öne çıkmaktadır. UDHAM yarışmasında mansiyon ödülü kazanmıştır.",
    image: "/images/logo-full.png",
    status: "Aktif Geliştirme",
    year: "2024",
    achievements: ["UDHAM Mansiyon Ödülü", "Kuantum Şifreleme Araştırması"]
  }
];

// İletişim Bilgileri (GÜNCELLENDİ: Gökhan Tonkal)
export const teamContact = {
  name: "Gökhan TONKAL",
  title: "İletişim Sorumlusu & YK Üyesi",
  email: "gokhan.tonkal@teamergenekon.org",

  linkedin: "https://linkedin.com/company/team-ergenekon",
  instagram: "https://www.instagram.com/team.ergenekon",
  linktree: "https://linktr.ee/ergenekon",
  location: "Gazi Üniversitesi, Ankara"
};

// Takım Yapısı ve Hiyerarşisi (YENİ EKLENDİ)
export const teamStructure = {
  // Liderlik
  leadership: [
    { role: "Takım Kaptanı", name: "Abdullah ZEYNEL", image: "/images/members_images/abdullah_.png" },
    { role: "Kaptan Yardımcısı", name: "Zeren KAVAZ", image: "/images/members_images/zeren_kavaz.png" }
  ],
  // Denetim Kurulu (1 Kişi)
  auditBoard: [
    { role: "Denetim Kurulu Üyesi", name: "Tolga DEMİREL", image: "/images/members_images/tolga_demirel.png" }
  ],
  // Yönetim Kurulu (6 Kişi)
  managementBoard: [
    { role: "Yönetim Kurulu Üyesi", name: "Kerem DURGUT", image: "/images/members_images/kerem_durgut.png" },
    { role: "Yönetim Kurulu Üyesi", name: "Batuhan TÜRKYILMAZ", image: "/images/members_images/batuhan_turkyilmaz.png" },
    { role: "Yönetim Kurulu Üyesi", name: "Atakan ERDOĞAN", image: "/images/members_images/atakan_erdogan.png" },
    { role: "Yönetim Kurulu Üyesi", name: "Gökhan TONKAL", image: "/images/members_images/gokhan_tonkal.png" },
    { role: "Yönetim Kurulu Üyesi", name: "Zeynep AKSU", image: "/images/members_images/zeynep_aksu.png" },
    { role: "Yönetim Kurulu Üyesi", name: "Hümeyra EKİNCİ", image: "/images/members_images/humeyra_ekinci.png" },
  ],
  // Alt Ekipler (Tabs için)
  subTeams: {
    software: [ // Yazılım Ekibi
      { name: "Edip HAZURİ", role: "Geliştirici", image: "/images/members_images/edip_hazuri.png" },
      { name: "Furkan İŞERİ", role: "Geliştirici", image: "/images/members_images/furkan_iseri.png" },
      { name: "Dilanur Sanem KARAGÖZ", role: "Geliştirici", image: "/images/members_images/dilanur_sanem_karagoz.png" },
      { name: "Ege ERTEKİN", role: "Geliştirici", image: "/images/members_images/ege_ertekin.png" },
      { name: "Melda KAHRAMAN", role: "Geliştirici", image: "/images/members_images/melda_kahraman.png" },
      { name: "Recep KARABULUT", role: "Geliştirici", image: "/images/members_images/recep_karabulut.png" },
      { name: "Yusuf Eren ŞAHİN", role: "Geliştirici", image: "/images/members_images/yusuf_eren_sahin.png" },
      { name: "Nehir DARICI", role: "Geliştirici", image: "/images/members_images/nehir_darici.png" },
    ],
    mechanics: [ // Mekanik Ekibi
      { name: "Zeynep Berra ÜRKÜT", role: "Mekanik Mühendis", image: "/images/members_images/zeynep_berra_urkut.png" },
    ],
    electronics: [ // Elektronik Ekibi
      { name: "Betül DORUK", role: "Elektronik Mühendis", image: "/images/members_images/betul_doruk.png" },
      { name: "Ata Efe AY", role: "Elektronik Mühendis", image: "/images/members_images/ata_efe_ay.png" },
      { name: "Mehmet Aydın ERBEY", role: "Elektronik Mühendis", image: "/images/members_images/mehmet_aydin_erbey.png" },
      { name: "Ozan BİLGİN", role: "Elektronik Mühendis", image: "/images/members_images/ozan_bilgin.png" },
    ]
  }
};