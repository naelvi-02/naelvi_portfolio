'use client'

import React, { useState } from 'react'
import { FolderOpen, RefreshCw, Image as ImageIcon } from 'lucide-react'

export default function RenamerDemo() {
  const [barcode, setBarcode] = useState('')
  const [renamed, setRenamed] = useState(false)

  const handleScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && barcode === '32316349') {
      setRenamed(true)
    } else if (e.key === 'Enter') {
      setRenamed(false)
    }
  }

  return (
    <div style={{
      background: '#FCE4EC',
      color: '#1E293B',
      fontFamily: 'sans-serif',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #FBCFE8',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      padding: '24px'
    }}>
      <div style={{ 
        background: '#FFFFFF', 
        borderRadius: '8px', 
        border: '1px solid #FBCFE8',
        maxWidth: '1000px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #FBCFE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#E8688A', fontWeight: 'bold', fontSize: '18px' }}>Jewelry Photo Renamer Tool</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Total Database: <span style={{ fontWeight: 'bold', color: '#64748B' }}>5,352 Items</span> (Update: 30 Jun 2026, 11:44)</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: '#E8688A', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <FolderOpen size={16} /> Buka Folder
            </button>
            <button style={{ background: '#FCE4EC', color: '#E8688A', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, fontSize: '13px' }}>
              Sync Data
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', padding: '24px', gap: '24px' }}>
          {/* Left Col */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px' }}>FOTO SAAT INI</div>
            <div style={{ 
              border: '2px dashed #FBCFE8', 
              borderRadius: '8px', 
              height: '300px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#FBCFE8',
              marginBottom: '16px'
            }}>
              <ImageIcon size={48} style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '12px' }}>Klik "Buka Folder" untuk me-load foto</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', letterSpacing: '1px' }}>ANTREAN FOTO</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#E8688A' }}>9 tersisa</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} style={{ width: '40px', height: '40px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px' }} />
              ))}
            </div>
          </div>

          {/* Right Col */}
          <div style={{ width: '350px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px' }}>BARCODE SCANNER</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder="Scan barcode ..." 
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                onKeyDown={handleScan}
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #E8688A', outline: 'none', color: '#E8688A' }}
              />
              <button style={{ background: '#E8688A', color: '#FFF', border: 'none', padding: '0 16px', borderRadius: '4px', fontWeight: 'bold' }}>Enter</button>
            </div>

            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px' }}>DETAIL PRODUK</div>
            <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Nama Barang</div>
              <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>{renamed ? 'Cincin Kiara Mata Hijau' : '-'}</div>

              <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Barcode</div>
              <div style={{ color: '#E8688A', background: '#FCE4EC', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>
                {renamed ? '32316349' : '-'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Kadar</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{renamed ? '8K' : '-'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Nampan</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{renamed ? '18' : '-'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Berat (Gram)</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{renamed ? '0,74' : '-'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>Ukuran (Size)</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{renamed ? '15' : '-'}</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px' }}>AUTO-RENAMED AS</div>
            <div style={{ background: '#FCE4EC', border: '1px dashed #E8688A', borderRadius: '8px', padding: '16px' }}>
              <div style={{ background: '#FFF', padding: '12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px', border: '1px solid #FBCFE8' }}>
                {renamed ? 'Cincin Kiara Mata Hijau 32316349 8K 16' : ''}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
