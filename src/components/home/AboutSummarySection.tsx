'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '@/components/ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  'Adobe Illustrator', 'Photoshop', 'Figma',
  'Gemini AI', 'ChatGPT', 'Google Flow',
  'Higgsfield', 'After Effects', 'Premiere Pro',
  'Branding', 'Motion', 'Social Media',
]

// Y2K decorative element — spinning
function Y2KOrb({ size = 60, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} aria-hidden="true" className="y2k-orb">
      <circle cx="30" cy="30" r="28" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="30" cy="30" r="18" stroke="var(--accent)" strokeWidth="0.5" />
      <circle cx="30" cy="30" r="5" fill="var(--accent)" opacity="0.4" />
      <line x1="2" y1="30" x2="58" y2="30" stroke="var(--accent)" strokeWidth="0.5" />
      <line x1="30" y1="2" x2="30" y2="58" stroke="var(--accent)" strokeWidth="0.5" />
    </svg>
  )
}


interface AboutSummarySectionProps {
  photo?: string | null
  summary?: string | null
}

export default function AboutSummarySection({ photo, summary }: AboutSummarySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const photoColRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Scanline scrolling animation on photo
    if (scanlineRef.current) {
      gsap.to(scanlineRef.current, {
        y: '100%',
        duration: 2.5,
        ease: 'none',
        repeat: -1,
      })
    }

    // Main entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none none',
      }
    })

    // Photo col: clips in from left + slight skew
    tl.fromTo(photoColRef.current,
      { clipPath: 'inset(0 100% 0 0)', skewX: -3 },
      { clipPath: 'inset(0 0% 0 0)', skewX: 0, duration: 1.2, ease: 'power4.out' },
      0
    )

    // Title characters reveal with stagger
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.about-char')
      tl.fromTo(chars,
        { y: '110%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.04, 
          ease: 'back.out(1.5)',
          onComplete: () => {
            gsap.to(chars, {
              y: -6,
              rotationZ: 1,
              duration: 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              stagger: { each: 0.1, from: 'start' }
            })
          }
        },
        0.3
      )
    }

    // Text lines reveal
    if (linesRef.current) {
      const lines = linesRef.current.querySelectorAll('.about-line')
      tl.fromTo(lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        0.7
      )
    }

    // Skills pills cascade
    if (skillsRef.current) {
      const pills = skillsRef.current.querySelectorAll('.about-skill')
      tl.fromTo(pills,
        { scale: 0.7, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(2)' },
        1.0
      )
    }

    // Scroll-out: section fades and scales down as user passes
    gsap.to(section, {
      opacity: 0.3,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'bottom 20%',
        end: 'bottom top',
        scrub: true,
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  // Split title into chars for stagger
  const titleChars = 'ABOUT'.split('').map((ch, i) => (
    <span key={i} className="about-char" style={{ display: 'inline-block', overflow: 'hidden' }}>
      {ch}
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
    >
      {/* Decorative Y2K floaters */}
      <Y2KOrb size={80} style={{ position: 'absolute', top: '8%', right: '5%', opacity: 0.12 }} />
      <Y2KOrb size={40} style={{ position: 'absolute', bottom: '15%', left: '2%', opacity: 0.08 }} />

      {/* Diagonal tape decoration */}
      <div className="about-tape" aria-hidden="true">
        <span>DESIGN — AI — VISUAL — BRANDING — MOTION — DESIGN — AI — VISUAL — BRANDING — MOTION —&nbsp;</span>
      </div>

      <div className="container about-grid">
        {/* LEFT: Photo column */}
        <div ref={photoColRef} className="about-photo-col">
          <div className="about-photo-frame">
            {/* Scanline effect over photo */}
            <div ref={scanlineRef} className="about-scanline" aria-hidden="true" />

            {/* Corner brackets */}
            <span className="about-photo-corner about-photo-corner--tl" />
            <span className="about-photo-corner about-photo-corner--tr" />
            <span className="about-photo-corner about-photo-corner--bl" />
            <span className="about-photo-corner about-photo-corner--br" />

            {/* Photo */}
            <div className="about-photo-img">
              {photo ? (
                <Image src={photo} alt="Naelvi" fill sizes="(max-width:768px) 100vw, 420px" style={{ objectFit: 'cover', filter: 'grayscale(0.2) contrast(1.05)' }} />
              ) : (
                <span className="about-photo-init">N</span>
              )}
            </div>

            {/* Bottom label bar */}
            <div className="about-photo-label" aria-hidden="true">
              <span className="about-photo-label__text">NAUFAL ABDULLAH ALMAHDI</span>
              <span className="about-photo-label__year">© 2025</span>
            </div>

            {/* Accent shadow */}
            <div className="about-photo-shadow" aria-hidden="true" />
          </div>


        </div>

        {/* RIGHT: Content column */}
        <div ref={contentRef} className="about-content-col">
          {/* Title */}
          <h2 ref={titleRef} className="about-title" aria-label="ABOUT">
            {titleChars}
          </h2>

          {/* Role tag */}
          <div className="about-role-tag">
            <span className="about-role-dot" />
            <span>Graphic Designer & AI Specialist</span>
          </div>

          {/* Body text — each line wrapped */}
          <div ref={linesRef} className="about-body">
            <p className="about-line">
              {summary || 'Graphic Designer & AI Specialist berdedikasi dengan 2+ tahun pengalaman dalam mengkolaborasikan perancangan identitas visual dengan otomatisasi AI.'}
            </p>
            <p className="about-line" style={{ marginTop: '1em', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Surabaya, Indonesia — Open for freelance & full-time roles.
            </p>
          </div>

          {/* Skills pills */}
          <div ref={skillsRef} className="about-skills">
            {SKILLS.map(skill => (
              <span key={skill} className="about-skill">{skill}</span>
            ))}
          </div>

          {/* CTA */}
          <div className="about-cta">
            <Magnetic>
              <Link
                href="/about"
                className="about-btn"
                data-cursor="hover"
                data-cursor-label="OPEN"
              >
                <span>MORE DETAIL</span>
                <span className="about-btn__arrow">→</span>
              </Link>
            </Magnetic>
            <span className="about-cta__note">Full bio, tools & process</span>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          overflow: hidden;
          padding: var(--space-24) 0;
        }

        /* ── Y2K Orb ── */
        .y2k-orb {
          animation: y2k-spin 12s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes y2k-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Diagonal ticker tape ── */
        .about-tape {
          position: absolute;
          top: 0;
          left: -5%;
          width: 110%;
          background: var(--accent);
          color: var(--bg-primary);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 0;
          white-space: nowrap;
          overflow: hidden;
          transform: rotate(-1deg) translateY(-50%);
          z-index: 10;
        }

        .about-tape span {
          display: inline-block;
          animation: tape-scroll 20s linear infinite;
        }

        @keyframes tape-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ── Grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: var(--space-16);
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* ── Photo col ── */
        .about-photo-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          will-change: clip-path;
        }

        .about-photo-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 3/4;
          margin: 0 auto;
          overflow: visible;
          cursor: crosshair;
        }

        .about-photo-img {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border: 3px solid var(--border);
          z-index: 2;
          background: var(--bg-elevated);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .about-photo-frame:hover .about-photo-img {
          transform: scale(1.02) rotate(-1deg);
        }

        .about-photo-shadow {
          position: absolute;
          inset: 0;
          background: var(--accent);
          z-index: 1;
          transform: translate(14px, 14px);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .about-photo-frame:hover .about-photo-shadow {
          transform: translate(22px, 22px);
        }

        /* Scanline */
        .about-scanline {
          position: absolute;
          inset: 0;
          top: -100%;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0,227,230,0.04) 50%,
            transparent 100%
          );
          height: 40%;
        }

        /* Corner brackets */
        .about-photo-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 6;
        }

        .about-photo-corner::before,
        .about-photo-corner::after {
          content: '';
          position: absolute;
          background: var(--accent);
        }

        .about-photo-corner::before { width: 100%; height: 2px; }
        .about-photo-corner::after  { width: 2px; height: 100%; }

        .about-photo-corner--tl { top: -8px; left: -8px; }
        .about-photo-corner--tl::before { top: 0; left: 0; }
        .about-photo-corner--tl::after  { top: 0; left: 0; }

        .about-photo-corner--tr { top: -8px; right: -8px; transform: rotate(90deg); }
        .about-photo-corner--bl { bottom: -8px; left: -8px; transform: rotate(-90deg); }
        .about-photo-corner--br { bottom: -8px; right: -8px; transform: rotate(180deg); }

        /* Photo label */
        .about-photo-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-primary);
          border-top: 2px solid var(--accent);
          padding: 6px 12px;
        }

        .about-photo-label__text {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent);
          text-transform: uppercase;
        }

        .about-photo-label__year {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
        }

        .about-photo-init {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 7rem;
          font-weight: 900;
          color: var(--border);
        }



        /* ── Content ── */
        .about-content-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        /* Title with per-char animation */
        .about-title {
          font-family: var(--font-display);
          font-size: clamp(5rem, 14vw, 11rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0 0 var(--space-2) -0.05em;
          color: transparent;
          -webkit-text-stroke: 2px var(--accent);
          display: flex;
          overflow: hidden;
          gap: 0.02em;
        }

        .about-char {
          display: inline-block;
          will-change: transform;
          transition: color 0.2s;
        }

        .about-title:hover .about-char {
          color: var(--accent);
          -webkit-text-fill-color: var(--accent);
          animation: char-jitter 0.3s ease both;
        }

        @keyframes char-jitter {
          0%,100% { transform: translateY(0) rotate(0); }
          25%      { transform: translateY(-4px) rotate(-1deg); }
          75%      { transform: translateY(2px) rotate(0.5deg); }
        }

        /* Role tag */
        .about-role-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          border: 2px solid var(--accent);
          padding: 5px 14px;
          width: fit-content;
        }

        .about-role-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.5); }
        }

        /* Body text */
        .about-body {
          max-width: 540px;
        }

        .about-line {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0;
        }

        /* Skills */
        .about-skills {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .about-skill {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 4px 10px;
          background: var(--bg-elevated);
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }

        .about-skill:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        /* CTA */
        .about-cta {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .about-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: 14px 28px;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--accent);
          color: var(--bg-primary);
          border: 3px solid var(--text-primary);
          box-shadow: 6px 6px 0 var(--text-primary);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: none;
        }

        .about-btn:hover {
          box-shadow: 9px 9px 0 var(--text-primary);
          transform: translate(-3px, -3px);
        }

        .about-btn__arrow {
          transition: transform 0.2s;
        }

        .about-btn:hover .about-btn__arrow {
          transform: translateX(4px);
        }

        .about-cta__note {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-photo-frame {
            max-width: 280px;
          }
          .about-tape {
            display: none;
          }
          .about-title {
            font-size: clamp(4rem, 20vw, 8rem);
          }
        }
      `}</style>
    </section>
  )
}
