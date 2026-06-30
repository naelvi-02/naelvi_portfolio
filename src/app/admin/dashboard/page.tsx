import { getSession } from '@/lib/auth'
import { getProjectStats } from '@/lib/projects'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const stats = await getProjectStats()

  return (
    <div style={{ padding: 'var(--space-10)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
          Welcome back, <span style={{ color: 'var(--accent)' }}>{session.username}</span>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {[
          { label: 'Total Projects', value: stats.total, color: 'var(--text-primary)' },
          { label: 'Design', value: stats.design, color: '#7C9FFF' },
          { label: 'Video', value: stats.video, color: '#FF7C7C' },
          { label: 'App', value: stats.app, color: '#7CFFB2' },
          { label: 'Featured', value: stats.featured, color: 'var(--accent)' },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ padding: 'var(--space-6)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: stat.color }}>{stat.value}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <a href="/admin/projects" className="btn btn-ghost" id="dash-projects-btn">View All Projects</a>
        <a href="/admin/projects/new" className="btn btn-primary" id="dash-new-project-btn">+ New Project</a>
        <a href="/admin/about" className="btn btn-ghost" id="dash-about-btn">Edit About</a>
        <a href="/admin/contact" className="btn btn-ghost" id="dash-contact-btn">Edit Contact</a>
        <a href="/" className="btn btn-ghost" id="dash-view-site-btn" target="_blank" rel="noopener noreferrer">View Site ↗</a>
      </div>
    </div>
  )
}
