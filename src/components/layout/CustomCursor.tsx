'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over interactive elements
      const isInteractive = target.closest('a, button, input, textarea, select, .interactive, [data-interactive]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateHoverState)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateHoverState)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer circle that follows mouse with a slight delay */}
      <div 
        className={`custom-cursor-outer ${isHovering ? 'hover' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />
      {/* Inner dot */}
      <div 
        className="custom-cursor-inner"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />
    </>
  )
}
