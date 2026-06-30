'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/types'

interface VideoModalProps {
  project: Project
  onClose: () => void
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Get first video media item
  const videoItem = project.media.find(m => m.type === 'video' || m.type === 'youtube')
  const isYoutube = videoItem?.type === 'youtube'

  // Extract YouTube ID
  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/\s]{11})/
    )
    return match?.[1] ?? null
  }

  return (
    <div
      className="video-modal lightbox-enter"
      role="dialog"
      aria-modal="true"
      aria-label={`Video player: ${project.title}`}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="video-modal__close"
        onClick={onClose}
        aria-label="Close video"
        id="video-modal-close-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Video container */}
      <div
        className="video-modal__inner lightbox-image-enter"
        onClick={e => e.stopPropagation()}
      >
        {!videoItem ? (
          <div className="video-modal__empty">
            <p>No video available yet</p>
          </div>
        ) : isYoutube ? (
          <div className="video-modal__embed">
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(videoItem.url)}?autoplay=1&rel=0`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoItem.url}
            className="video-modal__video"
            controls
            autoPlay
            playsInline
          />
        )}

        {/* Info */}
        <div className="video-modal__info">
          <div>
            <h2 className="video-modal__title">{project.title}</h2>
            {project.client && (
              <p className="video-modal__client">{project.client} · {project.year}</p>
            )}
          </div>
          {project.description && (
            <p className="video-modal__desc">{project.description}</p>
          )}
        </div>
      </div>

      <style>{`
        .video-modal {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(5, 8, 18, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
        }

        .video-modal__close {
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
          transition: all var(--duration-fast);
          z-index: 10;
        }

        .video-modal__close:hover {
          color: var(--accent);
          border-color: var(--border-accent);
        }

        .video-modal__inner {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .video-modal__embed {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .video-modal__embed iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-modal__video {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: var(--radius-md);
          background: #000;
          outline: none;
        }

        .video-modal__info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .video-modal__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .video-modal__client {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          margin-top: 4px;
          letter-spacing: 0.06em;
        }

        .video-modal__desc {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .video-modal__empty {
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-elevated);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
        }

        @media (max-width: 640px) {
          .video-modal {
            padding: var(--space-2);
            align-items: flex-end;
          }

          .video-modal__inner {
            max-height: 90vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  )
}
