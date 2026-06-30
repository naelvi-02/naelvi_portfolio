'use client'

import React from 'react'
import { Plus, Camera as CameraIcon } from 'lucide-react'

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
      fontSize: '12px',
      height: '800px', // Fixed height to simulate app window
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Nav */}
      <div style={{
        background: '#0B0E14',
        padding: '12px 24px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
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

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar (Scrollable) */}
        <div style={{ width: '340px', borderRight: '1px solid #1E293B', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, background: '#EF4444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>SINGLE ITEM</button>
            <button style={{ flex: 1, background: 'transparent', color: '#64748B', border: '1px solid #1E293B', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>MIXED SET</button>
          </div>

          <div style={{ border: '1px dashed #334155', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', cursor: 'pointer' }}>
            <Plus size={20} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 'bold', color: '#E2E8F0' }}>Upload Foto Produk</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>Mode Single: 1 Foto Saja</div>
          </div>

          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>JENIS PRODUK (SINGLE)</div>
            <select style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid #1E293B', padding: '10px', borderRadius: '8px', outline: 'none' }}>
              <option>Cincin (Ring)</option>
            </select>
          </div>

          <div>
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

          {/* JARAK KAMERA (ZOOM) */}
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>JARAK KAMERA (ZOOM)</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, background: 'transparent', color: '#64748B', border: '1px solid #1E293B', padding: '8px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Close</span>
                <span style={{ fontSize: '9px' }}>Macro</span>
              </button>
              <button style={{ flex: 1, background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid #10B981', padding: '8px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Medium</span>
                <span style={{ fontSize: '9px' }}>Standard</span>
              </button>
              <button style={{ flex: 1, background: 'transparent', color: '#64748B', border: '1px solid #1E293B', padding: '8px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Wide</span>
                <span style={{ fontSize: '9px' }}>Atmospheric</span>
              </button>
            </div>
          </div>

          {/* NUANSA & TONE LINGKUNGAN */}
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>NUANSA & TONE LINGKUNGAN</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {['#FFFFFF', '#E2E8F0', '#94A3B8', '#334155', '#B2AC88', '#E2725B', '#1D2951', '#E6D0CE'].map(c => (
                <div key={c} style={{ width: 20, height: 20, borderRadius: '50%', background: c, border: c === '#FFFFFF' ? '2px solid #E2E8F0' : 'none' }} />
              ))}
            </div>
            {/* Color Input row */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, background: '#FFFFFF', borderRadius: '6px' }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#0F172A', border: '1px solid #1E293B', padding: '0 12px', borderRadius: '6px', height: '32px', gap: '8px' }}>
                <span style={{ color: '#64748B' }}>#</span>
                <span style={{ color: '#E2E8F0' }}>FFFFFF</span>
              </div>
              <button style={{ width: 32, height: 32, background: '#1E293B', border: 'none', borderRadius: '6px', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={16} />
              </button>
            </div>
            <div style={{ fontSize: '9px', color: '#64748B', marginTop: '8px', fontStyle: 'italic' }}>Belum ada warna custom. Pilih & klik (+)</div>
          </div>

          {/* GAYA VISUAL & OUTFIT */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px' }}>GAYA VISUAL & OUTFIT</div>
              <div style={{ background: '#1E293B', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', color: '#64748B' }}>Match Wardrobe: OFF</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #1E293B', marginBottom: '12px' }}>
              <div style={{ padding: '8px 12px', borderBottom: '2px solid #E2E8F0', fontWeight: 'bold', color: '#E2E8F0', fontSize: '10px' }}>PRESETS</div>
              <div style={{ padding: '8px 12px', color: '#64748B', fontSize: '10px' }}>CUSTOM PROMPT</div>
              <div style={{ padding: '8px 12px', color: '#64748B', fontSize: '10px' }}>MATCH STYLE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Soft Sun Directional', desc: 'Soft Sun Directional Lighting...' },
                { title: 'Hard Light + Diffusion', desc: 'Hard Light with Soft Diffusion...' },
                { title: 'Low-Angle Light', desc: 'Low-Angle Lighting...' }
              ].map((p, i) => (
                <div key={i} style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px', padding: '12px', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 12, top: 16, width: 4, height: 4, borderRadius: '50%', background: '#3B82F6' }} />
                  <div style={{ fontWeight: 'bold', color: '#E2E8F0', marginBottom: '4px' }}>{p.title}</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RASIO FOTO */}
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>RASIO FOTO</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: '1:1', w: 16, h: 16 },
                { label: '4:5', w: 14, h: 18, active: true },
                { label: '9:16', w: 10, h: 20 },
                { label: '16:9', w: 20, h: 10 }
              ].map(r => (
                <div key={r.label} style={{ flex: 1, background: '#0F172A', border: `1px solid ${r.active ? '#EF4444' : '#1E293B'}`, padding: '12px 0', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: r.w, height: r.h, border: `2px solid ${r.active ? '#EF4444' : '#64748B'}`, borderRadius: '2px' }} />
                  <div style={{ fontSize: '10px', color: r.active ? '#EF4444' : '#64748B' }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GENERATE */}
          <button style={{ background: '#1E293B', color: '#64748B', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 'bold', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#64748B' }} />
            GENERATE (0 ITEM)
          </button>

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
          
          <div style={{ width: '400px', height: '400px', background: '#0B0E14', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: 64, height: 64, border: '1px solid #334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <CameraIcon color="#64748B" size={24} />
            </div>
            <div style={{ width: 6, height: 6, background: '#EF4444', borderRadius: '50%', position: 'absolute', top: 160, right: 160 }} />
            <div style={{ fontWeight: 'bold', color: '#94A3B8', marginBottom: '8px', fontSize: '14px' }}>Waiting for Input</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Upload photo to start simulation</div>
          </div>
        </div>
      </div>
    </div>
  )
}
