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
  title: 'Гостевой дом Sunrise | Черноморский курорт в Пицунде',
  description: 'Отдых на берегу Чёрного моря в Пицунде. Комфортные номера в 0,3 км от центра города и 1,1 км от моря.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/placeholder.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/placeholder.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/placeholder.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/images/placeholder.svg',
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
