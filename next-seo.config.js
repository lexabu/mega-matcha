/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Mega Matcha - Premium Matcha Experience',
  description:
    'Discover the finest matcha products and experience the authentic taste of Japanese tea culture. Premium quality matcha for tea lovers worldwide.',
  canonical: 'https://mega-matcha.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mega-matcha.vercel.app',
    siteName: 'Mega Matcha',
    title: 'Mega Matcha - Premium Matcha Experience',
    description:
      'Discover the finest matcha products and experience the authentic taste of Japanese tea culture. Premium quality matcha for tea lovers worldwide.',
    images: [
      {
        url: 'https://mega-matcha.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mega Matcha - Premium Matcha Experience',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@megamatcha',
    site: '@megamatcha',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#3d8f3d',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Mega Matcha',
    },
    {
      name: 'application-name',
      content: 'Mega Matcha',
    },
    {
      name: 'msapplication-TileColor',
      content: '#3d8f3d',
    },
    {
      name: 'keywords',
      content:
        'matcha, green tea, japanese tea, premium matcha, organic matcha, matcha powder, tea ceremony, healthy drinks, antioxidants',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export default defaultSEOConfig;
