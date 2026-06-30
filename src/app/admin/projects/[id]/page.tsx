import { getSession } from '@/lib/auth'
import { getProjectById } from '@/lib/projects'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import ProjectForm from '@/components/admin/ProjectForm'

type PageProps = { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: PageProps) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) notFound()

  const project = await getProjectById(numId)
  if (!project) notFound()

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <Link href="/admin/projects" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: 'var(--space-2)' }}>
          ← All Projects
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Edit Project
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
          {project.title}
        </p>
      </div>

      <ProjectForm mode="edit" project={project} />
    </div>
  )
}
