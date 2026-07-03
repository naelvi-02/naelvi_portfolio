'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <button 
      onClick={() => {
        if (window.history.length > 1) {
          router.back()
        } else {
          router.push('/portfolio')
        }
      }} 
      className="back-link" 
      data-cursor="hover"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', outline: 'none' }}
    >
      &larr; BACK
    </button>
  )
}
