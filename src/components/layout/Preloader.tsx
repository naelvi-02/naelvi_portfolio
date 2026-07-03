'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const [isReady, setIsReady] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden'

    // Simple timeline for preloader
    const tl = gsap.timeline({
      onComplete: () => {
        setIsReady(true)
        document.body.style.overflow = ''
      }
    })

    // Simulate loading
    tl.to(text.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to({}, { duration: 0.8 }) // hold for a bit
    .to(text.current, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in"
    })
    .to(container.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut"
    }, "-=0.2")
    .call(() => {
      ;(window as any).preloaderDone = true
      window.dispatchEvent(new Event('preloaderComplete'))
    }, undefined, "-=0.6")

    return () => {
      tl.kill()
    }
  }, [])

  if (isReady) return null

  return (
    <div 
      ref={container}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0A0F1C', // Matches --bg-primary
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        ref={text}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 900,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
        }}
        className="outline-text"
      >
        NAELVI
      </div>
    </div>
  )
}
