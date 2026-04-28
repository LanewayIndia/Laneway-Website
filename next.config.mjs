/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/blogs/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/blogs/:path*`,
      },
      {
        source: '/api/blogs',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/blogs`,
      }
    ];
  },
}

export default nextConfig
