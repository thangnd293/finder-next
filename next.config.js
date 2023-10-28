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
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `https://3d22-113-161-87-138.ngrok-free.app/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
