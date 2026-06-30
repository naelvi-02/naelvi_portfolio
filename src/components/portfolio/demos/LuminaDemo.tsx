'use client'

import React, { useState } from 'react'
import { Sparkles, Wand2, Maximize, Settings2 } from 'lucide-react'

export default function LuminaDemo() {
  const [sliderPos, setSliderPos] = useState(50)
  const [processing, setProcessing] = useState(false)

  const handleEnhance = () => {
    if (processing) return
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSliderPos(0) // Reveal full enhanced image
    }, 1500)
  }

  return (
    <div style={{
      background: '#080C16',
      color: '#E2E8F0',
      fontFamily: 'sans-serif',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #1E293B',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
    }}>
      {/* Navbar */}
      <div style={{
        background: '#0F172A',
        padding: '16px 24px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles color="#3B82F6" size={20} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Lumina Studio AI</h3>
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8', background: '#1E293B', padding: '6px 12px', borderRadius: '4px' }}>
          Model: Gemini Enhance v2
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Workspace */}
        <div style={{
          position: 'relative',
          height: '350px',
          background: '#1E293B',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'col-resize',
          border: '1px solid #334155'
        }}
        onMouseMove={e => {
          if (processing) return
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
          setSliderPos(pct)
        }}>
          
          {/* Enhanced (After) - Base Layer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '120px', height: '120px', 
              border: '2px solid #3B82F6', 
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
            }}>
              <Sparkles color="#3B82F6" size={48} />
            </div>
            <p style={{ marginTop: '16px', color: '#3B82F6', fontWeight: 600, letterSpacing: '2px' }}>STUDIO RENDER</p>
          </div>

          {/* Raw (Before) - Overlay Layer */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: `${sliderPos}%`,
            background: '#334155',
            borderRight: '2px solid #3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, opacity: 0.5, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            
            <div style={{ 
              minWidth: '300px', 
              textAlign: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <p style={{ color: '#94A3B8', fontWeight: 600, letterSpacing: '2px' }}>RAW INPUT</p>
            </div>
            
            {/* Slider Handle */}
            <div style={{
              position: 'absolute',
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px', height: '32px',
              background: '#3B82F6',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              zIndex: 10
            }}>
              <Maximize color="#FFF" size={16} style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>

          {processing && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '16px', zIndex: 20
            }}>
              <Wand2 color="#3B82F6" size={32} style={{ animation: 'spin 2s linear infinite' }} />
              <p style={{ color: '#3B82F6', fontWeight: 600 }}>Enhancing with AI...</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: 'transparent', border: '1px solid #334155', color: '#94A3B8', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings2 size={16} /> Tuning
            </button>
          </div>
          <button 
            onClick={handleEnhance}
            disabled={processing}
            style={{ 
              background: '#3B82F6', 
              color: '#FFF', 
              border: 'none', 
              padding: '10px 24px', 
              borderRadius: '4px',
              fontWeight: 600,
              cursor: processing ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <Sparkles size={16} /> {processing ? 'Enhancing...' : 'Enhance Image'}
          </button>
        </div>

      </div>
    </div>
  )
}
