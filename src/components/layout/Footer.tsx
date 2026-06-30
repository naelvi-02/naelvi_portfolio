import Link from 'next/link'

const socialLinks = [
  {
    id: 'footer-email',
    label: 'Email',
    href: 'mailto:hallo.naufal@naelvi.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    id: 'footer-whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/6285236950672',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'footer-instagram',
    label: 'Instagram',
    href: 'https://instagram.com/nopalnaelvi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'footer-linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/naelvi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

const navLinks = [
  { href: '/',          label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              NAELVI
              <span className="footer__logo-dot" aria-hidden="true" />
            </Link>
            <p className="footer__tagline">
              Graphic Designer &amp; AI Specialist
            </p>
            <p className="footer__location">Based in Surabaya, Indonesia</p>
          </div>

          {/* Navigation */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <p className="footer__nav-label">Navigation</p>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="footer__nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="footer__social">
            <p className="footer__nav-label">Connect</p>
            <div className="footer__social-links">
              {socialLinks.map(social => (
                <a
                  key={social.id}
                  id={social.id}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:hallo.naufal@naelvi.com"
              className="footer__email"
              id="footer-email-link"
            >
              hallo.naufal@naelvi.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Naelvi. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed &amp; built by{' '}
            <span style={{ color: 'var(--accent)' }}>Naelvi</span>
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
          padding-top: var(--space-16);
        }

        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: var(--space-12);
          padding-bottom: var(--space-12);
          border-bottom: 1px solid var(--border);
        }

        .footer__logo {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 0.35em;
          color: var(--text-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
          transition: color var(--duration-fast);
        }

        .footer__logo:hover {
          color: var(--accent);
        }

        .footer__logo-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        .footer__tagline {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-1);
        }

        .footer__location {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .footer__nav-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: var(--space-4);
        }

        .footer__nav {
          display: flex;
          flex-direction: column;
        }

        .footer__nav-link {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          text-decoration: none;
          padding-block: var(--space-2);
          transition: color var(--duration-fast);
        }

        .footer__nav-link:hover {
          color: var(--text-primary);
        }

        .footer__social-links {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          transition:
            color var(--duration-fast),
            border-color var(--duration-fast),
            background var(--duration-fast);
        }

        .footer__social-link:hover {
          color: var(--accent);
          border-color: var(--border-accent);
          background: var(--accent-dim);
        }

        .footer__email {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--duration-fast);
        }

        .footer__email:hover {
          color: var(--accent);
        }

        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-block: var(--space-6);
        }

        .footer__copy,
        .footer__credit {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-8);
          }

          .footer__brand {
            grid-column: 1 / -1;
          }

          .footer__bottom {
            flex-direction: column;
            gap: var(--space-2);
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer__inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
