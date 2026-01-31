const packageJson = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    APP_VERSION: packageJson.version,
  },
}

module.exports = nextConfig
