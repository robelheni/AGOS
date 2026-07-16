import Image from 'next/image'
import Link from 'next/link'
import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  aspectRatio?: string
}

export default function ServiceCard({ service, aspectRatio = '4/3' }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block"
      style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
    >
      {/* Image with overlay */}
      <div
        className="image-frame overflow-hidden"
        style={{
          aspectRatio,
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
        }}
      >
        {/* Photo */}
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ transition: 'transform 1200ms cubic-bezier(0.16,1,0.3,1)' }}
        />

        {/* Bottom gradient for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,9,.88) 0%, rgba(10,10,9,.2) 50%, transparent 72%)',
          transition: 'opacity 600ms',
          zIndex: 2,
        }} className="group-hover:opacity-95" />

        {/* Text overlaid on image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
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
            color: 'rgba(255,255,255,.6)',
            marginBottom: '.5rem',
            transition: 'color 300ms',
          }} className="group-hover:text-[rgba(255,255,255,.9)]">
            {service.category}
          </p>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-.055em',
            lineHeight: .92,
            color: '#fff',
            transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
          }} className="group-hover:-translate-y-1">
            {service.title}
          </h3>

          {/* Arrow — slides up on hover */}
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
            Explore →
          </span>
        </div>
      </div>
    </Link>
  )
}
