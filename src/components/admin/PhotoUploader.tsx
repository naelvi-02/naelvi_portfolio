'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PhotoUploader({ initialPhoto }: { initialPhoto?: string }) {
  const [photo, setPhoto] = useState(initialPhoto)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', 'about')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      const newUrl = data.url
      setPhoto(newUrl)

      // Save to site_content
      const saveRes = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about_photo: newUrl }),
      })

      if (!saveRes.ok) throw new Error('Failed to save content')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ padding: 'var(--space-6)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>About Photo</h3>
      
      <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
        {photo ? (
          <div style={{ position: 'relative', width: '120px', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <Image src={photo} alt="About photo" fill style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ width: '120px', height: '140px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
            NA
          </div>
        )}

        <div>
          <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'inline-block' }}>
            {uploading ? 'Uploading...' : 'Upload Photo'}
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
          </label>
          <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Recommended: 400x500px portrait image.
          </p>
          {error && <p style={{ color: 'var(--error)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>{error}</p>}
        </div>
      </div>
    </div>
  )
}
