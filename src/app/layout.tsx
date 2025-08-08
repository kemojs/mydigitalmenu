import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'MyDigitalMenu - Digitale Speisekarten in 30 Sekunden',
  description: 'Verwandeln Sie Ihre Papierspeisekarte in weniger als 30 Sekunden in eine professionelle digitale Speisekarte mit QR-Code. Foto-zu-Digital-Scanner mit intelligenter OCR-Technologie.',
  keywords: 'digitale speisekarte, qr code menu, restaurant digitalisierung, ocr scanner, menu digitalization',
  authors: [{ name: 'MyDigitalMenu Team' }],
  creator: 'MyDigitalMenu',
  publisher: 'MyDigitalMenu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mydigitalmenu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MyDigitalMenu - Digitale Speisekarten in 30 Sekunden',
    description: 'Verwandeln Sie Ihre Papierspeisekarte in weniger als 30 Sekunden in eine professionelle digitale Speisekarte mit QR-Code.',
    url: 'https://mydigitalmenu.com',
    siteName: 'MyDigitalMenu',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyDigitalMenu - Digitale Speisekarten in 30 Sekunden',
    description: 'Verwandeln Sie Ihre Papierspeisekarte in weniger als 30 Sekunden in eine professionelle digitale Speisekarte mit QR-Code.',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}