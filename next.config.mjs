import withPlaiceholder from '@plaiceholder/next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
  },
  env: {
    NEXT_PUBLIC_VERCEL: process.env.VERCEL,
  },
};

export default withVanillaExtract(withPlaiceholder(nextConfig));
