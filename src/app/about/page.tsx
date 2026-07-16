import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import { images } from '@/data/images'

export const metadata: Metadata = {
  title: 'About Agos Design',
  description: 'About Agos Design – Print & Signs: design, print, production, finishing, installation and customer support for visible business materials.',
}

const areas = [
  {
    num: '01',
    title: 'Design',
    copy: 'Artwork needs to work at final size, from real viewing distances and on real materials. Files are checked and rebuilt to spec before anything moves to print.',
  },
  {
    num: '02',
    title: 'Printing',
    copy: 'Printed pieces are prepared for the right format, finish and use case. Material choice shapes the outcome as much as the design itself.',
  },
  {
    num: '03',
    title: 'Production',
    copy: 'Files, materials and surfaces are verified before the job moves into production. Nothing goes forward on assumptions.',
  },
  {
    num: '04',
    title: 'Finishing',
    copy: 'Cutting, trimming, laminating, eyelets, vinyl preparation and garment finishing shape what the customer actually holds or installs.',
  },
  {
    num: '05',
    title: 'Installation',
    copy: 'Fitted signs and applied graphics need site photos, measurements and surface details beforehand. The fitting is only as good as the preparation.',
  },
  {
    num: '06',
    title: 'Support',
    copy: 'One point of contact. Clear timelines. No unnecessary steps between brief and delivery — or between question and answer.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="surface-paper" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div data-reveal>
                <h1 className="display-lg">About</h1>
                <p style={{ marginTop: '1rem', fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: 'var(--ink-muted)', maxWidth: '44ch' }}>
                  Designed properly. Produced properly.
                </p>
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ flexShrink: 0, marginBottom: '.2rem' }} data-reveal data-reveal-delay>
                Start a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Studio intro — image + statement */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }} className="about-intro-grid">

            {/* Image with corner cut */}
            <div data-reveal-img className="about-intro-grid__image">
              <div
                className="image-frame group overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  position: 'relative',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                }}
              >
                <Image
                  src={images.about.workshop}
                  alt="Workshop review of printed clothing"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
                />
              </div>
            </div>

            {/* Statement text */}
            <div data-reveal data-reveal-delay className="about-intro-grid__body">
              <p style={{
                fontSize: '.62rem',
                fontWeight: 700,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.5rem',
              }}>
                The Studio
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 900,
                letterSpacing: '-.055em',
                lineHeight: .9,
                marginBottom: '2rem',
              }}>
                A studio for things people can hold, wear, install and notice.
              </h2>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <p style={{ fontSize: 'clamp(.95rem, 1.3vw, 1.05rem)', fontWeight: 500, lineHeight: 1.75, color: 'var(--ink-muted)' }}>
                  Agos Design – Print &amp; Signs is built around visible business materials: signs, print, clothing, vehicle graphics, window vinyl and practical design for production.
                </p>
                <p style={{ fontSize: 'clamp(.95rem, 1.3vw, 1.05rem)', fontWeight: 500, lineHeight: 1.75, color: 'var(--ink-muted)' }}>
                  The work is production-led. Artwork is prepared properly for the process it goes through. Materials are chosen for the job and the environment it will live in. Nothing is rushed into a finish that will not hold up.
                </p>
                <p style={{ fontSize: 'clamp(.95rem, 1.3vw, 1.05rem)', fontWeight: 500, lineHeight: 1.75, color: 'var(--ink-muted)' }}>
                  One contact. Clear timelines. No unnecessary steps between brief and delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas — editorial numbered rows */}
      <section className="section surface-warm production-rule">
        <div className="container">
          <div data-reveal style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-.055em',
              lineHeight: .9,
            }}>
              The work crosses design,<br />production and site reality.
            </h2>
          </div>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {areas.map((area, i) => (
              <div
                key={area.num}
                data-reveal
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3.5rem 1fr',
                  gap: '2rem',
                  padding: '2rem 0',
                  borderBottom: '1px solid var(--line)',
                  transitionDelay: `${i * 40}ms`,
                }}
                className="about-area-row"
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2vw, 2rem)',
                  fontWeight: 900,
                  letterSpacing: '-.05em',
                  lineHeight: 1,
                  color: 'var(--stone)',
                  paddingTop: '.15rem',
                }}>
                  {area.num}
                </span>
                <div style={{
                  display: 'grid',
                  gap: '.6rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)',
                    fontWeight: 900,
                    letterSpacing: '-.05em',
                    lineHeight: .95,
                  }}>
                    {area.title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(.9rem, 1.2vw, 1rem)',
                    fontWeight: 500,
                    lineHeight: 1.75,
                    color: 'var(--ink-muted)',
                    maxWidth: '60ch',
                  }}>
                    {area.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo pair */}
      <section className="section surface-paper production-rule">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }} className="about-photo-grid">

            <div data-reveal-img>
              <div
                className="image-frame group overflow-hidden"
                style={{
                  aspectRatio: '16/10',
                  position: 'relative',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                }}
              >
                <Image
                  src={images.about.equipment}
                  alt="Screen printing press in production"
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                  style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
                />
              </div>
            </div>

            <div data-reveal-img style={{ transitionDelay: '80ms' }}>
              <div
                className="image-frame group overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  position: 'relative',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                }}
              >
                <Image
                  src={images.about.team}
                  alt="Garment being lifted from heat press"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                  style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
                />
              </div>
            </div>

          </div>
          <p style={{
            marginTop: '1.5rem',
            fontSize: '.72rem',
            fontWeight: 700,
            letterSpacing: '.08em',
            color: 'var(--stone)',
          }}>
            Photography placeholders — replace with confirmed Agos workshop images when available.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  )
}
