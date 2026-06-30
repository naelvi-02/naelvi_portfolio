import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title} | Naelvi Portfolio`,
    description: project.description,
  }
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero / Header */}
      <section className="proj-detail-header bg-foil">
        <div className="container">
          <Link href="/portfolio" className="back-link">
            &larr; Back to Portfolio
          </Link>
          <div className="proj-detail-header__inner">
            <h1 className="proj-detail-header__title">{project.title}</h1>
            
            <div className="proj-detail-header__meta">
              {project.category && (
                <div className="meta-item">
                  <span className="meta-label">Category</span>
                  <span className="meta-value">{project.category}</span>
                </div>
              )}
              {project.client && (
                <div className="meta-item">
                  <span className="meta-label">Client</span>
                  <span className="meta-value">{project.client}</span>
                </div>
              )}
              {project.year && (
                <div className="meta-item">
                  <span className="meta-label">Year</span>
                  <span className="meta-value">{project.year}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          {project.thumbnail && (
            <div className="proj-detail-hero-img">
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                width={1200}
                height={800}
                className="img-fluid"
              />
            </div>
          )}

          <div className="proj-detail-content">
            <div className="proj-detail-desc">
              <h2>About the project</h2>
              <p>{project.description}</p>
              
              {/* Note: since there's no link column in this DB snapshot for some rows, we check if link was added to the type or skip it */}
            </div>

            <div className="proj-detail-sidebar">
              {project.tools && project.tools.length > 0 && (
                <div className="tools-box">
                  <h3>Tech / Tools</h3>
                  <ul>
                    {project.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .proj-detail-header {
          padding-top: var(--space-10);
          padding-bottom: var(--space-10);
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--space-10);
        }

        .back-link {
          display: inline-block;
          margin-bottom: var(--space-8);
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          transition: color var(--duration-fast);
        }
        .back-link:hover {
          color: var(--accent);
        }

        .proj-detail-header__title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1.1;
          margin-bottom: var(--space-8);
          text-transform: uppercase;
        }

        .proj-detail-header__meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-8);
          border-top: 1px solid var(--border);
          padding-top: var(--space-6);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .meta-label {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .meta-value {
          font-weight: 500;
        }

        .proj-detail-hero-img {
          margin-bottom: var(--space-16);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
        }

        .proj-detail-hero-img img {
          width: 100%;
          height: auto;
          display: block;
        }

        .proj-detail-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
        }
        
        @media (min-width: 768px) {
          .proj-detail-content {
            grid-template-columns: 2fr 1fr;
          }
        }

        .proj-detail-desc h2 {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-6);
          color: var(--accent);
        }

        .proj-detail-desc p {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .tools-box {
          padding: var(--space-6);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
        }

        .tools-box h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
          font-family: var(--font-mono);
          text-transform: uppercase;
        }

        .tools-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .tools-box li {
          color: var(--text-secondary);
        }
        
        .tools-box li::before {
          content: '>';
          color: var(--accent);
          margin-right: var(--space-2);
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  )
}
