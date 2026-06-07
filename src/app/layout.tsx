import type { Metadata } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank-ruhl',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'עת לתורה - Time to Torah',
  description: 'למד תורה יומית ותרום לצדקה | Daily Torah learning with charitable giving',
  keywords: ['Torah', 'תורה', 'לימוד', 'צדקה', 'יהדות', 'Judaism'],
  openGraph: {
    title: 'עת לתורה - Time to Torah',
    description: 'למד תורה יומית ותרום לצדקה',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${frankRuhlLibre.variable} ${heebo.variable}`}>
      <body className="min-h-screen flex flex-col bg-parchment text-ink">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
