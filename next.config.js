const withImages = require("next-images");
/** @type {import('next').NextConfig} */
const nextConfig = {};

const imgcfg = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = imgcfg;
