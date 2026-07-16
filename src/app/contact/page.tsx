import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/contact/ContactForm'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Agos Design',
  description: 'Contact Agos Design – Print & Signs for printing, signage, clothing, vehicle graphics, window graphics and design enquiries.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div data-reveal>
              <h1 className="display-lg">Contact</h1>
              <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '44ch' }}>
                Tell us what needs to be made visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column contact layout */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }} className="contact-grid">

            {/* Left: contact info */}
            <aside data-reveal>

              {/* Phone */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--line)', marginBottom: '2rem' }}>
                <p style={{
                  fontSize: '.62rem',
                  fontWeight: 700,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '.75rem',
                }}>
                  Call
                </p>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                  style={{
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                  }}
                  className="hover:text-[var(--accent)]"
                >
                  {CONTACT_PHONE}
                </a>
              </div>

              {/* Email */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--line)', marginBottom: '2rem' }}>
                <p style={{
                  fontSize: '.62rem',
                  fontWeight: 700,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '.75rem',
                }}>
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    fontWeight: 700,
                    letterSpacing: '-.01em',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                    transition: 'color 200ms',
                  }}
                  className="hover:text-[var(--accent)]"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Prefer a quote */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--line)', marginBottom: '2rem' }}>
                <p style={{
                  fontSize: '.62rem',
                  fontWeight: 700,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '.75rem',
                }}>
                  Prefer a structured quote?
                </p>
                <p style={{ fontSize: '.95rem', fontWeight: 500, lineHeight: 1.7, color: 'var(--ink-muted)', marginBottom: '1.25rem', maxWidth: '32ch' }}>
                  The quote route asks for production details: size, material, design support, installation needs and file uploads.
                </p>
                <Link href="/quote" className="btn btn-secondary" style={{ display: 'inline-block' }}>
                  Open Quote Form
                </Link>
              </div>

              {/* Address */}
              <div>
                <p style={{
                  fontSize: '.62rem',
                  fontWeight: 700,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '.75rem',
                }}>
                  Address
                </p>
                <p style={{ fontSize: '.9rem', fontWeight: 500, lineHeight: 1.7, color: 'var(--stone)' }}>
                  Address placeholder — add confirmed workshop or collection address when available.
                </p>
              </div>

            </aside>

            {/* Right: form */}
            <div data-reveal data-reveal-delay>
              <p style={{
                fontSize: '.62rem',
                fontWeight: 700,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: '2rem',
              }}>
                Send a message
              </p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
