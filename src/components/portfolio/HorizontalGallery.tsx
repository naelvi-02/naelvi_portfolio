'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/types'
import Image from 'next/image'
import { getCategoryLabel } from '@/lib/utils'
import Link from 'next/link'
import { getLenis } from '@/components/layout/SmoothScroller'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalGalleryProps {
  projects: Project[]
}

export default function HorizontalGallery({ projects }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Pre-process items to inject dividers
  const items: any[] = []
  let lastCategory = ''
  projects.forEach((proj, idx) => {
    if (proj.category !== lastCategory) {
       items.push({ isDivider: true, category: proj.category, label: getCategoryLabel(proj.category) })
       lastCategory = proj.category
    }
    items.push({ isDivider: false, project: proj, idx })
  })

  // Save scroll position for Home Page
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('homeScroll', window.scrollY.toString())
    }
    
    // Delay attaching to avoid saving a temporary 0 position during page transitions
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const portfolioContainer = document.getElementById('portfolio')
    if (!section || !track || !portfolioContainer || projects.length === 0) return

    const timeout = setTimeout(() => {
      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const scrollDist = totalWidth - viewportWidth

      if (scrollDist <= 0) return

      // Cards entrance: stagger from below on pin start
      const cards = track.querySelectorAll('.hgallery-card')
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      const tween = gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDist}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Theme transitions based on dividers
      const themes: Record<string, { bg: string, card: string, border: string, accent: string }> = {
        design: {
          bg: '#0E1828', // Original --bg-secondary
          card: '#111C2E', // Original --bg-card
          border: 'rgba(255,255,255,0.07)',
          accent: '#00E3E6'
        },
        video: {
          bg: '#1A0B10',
          card: '#240F16',
          border: 'rgba(255,51,102,0.15)',
          accent: '#FF3366'
        },
        app: {
          bg: '#081A16',
          card: '#0B241E',
          border: 'rgba(0,255,157,0.15)',
          accent: '#00FF9D'
        }
      }

      const dividers = Array.from(track.querySelectorAll('.hgallery-divider'))
      dividers.forEach((div, i) => {
        const cat = div.getAttribute('data-category') || 'design'
        const nextTheme = themes[cat]
        // Get theme of the previous divider (or default to design if first)
        const prevCat = i > 0 ? dividers[i - 1].getAttribute('data-category') || 'design' : 'design'
        const prevTheme = themes[prevCat]

        ScrollTrigger.create({
          trigger: div,
          containerAnimation: tween,
          start: 'left center',
          onEnter: () => gsap.to(portfolioContainer, { 
            backgroundColor: nextTheme.bg,
            '--bg-card': nextTheme.card,
            '--border': nextTheme.border,
            '--accent': nextTheme.accent,
            duration: 0.8, 
            overwrite: 'auto' 
          }),
          onEnterBack: () => gsap.to(portfolioContainer, { 
            backgroundColor: prevTheme.bg,
            '--bg-card': prevTheme.card,
            '--border': prevTheme.border,
            '--accent': prevTheme.accent,
            duration: 0.8, 
            overwrite: 'auto' 
          }),
        })
      })

      // Card focus animations
      const galleryCards = Array.from(track.querySelectorAll('.hgallery-card'))
      galleryCards.forEach((card) => {
        // Initial state for cards
        gsap.set(card, { scale: 0.85, opacity: 0.4, filter: 'saturate(0)' })
        
        // As it approaches the center
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          filter: 'saturate(1)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'center 65%',
            scrub: true,
          }
        })
        
        // As it leaves to the left
        gsap.to(card, {
          scale: 0.85,
          opacity: 0.4,
          filter: 'saturate(0)',
          ease: 'power1.in',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'center 35%',
            end: 'right 15%',
            scrub: true,
          }
        })
      })

      // Restore scroll position after GSAP has created the pin-spacer (added height)
      const savedScroll = sessionStorage.getItem('homeScroll')
      if (savedScroll && savedScroll !== '0') {
        const top = parseInt(savedScroll, 10)
        setTimeout(() => {
          const lenis = getLenis()
          if (lenis) {
            lenis.scrollTo(top, { immediate: true })
          } else {
            window.scrollTo({ top, behavior: 'instant' })
          }
        }, 50)
      }

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        // Reset background and css variables on unmount
        gsap.set(portfolioContainer, { clearProps: 'backgroundColor,--bg-card,--border,--accent' })
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [projects])

  return (
    <div ref={sectionRef} className="hgallery-section">
      <div ref={trackRef} className="hgallery-track">
        {/* Left padding spacer */}
        <div className="hgallery-spacer" />

        {items.map((item, i) => {
          if (item.isDivider) {
            return (
              <div key={`divider-${item.category}`} className="hgallery-divider" data-category={item.category}>
                <span className="hgallery-divider__text">{item.label}</span>
                <span className="hgallery-divider__line" />
              </div>
            )
          }

          const project = item.project
          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="hgallery-card"
              style={{ opacity: 0 }}
            >
              {/* Number + Year */}
              <div className="hgallery-card__meta">
                <span className="hgallery-card__num">0{item.idx + 1}</span>
                {project.year && (
                  <span className="hgallery-card__year">{project.year}</span>
                )}
              </div>

              {/* Thumbnail */}
              <div className="hgallery-card__thumb">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="600px"
                    className="hgallery-card__img"
                  />
                ) : (
                  <div className="hgallery-card__placeholder">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="hgallery-card__overlay">
                  <span className="hgallery-card__category">
                    {getCategoryLabel(project.category)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="hgallery-card__info">
                <h3 className="hgallery-card__title">{project.title}</h3>
                {project.client && (
                  <p className="hgallery-card__client">{project.client}</p>
                )}
              </div>
            </Link>
          )
        })}

        {/* Right padding spacer */}
        <div className="hgallery-spacer" />
      </div>

      {/* Y2K floating orb decorations */}
      <svg className="hgallery-y2k hgallery-y2k--1" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="46" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 5" opacity="0.15"/>
        <circle cx="50" cy="50" r="28" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1"/>
        <line x1="4" y1="50" x2="96" y2="50" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1"/>
        <line x1="50" y1="4" x2="50" y2="96" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1"/>
      </svg>

      <svg className="hgallery-y2k hgallery-y2k--2" width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <rect x="10" y="10" width="40" height="40" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.2" />
        <rect x="20" y="20" width="20" height="20" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      </svg>

      <style>{`
        .hgallery-section {
          height: 100vh;
          overflow: hidden;
          background: transparent;
        }

        .hgallery-track {
          display: flex;
          align-items: center;
          height: 100%;
          width: max-content;
          gap: 64px;
          will-change: transform;
        }

        .hgallery-spacer {
          width: 10vw;
          flex-shrink: 0;
        }

        /* ── Dividers ── */
        .hgallery-divider {
          display: flex;
          align-items: center;
          gap: 2rem;
          height: 100%;
          padding: 0 4rem;
        }

        .hgallery-divider__text {
          font-family: var(--font-display);
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px var(--accent);
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 0.05em;
          opacity: 0.6;
        }

        .hgallery-divider__line {
          height: 60vh;
          width: 2px;
          background: var(--accent);
          opacity: 0.3;
        }

        /* ── Cards ── */
        .hgallery-card {
          position: relative;
          width: clamp(300px, 35vw, 560px);
          flex-shrink: 0;
          border: 3px solid var(--border);
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }

        .hgallery-card:hover {
          border-color: var(--accent);
          box-shadow: 8px 8px 0 var(--accent);
          transform: translate(-4px, -4px);
        }

        .hgallery-card__meta {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .hgallery-card__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--bg-primary);
          background: var(--accent);
          padding: 4px 10px;
        }

        .hgallery-card__year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          background: var(--bg-primary);
          border: 1px solid var(--border);
          padding: 4px 10px;
        }

        .hgallery-card__thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--accent);
        }

        .hgallery-card__img {
          object-fit: cover;
          filter: grayscale(1) contrast(1.2);
          mix-blend-mode: normal;
          opacity: 0.8;
          transition: filter 0.4s, mix-blend-mode 0.4s, opacity 0.4s, transform 0.6s;
        }

        .hgallery-card:hover .hgallery-card__img {
          filter: grayscale(1) contrast(1.5);
          mix-blend-mode: multiply;
          opacity: 1;
          transform: scale(1.06);
        }

        .hgallery-card__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 900;
          color: rgba(0,0,0,0.3);
        }

        .hgallery-card__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          background: linear-gradient(to top, rgba(10,15,28,0.6) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .hgallery-card:hover .hgallery-card__overlay {
          opacity: 1;
        }

        .hgallery-card__category {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          border: 2px solid var(--accent);
          padding: 3px 10px;
        }

        .hgallery-card__info {
          padding: 16px 20px 20px;
          border-top: 3px solid var(--border);
          background: var(--bg-card);
          transition: border-color 0.2s;
        }

        .hgallery-card:hover .hgallery-card__info {
          border-color: var(--accent);
        }

        .hgallery-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 900;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
          transition: color 0.2s;
        }

        .hgallery-card:hover .hgallery-card__title {
          color: var(--accent);
        }

        .hgallery-card__client {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        /* Y2K floating orbs */
        .hgallery-y2k {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }

        .hgallery-y2k--1 {
          bottom: 15%;
          right: 3%;
          animation: y2k-slow-spin 20s linear infinite;
        }

        .hgallery-y2k--2 {
          top: 20%;
          left: 2%;
          animation: y2k-slow-spin 15s linear infinite reverse;
        }

        @keyframes y2k-slow-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
