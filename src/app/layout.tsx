import type { Metadata } from 'next'
import '@/app/globals.css'
import '@/styles/components.css'
import '@/styles/animations.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/layout/ScrollReveal'

export const metadata: Metadata = {
  title: {
    default: 'Naelvi — Graphic Designer & AI Specialist',
    template: '%s | Naelvi',
  },
  description:
    'Portfolio of Naelvi (Naufal Abdullah Almahdi) — Graphic Designer & AI Specialist based in Surabaya. Branding, social media design, video, and app projects.',
  keywords: ['graphic designer', 'AI specialist', 'portfolio', 'Surabaya', 'naelvi', 'branding'],
  authors: [{ name: 'Naelvi', url: 'https://me.naelvi.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://me.naelvi.com',
    siteName: 'Naelvi Portfolio',
    title: 'Naelvi — Graphic Designer & AI Specialist',
    description:
      'Portfolio of Naelvi (Naufal Abdullah Almahdi) — Graphic Designer & AI Specialist based in Surabaya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naelvi — Graphic Designer & AI Specialist',
    description:
      'Portfolio of Naelvi (Naufal Abdullah Almahdi) — Graphic Designer & AI Specialist based in Surabaya.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  )
}
