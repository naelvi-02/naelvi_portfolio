'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/',          label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
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
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
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
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__link ${
                  (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                    ? 'navbar__link--active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link href="/contact" className="btn btn-primary navbar__cta" id="nav-contact-btn">
            Let&apos;s Talk
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
        pathname={pathname}
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
