/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  async rewrites() {
    return [
      { source: '/actor', destination: '/api/actor' },
      { source: '/.well-known/webfinger', destination: '/api/webfinger' },
      {
        source: '/inbox',
        destination: '/api/inbox',
        has: [{ type: 'query', key: 'resource' }],
      },
    ]
  },
}
