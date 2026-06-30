import type { Metadata } from 'next'
import { getContentMany } from '@/lib/content'
import AboutHero from '@/components/about/AboutHero'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Naufal Abdullah Almahdi (Naelvi) — Graphic Designer & AI Specialist based in Surabaya.',
}

export default async function AboutPage() {
  const content = await getContentMany([
    'about_bio',
    'about_tagline',
    'about_location',
    'about_experience',
    'about_skills',
    'about_tools'
  ])
  
  const skills = content.about_skills
    ? content.about_skills.split(',').map(s => s.trim()).filter(Boolean)
    : []

  let experience: any[] = []
  try {
    experience = JSON.parse(content.about_experience || '[]')
  } catch(e) {}

  const tools = content.about_tools
    ? content.about_tools.split('\n').filter(Boolean).map(line => {
        const [icon, name] = line.split('|').map(s => s.trim())
        return { icon, name }
      })
    : []

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero strip */}
      <AboutHero tagline={content.about_tagline || ''} location={content.about_location || ''} />

      {/* Bio */}
      <section className="section section--sm about-bio" data-animate>
        <div className="container about-bio__inner">
          <div className="about-bio__label">
            <span className="badge badge-accent">Bio</span>
          </div>
          <div className="about-bio__content">
            {content.about_bio?.split('\n').filter(p => p.trim() !== '').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section section--sm about-skills" data-animate>
        <div className="container">
          <h2 className="about-section-title">Skills</h2>
          <div className="about-skills__tags">
            {skills.map(skill => (
              <span key={skill} className="badge badge-neutral about-skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section section--sm about-exp">
        <div className="container">
          <h2 className="about-section-title" data-animate>Experience</h2>
          <div className="about-exp__timeline">
            {experience.map((exp: any, i: number) => (
              <div key={i} className="about-exp__item" data-animate data-animate-delay={String(i + 1)}>
                <div className="about-exp__year">
                  {exp.startMonth?.slice(0, 3)} {exp.startYear} –<br/>
                  {exp.isPresent ? 'Present' : `${exp.endMonth?.slice(0, 3)} ${exp.endYear}`}
                </div>
                <div className="about-exp__dot" aria-hidden="true" />
                <div className="about-exp__details">
                  <h3 className="about-exp__company">
                    {exp.website ? (
                      <a href={exp.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {exp.company} <span style={{ opacity: 0.5, fontSize: '0.8em' }}>↗</span>
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="about-exp__role">{exp.title}</p>
                  
                  {exp.accomplishments && exp.accomplishments.length > 0 && (
                    <ul className="about-exp__acc">
                      {exp.accomplishments.map((acc: string, j: number) => (
                        <li key={j}>{acc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section section--sm about-edu" data-animate>
        <div className="container">
          <h2 className="about-section-title">Education</h2>
          <div className="about-edu__item">
            <div className="about-edu__year">2019 – 2024</div>
            <div className="about-edu__details">
              <h3 className="about-edu__school">Universitas Negeri Surabaya (UNESA)</h3>
              <p className="about-edu__degree">S1 Ilmu Komunikasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section section--sm about-tools" data-animate>
        <div className="container">
          <h2 className="about-section-title">Tools</h2>
          <div className="about-tools__grid">
            {tools.map(tool => (
              <div key={tool.name} className="about-tool">
                <div className="about-tool__icon">{tool.icon}</div>
                <span className="about-tool__name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CV */}
      <section className="section section--sm about-cv" data-animate>
        <div className="container about-cv__inner">
          <div>
            <h2 className="about-section-title" style={{ marginBottom: 'var(--space-2)' }}>Resume</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Download my latest ATS-friendly CV
            </p>
          </div>
          <a
            href="/assets/cv.pdf"
            className="btn btn-primary"
            download
            id="about-download-cv-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>
      </section>

      <style>{`
        .about-hero {
          background: var(--bg-secondary);
          padding-top: var(--space-16);
          padding-bottom: var(--space-16);
          border-bottom: 1px solid var(--border);
        }

        .about-hero__inner {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: var(--space-12);
        }

        .about-hero__pre {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .about-hero__line {
          display: block;
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        .about-hero__pre-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .about-hero__name {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: var(--space-3);
        }

        .about-hero__role {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: var(--space-2);
        }

        .about-hero__location {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .about-hero__photo-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .about-hero__photo {
          width: 200px;
          height: 240px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .about-hero__photo-initials {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 900;
          color: var(--border);
        }

        .about-hero__photo-ornament {
          position: absolute;
          inset: -8px;
          border: 1px solid var(--border-accent);
          border-radius: calc(var(--radius-lg) + 8px);
          opacity: 0.4;
          z-index: 0;
        }

        .about-section-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: var(--space-6);
        }

        .about-bio__inner {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-10);
          align-items: start;
        }

        .about-bio__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .about-bio__content strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .about-skills__tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .about-skill-tag {
          font-size: var(--text-sm) !important;
          padding: 6px 14px !important;
        }

        /* Experience timeline */
        .about-exp__timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-left: 1px solid var(--border);
          margin-left: 120px;
          padding-left: var(--space-6);
        }

        .about-exp__item {
          display: grid;
          grid-template-columns: 120px 16px 1fr;
          align-items: start;
          gap: var(--space-4);
          margin-left: calc(-120px - var(--space-6));
          padding-bottom: var(--space-8);
          position: relative;
        }

        .about-exp__item:last-child {
          padding-bottom: 0;
        }

        .about-exp__year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.06em;
          padding-top: 3px;
          text-align: right;
        }

        .about-exp__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg-primary);
          flex-shrink: 0;
          margin-top: 5px;
          position: relative;
          z-index: 1;
        }

        .about-exp__company {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .about-exp__role {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-top: var(--space-1);
        }

        .about-exp__acc {
          margin-top: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.6;
          list-style: none;
          padding-left: 0;
        }

        .about-exp__acc li {
          position: relative;
          padding-left: var(--space-4);
        }

        .about-exp__acc li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 700;
        }

        /* Education */
        .about-edu__item {
          display: flex;
          gap: var(--space-8);
          align-items: start;
          padding: var(--space-6);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          max-width: 600px;
        }

        .about-edu__year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          padding-top: 4px;
        }

        .about-edu__school {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-1);
        }

        .about-edu__degree {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        /* Tools */
        .about-tools__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: var(--space-3);
        }

        .about-tool {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: border-color var(--duration-fast), background var(--duration-fast);
        }

        .about-tool:hover {
          border-color: var(--border-accent);
          background: var(--bg-elevated);
        }

        .about-tool__icon {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.03em;
        }

        .about-tool__name {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          text-align: center;
          font-family: var(--font-mono);
        }

        /* CV */
        .about-cv {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }

        .about-cv__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-8);
        }

        @media (max-width: 768px) {
          .about-hero__inner {
            grid-template-columns: 1fr;
          }

          .about-hero__photo {
            width: 140px;
            height: 170px;
          }

          .about-bio__inner {
            grid-template-columns: 1fr;
          }

          .about-exp__timeline {
            margin-left: 80px;
          }

          .about-exp__item {
            grid-template-columns: 80px 16px 1fr;
            margin-left: calc(-80px - var(--space-6));
          }

          .about-cv__inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}
