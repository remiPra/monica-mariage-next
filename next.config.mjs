import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.wixstatic.com"],
  },
};

// Configuration spécifique à next-pwa
const withPWA = nextPwa({
  dest: "public", // dossier où le service worker sera généré
  register: true, // auto-registration du service worker
  skipWaiting: true, // force l'update dès qu'un nouveau SW est dispo
  disable: false, // toujours actif pour le test
});

// On "wrap" la config Next.js avec la config PWA
export default withPWA(nextConfig);
