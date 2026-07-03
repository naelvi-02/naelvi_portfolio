'use client'

import { useState, useEffect, useRef } from 'react'
import type { Project, ProjectCategory } from '@/types'
import FilterTabs from './FilterTabs'
import ProjectCard from './ProjectCard'
import Link from 'next/link'
import { getLenis } from '@/components/layout/SmoothScroller'

interface ProjectGridProps {
  projects: Project[]
  initialCategory?: ProjectCategory
}

export default function ProjectGrid({ projects, initialCategory = 'all' }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(initialCategory)
  const gridRef = useRef<HTMLDivElement>(null)



  // Filter projects
  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  // Counts per category
  const counts: Record<string, number> = {
    all: projects.length,
    design: projects.filter(p => p.category === 'design').length,
    video: projects.filter(p => p.category === 'video').length,
    app: projects.filter(p => p.category === 'app').length,
  }

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [filtered])

  // Scroll restoration for the grid
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('portfolioScroll')
    if (savedScroll && savedScroll !== '0') {
      const top = parseInt(savedScroll, 10)
      
      const restore = () => {
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(top, { immediate: true })
        } else {
          window.scrollTo({ top, behavior: 'instant' })
        }
      }

      // Try multiple times to ensure it wins against layout shifts or Next.js native scroll
      restore()
      setTimeout(restore, 100)
      setTimeout(restore, 300)
    }

    const handleScroll = () => {
      sessionStorage.setItem('portfolioScroll', window.scrollY.toString())
    }
    
    // Add event listener after a delay to prevent saving temporary 0 positions during page load
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleCardClick(project: Project) {
    window.location.href = `/portfolio/${project.slug}`
  }

  return (
    <>
      {/* Filter */}
      <div className="pgrid__filter">
        <FilterTabs
          active={activeCategory}
          onChange={cat => setActiveCategory(cat)}
          counts={counts}
        />
        <span className="pgrid__count">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="pgrid" ref={gridRef}>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleCardClick}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="pgrid__empty">
          <div className="ornament-crosshair" style={{ width: 40, height: 40, opacity: 0.2 }} aria-hidden="true" />
          <p>No {activeCategory === 'all' ? '' : activeCategory + ' '}projects yet</p>
        </div>
      )}
      <style>{`
        .pgrid__filter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }

        .pgrid__count {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .pgrid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: var(--space-6);
          grid-auto-flow: dense;
        }

        .proj-card {
          grid-column: span 4;
        }

        .proj-card:nth-child(5n+1) {
          grid-column: span 8;
        }
        
        .proj-card:nth-child(5n+2) {
          grid-column: span 4;
        }

        .proj-card:nth-child(5n+3) {
          grid-column: span 6;
        }

        .proj-card:nth-child(5n+4) {
          grid-column: span 6;
        }

        .proj-card:nth-child(5n+5) {
          grid-column: span 12;
        }

        .pgrid__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          padding: var(--space-24);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          text-align: center;
          border: 1px dashed var(--border);
          border-radius: var(--radius-md);
        }

        @media (max-width: 1024px) {
          .pgrid { grid-template-columns: repeat(2, 1fr); }
          .proj-card, .proj-card:nth-child(n) { grid-column: span 1; }
        }

        @media (max-width: 480px) {
          .pgrid { grid-template-columns: 1fr; gap: var(--space-4); }
          .proj-card, .proj-card:nth-child(n) { grid-column: span 1; }
        }
      `}</style>
    </>
  )
}
