'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
  activeHash: string
}

export default function MobileMenu({ links, isOpen, onClose, activeHash }: MobileMenuProps) {
  return (
    <>
      <div
        className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Background ornament */}
        <div className="mobile-menu__ornament" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
            <line x1="2" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="100" y1="2" x2="100" y2="198" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          </svg>
        </div>

        <nav className="mobile-menu__nav">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu__link ${
                activeHash === link.href ? 'mobile-menu__link--active' : ''
              }`}
              onClick={onClose}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
            >
              <span className="mobile-menu__link-num">{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          <Link href="/contact" className="btn btn-primary" onClick={onClose} id="mobile-contact-btn">
            Let&apos;s Talk
          </Link>
          <p className="mobile-menu__brand">NAELVI &copy; 2025</p>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <style>{`
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: calc(var(--z-nav) + 1);
          background: var(--bg-primary);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-16) var(--container-pad);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
          overflow: hidden;
        }

        .mobile-menu--open {
          transform: translateX(0);
        }

        .mobile-menu__ornament {
          position: absolute;
          right: -60px;
          bottom: -60px;
          width: 300px;
          height: 300px;
          color: var(--border);
          opacity: 0.5;
          pointer-events: none;
        }

        .mobile-menu__nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .mobile-menu__link {
          display: flex;
          align-items: baseline;
          gap: var(--space-4);
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--text-muted);
          text-decoration: none;
          padding-block: var(--space-2);
          border-bottom: 1px solid var(--border-subtle);
          transition:
            color var(--duration-base) var(--ease-out),
            transform var(--duration-base) var(--ease-out);
          transform: translateX(-10px);
          opacity: 0;
        }

        .mobile-menu--open .mobile-menu__link {
          transform: translateX(0);
          opacity: 1;
          transition:
            color var(--duration-base) var(--ease-out),
            transform 0.4s var(--ease-out),
            opacity 0.4s var(--ease-out);
        }

        .mobile-menu__link:hover,
        .mobile-menu__link--active {
          color: var(--text-primary);
        }

        .mobile-menu__link--active {
          color: var(--accent);
        }

        .mobile-menu__link-num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          font-weight: 600;
          flex-shrink: 0;
        }

        .mobile-menu__footer {
          margin-top: var(--space-12);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .mobile-menu__brand {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .mobile-menu__backdrop {
          position: fixed;
          inset: 0;
          z-index: var(--z-nav);
          background: rgba(10, 15, 28, 0.5);
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
