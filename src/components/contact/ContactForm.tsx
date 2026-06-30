'use client'

import { useState, useRef } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ContactFormProps {
  emailDest: string
}

export default function ContactForm({ emailDest }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = formRef.current!
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    // Open mailto
    const mailto = `mailto:${emailDest}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`
    window.location.href = mailto

    setStatus('success')
    form.reset()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="contact-name" className="label label-required">Name</label>
        <input id="contact-name" name="name" type="text" className="input" placeholder="Your name" required />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="label label-required">Email</label>
        <input id="contact-email" name="email" type="email" className="input" placeholder="your@email.com" required />
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="label label-required">Subject</label>
        <input id="contact-subject" name="subject" type="text" className="input" placeholder="Project inquiry, collab, etc." required />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="label label-required">Message</label>
        <textarea id="contact-message" name="message" className="textarea" placeholder="Tell me about your project..." required rows={6} />
      </div>

      {status === 'error' && (
        <p className="error-message">{errorMsg}</p>
      )}

      {status === 'success' && (
        <p style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>
          ✓ Opening email client...
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        id="contact-send-btn"
        disabled={status === 'loading'}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {status === 'loading' ? (
          <><span className="spinner" aria-hidden="true" /> Sending...</>
        ) : 'Send Message'}
      </button>
    </form>
  )
}
