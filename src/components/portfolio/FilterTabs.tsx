'use client'

import { useState } from 'react'
import type { ProjectCategory } from '@/types'

interface FilterTabsProps {
  active: ProjectCategory
  onChange: (cat: ProjectCategory) => void
  counts: Record<string, number>
}

const tabs: { key: ProjectCategory; label: string }[] = [
  { key: 'all',    label: 'All' },
  { key: 'design', label: 'Design' },
  { key: 'video',  label: 'Video' },
  { key: 'app',    label: 'App' },
]

export default function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
      {tabs.map(tab => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className={`filter-tab ${active === tab.key ? 'filter-tab--active' : ''}`}
          onClick={() => onChange(tab.key)}
          id={`filter-tab-${tab.key}`}
        >
          {tab.label}
          {counts[tab.key] !== undefined && (
            <span className="filter-tab__count">{counts[tab.key]}</span>
          )}
        </button>
      ))}

      <style>{`
        .filter-tabs {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: 8px 18px;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition:
            color var(--duration-fast) var(--ease-out),
            border-color var(--duration-fast) var(--ease-out),
            background var(--duration-fast) var(--ease-out);
          min-height: 36px;
        }

        .filter-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .filter-tab--active {
          color: var(--accent);
          border-color: var(--border-accent);
          background: var(--accent-dim);
        }

        .filter-tab__count {
          font-size: 10px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}
