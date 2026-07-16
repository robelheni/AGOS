import type { Metadata } from 'next'
import Link from 'next/link'
import QuoteForm from '@/components/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Start a Quote',
  description: 'Request a quote for signs, printing, clothing, vehicle graphics, window graphics, business print, design and installation work from Agos Design.',
}

const helps = [
  'Service type',
  'Approximate size',
  'Quantity',
  'Deadline',
  'Design needs',
  'Installation needs',
  'Reference files',
]

export default function QuotePage() {
  return (
    <>
      {/* Page header */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div data-reveal>
              <h1 className="display-lg">Start a Quote</h1>
              <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '50ch' }}>
                Give the job enough detail to quote it properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }} className="quote-grid">

            {/* Sticky sidebar */}
            <aside data-reveal style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }} className="quote-sidebar">
              <p style={{
                fontSize: '.62rem',
                fontWeight: 700,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: '1.5rem',
              }}>
                What helps most
              </p>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {helps.map((item) => (
                  <p key={item} style={{
                    padding: '.9rem 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: '.95rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    letterSpacing: '-.01em',
                  }}>
                    {item}
                  </p>
                ))}
              </div>
              <p style={{ marginTop: '2rem', fontSize: '.82rem', fontWeight: 500, lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                Not sure? Send what you have. Service type and rough size are enough to start.
              </p>
              <Link href="/contact" style={{
                display: 'inline-block',
                marginTop: '1.25rem',
                fontSize: '.68rem',
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                transition: 'color 200ms',
              }} className="hover:text-[var(--ink)]">
                Or just send a message →
              </Link>
            </aside>

            {/* Form */}
            <div data-reveal data-reveal-delay>
              <QuoteForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
