/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "picsum.photos",
      "scontent.cdninstagram.com",
      "i.scdn.co",
      "maps.googleapis.com",
      "lh5.googleusercontent.com",
      "console.cloudinary.com",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `https://finder.sohe.in/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
