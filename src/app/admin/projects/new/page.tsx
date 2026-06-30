import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function NewProjectPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <Link href="/admin/projects" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: 'var(--space-2)' }}>
          ← All Projects
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          New Project
        </h1>
      </div>

      <ProjectForm mode="create" />
    </div>
  )
}
