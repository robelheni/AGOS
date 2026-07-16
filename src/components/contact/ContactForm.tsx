'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initial = {
  name: '',
  email: '',
  phone: '',
  interest: 'Quote request',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.email.trim()) next.email = 'Enter your email address.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Tell us what you need.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          service: form.interest,
          name: form.name,
          email: form.email,
          phone: form.phone,
          description: form.message,
        }),
      })
      setStatus(response.ok ? 'success' : 'error')
      if (response.ok) setForm(initial)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--paper-warm)] p-8" role="status" aria-live="polite">
        <h2 className="heading-md">Message received.</h2>
        <p className="body-muted mt-4 leading-8">This is currently a mock submission route. Connect email or CRM handling before relying on it for live enquiries.</p>
        <Button type="button" variant="secondary" className="mt-7" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {status === 'error' && (
        <p className="form-error bg-[color-mix(in_srgb,#9b2715_10%,transparent)] p-4" role="alert">
          The message could not be sent. Please try again or contact Agos directly.
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            className="form-input"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && <p id="contact-name-error" className="form-error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="form-input"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="form-input"
          value={form.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && <p id="contact-email-error" className="form-error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-interest">Preferred route</label>
        <select
          id="contact-interest"
          name="interest"
          className="form-input"
          value={form.interest}
          onChange={(event) => update('interest', event.target.value)}
        >
          <option>Quote request</option>
          <option>General question</option>
          <option>Artwork support</option>
          <option>Installation question</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-message">How can Agos help?</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="form-input min-h-40 resize-y"
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && <p id="contact-message-error" className="form-error">{errors.message}</p>}
      </div>

      <Button type="submit" disabled={status === 'submitting'} className="w-full md:w-fit">
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
