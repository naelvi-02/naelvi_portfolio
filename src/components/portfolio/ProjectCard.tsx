'use client'

import Image from 'next/image'
import type { Project } from '@/types'
import { getCategoryLabel } from '@/lib/utils'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import Magnetic from '@/components/ui/Magnetic'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
  index?: number
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const categoryClass = `badge-${project.category}`
  const isVideo = project.category === 'video'
  const aspectRatio = isVideo ? '16/9' : '4/3'
  const offset = useMouseParallax(15) // subtle parallax

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
            style={{ transform: `scale(1.1) translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
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

        {/* Hover Marquee */}
        <div className="proj-card__marquee-wrap" aria-hidden="true">
          <div className="proj-card__marquee">
            <span className="proj-card__marquee-text">{project.title} • {project.title} • {project.title} • </span>
            <span className="proj-card__marquee-text">{project.title} • {project.title} • {project.title} • </span>
          </div>
        </div>

        {/* Action hint */}
        <div className="proj-card__action" aria-hidden="true">
          <Magnetic>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              {project.category === 'design' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
                </svg>
              )}
              {project.category === 'video' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
              {project.category === 'app' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </div>
          </Magnetic>
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
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition:
            transform var(--duration-fast) var(--ease-out),
            border-color var(--duration-fast) var(--ease-out),
            box-shadow var(--duration-fast) var(--ease-out);
        }

        .proj-card:hover {
          transform: translate(-4px, -4px);
          border-color: var(--accent);
          box-shadow: var(--shadow-brutal-hover);
        }

        .proj-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .proj-card__thumb {
          position: relative;
          overflow: hidden;
          background: var(--accent);
          border-bottom: 2px solid var(--border);
          transition: border-color var(--duration-fast);
        }
        
        .proj-card:hover .proj-card__thumb {
          border-color: var(--accent);
        }

        .proj-card__img {
          object-fit: cover;
          filter: grayscale(1) contrast(1.2);
          opacity: 0.8;
          mix-blend-mode: normal;
          transition: filter var(--duration-base), opacity var(--duration-base), mix-blend-mode var(--duration-base);
        }

        .proj-card:hover .proj-card__img {
          filter: grayscale(1) contrast(1.5);
          mix-blend-mode: multiply;
          opacity: 1;
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

        /* Marquee */
        .proj-card__marquee-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          opacity: 0;
          background: rgba(0, 227, 230, 0.85); /* Cyan overlay */
          transition: opacity var(--duration-base) var(--ease-out);
          z-index: 2;
        }

        .proj-card:hover .proj-card__marquee-wrap {
          opacity: 1;
        }

        .proj-card__marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 8s linear infinite;
        }

        .proj-card__marquee-text {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #0A0F1C;
          padding: 0 20px;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .proj-card__action {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          width: 36px;
          height: 36px;
          border: 2px solid var(--accent);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0A0F1C;
          background: var(--accent);
          z-index: 3;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity var(--duration-base), transform var(--duration-base);
        }
        
        .proj-card:hover .proj-card__action {
          opacity: 1;
          transform: translateY(0);
        }

        .proj-card__video-badge {
          position: absolute;
          bottom: var(--space-2);
          right: var(--space-2);
          width: 28px;
          height: 28px;
          background: rgba(0,0,0,0.8);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          z-index: 3;
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
          transition: color var(--duration-fast);
        }
        
        .proj-card:hover .proj-card__title {
          color: var(--accent);
        }

        .proj-card__client {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        /* Mobile adjustments */
        @media (hover: none) {
          .proj-card__img {
            filter: grayscale(0) contrast(1);
            opacity: 1;
          }
          .proj-card__action {
            opacity: 1;
            transform: none;
          }
          .proj-card__marquee-wrap {
            display: none;
          }
        }
      `}</style>
    </article>
  )
}
