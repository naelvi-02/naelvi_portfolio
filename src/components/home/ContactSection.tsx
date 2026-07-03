'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from '@/components/contact/ContactForm'

gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  email?: string | null
  whatsapp?: string | null
  instagram?: string | null
  linkedin?: string | null
  availability?: string | null
}

export default function ContactSection({ email, whatsapp, instagram, linkedin, availability }: ContactSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const channelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null

    const timeout = setTimeout(() => {
      if (!titleRef.current) return

      tl = gsap.timeline({
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      })
      tl.fromTo(titleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
      if (channelsRef.current && channelsRef.current.children.length > 0) {
        tl.fromTo(channelsRef.current.children,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          0.3
        )
      }
    }, 400)

    return () => {
      clearTimeout(timeout)
      tl?.scrollTrigger?.kill()
      tl?.kill()
    }
  }, [])

  const socials = [
    {
      id: 'contact-whatsapp',
      label: 'WhatsApp',
      value: whatsapp,
      href: `https://wa.me/${whatsapp?.replace(/\D/g, '')}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 'contact-email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
        </svg>
      ),
    },
    {
      id: 'contact-instagram',
      label: 'Instagram',
      value: instagram,
      href: `https://instagram.com/${instagram?.replace('@', '')}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      value: linkedin,
      href: `https://${linkedin}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
        </svg>
      ),
    }
  ].filter(s => s.value)

  return (
    <section id="contact" className="contact-section">
      {/* Noise overlay */}
      <div className="contact-noise" aria-hidden="true" />

      {/* Giant title */}
      <div className="container">
        <div className="contact-header">
          <h2 ref={titleRef} className="contact-title">
            <span className="contact-title__line">LET&apos;S</span>
            <span className="contact-title__line contact-title__line--accent">TALK.</span>
          </h2>
          <p className="contact-header__sub">
            Open for freelance projects, collabs & full-time roles.
          </p>
        </div>

        {/* Big CTA email */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="contact-email-cta"
            data-cursor="hover"
            data-cursor-label="EMAIL"
          >
            <span className="contact-email-cta__text">{email}</span>
            <span className="contact-email-cta__arrow">↗</span>
          </a>
        )}

        {/* Divider */}
        <div className="contact-divider" aria-hidden="true" />

        {/* Bottom grid: channels + availability */}
        <div className="contact-bottom">
          <div className="contact-channels" ref={channelsRef}>
            {socials.map(s => (
              <a
                key={s.id}
                id={s.id}
                href={s.href}
                className="contact-link"
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                data-cursor="hover"
                data-cursor-label={s.label.toUpperCase()}
              >
                <span className="contact-link__num">0{socials.indexOf(s) + 1}</span>
                <span className="contact-link__label">{s.label}</span>
                <span className="contact-link__arrow">→</span>
              </a>
            ))}
          </div>

          {availability && (
            <div className="contact-avail">
              <span className="contact-avail__dot" />
              <span className="contact-avail__text">{availability}</span>
            </div>
          )}

          <div className="contact-form-wrap">
            <ContactForm emailDest={email ?? 'hallo.naufal@naelvi.com'} />
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
          padding: var(--space-24) 0 var(--space-20);
          overflow: hidden;
        }

        .contact-noise {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px;
          animation: noise-anim 0.2s steps(1) infinite;
        }

        @keyframes noise-anim {
          0% { transform: translate(0,0); }
          25% { transform: translate(-2%,-3%); }
          50% { transform: translate(3%,-1%); }
          75% { transform: translate(-1%,4%); }
          100% { transform: translate(0,0); }
        }

        .contact-header {
          position: relative;
          z-index: 2;
          margin-bottom: var(--space-8);
        }

        .contact-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 14vw, 11rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0 0 var(--space-6) -0.05em;
          display: flex;
          flex-direction: column;
        }

        .contact-title__line {
          color: transparent;
          -webkit-text-stroke: 2px var(--text-primary);
          display: block;
          transition: -webkit-text-stroke-color 0.3s;
        }

        .contact-title__line--accent {
          color: var(--accent);
          -webkit-text-stroke: 0px;
        }

        .contact-header__sub {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }

        /* ── Big email CTA ── */
        .contact-email-cta {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: var(--space-4);
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 3.5vw, 2.4rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          padding: var(--space-6) 0;
          border-top: 3px solid var(--border);
          border-bottom: 3px solid var(--border);
          margin-bottom: var(--space-8);
          transition: color 0.2s, border-color 0.2s;
          overflow: hidden;
          cursor: none;
        }

        .contact-email-cta:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .contact-email-cta__text {
          flex: 1;
        }

        .contact-email-cta__arrow {
          font-size: 2em;
          line-height: 1;
          transition: transform 0.3s;
        }

        .contact-email-cta:hover .contact-email-cta__arrow {
          transform: translate(4px, -4px);
        }

        /* ── Divider ── */
        .contact-divider {
          width: 100%;
          height: 1px;
          background: var(--border);
          position: relative;
          z-index: 2;
          margin-bottom: var(--space-10);
        }

        /* ── Bottom grid ── */
        .contact-bottom {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: var(--space-10);
          align-items: start;
        }

        /* ── Channel list ── */
        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 3px solid var(--border);
        }

        .contact-link {
          display: grid;
          grid-template-columns: 2.5rem 1fr auto;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s, background 0.15s, padding-left 0.2s;
          cursor: none;
        }

        .contact-link:hover {
          color: var(--accent);
          padding-left: var(--space-3);
        }

        .contact-link__num {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .contact-link__arrow {
          color: var(--text-muted);
          transition: transform 0.2s, color 0.2s;
        }

        .contact-link:hover .contact-link__arrow {
          transform: translate(4px, 0);
          color: var(--accent);
        }

        /* ── Availability ── */
        .contact-avail {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-5);
          border: 3px solid var(--accent);
          background: rgba(0,227,230,0.04);
          align-self: start;
        }

        .contact-avail__dot {
          width: 10px;
          height: 10px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,227,230,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(0,227,230,0); }
        }

        .contact-avail__text {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Form wrap ── */
        .contact-form-wrap {
          grid-column: 3;
        }

        @media (max-width: 900px) {
          .contact-bottom {
            grid-template-columns: 1fr;
          }
          .contact-form-wrap {
            grid-column: 1;
          }
        }
      `}</style>
    </section>
  )
}

