import type { Metadata } from 'next'
import { getFeaturedProjects } from '@/lib/projects'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import FeaturedWorks from '@/components/home/FeaturedWorks'

export const metadata: Metadata = {
  title: 'Naelvi — Graphic Designer & AI Specialist',
  description:
    'Portfolio of Naelvi (Naufal Abdullah Almahdi) — Graphic Designer & AI Specialist based in Surabaya. Branding, social media design, video editing, and more.',
}

export const revalidate = 3600

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <div className="page-enter">
      <Hero />
      <Marquee />
      <FeaturedWorks projects={featuredProjects} />
    </div>
  )
}
