/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
      "gyazo.com",
      "media.discordapp.net"
    ],
  }
}

module.exports = nextConfig
