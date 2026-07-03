'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import type { MediaItem, Project } from '@/types'

interface LightboxProps {
  project: Project
  media: MediaItem[]
  imageIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  totalImages: number
}

export default function Lightbox({
  project,
  media,
  imageIndex,
  onClose,
  onPrev,
  onNext,
  totalImages,
}: LightboxProps) {
  // GSAP Glitch Entrance
  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo('.lightbox', 
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: 'none' }
    )
    tl.fromTo('.lightbox__img-wrap',
      { scale: 0.9, opacity: 0, filter: 'contrast(2) hue-rotate(90deg) blur(4px)' },
      { scale: 1.05, opacity: 1, duration: 0.05, ease: 'none' }
    )
    .to('.lightbox__img-wrap', { x: 15, skewX: -5, filter: 'contrast(1.5) hue-rotate(-90deg) blur(0px)', duration: 0.05 })
    .to('.lightbox__img-wrap', { x: -15, skewX: 5, duration: 0.05 })
    .to('.lightbox__img-wrap', { scale: 1, x: 0, skewX: 0, filter: 'contrast(1) hue-rotate(0deg) blur(0px)', duration: 0.1, ease: 'power2.out' })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const current = media[imageIndex] ?? media[0]
  if (!current) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
        id="lightbox-close-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Counter */}
      {totalImages > 1 && (
        <div className="lightbox__counter" aria-live="polite">
          {imageIndex + 1} / {totalImages}
        </div>
      )}

      {/* Media */}
      <div className="lightbox__img-wrap lightbox-image-enter">
        {current.type === 'video' ? (
          <video
            src={current.url}
            controls
            autoPlay
            className="lightbox__img"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Image
            src={current.url}
            alt={current.caption || 'Media'}
            fill
            sizes="95vw"
            className="lightbox__img"
            priority
          />
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <div className="lightbox__caption" onClick={e => e.stopPropagation()}>
          {current.caption}
        </div>
      )}

      {/* Nav arrows */}
      {totalImages > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={e => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
            id="lightbox-prev-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={e => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
            id="lightbox-next-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </>
      )}

      {/* Info strip */}
      <div className="lightbox__info" onClick={e => e.stopPropagation()}>
        <div>
          <h2 className="lightbox__title">{project.title}</h2>
          {project.client && (
            <p className="lightbox__client">{project.client}</p>
          )}
        </div>
        {project.tools.length > 0 && (
          <div className="lightbox__tools">
            {project.tools.map(t => (
              <span key={t} className="badge badge-neutral">{t}</span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(5, 8, 18, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox__close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          background: var(--bg-card);
          cursor: pointer;
          transition:
            color var(--duration-fast),
            border-color var(--duration-fast),
            background var(--duration-fast);
          z-index: 10;
        }

        .lightbox__close:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
          background: var(--bg-elevated);
        }

        .lightbox__counter {
          position: absolute;
          top: var(--space-4);
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          padding: 4px 12px;
          z-index: 10;
        }

        .lightbox__img-wrap {
          position: relative;
          width: min(90vw, 1200px);
          height: min(80vh, 900px);
          margin-bottom: 80px;
        }

        .lightbox__img {
          object-fit: contain;
        }

        .lightbox__caption {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          padding: 6px 16px;
          white-space: nowrap;
          max-width: 80vw;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lightbox__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          background: var(--bg-card);
          cursor: pointer;
          transition:
            color var(--duration-fast),
            border-color var(--duration-fast),
            background var(--duration-fast);
          z-index: 10;
          margin-top: -40px;
        }

        .lightbox__nav:hover {
          color: var(--accent);
          border-color: var(--border-accent);
          background: var(--accent-dim);
        }

        .lightbox__nav--prev { left: var(--space-4); }
        .lightbox__nav--next { right: var(--space-4); }

        .lightbox__info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: var(--space-4) var(--space-6);
          background: linear-gradient(transparent, rgba(10,15,28,0.95));
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .lightbox__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .lightbox__client {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .lightbox__tools {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .lightbox__nav--prev { left: var(--space-2); }
          .lightbox__nav--next { right: var(--space-2); }
          .lightbox__img-wrap {
            width: 100vw;
            height: 70vh;
            margin-bottom: 100px;
          }
          .lightbox__info {
            flex-direction: column;
            align-items: flex-start;
          }
          .lightbox__tools {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  )
}
