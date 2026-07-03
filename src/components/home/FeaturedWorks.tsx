import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types'
import { getCategoryLabel } from '@/lib/utils'

interface FeaturedWorksProps {
  projects: Project[]
}

export default function FeaturedWorks({ projects }: FeaturedWorksProps) {
  return (
    <section className="section featured" aria-label="Featured works" data-animate>
      <div className="container">
        {/* Header */}
        <div className="featured__header">
          <div className="featured__header-left">
            <span className="badge badge-accent">Featured</span>
            <h2 className="featured__title">Selected Works</h2>
          </div>
          <Link href="/portfolio" className="btn btn-ghost featured__all-btn" id="featured-all-btn">
            All Works
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="featured__grid">
            {projects.slice(0, 4).map((project, i) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`featured__card ${i === 0 ? 'featured__card--large' : ''}`}
                data-animate
                data-animate-delay={String(i + 1)}
                id={`featured-card-${project.slug}`}
              >
                {/* Thumbnail */}
                <div className="featured__thumb">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="featured__img"
                    />
                  ) : (
                    <div className="featured__thumb-placeholder">
                      <span>{project.title.charAt(0)}</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="featured__overlay">
                    <div className="featured__overlay-content">
                      <span className={`badge badge-${project.category}`}>
                        {getCategoryLabel(project.category)}
                      </span>
                      <h3 className="featured__overlay-title">{project.title}</h3>
                      {project.client && (
                        <p className="featured__overlay-client">{project.client}</p>
                      )}
                    </div>
                    <div className="featured__overlay-arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div className="featured__info">
                  <div className="featured__info-meta">
                    <span className={`badge badge-${project.category}`}>
                      {getCategoryLabel(project.category)}
                    </span>
                    {project.year && (
                      <span className="featured__year">{project.year}</span>
                    )}
                  </div>
                  <h3 className="featured__card-title">{project.title}</h3>
                  {project.client && (
                    <p className="featured__card-client">{project.client}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="featured__empty">
            <p>Projects coming soon — check back later.</p>
          </div>
        )}
      </div>

      <style>{`
        .featured {
          background: var(--bg-secondary);
        }

        .featured__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
        }

        .featured__header-left {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .featured__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
        }

        .featured__all-btn {
          flex-shrink: 0;
          align-self: flex-end;
        }

        .featured__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        .featured__card {
          display: block;
          text-decoration: none;
          border-radius: 0;
          overflow: hidden;
          background: var(--bg-card);
          border: 3px solid var(--border);
          transition:
            transform var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out),
            box-shadow var(--duration-base) var(--ease-out);
        }

        .featured__card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 6px 6px 0 var(--accent);
        }

        .featured__card--large {
          grid-row: span 2;
        }

        .featured__thumb {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--bg-elevated);
        }

        .featured__card--large .featured__thumb {
          aspect-ratio: 4/5;
        }

        .featured__img {
          object-fit: cover;
          transition: transform var(--duration-slow) var(--ease-out);
        }

        .featured__card:hover .featured__img {
          transform: scale(1.04);
        }

        .featured__thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 900;
          color: var(--border);
        }

        .featured__overlay {
          position: absolute;
          inset: 0;
          background: var(--bg-overlay);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-4);
          opacity: 0;
          transition: opacity var(--duration-base) var(--ease-out);
        }

        .featured__card:hover .featured__overlay {
          opacity: 1;
        }

        .featured__overlay-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .featured__overlay-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .featured__overlay-client {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .featured__overlay-arrow {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-dim);
        }

        .featured__info {
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .featured__info-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .featured__year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .featured__card-title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .featured__card-client {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .featured__empty {
          text-align: center;
          padding: var(--space-16);
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .featured__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured__card--large {
            grid-row: auto;
          }
        }

        @media (max-width: 640px) {
          .featured__grid {
            grid-template-columns: 1fr;
          }

          .featured__header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
