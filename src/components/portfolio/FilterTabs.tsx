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
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .filter-tab {
          display: inline-flex;
          align-items: flex-start;
          padding: 0;
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 900;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color var(--duration-fast), transform var(--duration-fast);
          position: relative;
        }

        .filter-tab:hover {
          color: var(--text-primary);
          transform: translateY(-4px);
        }

        .filter-tab--active {
          color: var(--accent);
        }

        .filter-tab:not(.filter-tab--active)::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -5%;
          right: -5%;
          height: 4px;
          background: var(--text-secondary);
          transform: translateY(-50%) rotate(-2deg);
          pointer-events: none;
          transition: background var(--duration-fast);
        }

        .filter-tab:hover:not(.filter-tab--active)::after {
          background: var(--text-primary);
        }

        .filter-tab__count {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          margin-left: 8px;
          margin-top: 8px;
          color: inherit;
        }
      `}</style>
    </div>
  )
}
