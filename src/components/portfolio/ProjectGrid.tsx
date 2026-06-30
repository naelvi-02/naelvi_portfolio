'use client'

import { useState, useEffect, useRef } from 'react'
import type { Project, ProjectCategory } from '@/types'
import FilterTabs from './FilterTabs'
import ProjectCard from './ProjectCard'
import Lightbox from './Lightbox'
import VideoModal from './VideoModal'
import Link from 'next/link'

interface ProjectGridProps {
  projects: Project[]
  initialCategory?: ProjectCategory
}

export default function ProjectGrid({ projects, initialCategory = 'all' }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(initialCategory)
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [videoProject, setVideoProject] = useState<Project | null>(null)
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

  // Lock body scroll when modal open
  useEffect(() => {
    const isOpen = lightboxProject !== null || videoProject !== null
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxProject, videoProject])

  function handleCardClick(project: Project) {
    if (project.category === 'design') {
      setLightboxProject(project)
      setLightboxImageIndex(0)
    } else if (project.category === 'video') {
      setVideoProject(project)
    } else {
      // App: navigate to detail page
      window.location.href = `/portfolio/${project.slug}`
    }
  }

  // Lightbox image list length
  const lightboxImages = lightboxProject
    ? [
        ...(lightboxProject.thumbnail ? [lightboxProject.thumbnail] : []),
        ...lightboxProject.media.filter(m => m.type === 'image').map(m => m.url),
      ]
    : []

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

      {/* Lightbox */}
      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          imageIndex={lightboxImageIndex}
          totalImages={lightboxImages.length}
          onClose={() => setLightboxProject(null)}
          onPrev={() => setLightboxImageIndex(i => Math.max(0, i - 1))}
          onNext={() => setLightboxImageIndex(i => Math.min(lightboxImages.length - 1, i + 1))}
        />
      )}

      {/* Video Modal */}
      {videoProject && (
        <VideoModal
          project={videoProject}
          onClose={() => setVideoProject(null)}
        />
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
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
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
        }

        @media (max-width: 480px) {
          .pgrid { grid-template-columns: repeat(2, 1fr); gap: var(--space-2); }
        }
      `}</style>
    </>
  )
}
