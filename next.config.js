const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  experimental: {
    forceSwcTransforms: true,
  },
}
module.exports = nextConfig

