import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/data/images'
import { projects } from '@/data/projects'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

const pillars = [
  {
    title: 'Shop Signs',
    description: 'Fascia signs, illuminated lettering and storefront graphics.',
    href: '/services/shop-signs',
  },
  {
    title: 'Vehicle Graphics',
    description: 'Cut vinyl, full wraps and fleet branding applied on site.',
    href: '/services/vehicle-graphics',
  },
  {
    title: 'Printed Clothing',
    description: 'Screen printing, heat press and embroidery for garments.',
    href: '/services/workwear-printing',
  },
  {
    title: 'Business Print',
    description: 'Cards, banners, flyers and large-format print for any brief.',
    href: '/services/banner-printing',
  },
]

const process = [
  ['01', 'Brief', 'Size, quantity, deadline, artwork and where the finished piece needs to live.'],
  ['02', 'Prepare', 'Artwork checked, rebuilt or set up properly for the process.'],
  ['03', 'Produce', 'Printed, pressed, cut, finished or fabricated — right material, right method.'],
  ['04', 'Deliver', 'Collect, receive delivery, or arrange fitting on site.'],
]

const marqueeItems = [
  'Shop Signs', 'Window Vinyl', 'Vehicle Graphics',
  'Workwear', 'Business Print', 'Banners', 'Graphic Design', 'Installation',
]

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__bg">
          <Image
            src={images.hero.main}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="home-hero__overlay" />

        {/* Floating status badge — top right */}
        <div className="hero-badge" aria-hidden="true">
          <span className="hero-badge__label">Agos Design</span>
          <span className="hero-badge__pulse">
            <span className="hero-badge__dot" />
            Print &amp; Signs — UK
          </span>
        </div>


        {/* Content — bottom left */}
        <div className="home-hero__content">
          <h1 className="home-hero__headline">
            Built<br />to be<br />seen.
          </h1>

          <p className="home-hero__sub">
            Signs, print and branded clothing made for businesses that need to look considered in the real world.
          </p>

          <div className="home-hero__actions">
            <Link href="/quote" className="btn btn-primary-inv">
              Start a Quote
            </Link>
            <Link href="/work" className="btn btn-ghost-inv">
              See the Work
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="production-marquee" aria-label="Agos services">
        <div className="production-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <section className="home-section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div
            className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
            data-reveal
          >
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[.84] tracking-[-.055em] text-[var(--ink)]">
              One studio.<br />Every surface.
            </h2>
            <Link href="/services" className="link-arrow mb-1 shrink-0 text-[var(--ink-muted)]">
              All services
            </Link>
          </div>

          <div className="pillars-grid" data-reveal-grid>
            {pillars.map((pillar) => (
              <Link key={pillar.href} href={pillar.href} className="pillar group block">
                <p className="fine-label mb-5 text-[var(--accent)]">{pillar.title}</p>
                <h3 className="mb-2.5 text-[1.08rem] font-semibold leading-snug text-[var(--ink)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--accent)]">
                  {pillar.title}
                </h3>
                <p className="text-[.88rem] font-medium leading-[1.65] text-[var(--ink-muted)]">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION CARDS */}
      <div className="solutions-grid" data-reveal-grid>
        <Link href="/services/shop-signs" className="solution-card">
          <div className="solution-card__bg">
            <Image
              src={images.services.signs}
              alt={images.services.signsAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="solution-card__overlay" />
          <div className="solution-card__body">
            <p className="solution-card__category">Signage</p>
            <h2 className="solution-card__title">
              Signs &amp;<br />Graphics
            </h2>
            <p className="solution-card__desc">
              Shop fronts, vehicle vinyl, window graphics and installation. Everything a business needs to occupy space with confidence.
            </p>
            <span className="solution-card__link">Explore signage</span>
          </div>
        </Link>

        <Link href="/services/banner-printing" className="solution-card">
          <div className="solution-card__bg">
            <Image
              src={images.services.banners}
              alt={images.services.bannersAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="solution-card__overlay" />
          <div className="solution-card__body">
            <p className="solution-card__category">Print &amp; Production</p>
            <h2 className="solution-card__title">
              Print &amp;<br />Clothing
            </h2>
            <p className="solution-card__desc">
              Banners, business cards, screen-printed garments and workwear. Produced on time, to spec, without the guesswork.
            </p>
            <span className="solution-card__link">Explore print</span>
          </div>
        </Link>
      </div>

      {/* WORK GRID */}
      <section className="home-section" style={{ background: 'var(--paper-warm)' }}>
        <div className="container">
          <div
            className="mb-10 flex items-end justify-between gap-6 border-b border-[var(--line)] pb-8"
            data-reveal
          >
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[.88] tracking-[-.05em] text-[var(--ink)]">
              Our Work
            </h2>
            <Link href="/work" className="link-arrow mb-1 shrink-0 text-[var(--ink-muted)]">
              All projects
            </Link>
          </div>

          <div className="work-grid">
            {featuredProjects.map((project, index) => (
              <div key={project.id} data-reveal-img style={{ transitionDelay: `${index * 80}ms` }}>
                <Link href={`/work/${project.slug}`} className="group block" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    className="image-frame overflow-hidden"
                    style={{
                      aspectRatio: '4/5',
                      position: 'relative',
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
                    }}
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.heroAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                      style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
                    />
                    {/* Gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,10,9,.88) 0%, rgba(10,10,9,.2) 50%, transparent 72%)',
                      transition: 'opacity 600ms',
                      zIndex: 1,
                    }} className="group-hover:opacity-95" />
                    {/* Overlay text */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'clamp(1rem,2.5vw,1.5rem)',
                    }}>
                      <p style={{
                        fontSize: '.62rem',
                        fontWeight: 700,
                        letterSpacing: '.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,.6)',
                        marginBottom: '.5rem',
                        transition: 'color 300ms',
                      }} className="group-hover:text-[rgba(255,255,255,.9)]">
                        {project.category}
                      </p>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2vw, 1.9rem)',
                        fontWeight: 900,
                        letterSpacing: '-.055em',
                        lineHeight: .92,
                        color: '#fff',
                        transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
                      }} className="group-hover:-translate-y-1">
                        {project.title}
                      </h3>
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
                        View project →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH — dark */}
      <section className="approach-section">
        <div className="container approach-grid">
          <div data-reveal>
            <p className="approach-label">The Agos approach</p>
            <h2 className="approach-headline">
              Made<br />to last<br />in the<br />open.
            </h2>
          </div>

          <div data-reveal data-reveal-delay>
            <div className="approach-body">
              <p>
                Agos works with businesses that need printing and signage to carry real weight — on a shopfront, across a vehicle, on a piece of clothing someone will wear every day.
              </p>
              <p>
                The work is production-led. Artwork is prepared properly. Materials are chosen for the job. Nothing is rushed into a finish that will not hold up.
              </p>
              <p>
                One contact. Clear timelines. No unnecessary steps between brief and delivery.
              </p>
            </div>

            <div className="approach-divider" />

            <div className="approach-contact">
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>{CONTACT_PHONE}</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="home-section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="mb-12" data-reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-[.88] tracking-[-.05em] text-[var(--ink)]">
              How it works
            </h2>
          </div>
          <div className="process-grid" data-reveal-grid>
            {process.map(([num, title, desc]) => (
              <div key={num} className="process-step">
                <p className="process-num">{num}</p>
                <div>
                  <h3 className="mb-1.5 text-[1.05rem] font-bold text-[var(--ink)]">{title}</h3>
                  <p className="text-[.9rem] font-medium leading-[1.7] text-[var(--ink-muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA IMAGE */}
      <section className="cta-image-section">
        <div className="cta-image-section__bg">
          <Image
            src={images.services.vehicle}
            alt={images.services.vehicleAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="cta-image-section__overlay" />
        <div className="cta-image-section__content">
          <h2 className="cta-image-section__headline">
            Ready to make something visible?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary-inv">
              Start a Quote
            </Link>
            <Link href="/contact" className="btn btn-ghost-inv">
              Talk first
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
