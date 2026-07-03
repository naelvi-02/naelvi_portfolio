'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type CursorMode = 'default' | 'hover' | 'click' | 'text'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsVisible(true)

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3.out' })
    const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' })

    const onMove = (e: MouseEvent) => {
      xCursor(e.clientX)
      yCursor(e.clientY)
      xDot(e.clientX)
      yDot(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const link = el.closest('a, button, [data-cursor]') as HTMLElement | null

      if (link) {
        const cursorType = link.getAttribute('data-cursor') || 'hover'
        const cursorLabel = link.getAttribute('data-cursor-label') || ''
        setMode(cursorType as CursorMode)
        setLabel(cursorLabel)
      } else if (el.closest('p, h1, h2, h3, h4, input, textarea')) {
        setMode('text')
        setLabel('')
      } else {
        setMode('default')
        setLabel('')
      }
    }

    const onDown = () => setMode(prev => prev === 'hover' ? 'click' : prev)
    const onUp = () => setMode(prev => prev === 'click' ? 'hover' : prev)
    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Main trailing cursor */}
      <div
        ref={cursorRef}
        className={`ncursor ncursor--${mode}`}
        style={{ opacity: isVisible ? 1 : 0, transform: 'translate(-50%, -50%)' }}
      >
        {label && <span ref={labelRef} className="ncursor__label">{label}</span>}
      </div>

      {/* Immediate dot */}
      <div
        ref={dotRef}
        className="ncursor-dot"
        style={{ opacity: isVisible ? 1 : 0, transform: 'translate(-50%, -50%)' }}
      />

      <style>{`
        .ncursor {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99999;
          width: 48px;
          height: 48px;
          border: 2px solid var(--accent);
          mix-blend-mode: difference;
          transition: width 0.25s ease, height 0.25s ease, border-color 0.2s, background 0.2s, border-radius 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .ncursor--hover {
          width: 96px;
          height: 96px;
          background: var(--accent);
          border-color: var(--accent);
          mix-blend-mode: difference;
        }

        .ncursor--click {
          width: 64px;
          height: 64px;
          background: white;
          border-color: white;
        }

        .ncursor--text {
          width: 4px;
          height: 40px;
          border-radius: 2px;
          background: var(--accent);
          border-color: var(--accent);
        }

        .ncursor__label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0A0F1C;
          white-space: nowrap;
        }

        .ncursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px;
          height: 6px;
          background: var(--accent);
          pointer-events: none;
          z-index: 100000;
          will-change: transform;
        }

        @media (pointer: coarse) {
          .ncursor, .ncursor-dot { display: none; }
        }
      `}</style>
    </>
  )
}
