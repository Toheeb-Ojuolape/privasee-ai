/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }, 
      
      {
        protocol: 'https',
        hostname: 'xsgames.co'
      }

    ]
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
