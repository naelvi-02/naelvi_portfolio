'use client'

import { useEffect, useState } from 'react'

export function useMouseParallax(intensity: number = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity
      const y = (e.clientY / window.innerHeight - 0.5) * intensity
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return offset
}
