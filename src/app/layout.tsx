import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Time to Torah — עת לתורה',
  description: 'למד תורה יומית ותרום לצדקה | Daily Torah learning with charitable giving',
  keywords: ['Torah', 'תורה', 'לימוד', 'צדקה', 'יהדות', 'Judaism'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Noto+Serif+Hebrew:wght@300;400;700&family=Heebo:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        {/* TOAST (preserved from live site) */}
        <div className="toast" id="toast">🏅 כל הכבוד! המשך כך!</div>
      </body>
    </html>
  )
}
