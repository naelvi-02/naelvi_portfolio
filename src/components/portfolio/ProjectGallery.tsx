'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import type { Project } from '@/types'

export default function ProjectGallery({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Only add thumbnail if it's not already the first media item
  const hasThumbnailInMedia = project.media.length > 0 && project.media[0].url === project.thumbnail
  const galleryItems = hasThumbnailInMedia ? project.media : [
    ...(project.thumbnail ? [{ type: 'image' as const, url: project.thumbnail, caption: 'Overview' }] : []),
    ...project.media
  ]

  if (galleryItems.length === 0) return null

  // Group items by caption (subcategory)
  const groupedItems: Record<string, typeof galleryItems> = {}
  galleryItems.forEach(item => {
    const groupName = item.caption || 'Gallery'
    if (!groupedItems[groupName]) groupedItems[groupName] = []
    groupedItems[groupName].push(item)
  })


  const openLightbox = (index: number) => {
    window.history.pushState({ galleryLightbox: true }, '', `#gallery-${index}`)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    if (window.location.hash.includes('gallery')) {
      window.history.back()
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      if (lightboxOpen) {
        setLightboxOpen(false)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [lightboxOpen])

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % galleryItems.length)
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  
  // Calculate global index for lightbox mapping
  let globalIndexCounter = 0;

  return (
    <>
      <div className="proj-gallery-wrapper">
        {Object.entries(groupedItems).map(([groupName, items]) => {
          const blocks: ({ type: 'single', item: typeof galleryItems[0] } | { type: 'puzzle', items: typeof galleryItems })[] = []
          const isPuzzleCategory = project.slug === 'wahyu-redjo-online' && (groupName.toLowerCase().includes('feed') || groupName.toLowerCase().includes('puzzle'))
          
          if (isPuzzleCategory) {
            for (let i = 0; i < items.length; i += 3) {
              const chunk = items.slice(i, i + 3)
              if (chunk.length === 1) {
                blocks.push({ type: 'single', item: chunk[0] })
              } else {
                blocks.push({ type: 'puzzle', items: chunk })
              }
            }
          } else {
            items.forEach(item => blocks.push({ type: 'single', item }))
          }

          const renderItem = (item: typeof galleryItems[0], extraClass: string) => {
            const actualIndex = galleryItems.indexOf(item)
            return (
              <div 
                key={`${item.url}-${actualIndex}`} 
                className={`proj-gallery-item ${extraClass}`}
                data-cursor="hover"
                onClick={() => openLightbox(actualIndex)}
              >
                {item.type === 'image' && (
                  <Image 
                    src={item.url} 
                    alt={item.caption || `Gallery ${actualIndex}`}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="proj-gallery-img"
                  />
                )}
                
                {(item.type === 'video' || item.type === 'youtube') && (
                  <div className="proj-gallery-video-placeholder">
                    <div className="play-icon">▶ PLAY VIDEO</div>
                    {item.type === 'video' && (
                       <video src={item.url} muted loop playsInline className="proj-gallery-video-bg" autoPlay />
                    )}
                  </div>
                )}
              </div>
            )
          }

          return (
            <div key={groupName} className="proj-gallery-section">
              <h3 className="proj-gallery-section-title">{groupName}</h3>
              <div className="proj-gallery-grid">
                {blocks.map((block, idx) => {
                  if (block.type === 'single') {
                    return renderItem(block.item, 'single-item')
                  } else {
                    return (
                      <div key={`puzzle-${idx}`} className="proj-gallery-puzzle-group">
                        {block.items.map(item => renderItem(item, 'puzzle-item'))}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>

      {lightboxOpen && (
        <Lightbox 
          project={project}
          media={galleryItems}
          imageIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextLightbox}
          onPrev={prevLightbox}
          totalImages={galleryItems.length}
        />
      )}
    </>
  )
}
