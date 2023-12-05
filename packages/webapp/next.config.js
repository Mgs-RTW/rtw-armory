/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:80/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
