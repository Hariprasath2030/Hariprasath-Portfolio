/** @type {import('next').NextConfig} */
import path from "node:path";
import { fileURLToPath } from "node:url";

const previewDomain = process.env.REPLIT_DEV_DOMAIN;
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", ...(previewDomain ? [previewDomain] : [])],
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
