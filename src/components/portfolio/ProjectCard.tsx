'use client'

import Image from 'next/image'
import type { Project } from '@/types'
import { getCategoryLabel } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
  index?: number
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const categoryClass = `badge-${project.category}`
  const isVideo = project.category === 'video'
  const aspectRatio = isVideo ? '16/9' : '4/3'

  return (
    <article
      className="proj-card"
      data-animate
      data-animate-delay={String(Math.min(index % 6, 6))}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(project) }}
      aria-label={`${project.title}${project.client ? ` — ${project.client}` : ''}`}
      id={`project-card-${project.slug}`}
    >
      {/* Thumbnail */}
      <div className="proj-card__thumb" style={{ aspectRatio }}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="proj-card__img"
          />
        ) : (
          <div className="proj-card__placeholder">
            <span className="proj-card__placeholder-letter">
              {project.title.charAt(0)}
            </span>
            {isVideo && (
              <div className="proj-card__play-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Hover overlay */}
        <div className="proj-card__overlay" aria-hidden="true">
          <div className="proj-card__overlay-top">
            <span className={`badge ${categoryClass}`}>
              {getCategoryLabel(project.category)}
            </span>
          </div>
          <div className="proj-card__overlay-body">
            <h3 className="proj-card__overlay-title">{project.title}</h3>
            {project.client && (
              <p className="proj-card__overlay-client">{project.client}</p>
            )}
            {project.tools.length > 0 && (
              <p className="proj-card__overlay-tools">
                {project.tools.slice(0, 3).join(' · ')}
              </p>
            )}
          </div>
          {/* Action hint */}
          <div className="proj-card__action">
            {project.category === 'design' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
              </svg>
            )}
            {project.category === 'video' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            )}
            {project.category === 'app' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            )}
          </div>
        </div>

        {/* Video play badge */}
        {isVideo && project.thumbnail && (
          <div className="proj-card__video-badge" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="proj-card__info">
        <div className="proj-card__meta">
          <span className={`badge ${categoryClass}`}>{getCategoryLabel(project.category)}</span>
          {project.year && (
            <span className="proj-card__year">{project.year}</span>
          )}
        </div>
        <h3 className="proj-card__title">{project.title}</h3>
        {project.client && (
          <p className="proj-card__client">{project.client}</p>
        )}
      </div>

      <style>{`
        .proj-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition:
            transform var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out),
            box-shadow var(--duration-base) var(--ease-out);
        }

        .proj-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-accent);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), var(--accent-glow);
        }

        .proj-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .proj-card__thumb {
          position: relative;
          overflow: hidden;
          background: var(--bg-elevated);
        }

        .proj-card__img {
          object-fit: cover;
          transition: transform var(--duration-slow) var(--ease-out);
        }

        .proj-card:hover .proj-card__img {
          transform: scale(1.05);
        }

        .proj-card__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .proj-card__placeholder-letter {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          color: var(--border);
          text-transform: uppercase;
        }

        .proj-card__play-icon {
          position: absolute;
          color: var(--border);
        }

        .proj-card__overlay {
          position: absolute;
          inset: 0;
          background: var(--bg-overlay);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--space-3);
          opacity: 0;
          transition: opacity var(--duration-base) var(--ease-out);
        }

        .proj-card:hover .proj-card__overlay {
          opacity: 1;
        }

        .proj-card__overlay-top {
          display: flex;
          justify-content: flex-end;
        }

        .proj-card__overlay-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .proj-card__overlay-title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .proj-card__overlay-client {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .proj-card__overlay-tools {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.8;
        }

        .proj-card__action {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          width: 32px;
          height: 32px;
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-dim);
        }

        .proj-card__video-badge {
          position: absolute;
          bottom: var(--space-2);
          right: var(--space-2);
          width: 28px;
          height: 28px;
          background: rgba(0,0,0,0.6);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
        }

        .proj-card__info {
          padding: var(--space-3) var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .proj-card__meta {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: 2px;
        }

        .proj-card__year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .proj-card__title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .proj-card__client {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        /* Mobile: no hover overlay, show info always */
        @media (hover: none) {
          .proj-card__overlay {
            display: none;
          }
        }
      `}</style>
    </article>
  )
}
