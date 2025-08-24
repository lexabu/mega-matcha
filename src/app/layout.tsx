import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Mega Matcha - Premium Matcha Experience',
    template: '%s | Mega Matcha',
  },
  description:
    'Discover the finest matcha products and experience the authentic taste of Japanese tea culture. Premium quality matcha for tea lovers worldwide.',
  keywords: [
    'matcha',
    'green tea',
    'japanese tea',
    'premium matcha',
    'organic matcha',
    'matcha powder',
    'tea ceremony',
    'healthy drinks',
    'antioxidants',
  ],
  authors: [{ name: 'Mega Matcha Team' }],
  creator: 'Mega Matcha',
  publisher: 'Mega Matcha',
  metadataBase: new URL('https://mega-matcha.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mega-matcha.vercel.app',
    title: 'Mega Matcha - Premium Matcha Experience',
    description:
      'Discover the finest matcha products and experience the authentic taste of Japanese tea culture. Premium quality matcha for tea lovers worldwide.',
    siteName: 'Mega Matcha',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mega Matcha - Premium Matcha Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mega Matcha - Premium Matcha Experience',
    description:
      'Discover the finest matcha products and experience the authentic taste of Japanese tea culture.',
    images: ['/og-image.jpg'],
    creator: '@megamatcha',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
