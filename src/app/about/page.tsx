import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Naufal Abdullah Almahdi (Naelvi) — Graphic Designer & AI Specialist based in Surabaya.',
}

export default function AboutPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container section">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          About
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Coming soon.</p>
      </div>
    </div>
  )
}
