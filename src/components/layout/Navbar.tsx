'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'
import gsap from 'gsap'

const navLinks = [
  { href: '/',          label: 'HOME' },
  { href: '/#about',     label: 'ABOUT' },
  { href: '/#portfolio', label: 'PORTFOLIO' },
  { href: '/#contact',   label: 'CONTACT' },
]

// ─── Scramble utility ────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}|'

function scramble(el: HTMLElement, target: string, duration = 800): void {
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

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const handleEnter = () => {
    if (spanRef.current) scramble(spanRef.current, label, 300)
  }
  return (
    <Link
      href={href}
      className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
      onMouseEnter={handleEnter}
      data-cursor="hover"
    >
      <span ref={spanRef}>{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('/')

  // GSAP Entrance
  useEffect(() => {
    const playEntrance = () => {
      if (!headerRef.current) return
      gsap.fromTo(headerRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
      )
    }

    if ((window as any).preloaderDone) {
      setTimeout(playEntrance, 50)
    } else {
      window.addEventListener('preloaderComplete', playEntrance, { once: true })
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Determine active section manually
      const sections = ['contact', 'portfolio', 'about', 'hero'] // Reverse order for correct top-down overlap
      let current = '/'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight * 0.4) {
            current = id === 'hero' ? '/' : `/#${id}`
            break
          }
        }
      }
      setActiveHash(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial check
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <header
        ref={headerRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        style={{ opacity: 0 }}
        role="banner"
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <Link href="/" className="navbar__logo" aria-label="Naelvi — Home">
            <span className="navbar__logo-text">NAELVI</span>
            <span className="navbar__logo-dot" aria-hidden="true" />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__links" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeHash === link.href}
              />
            ))}
          </nav>

          {/* CTA */}
          <Link href="/contact" className="btn btn-primary navbar__cta" id="nav-contact-btn" data-cursor="hover">
            LET&apos;S TALK
          </Link>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            id="hamburger-btn"
          >
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
          </button>
        </div>
      </header>

      <MobileMenu
        links={navLinks}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeHash={activeHash}
      />

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-nav);
          height: var(--nav-height);
          transition:
            background var(--duration-base) var(--ease-out),
            backdrop-filter var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out);
          border-bottom: 1px solid transparent;
        }

        .navbar--scrolled {
          background: rgba(10, 15, 28, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom-color: var(--border);
        }

        .navbar__inner {
          height: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar__logo-text {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.35em;
          color: var(--text-primary);
          transition: color var(--duration-fast);
        }

        .navbar__logo:hover .navbar__logo-text {
          color: var(--accent);
        }

        .navbar__logo-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-8);
          margin-left: auto;
        }

        .navbar__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
          transition:
            color var(--duration-fast),
            border-color var(--duration-fast);
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__link--active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .navbar__cta {
          margin-left: var(--space-4);
          padding: 8px 20px;
          font-size: var(--text-xs);
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: auto;
        }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text-primary);
          border-radius: 2px;
          transition:
            transform var(--duration-base) var(--ease-out),
            opacity var(--duration-base) var(--ease-out);
          transform-origin: center;
        }

        @media (max-width: 768px) {
          .navbar__links,
          .navbar__cta {
            display: none;
          }

          .navbar__hamburger {
            display: flex;
          }

          .navbar--scrolled {
            background: rgba(10, 15, 28, 0.95);
          }
        }
      `}</style>
    </>
  )
}
