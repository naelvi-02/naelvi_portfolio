'use client'

import React, { useState } from 'react'
import { Upload, FileText, CheckCircle2, ChevronRight, HardDrive } from 'lucide-react'

// Mock Data
const MOCK_DB: Record<string, { name: string; result: string }> = {
  '89912345': { name: 'Cincin Berlian 18K', result: 'CINCIN_BERLIAN_18K_89912345.jpg' },
  '89954321': { name: 'Kalung Emas 24K', result: 'KALUNG_EMAS_24K_89954321.jpg' }
}

export default function RenamerDemo() {
  const [barcode, setBarcode] = useState('')
  const [files, setFiles] = useState([
    { id: 1, orig: 'IMG_9012.JPG', newName: '', status: 'pending' },
    { id: 2, orig: 'IMG_9013.JPG', newName: '', status: 'pending' },
    { id: 3, orig: 'IMG_9014.JPG', newName: '', status: 'pending' }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const match = MOCK_DB[barcode]
      if (match && currentIndex < files.length) {
        setFiles(prev => prev.map((f, i) => 
          i === currentIndex 
            ? { ...f, newName: match.result, status: 'success' } 
            : f
        ))
        setCurrentIndex(prev => Math.min(prev + 1, files.length - 1))
        setBarcode('')
      } else {
        alert(match ? 'All files processed!' : 'Barcode not found in DB (try 89912345 or 89954321)')
      }
    }
  }

  return (
    <div style={{
      background: '#FDF2F5',
      color: '#1E1B20',
      fontFamily: 'sans-serif',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(232,104,138,0.22)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(232,104,138,0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HardDrive color="#E8688A" size={20} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Smart File Renamer</h3>
        </div>
        <div style={{ fontSize: '12px', color: '#9E8B93', background: '#FCE4EC', padding: '4px 8px', borderRadius: '4px' }}>
          DB Sync: Active
        </div>
      </div>

      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Left Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            border: '2px dashed #E8688A',
            background: 'rgba(232,104,138,0.05)',
            borderRadius: '8px',
            padding: '32px 16px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <Upload color="#E8688A" size={32} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, color: '#E8688A' }}>Upload Photos</div>
            <div style={{ fontSize: '12px', color: '#9E8B93' }}>Drag & Drop folder</div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9E8B93', marginBottom: '6px' }}>
              SCAN BARCODE (Try 89912345)
            </label>
            <input 
              type="text" 
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              onKeyDown={handleScan}
              placeholder="Waiting for scanner..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #E8688A',
                outline: 'none',
                background: '#FFFFFF',
                color: '#1E1B20',
                fontWeight: 600
              }}
            />
          </div>
        </div>

        {/* Right Col */}
        <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid rgba(232,104,138,0.22)', overflow: 'hidden' }}>
          <div style={{ background: '#FCE4EC', padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#E8688A', borderBottom: '1px solid rgba(232,104,138,0.22)' }}>
            Processing Queue ({currentIndex}/{files.length})
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map((file, i) => (
              <div key={file.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: file.status === 'success' ? '#F0FDF4' : i === currentIndex ? '#FFFBEB' : '#F8FAFC',
                border: `1px solid ${file.status === 'success' ? '#BBF7D0' : i === currentIndex ? '#FEF3C7' : '#E2E8F0'}`,
                borderRadius: '6px',
                gap: '12px'
              }}>
                {file.status === 'success' ? <CheckCircle2 color="#16A34A" size={18} /> : <FileText color="#94A3B8" size={18} />}
                
                <div style={{ flex: 1, fontSize: '13px', fontFamily: 'monospace' }}>
                  {file.orig}
                </div>
                
                <ChevronRight color="#94A3B8" size={14} />
                
                <div style={{ flex: 1, fontSize: '13px', fontFamily: 'monospace', color: file.status === 'success' ? '#16A34A' : '#94A3B8' }}>
                  {file.newName || 'Waiting scan...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
