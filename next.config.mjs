/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    /* AVIF/WebP — PNG'ga nisbatan 60–80% kichik, sifat oʻzgarmaydi */
    formats: ["image/avif", "image/webp"],
    /* Mobil qurilmalar uchun kichikroq oʻlchamlar ham generatsiya qilinsin */
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    /* Optimallashtirilgan rasmlar 1 yil kesh'da qoladi */
    minimumCacheTTL: 31536000,
  },

  /* framer-motion barrel-import'i tree-shake qilinadi — ishlatilmagan
     modullar bundle'ga tushmaydi */
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  compiler: {
    /* Prod bundle'dan console.* olib tashlanadi (xatolar qoladi) */
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
