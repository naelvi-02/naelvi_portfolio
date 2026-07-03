import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { getProjectBySlug, getProjects } from '@/lib/projects'

export const revalidate = 0 // Bypass cache to show DB updates immediately

import AutomatorDemo from '@/components/portfolio/demos/AutomatorDemo'
import RenamerDemo from '@/components/portfolio/demos/RenamerDemo'
import LuminaDemo from '@/components/portfolio/demos/LuminaDemo'
import ProjectGallery from '@/components/portfolio/ProjectGallery'

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
  // Determine which demo to show
  let DemoComponent = null
  if (project.slug === 'marketplace-automator') DemoComponent = <AutomatorDemo />
  if (project.slug === 'barcode-renamer') DemoComponent = <RenamerDemo />
  if (project.slug === 'lumina-studio') DemoComponent = <LuminaDemo />

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Brutalist Split Grid Layout */}
      <section className="proj-detail-split container">
        
        {/* Left Column: Fixed Summary */}
        <div className="proj-detail-left" data-lenis-prevent="true">
          <BackButton />
          
          <h1 className="proj-detail-title">{project.title}</h1>
          
          <div className="proj-detail-meta-box">
            {project.category && (
              <div className="meta-row">
                <span className="meta-label">CAT</span>
                <span className="meta-value">{project.category}</span>
              </div>
            )}
            {project.sector && (
              <div className="meta-row">
                <span className="meta-label">SECTOR</span>
                <span className="meta-value">{project.sector}</span>
              </div>
            )}
            {project.client && (
              <div className="meta-row">
                <span className="meta-label">CLI</span>
                <span className="meta-value">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="meta-row">
                <span className="meta-label">YEA</span>
                <span className="meta-value">{project.year}</span>
              </div>
            )}
          </div>

          <div className="proj-detail-desc">
            <h3 className="section-subtitle">THE BRIEF</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{project.description || 'No description provided.'}</p>
          </div>

          {project.tools && project.tools.length > 0 && (
            <div className="proj-detail-tools">
              <h3 className="section-subtitle">TOOLS</h3>
              <div className="tools-tags">
                {project.tools.map((t) => (
                  <span key={t} className="tool-tag">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Scrolling Gallery */}
        <div className="proj-detail-right">
          {DemoComponent && (
            <div className="proj-interactive-demo">
              <div className="demo-header">[ INTERACTIVE PROTOTYPE ]</div>
              {DemoComponent}
            </div>
          )}
          
          <ProjectGallery project={project} />
        </div>
      </section>
    </div>
  )
}
