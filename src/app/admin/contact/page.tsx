import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getContentMany } from '@/lib/content'
import ContentForm from '@/components/admin/ContentForm'

export default async function AdminContactPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const keys = [
    'contact_email',
    'contact_whatsapp',
    'contact_instagram',
    'contact_linkedin',
    'contact_availability'
  ]
  const data = await getContentMany(keys)

  const fields = [
    { name: 'contact_email', label: 'Email', type: 'text' as const },
    { name: 'contact_whatsapp', label: 'WhatsApp', type: 'text' as const },
    { name: 'contact_instagram', label: 'Instagram', type: 'text' as const },
    { name: 'contact_linkedin', label: 'LinkedIn', type: 'text' as const },
    { name: 'contact_availability', label: 'Availability Status', type: 'text' as const },
  ]

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <Link href="/admin/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: 'var(--space-2)' }}>
          ← Dashboard
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Edit Contact Details
        </h1>
      </div>

      <ContentForm fields={fields} initialData={data} title="Contact Details" />
    </div>
  )
}
