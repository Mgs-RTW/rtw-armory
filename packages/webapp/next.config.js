/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NEXT_PUBLIC_API_DESTINATION ??
          "https://api-service-ehe4ffvi7q-uc.a.run.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
