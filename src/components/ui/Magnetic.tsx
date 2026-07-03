'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const magnetic = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = magnetic.current
    if (!el) return

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = el.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      // Reduce the magnetic pull distance slightly for subtlety
      xTo(x * 0.35)
      yTo(y * 0.35)
    }

    const mouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", mouseMove)
    el.addEventListener("mouseleave", mouseLeave)

    return () => {
      el.removeEventListener("mousemove", mouseMove)
      el.removeEventListener("mouseleave", mouseLeave)
    }
  }, [])

  return (
    <div ref={magnetic} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
