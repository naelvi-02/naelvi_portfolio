import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore the design, video, and app projects of Naelvi — Graphic Designer & AI Specialist.',
}

export const revalidate = 3600

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container section">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          Portfolio
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          {projects.length} project{projects.length !== 1 ? 's' : ''} — full view coming soon.
        </p>
      </div>
    </div>
  )
}
