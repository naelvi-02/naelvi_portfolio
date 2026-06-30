import { getSession } from '@/lib/auth'
import { getProjects } from '@/lib/projects'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCategoryLabel } from '@/lib/utils'
import AdminProjectActions from '@/components/admin/AdminProjectActions'

export default async function AdminProjectsPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const projects = await getProjects()

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <Link href="/admin/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 'var(--space-2)', display: 'block' }}>
            ← Dashboard
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Projects
          </h1>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary" id="admin-new-project-btn">
          + New Project
        </Link>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          No projects yet — <Link href="/admin/projects/new" style={{ color: 'var(--accent)' }}>create the first one</Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Client</th>
                <th>Year</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} id={`admin-project-row-${project.id}`}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>{project.slug}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${project.category}`}>{getCategoryLabel(project.category)}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{project.client ?? '—'}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{project.year ?? '—'}</td>
                  <td>
                    {project.is_featured ? (
                      <span style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>★ Yes</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <AdminProjectActions projectId={project.id} title={project.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        .admin-table th,
        .admin-table td {
          padding: var(--space-3) var(--space-4);
          text-align: left;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .admin-table th {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--bg-secondary);
        }
        .admin-table tr:hover td {
          background: var(--bg-card);
        }
      `}</style>
    </div>
  )
}
