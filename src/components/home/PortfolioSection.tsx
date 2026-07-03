import HorizontalGallery from '@/components/portfolio/HorizontalGallery'
import type { Project } from '@/types'

interface PortfolioSectionProps {
  projects: Project[]
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  return (
    <section id="portfolio" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Section header */}
      <div className="container" style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-8)', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
          <h2
            data-animate
            style={{
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              lineHeight: 0.8,
              marginLeft: '-0.05em',
              color: 'transparent',
              WebkitTextStroke: '2px var(--text-primary)',
            }}
          >
            <span className="portfolio-title-idle" style={{ display: 'inline-block' }}>PORTFOLIO</span>
          </h2>
          <style>{`
            @keyframes float-idle {
              0%, 100% { transform: translateY(0) rotate(0); }
              50% { transform: translateY(-8px) rotate(-1deg); }
            }
            .portfolio-title-idle {
              animation: float-idle 4s ease-in-out infinite;
            }
          `}</style>
          <div style={{ maxWidth: '240px', textAlign: 'right', paddingBottom: '0.5rem' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
              Design, video &amp; app projects crafted with purpose.
            </p>
          </div>
        </div>

        {/* Y2K decorative tape */}
        <div style={{
          marginTop: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
          paddingTop: 'var(--space-3)',
          display: 'flex',
          gap: 'var(--space-4)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          <span>★ Scroll to explore</span>
          <span>— {projects.length} projects</span>
          <span>— Drag to navigate →</span>
        </div>
      </div>

      <HorizontalGallery projects={projects} />
    </section>
  )
}
