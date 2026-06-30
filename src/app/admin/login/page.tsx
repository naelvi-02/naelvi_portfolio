'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const username = usernameRef.current?.value ?? ''
    const password = passwordRef.current?.value ?? ''

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }

      router.push('/admin/dashboard')
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background ornament */}
      <div className="login-bg-ornament" aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="196" stroke="white" strokeWidth="0.4" strokeDasharray="3 8" />
          <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="0.4" />
          <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <span className="login-logo">NAELVI</span>
          <span className="login-logo-dot" aria-hidden="true" />
          <h1 className="login-title">Admin</h1>
          <p className="login-sub">Enter credentials to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="admin-username" className="label">Username</label>
            <input
              id="admin-username"
              ref={usernameRef}
              type="text"
              className="input"
              placeholder="Enter username"
              autoComplete="username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password" className="label">Password</label>
            <input
              id="admin-password"
              ref={passwordRef}
              type="password"
              className="input"
              placeholder="Enter password"
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary login-submit"
            id="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Verifying...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
          position: relative;
          overflow: hidden;
        }

        .login-bg-ornament {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.04;
          pointer-events: none;
        }

        .login-bg-ornament svg {
          width: min(80vw, 600px);
          height: min(80vw, 600px);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-10);
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--space-8);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }

        .login-logo {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: 0.4em;
          color: var(--accent);
        }

        .login-logo-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        .login-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .login-sub {
          font-size: var(--text-sm);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .login-error {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: 10px 14px;
          background: rgba(255, 77, 109, 0.1);
          border: 1px solid rgba(255, 77, 109, 0.3);
          border-radius: var(--radius-md);
          color: var(--error);
          font-size: var(--text-sm);
        }

        .login-submit {
          width: 100%;
          justify-content: center;
          margin-top: var(--space-2);
        }

        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }
      `}</style>
    </div>
  )
}
