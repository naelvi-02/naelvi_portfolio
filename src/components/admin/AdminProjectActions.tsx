'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AdminProjectActionsProps {
  projectId: number
  title: string
}

export default function AdminProjectActions({ projectId, title }: AdminProjectActionsProps) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Delete "${title}"?\n\nThis action cannot be undone.`)) return

    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error ?? 'Delete failed')
      }
    } catch {
      alert('Network error — please try again')
    }
  }

  return (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Link
        href={`/admin/projects/${projectId}`}
        className="btn btn-ghost"
        style={{ padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        id={`admin-edit-${projectId}`}
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="btn btn-danger"
        style={{ padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        id={`admin-delete-${projectId}`}
      >
        Delete
      </button>
    </div>
  )
}
