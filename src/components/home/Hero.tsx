'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'
const TARGET = 'NAELVI'

function scramble(
  el: HTMLElement,
  target: string,
  duration: number = 1200
): void {
  let frame = 0
  const totalFrames = Math.floor(duration / 16)

  const update = () => {
    frame++
    const progress = frame / totalFrames
    const revealedChars = Math.floor(progress * target.length)

    el.textContent = target
      .split('')
      .map((char, i) => {
        if (i < revealedChars) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    if (frame < totalFrames) {
      requestAnimationFrame(update)
    } else {
      el.textContent = target
    }
  }

  requestAnimationFrame(update)
}

export default function Hero() {
  const nameRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return

    const timeout = setTimeout(() => {
      scramble(el, TARGET, 1400)
    }, 200)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="hero" aria-label="Hero section">
      {/* Geometric ornament */}
      <div className="hero__geo" aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="geo-sphere">
          <circle cx="200" cy="200" r="196" stroke="white" strokeWidth="0.4" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.4" />
          <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.4" />
          <ellipse cx="200" cy="200" rx="196" ry="80" stroke="white" strokeWidth="0.3" strokeDasharray="2 4" />
          <ellipse cx="200" cy="200" rx="80" ry="196" stroke="white" strokeWidth="0.3" strokeDasharray="2 4" />
          <line x1="4" y1="200" x2="396" y2="200" stroke="white" strokeWidth="0.3" />
          <line x1="200" y1="4" x2="200" y2="396" stroke="white" strokeWidth="0.3" />
          <circle cx="200" cy="200" r="4" fill="white" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Crosshair corners */}
      <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      <div className="hero__corner hero__corner--br" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__text">
          {/* Pre-label */}
          <div className="hero__pre hero-text-reveal" aria-hidden="true">
            <span className="hero__pre-line" />
            <span className="hero__pre-label">Graphic Designer & AI Specialist</span>
          </div>

          {/* Main name */}
          <h1 className="hero__name">
            <span
              ref={nameRef}
              className="hero__name-text cursor-blink"
              data-text="NAELVI"
              aria-label="NAELVI"
            >
              NAELVI
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero__tagline hero-sub-reveal">
            Crafting bold visuals & intelligent systems.
            <br />
            Based in <span className="hero__tagline-accent">Surabaya</span>, Indonesia.
          </p>

          {/* CTAs */}
          <div className="hero__ctas hero-cta-reveal">
            <a href="/portfolio" className="btn btn-primary" id="hero-view-work-btn">
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/contact" className="btn btn-ghost" id="hero-contact-btn">
              Contact Me
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats hero-cta-reveal">
            {[
              { value: '7+', label: 'Clients' },
              { value: '3+', label: 'Years' },
              { value: '20+', label: 'Projects' },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero__geo {
          position: absolute;
          right: -5%;
          top: 50%;
          transform: translateY(-50%);
          width: min(50vw, 600px);
          opacity: 0.04;
          pointer-events: none;
        }

        /* Corner ornaments */
        .hero__corner {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0.25;
        }

        .hero__corner::before,
        .hero__corner::after {
          content: '';
          position: absolute;
          background: var(--accent);
        }

        .hero__corner::before {
          width: 100%;
          height: 1px;
        }

        .hero__corner::after {
          width: 1px;
          height: 100%;
        }

        .hero__corner--tl {
          top: calc(var(--nav-height) + var(--space-8));
          left: var(--container-pad);
        }

        .hero__corner--tl::before { top: 0; left: 0; }
        .hero__corner--tl::after  { top: 0; left: 0; }

        .hero__corner--br {
          bottom: var(--space-8);
          right: var(--container-pad);
        }

        .hero__corner--br::before { bottom: 0; right: 0; left: auto; }
        .hero__corner--br::after  { bottom: 0; right: 0; top: auto; left: auto; }

        .hero__content {
          position: relative;
          z-index: var(--z-base);
          padding-block: var(--space-20);
        }

        .hero__text {
          max-width: 700px;
        }

        .hero__pre {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .hero__pre-line {
          display: block;
          width: 32px;
          height: 1px;
          background: var(--accent);
        }

        .hero__pre-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .hero__name {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: var(--space-8);
        }

        .hero__name-text {
          display: block;
        }

        .hero__tagline {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-10);
          font-weight: 400;
        }

        .hero__tagline-accent {
          color: var(--accent);
          font-weight: 500;
        }

        .hero__ctas {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-bottom: var(--space-12);
        }

        .hero__stats {
          display: flex;
          gap: var(--space-8);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }

        .hero__stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hero__stat-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
        }

        .hero__stat-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .hero__geo {
            right: -20%;
            opacity: 0.03;
            width: 80vw;
          }

          .hero__stats {
            gap: var(--space-6);
          }
        }

        @media (max-width: 480px) {
          .hero__ctas {
            flex-direction: column;
          }

          .hero__ctas .btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
