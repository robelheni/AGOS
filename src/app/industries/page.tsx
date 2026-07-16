import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import { industries } from '@/data/industries'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Printing, signage, clothing and graphics for restaurants, barbers, salons, retail, construction, churches, events, offices, schools and start-ups.',
}

export default function IndustriesPage() {
  return (
    <>
      {/* Page header */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div data-reveal>
                <h1 className="display-lg">Industries</h1>
                <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '44ch' }}>
                  Different surfaces, materials and viewing distances — same goal: make the business easier to recognise.
                </p>
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ flexShrink: 0, marginBottom: '.2rem' }} data-reveal data-reveal-delay>
                Start a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div style={{ display: 'grid', gap: 'clamp(4rem, 7vw, 7rem)' }}>
            {industries.map((industry, index) => {
              const industryServices = services.filter((s) => industry.services.includes(s.slug))

              return (
                <article
                  key={industry.id}
                  data-flip={index % 2 === 1 ? 'true' : undefined}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 'clamp(2rem, 4vw, 4rem)',
                    alignItems: 'center',
                  }}
                  className="industry-row"
                >
                  {/* Image — overlay treatment */}
                  <div
                    data-reveal-img
                    style={{ transitionDelay: `${(index % 3) * 60}ms` }}
                    className="industry-row__image"
                  >
                    <div
                      className="image-frame group overflow-hidden"
                      style={{
                        aspectRatio: '4/3',
                        position: 'relative',
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                      }}
                    >
                      <Image
                        src={industry.image}
                        alt={`${industry.name} — Agos Design`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
                      />
                      {/* Gradient */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,10,9,.88) 0%, rgba(10,10,9,.15) 55%, transparent 75%)',
                        zIndex: 1,
                        transition: 'opacity 600ms',
                      }} className="group-hover:opacity-95" />
                      {/* Overlay text */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 'clamp(1rem,2.5vw,1.75rem)',
                      }}>
                        <p style={{
                          fontSize: '.62rem',
                          fontWeight: 700,
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,.55)',
                          marginBottom: '.5rem',
                        }}>
                          {String(index + 1).padStart(2, '0')} / Industry
                        </p>
                        <h2 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.6rem, 3vw, 3rem)',
                          fontWeight: 900,
                          letterSpacing: '-.055em',
                          lineHeight: .92,
                          color: '#fff',
                          transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
                        }} className="group-hover:-translate-y-1">
                          {industry.name}
                        </h2>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.5rem',
                          fontSize: '.65rem',
                          fontWeight: 700,
                          letterSpacing: '.13em',
                          textTransform: 'uppercase',
                          color: '#fff',
                          marginTop: '.9rem',
                          opacity: 0,
                          transform: 'translateY(6px)',
                          transition: 'opacity 400ms 80ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 80ms',
                        }} className="group-hover:opacity-100 group-hover:translate-y-0">
                          See services →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text panel */}
                  <div
                    data-reveal
                    className="industry-row__body"
                  >
                    <p style={{
                      fontSize: '.62rem',
                      fontWeight: 700,
                      letterSpacing: '.15em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '1.25rem',
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 3.5vw, 3.4rem)',
                      fontWeight: 900,
                      letterSpacing: '-.055em',
                      lineHeight: .9,
                      marginBottom: '1.5rem',
                    }}>
                      {industry.name}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(.95rem, 1.3vw, 1.05rem)',
                      fontWeight: 500,
                      lineHeight: 1.75,
                      color: 'var(--ink-muted)',
                      maxWidth: '42ch',
                      marginBottom: '2rem',
                    }}>
                      {industry.description}
                    </p>

                    {/* Service pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                      {industryServices.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          style={{
                            display: 'inline-block',
                            padding: '.55rem 1.1rem',
                            fontSize: '.68rem',
                            fontWeight: 700,
                            letterSpacing: '.1em',
                            textTransform: 'uppercase',
                            background: 'var(--paper-warm)',
                            color: 'var(--ink)',
                            textDecoration: 'none',
                            transition: 'background 180ms, color 180ms',
                          }}
                          className="hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
