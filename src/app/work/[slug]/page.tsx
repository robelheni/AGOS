import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/ui/CTASection'
import ProjectCard from '@/components/shared/ProjectCard'
import { ButtonLink } from '@/components/ui/Button'
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
      <section className="surface-paper pt-[calc(var(--header-height)+2rem)]">
        <div className="container">
          <Link href="/work" className="meta inline-block pb-7 hover:text-[var(--accent)]">
            Back to work
          </Link>
          <div className="grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div data-reveal>
              <p className="fine-label mb-5 text-[var(--accent)]">{project.clientLabel}</p>
              <h1 className="display-lg">{project.title}</h1>
              <p className="body-lg body-muted mt-7 max-w-3xl">{project.description}</p>
            </div>
            <dl className="grid gap-4 border-t border-[var(--line)] pt-5" data-reveal data-reveal-delay>
              <div>
                <dt className="meta">Industry</dt>
                <dd className="text-xl font-extrabold">{project.industry}</dd>
              </div>
              <div>
                <dt className="meta">Category</dt>
                <dd className="text-xl font-extrabold">{project.category}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="relative aspect-[16/8] min-h-[22rem]" data-reveal-img>
          <Image src={project.heroImage} alt={project.heroAlt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="section surface-paper production-rule">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div data-reveal>
              <h2 className="heading-lg">Overview</h2>
              <p className="body-lg body-muted mt-6 max-w-4xl">{project.fullDescription}</p>
              <ButtonLink href="/quote" className="mt-9">
                Start a Similar Project
              </ButtonLink>
            </div>
            <aside className="bg-[var(--paper-warm)] p-6" data-reveal data-reveal-delay>
              <h2 className="heading-md">Services provided</h2>
              <div className="mt-5 grid gap-3">
                {usedServices.map((service) => (
                  <Link key={service.id} href={`/services/${service.slug}`} className="border-t border-[var(--line)] pt-3 font-bold text-[var(--ink-soft)] hover:text-[var(--accent)]">
                    {service.title}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section surface-warm">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
            <div data-reveal>
              <h2 className="heading-md">Production details</h2>
              <p className="body-muted mt-5 leading-8">Editable placeholder information for the real project once confirmed.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3" data-reveal-grid>
              {project.productionDetails.map((detail) => (
                <div key={detail} className="border-t border-[var(--line)] pt-4">
                  <p className="text-xl font-extrabold">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-paper">
        <div className="container">
          <h2 className="heading-lg mb-10" data-reveal>Image sequence</h2>
          <div className="grid gap-5 md:grid-cols-2" data-reveal-grid>
            {project.images.map((image, index) => (
              <div key={`${image}-${index}`} className={index === 0 ? 'image-frame aspect-[16/10] md:col-span-2' : 'image-frame aspect-[4/3]'}>
                <Image src={image} alt={`${project.title} image ${index + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-tight surface-warm production-rule">
          <div className="container">
            <h2 className="heading-md mb-8" data-reveal>Related work</h2>
            <div className="grid gap-8 md:grid-cols-3" data-reveal-grid>
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
