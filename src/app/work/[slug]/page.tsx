import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import ProjectCard from '@/components/shared/ProjectCard'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  const usedServices = services.filter((service) => project.servicesUsed.includes(service.slug))
  const related = projects.filter((item) => item.id !== project.id && item.category === project.category).slice(0, 3)

  return (
    <>
      <section className="work-detail-hero">
        <div className="container">
          <Link href="/work" className="work-detail-back">
            Back to work
          </Link>

          <div className="work-detail-hero__grid">
            <div className="work-detail-hero__copy">
              <p>{project.clientLabel}</p>
              <h1>{project.title}</h1>
              <span>{project.description}</span>
              <Link href="/quote">Start a similar project</Link>
            </div>

            <dl className="work-detail-meta">
              <div>
                <dt>Industry</dt>
                <dd>{project.industry}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd>{usedServices.map((service) => service.title).join(' / ')}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="work-detail-hero__image">
          <Image src={project.heroImage} alt={project.heroAlt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="work-detail-section">
        <div className="container">
          <div className="work-detail-overview">
            <div>
              <p>Overview</p>
              <h2>What was made.</h2>
            </div>
            <div>
              <p>{project.fullDescription}</p>
              <div className="work-detail-service-links">
                {usedServices.map((service) => (
                  <Link key={service.id} href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-detail-gallery">
        <div className="container">
          <div className="work-detail-heading">
            <p>Images</p>
            <h2>Project views.</h2>
          </div>
          <div className="work-detail-image-grid">
            {project.images.map((image, index) => (
              <div key={`${image}-${index}`} className={index === 0 ? 'work-detail-image work-detail-image--wide' : 'work-detail-image'}>
                <Image src={image} alt={`${project.title} image ${index + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="work-detail-related">
          <div className="container">
            <div className="work-detail-heading">
              <p>Related work</p>
              <h2>Similar projects.</h2>
            </div>
            <div className="work-detail-related-grid">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
