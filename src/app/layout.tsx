import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Dancing_Script } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF7F4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.natalia-erziehungsberatung.de'),
  title: {
    default: 'Natalia Ulmer | Erziehungsberatung & Eltern-Coaching Laupheim & Ulm',
    template: '%s | Natalia Ulmer Erziehungsberatung'
  },
  description: 'Erziehungsberatung & pädagogisches Coaching für Mütter in Laupheim, Biberach, Ulm & online. 15+ Jahre Praxiserfahrung für ein gelassenes, harmonisches Familienleben ohne Anschreien.',
  keywords: [
    'Erziehungsberatung Laupheim',
    'Familienberatung Ulm',
    'Eltern-Coaching Biberach',
    'Erzieherin Natalia Ulmer',
    'Trotzphase Hilfe',
    'Wutanfälle deeskalieren',
    'Gelassen erziehen',
    'Mütter Coaching'
  ],
  authors: [{ name: 'Natalia Ulmer' }],
  creator: 'Natalia Ulmer',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.natalia-erziehungsberatung.de',
    title: 'Natalia Ulmer | Erziehungsberatung & Eltern-Coaching Laupheim',
    description: '15+ Jahre pädagogische Erfahrung für gelassene Mütter und friedliche Abende. Vor Ort in Laupheim & Online.',
    siteName: 'Natalia Ulmer Erziehungsberatung',
    images: [
      {
        url: '/input_file_1.png',
        width: 1200,
        height: 630,
        alt: 'Natalia Ulmer - Erziehungsberatung Laupheim',
      }
    ],
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/logo-icon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.natalia-erziehungsberatung.de/#business',
        name: 'Natalia Ulmer – Erziehungsberatung & Eltern-Coaching',
        url: 'https://www.natalia-erziehungsberatung.de/',
        telephone: '+4915170657581',
        email: 'Ulmernatalia@gmail.com',
        priceRange: '€€',
        image: 'https://www.natalia-erziehungsberatung.de/input_file_1.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sebastianstraße 9',
          addressLocality: 'Laupheim',
          postalCode: '88471',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 48.2294,
          longitude: 9.8837,
        },
        hasMap: 'https://share.google/79rCRsuPmN24j4k8C',
        sameAs: [
          'https://share.google/79rCRsuPmN24j4k8C',
          'https://www.instagram.com/natalia.erziehungsberatung/'
        ],
        areaServed: [
          'Laupheim',
          'Biberach an der Riß',
          'Ulm',
          'Ehingen (Donau)',
          'Deutschlandweit (Online)'
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          }
        ]
      },
      {
        '@type': 'Person',
        '@id': 'https://www.natalia-erziehungsberatung.de/#person',
        name: 'Natalia Ulmer',
        jobTitle: 'Staatlich anerkannte Erzieherin & Erziehungsberaterin',
        worksFor: {
          '@id': 'https://www.natalia-erziehungsberatung.de/#business'
        }
      }
    ]
  };

  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable} ${dancing.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#B89565]/20 selection:text-[#2C2826] min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}

