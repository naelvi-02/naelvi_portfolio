import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { getContentMany } from '@/lib/content'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import AboutSummarySection from '@/components/home/AboutSummarySection'
import PortfolioSection from '@/components/home/PortfolioSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'Naelvi — Graphic Designer & AI Specialist',
  description:
    'Portfolio of Naelvi (Naufal Abdullah Almahdi) — Graphic Designer & AI Specialist based in Surabaya. Branding, social media design, video editing, and more.',
}

export const revalidate = 3600

export default async function HomePage() {
  const rawProjects = await getProjects()
  const categoryOrder: Record<string, number> = { design: 1, video: 2, app: 3 }
  const projects = rawProjects.sort((a, b) => (categoryOrder[a.category] || 99) - (categoryOrder[b.category] || 99))
  const content = await getContentMany([
    'about_photo',
    'about_bio',
    'contact_email',
    'contact_whatsapp',
    'contact_instagram',
    'contact_linkedin',
    'contact_availability'
  ])

  // Extract a shorter summary from bio
  const bio = content.about_bio || ''
  const summary = bio.split('\n')[0] || undefined

  return (
    <div className="page-enter">
      <Hero />
      <Marquee />
      <AboutSummarySection photo={content.about_photo} summary={summary} />
      <PortfolioSection projects={projects} />
      <ContactSection 
        email={content.contact_email}
        whatsapp={content.contact_whatsapp}
        instagram={content.contact_instagram}
        linkedin={content.contact_linkedin}
        availability={content.contact_availability}
      />
    </div>
  )
}
