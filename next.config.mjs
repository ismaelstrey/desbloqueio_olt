/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Otimiza o bundle do Framer Motion
    config.resolve.alias['framer-motion'] = !dev && !isServer ? 'framer-motion/dist/es/index.js' : 'framer-motion';

    // Habilita tree shaking para remover código não utilizado
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      };
    }

    return config;
  },
};

export default nextConfig;