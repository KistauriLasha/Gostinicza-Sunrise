import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
})
const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.guest-house-sunrise.ru/'),
  title: 'Гостевой дом Sunrise | Черноморский курорт в Пицунде',
  description: 'Отдых на берегу Чёрного моря в Пицунде. Комфортные номера в 0,3 км от центра города и 1,1 км от моря.',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Гостевой дом Sunrise | Черноморский курорт в Пицунде',
    description: 'Отдых на берегу Чёрного моря в Пицунде. Комфортные номера в 0,3 км от центра города и 1,1 км от моря.',
    url: 'https://www.guest-house-sunrise.ru/',
    siteName: 'Sunrise Пицунда',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гостевой дом Sunrise | Черноморский курорт в Пицунде',
    description: 'Отдых на берегу Чёрного моря в Пицунде. Комфортные номера в 0,3 км от центра города и 1,1 км от моря.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${jost.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
