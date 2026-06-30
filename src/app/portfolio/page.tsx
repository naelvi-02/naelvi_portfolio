import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import ProjectGrid from '@/components/portfolio/ProjectGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore the design, video, and app projects of Naelvi — Graphic Designer & AI Specialist based in Surabaya.',
}

export const revalidate = 3600

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Page header */}
      <section className="portfolio-header">
        <div className="container">
          <div className="portfolio-header__inner">
            <div>
              <div className="portfolio-header__pre">
                <span className="portfolio-header__line" aria-hidden="true" />
                <span className="portfolio-header__pre-label">Selected works</span>
              </div>
              <h1 className="portfolio-header__title text-texture-foil">Portfolio</h1>
            </div>
            <p className="portfolio-header__desc">
              Design, video, and app projects crafted with purpose.<br />
              Click any project to explore.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="container">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <style>{`
        .portfolio-header {
          padding-top: var(--space-16);
          padding-bottom: var(--space-10);
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
        }

        .portfolio-header__inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-8);
        }

        .portfolio-header__pre {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-3);
        }

        .portfolio-header__line {
          display: block;
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        .portfolio-header__pre-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .portfolio-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
        }

        .portfolio-header__desc {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 340px;
          text-align: right;
        }

        @media (max-width: 768px) {
          .portfolio-header__inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .portfolio-header__desc {
            text-align: left;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
