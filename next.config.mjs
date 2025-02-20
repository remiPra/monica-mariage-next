import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.wixstatic.com"],
  },
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
};

// Configuration spécifique à next-pwa
const withPWA = nextPwa({
  dest: "public", // dossier où le service worker sera généré
  register: true, // auto-registration du service worker
  skipWaiting: true, // force l'update dès qu'un nouveau SW est dispo
  disable: process.env.NODE_ENV === "development", // désactiver en mode dev
});

// On "wrap" la config Next.js avec la config PWA
export default withPWA(nextConfig);
