import type { Metadata } from 'next'
import { getContentMany } from '@/lib/content'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Naufal Abdullah Almahdi (Naelvi).',
}

export default async function ContactPage() {
  const content = await getContentMany([
    'contact_email',
    'contact_whatsapp',
    'contact_instagram',
    'contact_linkedin',
    'contact_availability'
  ])

  const socials = [
    {
      id: 'contact-whatsapp',
      label: 'WhatsApp',
      value: content.contact_whatsapp,
      href: `https://wa.me/${content.contact_whatsapp?.replace(/\D/g, '')}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 'contact-email',
      label: 'Email',
      value: content.contact_email,
      href: `mailto:${content.contact_email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
        </svg>
      ),
    },
    {
      id: 'contact-instagram',
      label: 'Instagram',
      value: content.contact_instagram,
      href: `https://instagram.com/${content.contact_instagram?.replace('@', '')}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      value: content.contact_linkedin,
      href: `https://${content.contact_linkedin}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ]

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Header */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__pre">
            <span className="contact-hero__line" aria-hidden="true" />
            <span className="contact-hero__pre-label">Get in touch</span>
          </div>
          <h1 className="contact-hero__title">Let&apos;s Talk</h1>
          <p className="contact-hero__sub">
            Got a project in mind? Want to collaborate? Or just say hi?<br />
            I&apos;m always open to new opportunities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-inner">
          {/* Contact info */}
          <div className="contact-info">
            <div className="contact-info__channels">
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  className="contact-channel"
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${s.label}: ${s.value}`}
                >
                  <div className="contact-channel__icon">{s.icon}</div>
                  <div>
                    <p className="contact-channel__label">{s.label}</p>
                    <p className="contact-channel__value">{s.value}</p>
                  </div>
                  <svg className="contact-channel__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              ))}
            </div>

            <div className="contact-info__availability">
              <div className="contact-avail-dot" aria-hidden="true" />
              <span>{content.contact_availability}</span>
            </div>
          </div>

          {/* Form */}
          <ContactForm emailDest={content.contact_email ?? 'hallo.naufal@naelvi.com'} />
        </div>
      </section>

      <style>{`
        .contact-hero {
          background: var(--bg-secondary);
          padding-top: var(--space-16);
          padding-bottom: var(--space-12);
          border-bottom: 1px solid var(--border);
        }

        .contact-hero__pre {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .contact-hero__line {
          display: block;
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        .contact-hero__pre-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .contact-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: var(--space-4);
        }

        .contact-hero__sub {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
        }

        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-16);
          align-items: start;
        }

        .contact-info__channels {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
        }

        .contact-channel {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition:
            border-color var(--duration-fast),
            background var(--duration-fast),
            transform var(--duration-fast);
        }

        .contact-channel:hover {
          border-color: var(--border-accent);
          background: var(--bg-elevated);
          transform: translateX(4px);
        }

        .contact-channel__icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-md);
          color: var(--accent);
          flex-shrink: 0;
        }

        .contact-channel__label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .contact-channel__value {
          font-size: var(--text-sm);
          color: var(--text-primary);
          font-weight: 500;
        }

        .contact-channel__arrow {
          color: var(--text-muted);
          margin-left: auto;
          flex-shrink: 0;
          transition: color var(--duration-fast), transform var(--duration-fast);
        }

        .contact-channel:hover .contact-channel__arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }

        .contact-info__availability {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--success);
          letter-spacing: 0.06em;
        }

        .contact-avail-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 196, 140, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(0, 196, 140, 0); }
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        @media (max-width: 900px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: var(--space-10);
          }
        }
      `}</style>
    </div>
  )
}
