'use client'

import React from 'react'
import { Plus, Camera, Camera as CameraIcon } from 'lucide-react'

export default function LuminaDemo() {
  return (
    <div style={{
      background: '#0B0E14',
      color: '#E2E8F0',
      fontFamily: 'sans-serif',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #1E293B',
      boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
      fontSize: '12px'
    }}>
      {/* Top Nav */}
      <div style={{
        background: '#0B0E14',
        padding: '12px 24px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          <div style={{ width: 16, height: 16, background: 'linear-gradient(45deg, #3B82F6, #10B981, #F59E0B, #EF4444)', borderRadius: '4px' }} />
          Gemini
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 24, height: 24, background: '#EF4444', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 12, background: '#FFF', transform: 'rotate(45deg)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: '#FFF' }}>Lumina Studio v8.9</div>
            <div style={{ fontSize: '9px', color: '#64748B', letterSpacing: '1px' }}>CLEAN ARCHITECTURE</div>
          </div>
        </div>
        <div style={{ padding: '6px 12px', background: '#1E293B', borderRadius: '16px', color: '#94A3B8', fontSize: '11px' }}>
          ✓ Clean Input Engine
        </div>
      </div>

      <div style={{ display: 'flex', height: '600px' }}>
        {/* Left Sidebar */}
        <div style={{ width: '320px', borderRight: '1px solid #1E293B', padding: '16px', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button style={{ flex: 1, background: '#EF4444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>SINGLE ITEM</button>
            <button style={{ flex: 1, background: 'transparent', color: '#64748B', border: '1px solid #1E293B', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>MIXED SET</button>
          </div>

          <div style={{ border: '1px dashed #334155', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '24px', cursor: 'pointer' }}>
            <Plus size={20} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 'bold', color: '#E2E8F0' }}>Upload Foto Produk</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>Mode Single: 1 Foto Saja</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>JENIS PRODUK (SINGLE)</div>
            <select style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid #1E293B', padding: '10px', borderRadius: '8px', outline: 'none' }}>
              <option>Cincin (Ring)</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>MODE OUTPUT</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid #EF4444', padding: '8px', borderRadius: '8px' }}>Product Focus</button>
              <button style={{ flex: 1, background: 'transparent', color: '#64748B', border: '1px solid #1E293B', padding: '8px', borderRadius: '8px' }}>With Model</button>
            </div>
          </div>

          <div style={{ background: '#0F172A', borderRadius: '8px', padding: '16px', border: '1px solid #1E293B' }}>
            <div style={{ fontSize: '10px', color: '#3B82F6', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '12px' }}>CREATIVE CONTROL</div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '4px' }}>Positioning</div>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '6px', color: '#E2E8F0' }}>Flatlay (Top Down)</div>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '4px' }}>Camera Angle</div>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '6px', color: '#E2E8F0' }}>Eye Level</div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '4px' }}>Composition</div>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '6px', color: '#E2E8F0' }}>Dead Center</div>
            </div>

            <div>
              <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '4px' }}>Design Fidelity</div>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '6px', color: '#E2E8F0' }}>Ultra Strict - Max design copy. Risk of stiffer look.</div>
            </div>
          </div>

        </div>

        {/* Right Main Area */}
        <div style={{ flex: 1, background: '#171E2B', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Top Bar inside Viewfinder */}
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <div style={{ color: '#94A3B8', fontSize: '11px' }}>Live Viewfinder</div>
          </div>
          
          <div style={{ width: '300px', height: '300px', background: '#0B0E14', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: 48, height: 48, border: '1px solid #334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <CameraIcon color="#64748B" size={20} />
            </div>
            <div style={{ width: 6, height: 6, background: '#EF4444', borderRadius: '50%', position: 'absolute', top: 110, right: 120 }} />
            <div style={{ fontWeight: 'bold', color: '#94A3B8', marginBottom: '4px' }}>Waiting for Input</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>Upload photo to start simulation</div>
          </div>
        </div>
      </div>
    </div>
  )
}
