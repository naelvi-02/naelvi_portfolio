'use client'

import React, { useState } from 'react'
import { Upload, CheckCircle2 } from 'lucide-react'

export default function AutomatorDemo() {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [mainScale, setMainScale] = useState(100)
  const [detailScale, setDetailScale] = useState(100)

  return (
    <div style={{
      background: '#F8FAFC',
      color: '#1E293B',
      fontFamily: 'sans-serif',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      fontSize: '14px',
      height: '700px', // Fixed height to allow scrolling
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Nav */}
      <div style={{
        background: '#FFFFFF',
        padding: '12px 24px',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
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

      <div style={{ padding: '24px', display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        
        {/* Main Content (Scrollable) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#E53E3E', marginBottom: '8px' }}>Dashboard {'>'} <span style={{ fontWeight: 600 }}>Jewelry Composer</span></div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#0F172A' }}>Jewelry Template Studio</h2>
            <p style={{ color: '#64748B', margin: 0, fontSize: '13px' }}>Upload folder "sebelum". AI hapus background, sesuaikan cahaya, & deteksi inset otomatis.</p>
          </div>

          {/* Upload Zone */}
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

          {/* File List */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px' }}>
              <div style={{ width: 40, height: 40, background: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>KL. LINOSTRINO 32573324 8K 16</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', background: '#1E293B', color: '#FFF', padding: '2px 6px', borderRadius: '12px' }}>Necklace</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Preview Block */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '100%', height: '300px', background: '#FFF1F2', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #FECDD3' }}>
              {/* Fake necklace curve */}
              <div style={{ width: '80%', height: '200px', border: '8px dotted #FCD34D', borderTop: 'none', borderRadius: '0 0 150px 150px', position: 'absolute', top: 0, left: '10%' }} />
              {/* Fake Zoom Inset */}
              <div style={{ width: 100, height: 100, background: '#FFF', borderRadius: '50%', border: '4px solid #E2E8F0', position: 'absolute', bottom: 40, left: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '60%', height: '60%', border: '6px dotted #FCD34D', borderRadius: '50%' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#DC2626', color: '#FFF', padding: '8px 16px', borderRadius: '24px', fontWeight: 'bold', fontSize: '24px' }}>8K</div>
              <div style={{ position: 'absolute', bottom: 24, left: 160, color: '#DC2626', fontWeight: 'bold', fontSize: '18px' }}>MP 16</div>
              <div style={{ position: 'absolute', bottom: 24, right: 120, color: '#DC2626', fontSize: '18px' }}>Ready Stock</div>
            </div>
          </div>

          {/* Hasil Proses */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <strong style={{ fontSize: '12px', color: '#1E293B' }}>Hasil Proses</strong>
                <span style={{ fontSize: '10px', color: '#DC2626', background: '#FEF2F2', padding: '2px 8px', borderRadius: '12px' }}>5 selesai (5 exported)</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>0 antrian · 0 gagal</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: 120, height: 120, border: i === 3 ? '2px solid #DC2626' : '1px solid #E2E8F0', borderRadius: '8px', flexShrink: 0, padding: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 4, left: 4, background: '#F0FDF4', color: '#16A34A', fontSize: '8px', padding: '2px 4px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><CheckCircle2 size={8}/> Selesai</div>
                  <div style={{ width: '100%', height: '60px', background: '#F8FAFC', marginTop: '20px', borderRadius: '4px' }} />
                  <div style={{ position: 'absolute', bottom: 4, right: 4, background: '#DC2626', color: '#FFF', fontSize: '8px', padding: '2px 4px', borderRadius: '8px', fontWeight: 'bold' }}>17K</div>
                  <div style={{ position: 'absolute', bottom: 4, left: 4, color: '#DC2626', fontSize: '6px' }}>Ready Stock</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Scrollable) */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '4px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Adjustments</h3>
            <p style={{ color: '#94A3B8', fontSize: '11px', margin: '0 0 24px 0' }}>Berlaku untuk export massal nanti</p>
            
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
                { label: 'Saturation', val: saturation, set: setSaturation },
                { label: 'Main Scale', val: mainScale, set: setMainScale },
                { label: 'Main Pos X', val: 0, set: () => {} },
                { label: 'Main Pos Y', val: 0, set: () => {} }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                    <span style={{ color: '#E53E3E' }}>{item.label}</span>
                    <span>{item.val} {item.label.includes('Pos') ? 'px' : '%'}</span>
                  </div>
                  <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#E53E3E', borderRadius: '2px' }} />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#FFF', border: '2px solid #E53E3E', borderRadius: '50%' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px', marginBottom: '16px', fontSize: '11px', fontWeight: 600, color: '#64748B' }}>Detail Inset Adjustments</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Detail Scale', val: detailScale, set: setDetailScale },
                { label: 'Detail Pos X', val: 0, set: () => {} },
                { label: 'Detail Pos Y', val: 0, set: () => {} }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                    <span style={{ color: '#E53E3E' }}>{item.label}</span>
                    <span>{item.val} {item.label.includes('Pos') ? 'px' : '%'}</span>
                  </div>
                  <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#E53E3E', borderRadius: '2px' }} />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#FFF', border: '2px solid #E53E3E', borderRadius: '50%' }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Selesai</span>
              <span style={{ color: '#E53E3E', fontWeight: 'bold', fontSize: '12px' }}>3 / 0</span>
            </div>

            <button style={{ width: '100%', padding: '12px', background: '#FECDD3', color: '#E53E3E', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '16px' }}>
              Generate Foto
            </button>
            <button style={{ width: '100%', padding: '12px', background: '#F8FAFC', color: '#94A3B8', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: 'bold', marginTop: '8px' }}>
              Export ZIP (0)
            </button>
          </div>

          {/* Tips Box */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Tips</div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Pilih folder untuk upload semua foto sekaligus</li>
              <li>AI otomatis menentukan kategori & memisahkan foto detail</li>
              <li>Background akan dihapus secara otomatis</li>
              <li>Export tersedia setelah 1 foto selesai diproses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
