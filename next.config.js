/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "picsum.photos",
      "scontent.cdninstagram.com",
      "i.scdn.co",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://34.143.159.142:4000/api/v1/:path*",
      },
      {
        source: "/realtime",
        destination: "http://34.143.159.142:4000",
      },
    ];
  },
};

module.exports = nextConfig;
