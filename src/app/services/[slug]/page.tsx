import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import FAQAccordion from '@/components/shared/FAQAccordion'
import ServiceCard from '@/components/shared/ServiceCard'
import { ButtonLink } from '@/components/ui/Button'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()

  const related = services.filter((item) => service.relatedServices.includes(item.slug))
  const relatedProjects = projects.filter((project) => project.servicesUsed.includes(service.slug)).slice(0, 2)

  return (
    <>
      <section className="surface-paper pt-[calc(var(--header-height)+3rem)]">
        <div className="container">
          <Link href="/services" className="meta inline-block pb-8 hover:text-[var(--accent)]">
            Back to services
          </Link>
          <div className="grid gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,.72fr)] lg:items-end">
            <div data-reveal>
              <p className="fine-label mb-5 text-[var(--accent)]">{service.category}</p>
              <h1 className="display-lg">{service.title}</h1>
              <p className="body-lg body-muted mt-7 max-w-3xl">{service.fullDescription}</p>
              <ButtonLink href="/quote" className="mt-9">
                Start a Quote
              </ButtonLink>
            </div>
            <div className="image-frame aspect-[4/5] rounded-none" data-reveal-img>
              <Image
                src={service.heroImage}
                alt={service.heroAlt}
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-paper production-rule">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div data-reveal>
              <h2 className="heading-lg">Options and production choices</h2>
              <div className="mt-9 grid gap-5 md:grid-cols-2" data-reveal-grid>
                {service.options.map((option) => (
                  <article key={option.name} className="border-t border-[var(--line)] pt-5">
                    <h3 className="heading-md">{option.name}</h3>
                    <p className="body-muted mt-3 leading-7">{option.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="bg-[var(--paper-warm)] p-6 md:p-7" data-reveal data-reveal-delay>
              <h2 className="heading-md">Applications</h2>
              <ul className="mt-5 grid gap-3">
                {service.applications.map((item) => (
                  <li key={item} className="border-t border-[var(--line)] pt-3 font-bold text-[var(--ink-soft)]">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section surface-warm">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[24rem_1fr]">
            <div data-reveal>
              <h2 className="heading-md">Materials and finish information</h2>
              <p className="body-muted mt-5 leading-8">{service.placeholderNote}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-grid>
              {service.materials.map((material) => (
                <div key={material} className="min-h-28 border-t border-[var(--line)] pt-4">
                  <p className="text-xl font-extrabold">{material}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-warm production-rule">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1fr)] lg:items-start">
            <div data-reveal>
              <h2 className="heading-lg">How this work usually moves through production.</h2>
              <p className="body-lg body-muted mt-6">
                The exact route depends on artwork, material, surface and site details. These steps keep the job grounded before anything is produced.
              </p>
            </div>
            <ol className="divide-y divide-[var(--line)]" data-reveal-grid>
              {service.process.map((step, index) => (
                <li key={step} className="grid gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-5xl font-black leading-none text-[var(--accent)]">{index + 1}</span>
                  <p className="text-xl font-extrabold">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section surface-paper">
          <div className="container">
            <h2 className="heading-lg mb-10" data-reveal>Relevant work</h2>
            <div className="grid gap-8 md:grid-cols-2" data-reveal-grid>
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group">
                  <div className="image-frame aspect-[16/10] rounded-none">
                    <Image src={project.heroImage} alt={project.heroAlt} fill sizes="50vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.035]" />
                  </div>
                  <p className="meta mt-5">{project.category}</p>
                  <h3 className="heading-md mt-2">{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faq.length > 0 && (
        <section className="section surface-paper production-rule">
          <div className="container grid gap-10 lg:grid-cols-[24rem_1fr]">
            <h2 className="heading-md" data-reveal>Questions about {service.title.toLowerCase()}</h2>
            <div data-reveal data-reveal-delay>
              <FAQAccordion faqs={service.faq} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-tight surface-warm">
          <div className="container">
            <h2 className="heading-md mb-8" data-reveal>Related services</h2>
            <div className="grid gap-6 md:grid-cols-3" data-reveal-grid>
              {related.map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
