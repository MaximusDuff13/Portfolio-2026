/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve AVIF first, then WebP, from next/image
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
module.exports = nextConfig
