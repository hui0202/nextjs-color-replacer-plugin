const withColorReplacer = require('../index');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Other Next.js configurations
  experimental: {
    // Some experimental features
    appDir: false
  }
};

// Use color replacement plugin
module.exports = withColorReplacer(nextConfig, {
  // Plugin configuration options (optional)
  rootDir: process.cwd() // Default value, can customize configuration file location
}); 