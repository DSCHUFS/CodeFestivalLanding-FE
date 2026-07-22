import '@/styles/globals.css';

import { clsx } from 'clsx';
import { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import Providers from '@/app/providers';
import { METADATA } from '@/constants/metadata';

export const metadata: Metadata = {
  metadataBase: new URL(METADATA.url),
  title: METADATA.title,
  description: METADATA.description,
  openGraph: {
    title: METADATA.title,
    description: METADATA.description,
    url: METADATA.url,
    type: 'website',
    images: [
      {
        url: '/static/images/og_image.png',
        width: 1200,
        height: 630,
        alt: METADATA.title,
      },
    ],
    siteName: METADATA.siteName,
    locale: 'ko_KR',
  },
  verification: {
    google: 'BQYPxURYOVPi4CagEphl_-CqrCRwEvi3MA6ip0sqvyo',
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.title,
    description: METADATA.description,
    images: [
      {
        url: '/static/images/og_image.png',
        alt: METADATA.title,
      },
    ],
    site: '@gdghufs',
  },
  icons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/static/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', url: '/static/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/static/favicon/favicon-16x16.png' },
    ],
    apple: [
      { sizes: '57x57', url: '/static/favicon/apple-icon-57x57.png' },
      { sizes: '60x60', url: '/static/favicon/apple-icon-60x60.png' },
      { sizes: '72x72', url: '/static/favicon/apple-icon-72x72.png' },
      { sizes: '76x76', url: '/static/favicon/apple-icon-76x76.png' },
      { sizes: '114x114', url: '/static/favicon/apple-icon-114x114.png' },
      { sizes: '120x120', url: '/static/favicon/apple-icon-120x120.png' },
      { sizes: '144x144', url: '/static/favicon/apple-icon-144x144.png' },
      { sizes: '152x152', url: '/static/favicon/apple-icon-152x152.png' },
      { sizes: '180x180', url: '/static/favicon/apple-icon-180x180.png' },
    ],
  },
  manifest: '/static/favicon/manifest.json',
  applicationName: '2025 HUFS CodeFestival',
};

export const viewport: Viewport = {
  themeColor: '#000105',
};

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
  variable: '--font-jetbrains',
});

const pretendard = localFont({
  src: './_fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
  variable: '--font-pretendard',
});

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <body className={clsx(pretendard.variable, jetbrains.variable)}>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
