'use client'

import { useState } from 'react'

interface Field {
  name: string
  label: string
  type: 'text' | 'textarea'
}

interface ContentFormProps {
  fields: Field[]
  initialData: Record<string, string>
  title: string
}

export default function ContentForm({ fields, initialData, title }: ContentFormProps) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error ?? 'Save failed')
        return
      }

      setSuccess('Content updated successfully!')
    } catch {
      setError('Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  function handleChange(name: string, value: string) {
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="content-form">
      {fields.map(field => (
        <div key={field.name} className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
          <label htmlFor={`cf-${field.name}`} className="label">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={`cf-${field.name}`}
              className="textarea"
              value={data[field.name] ?? ''}
              onChange={e => handleChange(field.name, e.target.value)}
              rows={8}
            />
          ) : (
            <input
              id={`cf-${field.name}`}
              type="text"
              className="input"
              value={data[field.name] ?? ''}
              onChange={e => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      {error && (
        <div className="login-error" role="alert" style={{ marginBottom: 'var(--space-4)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {error}
        </div>
      )}
      {success && (
        <p style={{ color: 'var(--success)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>✓ {success}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? <><span className="spinner" />Saving...</> : `Save ${title}`}
      </button>

      <style>{`
        .content-form {
          max-width: 720px;
        }
        .login-error {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: 10px 14px;
          background: rgba(255, 77, 109, 0.1);
          border: 1px solid rgba(255, 77, 109, 0.3);
          border-radius: var(--radius-md);
          color: var(--error);
          font-size: var(--text-sm);
        }
      `}</style>
    </form>
  )
}
