'use client'

import React, { useState } from 'react'
import { Sparkles, Image as ImageIcon, CheckCircle2, ChevronRight, Sliders, Layers } from 'lucide-react'

export default function AutomatorDemo() {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [brightness, setBrightness] = useState(10)
  const [contrast, setContrast] = useState(15)

  const handleProcess = () => {
    if (processing) return
    setProcessing(true)
    setProgress(0)
    
    let current = 0
    const interval = setInterval(() => {
      current += 10
      setProgress(current)
      if (current >= 100) {
        clearInterval(interval)
        setProcessing(false)
      }
    }, 300)
  }

  return (
    <div style={{
      background: '#0F0F1A',
      color: '#EDEDF3',
      fontFamily: 'sans-serif',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #2A2A40',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
    }}>
      {/* Navbar */}
      <div style={{
        background: '#1A1A2E',
        padding: '16px 24px',
        borderBottom: '1px solid #2A2A40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers color="#E53E3E" size={20} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Marketplace Automator</h3>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ fontSize: '12px', color: '#9E8B93', background: '#2A2A40', padding: '6px 12px', borderRadius: '4px' }}>
            Batch: 200 items
          </div>
          <button 
            onClick={handleProcess}
            disabled={processing}
            style={{ 
              background: processing ? '#E59E3E' : '#E53E3E', 
              color: '#FFF', 
              border: 'none', 
              padding: '6px 16px', 
              borderRadius: '4px',
              fontWeight: 600,
              cursor: processing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {processing ? 'Processing...' : 'Start Batch Edit'}
            {!processing && <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: '400px' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', borderRight: '1px solid #2A2A40', background: '#121220', padding: '24px' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', textTransform: 'uppercase', color: '#8A8A9E', letterSpacing: '1px' }}>
            AI Parameters
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#E53E3E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Auto Enhance
                </span>
                <span>Active</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8A8A9E' }}>Brightness</span>
                <span>+{brightness}%</span>
              </div>
              <input type="range" min="0" max="50" value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: '100%', accentColor: '#E53E3E' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8A8A9E' }}>Contrast</span>
                <span>+{contrast}%</span>
              </div>
              <input type="range" min="0" max="50" value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: '100%', accentColor: '#E53E3E' }} />
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div style={{ flex: 1, padding: '24px', background: '#0F0F1A' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {[1,2,3].map(item => (
              <div key={item} style={{ 
                background: '#1A1A2E', 
                borderRadius: '8px', 
                padding: '12px',
                border: '1px solid #2A2A40',
                position: 'relative'
              }}>
                <div style={{ 
                  height: '120px', 
                  background: '#2A2A40', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <ImageIcon color="#4A4A60" size={32} />
                </div>
                <div style={{ fontSize: '12px', color: '#8A8A9E', display: 'flex', justifyContent: 'space-between' }}>
                  <span>IMG_0{item}.jpg</span>
                  {progress > item * 30 ? <CheckCircle2 color="#38A169" size={14} /> : <span style={{color: '#E59E3E'}}>Queued</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {processing && (
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: '#8A8A9E' }}>
                <span>Processing Batch...</span>
                <span>{progress}%</span>
              </div>
              <div style={{ height: '4px', background: '#2A2A40', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#E53E3E', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
