/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Passe la limite à 50 Mo (au lieu de 1 Mo par défaut)
      bodySizeLimit: "52mb",
    },
  },
};

module.exports = nextConfig;
