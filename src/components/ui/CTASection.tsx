import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'
import { ButtonLink } from './Button'

interface CTASectionProps {
  title?: string
  copy?: string
  dark?: boolean
}

export default function CTASection({
  title = 'Have something to make? Let’s make it visible.',
  copy = 'Send the service, size, quantity, deadline and any reference files. Agos will use that to shape the next step.',
  dark = false,
}: CTASectionProps) {
  return (
    <section className={dark ? 'dark section-tight' : 'surface-warm section-tight production-rule'}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <h2 className="heading-lg max-w-4xl">{title}</h2>
            <p className="body-lg body-muted mt-6 max-w-2xl">{copy}</p>
          </div>
          <div className="space-y-5">
            <ButtonLink href="/quote" dark={dark} className="w-full">
              Start a Quote
            </ButtonLink>
            <div className="grid gap-2 text-lg font-extrabold">
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="hover:text-[var(--accent)]">
                {CONTACT_PHONE}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--accent)]">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
