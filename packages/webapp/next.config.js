/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_DESTINATION,
      },
    ];
  },
};

module.exports = nextConfig;
