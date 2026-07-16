import { cn } from '@/lib/utils'
import { ButtonLink } from './Button'

interface PageIntroProps {
  label?: string
  title: string
  copy?: string
  dark?: boolean
  image?: React.ReactNode
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  className?: string
}

export default function PageIntro({
  label,
  title,
  copy,
  dark = false,
  image,
  primaryAction,
  secondaryAction,
  className,
}: PageIntroProps) {
  return (
    <section className={cn('page-intro', dark ? 'dark' : 'surface-paper', className)}>
      <div className="container">
        <div className={cn('grid gap-12 border-t border-[var(--line)] pt-10 md:gap-16 md:pt-14', image ? 'lg:grid-cols-[minmax(0,1fr)_minmax(22rem,.62fr)] lg:items-end' : '')}>
          <div className="max-w-6xl" data-reveal>
            {label && <p className="mb-7 text-xs font-black tracking-[.18em] text-[var(--accent)]">{label}</p>}
            <h1 className="font-display text-[clamp(3.2rem,9vw,9rem)] font-semibold leading-[.86] tracking-[-.075em] text-[var(--ink)]">{title}</h1>
            {copy && <p className="body-lg body-muted mt-8 max-w-[46rem]">{copy}</p>}
            {(primaryAction || secondaryAction) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {primaryAction && (
                  <ButtonLink href={primaryAction.href} dark={dark}>
                    {primaryAction.label}
                  </ButtonLink>
                )}
                {secondaryAction && (
                  <ButtonLink href={secondaryAction.href} variant="tertiary" dark={dark}>
                    {secondaryAction.label}
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
          {image}
        </div>
      </div>
    </section>
  )
}
