/** @type {import('next').NextConfig} */

import { configDotenv } from 'dotenv';

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en'
  }
};

export default nextConfig;