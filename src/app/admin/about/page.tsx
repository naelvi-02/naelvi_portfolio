import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getContentMany } from '@/lib/content'
import ContentForm from '@/components/admin/ContentForm'

export default async function AdminAboutPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const keys = ['about_bio', 'about_tagline', 'about_location']
  const data = await getContentMany(keys)

  const fields = [
    { name: 'about_tagline', label: 'Tagline (e.g. Graphic Designer & AI Specialist)', type: 'text' as const },
    { name: 'about_location', label: 'Location (e.g. Surabaya, Indonesia)', type: 'text' as const },
    { name: 'about_bio', label: 'Biography', type: 'textarea' as const },
  ]

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <Link href="/admin/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: 'var(--space-2)' }}>
          ← Dashboard
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Edit About Content
        </h1>
      </div>

      <ContentForm fields={fields} initialData={data} title="About Content" />
    </div>
  )
}
