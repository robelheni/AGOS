'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'

const serviceOptions = [
  'Banner',
  'Shop sign',
  'Clothing',
  'Vehicle graphics',
  'Window graphics',
  'Business cards',
  'Flyers',
  'Posters',
  'Roller banner',
  'Stickers',
  'Graphic design',
  'Other',
]

const contactMethods = ['Email', 'Phone', 'Either']
const fileTypes = ['Logo', 'Artwork', 'Reference image', 'Measurements', 'Existing design']

const steps = [
  { id: 1, title: 'Service' },
  { id: 2, title: 'Project details' },
  { id: 3, title: 'Contact details' },
  { id: 4, title: 'Uploads' },
]

interface QuoteData {
  service: string
  quantity: string
  size: string
  material: string
  environment: string
  designSupport: string
  installation: string
  deadline: string
  description: string
  name: string
  company: string
  email: string
  phone: string
  preferredContact: string
  fileTypes: string[]
  files: File[]
}

const initialData: QuoteData = {
  service: '',
  quantity: '',
  size: '',
  material: '',
  environment: '',
  designSupport: '',
  installation: '',
  deadline: '',
  description: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  preferredContact: 'Email',
  fileTypes: [],
  files: [],
}

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<QuoteData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const progress = useMemo(() => `${Math.round((step / steps.length) * 100)}%`, [step])

  const update = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const toggleFileType = (value: string) => {
    update(
      'fileTypes',
      form.fileTypes.includes(value)
        ? form.fileTypes.filter((item) => item !== value)
        : [...form.fileTypes, value]
    )
  }

  const validateStep = () => {
    const next: Record<string, string> = {}

    if (step === 1 && !form.service) next.service = 'Choose the closest service.'
    if (step === 2) {
      if (!form.description.trim()) next.description = 'Describe what needs to be produced.'
      if (!form.environment) next.environment = 'Choose indoor, outdoor or both.'
      if (!form.designSupport) next.designSupport = 'Tell us whether design support is needed.'
      if (!form.installation) next.installation = 'Tell us whether installation is needed.'
    }
    if (step === 3) {
      if (!form.name.trim()) next.name = 'Enter your name.'
      if (!form.email.trim()) next.email = 'Enter your email address.'
      else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email address.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const next = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, steps.length))
  }

  const back = () => setStep((current) => Math.max(current - 1, 1))

  const submit = async () => {
    if (!validateStep()) return
    setStatus('submitting')
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'quote',
          ...form,
          files: form.files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        }),
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite">
        <p style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>Quote request</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-.05em', lineHeight: .92, marginBottom: '1rem' }}>Your details have been received.</h2>
        <p style={{ fontSize: '.95rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--ink-muted)' }}>
          This currently uses a mock submission endpoint. Connect email, file storage or CRM handling before relying on it for live enquiries.
        </p>
        <Button type="button" variant="secondary" className="mt-7" onClick={() => { setForm(initialData); setStep(1); setStatus('idle') }}>
          Start another quote
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Step {step} of {steps.length} — {steps[step - 1].title}</p>
        </div>
        <div className="h-2 bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]" aria-hidden="true">
          <div className="h-full bg-[var(--accent)] transition-[width] duration-[var(--duration-base)] ease-[var(--ease-out)]" style={{ width: progress }} />
        </div>
        <ol className="mt-3 flex flex-wrap gap-x-5 gap-y-1" aria-label="Quote form progress">
          {steps.map((item) => (
            <li key={item.id} style={{
              fontSize: '.65rem',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: item.id <= step ? 'var(--ink)' : 'var(--stone)',
            }}>
              {item.title}
            </li>
          ))}
        </ol>
      </div>

      {status === 'error' && (
        <p className="form-error mb-6 bg-[color-mix(in_srgb,#9b2715_10%,transparent)] p-4" role="alert">
          The quote request could not be sent. Please try again or contact Agos directly.
        </p>
      )}

      {step === 1 && (
        <section aria-labelledby="quote-service">
          <p id="quote-service" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: .95, color: 'var(--ink)', marginBottom: '.75rem' }}>What are you making?</p>
          <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: '1.75rem' }}>Choose the closest fit. You can add more detail later.</p>
          {errors.service && <p className="form-error mb-4" role="alert">{errors.service}</p>}
          <div style={{ display: 'grid', gap: '1px', gridTemplateColumns: 'repeat(2, 1fr)', background: 'var(--line)' }} className="quote-service-grid">
            {serviceOptions.map((service, i) => {
              const active = form.service === service
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => update('service', service)}
                  style={{
                    padding: '1.4rem 1.25rem',
                    textAlign: 'left',
                    background: active ? 'var(--ink)' : 'var(--paper)',
                    color: active ? 'var(--paper)' : 'var(--ink)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.6rem',
                    transition: 'background 200ms, color 200ms',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                  }}
                  aria-pressed={active}
                >
                  <span style={{
                    fontSize: '.6rem',
                    fontWeight: 500,
                    letterSpacing: '.08em',
                    color: active ? 'rgba(255,255,255,.45)' : 'var(--stone)',
                    transition: 'color 200ms',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontSize: '.92rem',
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                    lineHeight: 1.2,
                    color: active ? '#fff' : 'var(--ink)',
                    transition: 'color 200ms',
                  }}>
                    {service}
                  </span>
                  {active && (
                    <span style={{
                      fontSize: '.6rem',
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,.6)',
                    }}>
                      Selected ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="quote-details">
          <p id="quote-details" style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Production details</p>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField label="Quantity" value={form.quantity} onChange={(value) => update('quantity', value)} autoComplete="off" />
            <TextField label="Approximate size" value={form.size} onChange={(value) => update('size', value)} autoComplete="off" />
            <TextField label="Material preference" value={form.material} onChange={(value) => update('material', value)} autoComplete="off" />
            <TextField label="Required completion date" type="date" value={form.deadline} onChange={(value) => update('deadline', value)} />
          </div>

          <ChoiceGroup
            label="Indoor or outdoor"
            value={form.environment}
            options={['Indoor', 'Outdoor', 'Both / not sure']}
            onChange={(value) => update('environment', value)}
            error={errors.environment}
          />
          <ChoiceGroup
            label="Design support needed"
            value={form.designSupport}
            options={['Yes', 'No, artwork ready', 'Not sure']}
            onChange={(value) => update('designSupport', value)}
            error={errors.designSupport}
          />
          <ChoiceGroup
            label="Installation needed"
            value={form.installation}
            options={['Yes', 'No', 'Not sure']}
            onChange={(value) => update('installation', value)}
            error={errors.installation}
          />

          <div className="form-field mt-6">
            <label htmlFor="quote-description" className="form-label">Description</label>
            <textarea
              id="quote-description"
              rows={6}
              className="form-input min-h-44 resize-y"
              value={form.description}
              onChange={(event) => update('description', event.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'quote-description-error' : undefined}
            />
            {errors.description && <p id="quote-description-error" className="form-error">{errors.description}</p>}
          </div>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="quote-contact">
          <p id="quote-contact" style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Contact details</p>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField label="Name" value={form.name} onChange={(value) => update('name', value)} error={errors.name} autoComplete="name" />
            <TextField label="Company" value={form.company} onChange={(value) => update('company', value)} autoComplete="organization" />
            <TextField label="Email" type="email" value={form.email} onChange={(value) => update('email', value)} error={errors.email} autoComplete="email" />
            <TextField label="Phone" type="tel" value={form.phone} onChange={(value) => update('phone', value)} autoComplete="tel" />
          </div>
          <ChoiceGroup
            label="Preferred contact method"
            value={form.preferredContact}
            options={contactMethods}
            onChange={(value) => update('preferredContact', value)}
          />
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="quote-uploads">
          <p id="quote-uploads" style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '.5rem' }}>Uploads and references</p>
          <p style={{ fontSize: '.9rem', fontWeight: 500, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>Attach anything useful. File upload metadata is captured in the mock request; connect storage before live use.</p>

          <div className="grid gap-2 sm:grid-cols-2">
            {fileTypes.map((type) => {
              const active = form.fileTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleFileType(type)}
                  style={{
                    minHeight: '3rem',
                    padding: '.7rem 1rem',
                    textAlign: 'left',
                    fontSize: '.88rem',
                    fontWeight: 700,
                    letterSpacing: '-.01em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 150ms, color 150ms',
                    background: active ? 'var(--ink)' : 'var(--paper-warm)',
                    color: active ? 'var(--paper)' : 'var(--ink)',
                  }}
                  aria-pressed={active}
                >
                  {type}
                </button>
              )
            })}
          </div>

          <div className="mt-7 border-2 border-dashed border-[var(--line)] bg-[var(--paper)] p-6">
            <label htmlFor="quote-files" className="block cursor-pointer">
              <span style={{ fontSize: '.95rem', fontWeight: 700 }}>Choose files</span>
              <span style={{ display: 'block', marginTop: '.35rem', fontSize: '.85rem', fontWeight: 500, color: 'var(--ink-muted)', lineHeight: 1.6 }}>Logo, artwork, reference image, measurements or existing design.</span>
            </label>
            <input
              id="quote-files"
              className="mt-5 block w-full text-sm font-bold"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.ai,.eps,.svg,.webp"
              onChange={(event) => update('files', Array.from(event.target.files ?? []))}
            />
            {form.files.length > 0 && (
              <ul className="mt-5 grid gap-2" aria-label="Selected files">
                {form.files.map((file) => (
                  <li key={`${file.name}-${file.size}`} className="font-bold text-[var(--ink-soft)]">{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <div className="mt-9 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
        <Button type="button" variant="tertiary" onClick={back} disabled={step === 1 || status === 'submitting'}>
          Back
        </Button>
        {step < steps.length ? (
          <Button type="button" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Submit Quote Request'}
          </Button>
        )}
      </div>
    </div>
  )
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  autoComplete?: string
}

function TextField({ label, value, onChange, type = 'text', error, autoComplete }: TextFieldProps) {
  const id = `quote-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        id={id}
        type={type}
        className="form-input"
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} className="form-error">{error}</p>}
    </div>
  )
}

interface ChoiceGroupProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  error?: string
}

function ChoiceGroup({ label, value, options, onChange, error }: ChoiceGroupProps) {
  return (
    <fieldset className="mt-5">
      <legend className="form-label">{label}</legend>
      {error && <p className="form-error mt-2">{error}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              style={{
                padding: '.55rem 1.1rem',
                fontSize: '.8rem',
                fontWeight: 700,
                letterSpacing: '-.01em',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 150ms, color 150ms',
                background: active ? 'var(--ink)' : 'var(--paper-warm)',
                color: active ? 'var(--paper)' : 'var(--ink)',
              }}
              aria-pressed={active}
            >
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
