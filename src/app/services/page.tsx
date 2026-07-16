import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceCard from '@/components/shared/ServiceCard'
import CTASection from '@/components/ui/CTASection'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Printing and Signage Services',
  description: 'Explore Agos Design services: banners, shop signs, clothing, vehicle graphics, window graphics, business print, stickers, displays and design.',
}

export default function ServicesPage() {
  const [first, second, ...rest] = services

  return (
    <>
      {/* Page header */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div data-reveal>
                <h1 className="display-lg">Services</h1>
                <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '40ch' }}>
                  Print, signs and graphics for visible businesses.
                </p>
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ flexShrink: 0, marginBottom: '.2rem' }} data-reveal data-reveal-delay>
                Start a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards — editorial grid */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div className="editorial-grid">
            {services.map((service, index) => {
              const pattern = index % 5
              let colClass = 'editorial-grid__item--half'
              let aspectRatio = '4/3'
              if (pattern === 0) { colClass = 'editorial-grid__item--wide';   aspectRatio = '16/9' }
              if (pattern === 1) { colClass = 'editorial-grid__item--narrow'; aspectRatio = '3/4' }
              if (pattern === 2) { colClass = 'editorial-grid__item--half';   aspectRatio = '4/3' }
              if (pattern === 3) { colClass = 'editorial-grid__item--half';   aspectRatio = '4/3' }
              if (pattern === 4) { colClass = 'editorial-grid__item--full';   aspectRatio = '21/9' }
              return (
                <div key={service.id} className={colClass} data-reveal-img style={{ transitionDelay: `${index * 90}ms` }}>
                  <ServiceCard service={service} aspectRatio={aspectRatio} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full-width service directory */}
      <section className="section surface-warm production-rule">
        <div className="container">

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', paddingBottom: '3rem', marginBottom: '0' }} data-reveal>
            <div>
              <h2 className="heading-lg">Not sure which service fits?</h2>
              <p className="body-lg body-muted mt-5" style={{ maxWidth: '44ch' }}>
                Many jobs cross categories. A shop launch might need signage, window vinyl, flyers and workwear. Send the outcome you need — not just a product name.
              </p>
            </div>
            <Link href="/quote" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Start a Quote
            </Link>
          </div>

          {/* Directory rows — full width, generous spacing */}
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4.5rem 1fr auto',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '2.2rem 0',
                  borderBottom: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-.05em',
                  lineHeight: 1,
                  color: 'var(--stone)',
                  transition: 'color 200ms',
                }} className="group-hover:text-[var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title + category */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.7rem, 3.5vw, 3.2rem)',
                    fontWeight: 900,
                    letterSpacing: '-.055em',
                    lineHeight: .95,
                    transition: 'color 200ms',
                  }} className="group-hover:text-[var(--accent)]">
                    {service.title}
                  </p>
                  <p style={{
                    fontSize: '.7rem',
                    fontWeight: 700,
                    letterSpacing: '.13em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginTop: '.5rem',
                  }}>
                    {service.category}
                  </p>
                </div>

                {/* Arrow */}
                <span style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  color: 'var(--stone)',
                  flexShrink: 0,
                  transition: 'transform 280ms cubic-bezier(.22,1,.36,1), color 200ms',
                }} className="group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                  →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <CTASection />
    </>
  )
}
