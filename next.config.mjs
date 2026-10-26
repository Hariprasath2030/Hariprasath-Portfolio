/** @type {import('next').NextConfig} */
const previewDomain = process.env.REPLIT_DEV_DOMAIN;

const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", ...(previewDomain ? [previewDomain] : [])],
};

export default nextConfig;
