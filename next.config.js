/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-media.powerlook.in',
        port: '',
        pathname: '/mycustomfolder/**',
      },
    ],
  },
}

module.exports = nextConfig
