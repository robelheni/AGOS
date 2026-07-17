import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import FAQAccordion from '@/components/shared/FAQAccordion'
import ServiceCard from '@/components/shared/ServiceCard'
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
      <section className="service-detail-hero">
        <div className="container">
          <Link href="/services" className="service-detail-back">
            Back to services
          </Link>

          <div className="service-detail-hero__grid">
            <div className="service-detail-hero__copy">
              <p className="service-detail-kicker">{service.category}</p>
              <h1>{service.title}</h1>
              <p>{service.fullDescription}</p>
              <div className="service-detail-actions">
                <Link href="/quote">Start a quote</Link>
                <Link href="/services">View all services</Link>
              </div>
            </div>

            <div className="service-detail-hero__media">
              <Image
                src={service.heroImage}
                alt={service.heroAlt}
                fill
                priority
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <aside className="service-detail-spec">
            <p>Built around</p>
            <ul>
              {service.applications.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="container">
          <div className="service-detail-heading">
            <p>Options</p>
          </div>

          <div className="service-detail-option-list">
            {service.options.map((option, index) => (
              <article key={option.name} className="service-detail-option">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="service-detail-section">
          <div className="container">
            <div className="service-detail-heading">
              <p>Relevant work</p>
              <h2>Similar work in context.</h2>
            </div>

            <div className="service-detail-work-grid">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="service-detail-work-card group">
                  <div>
                    <Image src={project.heroImage} alt={project.heroAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faq.length > 0 && (
        <section className="service-detail-band">
          <div className="container">
            <div className="service-detail-faq-grid">
              <div className="service-detail-heading">
                <p>Questions</p>
                <h2>About {service.title.toLowerCase()}.</h2>
              </div>
              <div>
                <FAQAccordion faqs={service.faq} />
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="service-detail-section">
          <div className="container">
            <div className="service-detail-heading">
              <p>Next services</p>
              <h2>Often paired with this.</h2>
            </div>
            <div className="service-detail-related-grid">
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
