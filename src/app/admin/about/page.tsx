import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getContentMany } from '@/lib/content'
import ContentForm from '@/components/admin/ContentForm'

export default async function AdminAboutPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const keys = [
    'about_bio',
    'about_tagline',
    'about_location',
    'about_experience',
    'about_skills',
    'about_tools'
  ]
  const data = await getContentMany(keys)

  const fields = [
    { name: 'about_tagline', label: 'Tagline (e.g. Graphic Designer & AI Specialist)', type: 'text' as const },
    { name: 'about_location', label: 'Location (e.g. Surabaya, Indonesia)', type: 'text' as const },
    { name: 'about_bio', label: 'Biography', type: 'textarea' as const },
    { name: 'about_skills', label: 'Skills (comma separated, e.g. Design, Video Editing)', type: 'textarea' as const },
    { name: 'about_experience', label: 'Experience (1 per line, format: Year | Company | Role)', type: 'textarea' as const },
    { name: 'about_tools', label: 'Tools (1 per line, format: Icon | Name)', type: 'textarea' as const },
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
