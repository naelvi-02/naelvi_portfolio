'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/types'

interface ProjectFormProps {
  project?: Project  // if provided: edit mode, else create
  mode: 'create' | 'edit'
}

const CATEGORY_OPTIONS = [
  { value: 'design', label: 'Design' },
  { value: 'video', label: 'Video' },
  { value: 'app', label: 'App' },
]

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState(project?.thumbnail ?? '')
  const [toolsInput, setToolsInput] = useState(project?.tools.join(', ') ?? '')

  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', 'thumbnails')

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Upload failed')
        return
      }

      setThumbnailPreview(data.url)
    } catch {
      setError('Upload failed — check network')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    const form = formRef.current!
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''

    const payload = {
      title: getValue('title'),
      category: getValue('category'),
      client: getValue('client') || undefined,
      year: getValue('year') ? parseInt(getValue('year'), 10) : undefined,
      description: getValue('description') || undefined,
      thumbnail: thumbnailPreview || undefined,
      tools: toolsInput.split(',').map(t => t.trim()).filter(Boolean),
      is_featured: (form.elements.namedItem('is_featured') as HTMLInputElement)?.checked ?? false,
      slug: getValue('slug') || undefined,
    }

    try {
      const url = mode === 'create'
        ? '/api/admin/projects'
        : `/api/admin/projects/${project!.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Save failed')
        return
      }

      setSuccess(mode === 'create' ? 'Project created!' : 'Project updated!')
      setTimeout(() => router.push('/admin/projects'), 1000)
    } catch {
      setError('Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="proj-form" noValidate>
      {/* Title + Slug */}
      <div className="proj-form__row">
        <div className="form-group">
          <label htmlFor="pf-title" className="label label-required">Title</label>
          <input id="pf-title" name="title" type="text" className="input"
            placeholder="Project title" defaultValue={project?.title} required />
        </div>
        <div className="form-group">
          <label htmlFor="pf-slug" className="label">Slug (auto-generated if empty)</label>
          <input id="pf-slug" name="slug" type="text" className="input"
            placeholder="my-project-slug" defaultValue={project?.slug} />
        </div>
      </div>

      {/* Category + Year */}
      <div className="proj-form__row">
        <div className="form-group">
          <label htmlFor="pf-category" className="label label-required">Category</label>
          <select id="pf-category" name="category" className="select" defaultValue={project?.category ?? 'design'} required>
            {CATEGORY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pf-year" className="label">Year</label>
          <input id="pf-year" name="year" type="number" className="input"
            placeholder="2025" defaultValue={project?.year} min={2000} max={2099} />
        </div>
      </div>

      {/* Client */}
      <div className="form-group">
        <label htmlFor="pf-client" className="label">Client / Company</label>
        <input id="pf-client" name="client" type="text" className="input"
          placeholder="Client or company name" defaultValue={project?.client ?? ''} />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="pf-description" className="label">Description</label>
        <textarea id="pf-description" name="description" className="textarea"
          placeholder="Brief project description..." defaultValue={project?.description ?? ''} rows={4} />
      </div>

      {/* Tools */}
      <div className="form-group">
        <label htmlFor="pf-tools" className="label">Tools Used (comma separated)</label>
        <input id="pf-tools" name="tools" type="text" className="input"
          placeholder="Photoshop, Illustrator, Figma"
          value={toolsInput}
          onChange={e => setToolsInput(e.target.value)} />
      </div>

      {/* Thumbnail */}
      <div className="form-group">
        <label className="label">Thumbnail</label>
        <div className="proj-form__thumb-area">
          {thumbnailPreview && (
            <div className="proj-form__thumb-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailPreview} alt="Thumbnail preview" />
              <button type="button" className="proj-form__thumb-remove"
                onClick={() => setThumbnailPreview('')} aria-label="Remove thumbnail">×</button>
            </div>
          )}
          <div className="proj-form__thumb-upload">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              id="pf-upload-thumb-btn"
            >
              {uploading ? <><span className="spinner" />Uploading...</> : '↑ Upload Thumbnail'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              style={{ display: 'none' }}
              onChange={handleThumbnailUpload}
              id="pf-thumb-file-input"
            />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              JPG, PNG, WebP · max 10MB
            </span>
          </div>

          {/* Or enter URL */}
          <div className="form-group" style={{ marginTop: 'var(--space-2)' }}>
            <label htmlFor="pf-thumb-url" className="label">Or paste URL</label>
            <input id="pf-thumb-url" type="text" className="input"
              placeholder="https://..." value={thumbnailPreview}
              onChange={e => setThumbnailPreview(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Featured */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <label className="toggle" htmlFor="pf-featured">
          <input id="pf-featured" name="is_featured" type="checkbox" defaultChecked={project?.is_featured ?? false} />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
        <label htmlFor="pf-featured" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
          Feature on home page
        </label>
      </div>

      {/* Error / Success */}
      {error && (
        <div className="login-error" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {error}
        </div>
      )}
      {success && (
        <p style={{ color: 'var(--success)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>✓ {success}</p>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-primary" disabled={saving || uploading} id="pf-save-btn">
          {saving ? <><span className="spinner" />Saving...</> : mode === 'create' ? 'Create Project' : 'Save Changes'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.push('/admin/projects')} id="pf-cancel-btn">
          Cancel
        </button>
      </div>

      <style>{`
        .proj-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          max-width: 720px;
        }

        .proj-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .proj-form__thumb-area {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        .proj-form__thumb-preview {
          position: relative;
          display: inline-block;
        }

        .proj-form__thumb-preview img {
          width: 200px;
          height: 130px;
          object-fit: cover;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }

        .proj-form__thumb-remove {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--error);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .proj-form__thumb-upload {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
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

        @media (max-width: 600px) {
          .proj-form__row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  )
}
