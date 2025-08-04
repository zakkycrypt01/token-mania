import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-wallet-address',
            value: ':wallet-address', // Placeholder, will be replaced by middleware
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'cookie',
            key: 'wallet-address',
            value: '(?<walletAddress>.*)',
          },
        ],
        missing: [
           {
            type: 'header',
            key: 'x-wallet-address'
           }
        ],
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
