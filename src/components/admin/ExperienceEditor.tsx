'use client'

import { useState } from 'react'

export interface ExperienceItem {
  id: string
  title: string
  company: string
  website: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isPresent: boolean
  accomplishments: string[]
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const YEARS = Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() - i))

export default function ExperienceEditor({ initialData }: { initialData: string }) {
  let initialParsed: ExperienceItem[] = []
  try {
    const parsed = JSON.parse(initialData)
    initialParsed = Array.isArray(parsed) ? parsed.map((item: any, i: number) => ({
      ...item,
      id: item.id || `exp-${Date.now()}-${i}`,
      accomplishments: Array.isArray(item.accomplishments) ? item.accomplishments : []
    })) : []
  } catch (e) {
    initialParsed = []
  }

  const [items, setItems] = useState<ExperienceItem[]>(initialParsed)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleAdd() {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      title: '',
      company: '',
      website: '',
      startMonth: MONTHS[0],
      startYear: YEARS[0],
      endMonth: MONTHS[0],
      endYear: YEARS[0],
      isPresent: false,
      accomplishments: ['']
    }
    setItems([newItem, ...items])
  }

  function handleRemove(id: string) {
    if (confirm('Are you sure you want to remove this experience?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  function handleMoveUp(index: number) {
    if (index === 0) return
    const newItems = [...items]
    const temp = newItems[index - 1]
    newItems[index - 1] = newItems[index]
    newItems[index] = temp
    setItems(newItems)
  }

  function handleMoveDown(index: number) {
    if (index === items.length - 1) return
    const newItems = [...items]
    const temp = newItems[index + 1]
    newItems[index + 1] = newItems[index]
    newItems[index] = temp
    setItems(newItems)
  }

  function handleChange(id: string, field: keyof ExperienceItem, value: any) {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  function handleAccomplishmentChange(id: string, index: number, value: string) {
    setItems(items.map(item => {
      if (item.id === id) {
        const newAcc = [...item.accomplishments]
        newAcc[index] = value
        return { ...item, accomplishments: newAcc }
      }
      return item
    }))
  }

  function handleAddAccomplishment(id: string) {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, accomplishments: [...item.accomplishments, ''] }
      }
      return item
    }))
  }

  function handleRemoveAccomplishment(id: string, index: number) {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, accomplishments: item.accomplishments.filter((_, i) => i !== index) }
      }
      return item
    }))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      // Filter out empty accomplishments
      const cleanedItems = items.map(item => ({
        ...item,
        accomplishments: item.accomplishments.filter(a => a.trim() !== '')
      }))

      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about_experience: JSON.stringify(cleanedItems) }),
      })

      if (!res.ok) throw new Error('Save failed')
      setSuccess('Experience timeline updated!')
      setItems(cleanedItems)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="exp-editor">
      <div className="exp-header">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, textTransform: 'uppercase' }}>
          Experience Timeline
        </h2>
        <button onClick={handleAdd} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 'var(--text-sm)' }}>
          + Add Experience
        </button>
      </div>

      <div className="exp-list">
        {items.map((item, index) => (
          <div key={item.id} className="exp-card">
            <div className="exp-card-header">
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="btn-icon">↑</button>
                <button onClick={() => handleMoveDown(index)} disabled={index === items.length - 1} className="btn-icon">↓</button>
              </div>
              <button onClick={() => handleRemove(item.id)} className="btn-icon text-error">✕</button>
            </div>

            <div className="exp-grid">
              <div className="form-group">
                <label className="label">Job Title</label>
                <input type="text" className="input" value={item.title} onChange={e => handleChange(item.id, 'title', e.target.value)} placeholder="e.g. Graphic Designer" />
              </div>
              <div className="form-group">
                <label className="label">Company</label>
                <input type="text" className="input" value={item.company} onChange={e => handleChange(item.id, 'company', e.target.value)} placeholder="e.g. Acme Corp" />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Website (Optional)</label>
              <input type="text" className="input" value={item.website} onChange={e => handleChange(item.id, 'website', e.target.value)} placeholder="https://..." />
            </div>

            <div className="exp-dates">
              <div className="form-group">
                <label className="label">Start Date</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select className="input" value={item.startMonth} onChange={e => handleChange(item.id, 'startMonth', e.target.value)}>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="input" value={item.startYear} onChange={e => handleChange(item.id, 'startYear', e.target.value)}>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="label">
                  End Date
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'normal', cursor: 'pointer', float: 'right' }}>
                    <input type="checkbox" checked={item.isPresent} onChange={e => handleChange(item.id, 'isPresent', e.target.checked)} />
                    Present
                  </label>
                </label>
                <div style={{ display: 'flex', gap: '8px', opacity: item.isPresent ? 0.3 : 1, pointerEvents: item.isPresent ? 'none' : 'auto' }}>
                  <select className="input" value={item.endMonth} onChange={e => handleChange(item.id, 'endMonth', e.target.value)}>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="input" value={item.endYear} onChange={e => handleChange(item.id, 'endYear', e.target.value)}>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Accomplishments</label>
              <div className="acc-list">
                {item.accomplishments.map((acc, i) => (
                  <div key={i} className="acc-item">
                    <span className="acc-bullet">•</span>
                    <textarea 
                      className="textarea" 
                      value={acc} 
                      onChange={e => handleAccomplishmentChange(item.id, i, e.target.value)}
                      rows={2}
                      style={{ minHeight: '60px' }}
                    />
                    <button onClick={() => handleRemoveAccomplishment(item.id, i)} className="btn-icon" style={{ alignSelf: 'flex-start' }}>✕</button>
                  </div>
                ))}
              </div>
              <button onClick={() => handleAddAccomplishment(item.id)} className="btn btn-ghost" style={{ fontSize: '12px', marginTop: '8px' }}>
                + Add bullet point
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <button 
          onClick={handleAdd} 
          type="button"
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: 'transparent', 
            border: '2px dashed var(--border-accent)', 
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--duration-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
            e.currentTarget.style.background = 'var(--bg-elevated)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-accent)'
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          + ADD NEW EXPERIENCE
        </button>
      </div>

      <div className="exp-actions">
        {error && <p className="text-error">{error}</p>}
        {success && <p className="text-success">✓ {success}</p>}
        <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Experience Timeline'}
        </button>
      </div>

      <style>{`
        .exp-editor {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: var(--space-4);
        }
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .exp-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .exp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2);
          padding-bottom: var(--space-4);
          border-bottom: 1px dashed var(--border);
        }
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .exp-dates {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .btn-icon {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--duration-fast);
        }
        .btn-icon:hover:not(:disabled) {
          border-color: var(--border-accent);
          color: var(--text-primary);
        }
        .btn-icon:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .text-error { color: var(--error); }
        .text-success { color: var(--success); font-family: var(--font-mono); }
        
        .acc-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .acc-item {
          display: flex;
          gap: var(--space-2);
          align-items: flex-start;
        }
        .acc-bullet {
          color: var(--accent);
          font-size: 20px;
          line-height: 1;
          margin-top: 10px;
        }
        
        @media (max-width: 600px) {
          .exp-grid, .exp-dates {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
