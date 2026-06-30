'use client'

import { useMouseParallax } from '@/hooks/useMouseParallax'

interface AboutHeroProps {
  tagline: string
  location: string
}

export default function AboutHero({ tagline, location }: AboutHeroProps) {
  const offset = useMouseParallax(20)

  return (
    <section className="about-hero bg-foil">
      <div 
        className="container about-hero__inner"
        style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
      >
        <div className="about-hero__text">
          <div className="about-hero__pre">
            <span className="about-hero__line" aria-hidden="true" />
            <span className="about-hero__pre-label">About me</span>
          </div>
          <h1 className="about-hero__name outline-text" style={{ fontSize: 'var(--text-hero)' }}>Naufal Abdullah Almahdi</h1>
          <p className="about-hero__role">{tagline}</p>
          <p className="about-hero__location">{location}</p>
        </div>

        {/* Photo placeholder — replace with actual photo */}
        <div 
          className="about-hero__photo-wrap"
          style={{ transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1.5}px, 0)` }}
        >
          <div className="about-hero__photo" aria-label="Photo of Naufal Abdullah Almahdi">
            <span className="about-hero__photo-initials">NA</span>
          </div>
          <div className="about-hero__photo-ornament" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
