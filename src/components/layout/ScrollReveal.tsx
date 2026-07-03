'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Small delay so Lenis is ready
    const timeout = setTimeout(() => {
      // Find all elements that need reveal
      const elements = document.querySelectorAll('[data-animate]')

      elements.forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [pathname])

  return null
}

