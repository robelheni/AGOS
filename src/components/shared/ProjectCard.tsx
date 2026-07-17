import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
  large?: boolean
  aspectRatio?: string
}

export default function ProjectCard({ project, className, large = false, aspectRatio }: ProjectCardProps) {
  const ratio = aspectRatio ?? (large ? '16/10' : '4/3')
  return (
    <Link href={`/work/${project.slug}`} className={cn('project-card group', className)}>
      <div className="project-card__image" style={{ aspectRatio: ratio }}>
        <Image
          src={project.heroImage}
          alt={project.heroAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <div className="project-card__overlay" />
        <div className="project-card__body">
          <p>{project.category}</p>
          <h3>{project.title}</h3>
          <span>View project →</span>
        </div>
      </div>
    </Link>
  )
}
