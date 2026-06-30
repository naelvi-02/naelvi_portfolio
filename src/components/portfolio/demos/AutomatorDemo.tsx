'use client'

import React, { useState } from 'react'
import { Upload, FileBox, RefreshCcw, CheckCircle2, SlidersHorizontal, Image as ImageIcon, ChevronRight } from 'lucide-react'

export default function AutomatorDemo() {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)

  return (
    <div style={{
      background: '#F8FAFC',
      color: '#1E293B',
      fontFamily: 'sans-serif',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      fontSize: '14px'
    }}>
      {/* Top Nav */}
      <div style={{
        background: '#FFFFFF',
        padding: '12px 24px',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E53E3E', fontWeight: 'bold' }}>
          <div style={{ width: 24, height: 24, background: '#E53E3E', borderRadius: '4px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>WR</div>
          Wahyu Redjo STUDIO
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
          <div style={{ padding: '6px 12px', background: '#FEE2E2', color: '#E53E3E', borderRadius: '16px', fontWeight: 600 }}>Dashboard</div>
          <div style={{ padding: '6px 12px', color: '#64748B' }}>Setting</div>
          <div style={{ padding: '6px 12px', color: '#64748B' }}>Rename</div>
        </div>
        <div style={{ fontSize: '13px', color: '#64748B' }}>Logout</div>
      </div>

      <div style={{ padding: '24px', display: 'flex', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#E53E3E', marginBottom: '8px' }}>Dashboard {'>'} <span style={{ fontWeight: 600 }}>Jewelry Composer</span></div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#0F172A' }}>Jewelry Template Studio</h2>
            <p style={{ color: '#64748B', margin: 0, fontSize: '13px' }}>Upload folder "sebelum". AI hapus background, sesuaikan cahaya, & deteksi inset otomatis.</p>
          </div>

          <div style={{ 
            background: '#FFFFFF', 
            border: '2px dashed #FECDD3', 
            borderRadius: '12px', 
            padding: '32px', 
            textAlign: 'center' 
          }}>
            <div style={{ width: 48, height: 48, background: '#FFF1F2', color: '#E53E3E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Upload size={24} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Drag & drop foto atau folder</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>PNG, JPG, WEBP - bisa banyak file sekaligus</div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button style={{ background: '#FFF1F2', color: '#E53E3E', border: '1px solid #FECDD3', padding: '8px 16px', borderRadius: '8px', fontWeight: 600 }}>Pilih File</button>
              <button style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '8px', fontWeight: 600 }}>Pilih Folder</button>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ width: 40, height: 40, background: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>ANTING KLEP RAKET 30844848 17K DE 202</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', background: '#FEF2F2', color: '#DC2626', padding: '2px 6px', borderRadius: '12px' }}>Earrings</span>
                  <span style={{ fontSize: '10px', background: '#F0FDF4', color: '#16A34A', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10}/> Selesai</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '280px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '16px' }}>Adjustments</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Auto Adjust Lighting</span>
            <div style={{ width: 36, height: 20, background: '#10B981', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: 16, height: 16, background: '#FFF', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Brightness', val: brightness, set: setBrightness },
              { label: 'Contrast', val: contrast, set: setContrast },
              { label: 'Saturation', val: saturation, set: setSaturation }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                  <span style={{ color: '#E53E3E' }}>{item.label}</span>
                  <span>{item.val} %</span>
                </div>
                <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#E53E3E', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#FFF', border: '2px solid #E53E3E', borderRadius: '50%' }} />
                </div>
              </div>
            ))}
          </div>

          <button style={{ width: '100%', padding: '12px', background: '#FECDD3', color: '#E53E3E', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '32px' }}>
            Generate Foto
          </button>
        </div>
      </div>
    </div>
  )
}
