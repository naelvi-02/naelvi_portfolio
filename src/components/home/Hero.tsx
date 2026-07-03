'use client'

import { useEffect, useRef } from 'react'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Scramble utility ────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}|'

function scramble(el: HTMLElement, target: string, duration = 1200): void {
  let frame = 0
  const totalFrames = Math.floor(duration / 16)
  const update = () => {
    frame++
    const progress = frame / totalFrames
    const revealed = Math.floor(progress * target.length)
    el.textContent = target
      .split('')
      .map((char, i) => i < revealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)])
      .join('')
    if (frame < totalFrames) requestAnimationFrame(update)
    else el.textContent = target
  }
  requestAnimationFrame(update)
}

// ─── Char Hover Effect (like lukebaffait.fr) ─────────────────────────────────
function CharHover({ children, className, href, id }: { children: string; className?: string; href?: string; id?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  const handleEnter = () => {
    const el = spanRef.current
    if (!el) return
    scramble(el, children, 400)
  }

  if (href) {
    return (
      <a
        href={href}
        id={id}
        className={`char-hover ${className || ''}`}
        onMouseEnter={handleEnter}
        data-cursor="hover"
      >
        <span ref={spanRef}>{children}</span>
      </a>
    )
  }

  return (
    <span
      id={id}
      className={`char-hover ${className || ''}`}
      onMouseEnter={handleEnter}
    >
      <span ref={spanRef}>{children}</span>
    </span>
  )
}

// ─── Scrolling ticker text ─────────────────────────────────────────────────
const TICKER = 'GRAPHIC DESIGNER — AI SPECIALIST — SURABAYA, ID — 2025 — NAELVI — '

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const nameRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const offset = useMouseParallax(25)

  // GSAP entrance: stagger reveal each hero child
  useEffect(() => {
    const ctx = gsap.context(() => {
      const playEntrance = () => {
        // Scramble big name text
        const nameEl = nameRef.current
        if (nameEl) {
          scramble(nameEl, 'NAELVI', 1600)
        }

        gsap.fromTo('.hero-line-reveal',
          { y: '105%', skewY: 3 },
          { y: '0%', skewY: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }
        )
        gsap.fromTo('.hero-fade-reveal',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.7 }
        )
        // Stats count up
        const statEls = document.querySelectorAll('.hero-stat__val')
        statEls.forEach((el) => {
          const target = parseInt(el.textContent || '0')
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            delay: 1.1,
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + '+'
            }
          })
        })
      }

      if ((window as any).preloaderDone) {
        // Give a tiny frame delay for layout to settle if skipped
        setTimeout(playEntrance, 100)
      } else {
        window.addEventListener('preloaderComplete', playEntrance, { once: true })
      }

      // Scroll-out: text slides up + fades as you scroll away
      gsap.to('.hero-text', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        }
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])
  // Ticker animation
  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    const anim = gsap.to(el, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    })
    return () => { anim.kill() }
  }, [])

  return (
    <section ref={heroRef} id="hero" className="hero" aria-label="Hero section">
      {/* Noise grain overlay */}
      <div className="hero-noise" aria-hidden="true" />

      {/* Brutalist grid lines */}
      <div className="hero-grid" aria-hidden="true">
        {[...Array(5)].map((_, i) => <div key={i} className="hero-grid__col" />)}
      </div>

      {/* Mouse parallax background text */}
      <div
        className="hero-bg-text"
        aria-hidden="true"
        style={{ transform: `translate3d(${offset.x * 2}px, ${offset.y * 1.5}px, 0)` }}
      >
        NAELVI
      </div>

      {/* Corner marks */}
      <span className="hero-corner hero-corner--tl" aria-hidden="true">00</span>
      <span className="hero-corner hero-corner--tr" aria-hidden="true">©2025</span>
      <span className="hero-corner hero-corner--bl" aria-hidden="true">SBY</span>
      <span className="hero-corner hero-corner--br" aria-hidden="true">
        <span className="hero-corner__dot" />
        AVAIL
      </span>

      {/* Main content */}
      <div className="hero-content container">
        <div
          className="hero-text"
          style={{ transform: `translate3d(${-offset.x * 0.6}px, ${-offset.y * 0.6}px, 0)` }}
        >
          {/* Pre-label */}
          <div className="hero-pre hero-fade-reveal" style={{ opacity: 0 }}>
            <span className="hero-pre__line" />
            <CharHover className="hero-pre__label">GRAPHIC DESIGNER & AI SPECIALIST</CharHover>
          </div>

          {/* Giant name */}
          <h1 className="hero-name">
            <span className="hero-name__overflow">
              <span
                ref={nameRef}
                className="hero-name__text hero-line-reveal"
                data-text="NAELVI"
                aria-label="NAELVI"
              >
                NAELVI
              </span>
            </span>
          </h1>

          {/* Sub line */}
          <div className="hero-sub">
            <div className="hero-sub__overflow">
              <p className="hero-sub__text hero-line-reveal">
                Crafting bold visuals & intelligent systems.
                <span className="hero-accent"> Based in Surabaya.</span>
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="hero-stats hero-fade-reveal" style={{ opacity: 0 }}>
            {[
              { val: '7+', label: 'Clients' },
              { val: '3+', label: 'Years' },
              { val: '20+', label: 'Projects' },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat__val">{s.val}</span>
                <span className="hero-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero-ctas hero-fade-reveal" style={{ opacity: 0 }}>
            <CharHover href="/#portfolio" id="hero-view-work-btn" className="hero-cta hero-cta--primary">
              VIEW WORK
            </CharHover>
            <CharHover href="/#contact" id="hero-contact-btn" className="hero-cta hero-cta--ghost">
              LET&apos;S TALK
            </CharHover>
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="hero-ticker-wrap" aria-hidden="true">
        <div ref={tickerRef} className="hero-ticker">
          <span>{TICKER}{TICKER}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll hero-fade-reveal" style={{ opacity: 0 }} aria-hidden="true">
        <span className="hero-scroll__line" />
        <span className="hero-scroll__text">SCROLL</span>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding-top: var(--nav-height);
          background: var(--bg-primary);
        }

        /* ── Noise ── */
        .hero-noise {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          animation: noise-anim 0.2s steps(1) infinite;
        }

        @keyframes noise-anim {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(3%, -1%); }
          40% { transform: translate(-1%, 4%); }
          50% { transform: translate(4%, -2%); }
          60% { transform: translate(-2%, 1%); }
          70% { transform: translate(2%, 3%); }
          80% { transform: translate(-3%, -2%); }
          90% { transform: translate(1%, -4%); }
          100% { transform: translate(0, 0); }
        }

        /* ── Grid lines ── */
        .hero-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          pointer-events: none;
          z-index: 0;
          padding: 0 var(--container-pad);
        }

        .hero-grid__col {
          border-left: 1px solid rgba(255,255,255,0.03);
        }
        .hero-grid__col:last-child {
          border-right: 1px solid rgba(255,255,255,0.03);
        }

        /* ── Background giant text ── */
        .hero-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(12rem, 30vw, 28rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0, 227, 230, 0.04);
          text-transform: uppercase;
          letter-spacing: -0.05em;
          pointer-events: none;
          z-index: 0;
          line-height: 1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Corner marks ── */
        .hero-corner {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-corner--tl { top: calc(var(--nav-height) + 20px); left: var(--container-pad); }
        .hero-corner--tr { top: calc(var(--nav-height) + 20px); right: var(--container-pad); }
        .hero-corner--bl { bottom: 60px; left: var(--container-pad); }
        .hero-corner--br { bottom: 60px; right: var(--container-pad); }

        .hero-corner__dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }

        /* ── Main content ── */
        .hero-content {
          position: relative;
          z-index: 5;
          padding-block: var(--space-20);
        }

        .hero-text {
          max-width: 900px;
        }

        /* ── Pre-label ── */
        .hero-pre {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .hero-pre__line {
          display: block;
          width: 40px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .hero-pre__label, .char-hover {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          cursor: none;
        }

        /* ── Name ── */
        .hero-name {
          margin: 0 0 var(--space-6);
          overflow: hidden;
        }

        .hero-name__overflow {
          display: block;
          overflow: hidden;
        }

        .hero-name__text {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(5rem, 16vw, 14rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 2px var(--text-primary);
          transition: -webkit-text-stroke-color 0.3s;
        }

        .hero-name__text:hover {
          -webkit-text-stroke-color: var(--accent);
        }

        /* ── Sub text ── */
        .hero-sub {
          margin-bottom: var(--space-10);
        }

        .hero-sub__overflow {
          overflow: hidden;
        }

        .hero-sub__text {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .hero-accent {
          color: var(--accent);
          font-weight: 600;
        }

        /* ── Overflow clip for reveal ── */
        .hero-line-reveal {
          will-change: transform;
        }

        /* ── Stats ── */
        .hero-stats {
          display: flex;
          gap: var(--space-10);
          margin-bottom: var(--space-10);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hero-stat__val {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1;
        }

        .hero-stat__label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: none;
          transition: box-shadow 0.2s, transform 0.2s;
          border: 3px solid;
        }

        .hero-cta--primary {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--text-primary);
          box-shadow: 5px 5px 0 var(--text-primary);
        }

        .hero-cta--primary:hover {
          box-shadow: 8px 8px 0 var(--text-primary);
          transform: translate(-3px, -3px);
        }

        .hero-cta--ghost {
          background: transparent;
          color: var(--text-primary);
          border-color: var(--border);
          box-shadow: 5px 5px 0 var(--border);
        }

        .hero-cta--ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: 8px 8px 0 var(--accent);
          transform: translate(-3px, -3px);
        }

        /* ── Ticker ── */
        .hero-ticker-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          border-top: 1px solid var(--border);
          height: 40px;
          z-index: 5;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
        }

        .hero-ticker {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        .hero-ticker span {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0 2em;
        }

        /* ── Scroll indicator ── */
        .hero-scroll {
          position: absolute;
          right: var(--container-pad);
          bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        .hero-scroll__line {
          display: block;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, var(--accent));
          animation: scroll-line 2s ease-in-out infinite;
        }

        @keyframes scroll-line {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }

        .hero-scroll__text {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          writing-mode: vertical-rl;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-bg-text { display: none; }
          .hero-corner--tr, .hero-corner--br { display: none; }
          .hero-stats { gap: var(--space-6); }
          .hero-ctas { flex-direction: column; }
          .hero-cta { justify-content: center; }
          .hero-scroll { display: none; }
        }
      `}</style>
    </section>
  )
}
