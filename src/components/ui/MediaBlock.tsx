import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MediaBlockProps {
  src: string
  alt: string
  ratio?: string
  priority?: boolean
  className?: string
  imageClassName?: string
  caption?: string
}

export default function MediaBlock({
  src,
  alt,
  ratio = 'aspect-[4/3]',
  priority = false,
  className,
  imageClassName,
  caption,
}: MediaBlockProps) {
  return (
    <figure className={cn('space-y-4', className)}>
      <div className={cn('image-frame', ratio)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
          className={cn('object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] hover:scale-[1.025]', imageClassName)}
        />
      </div>
      {caption && <figcaption className="max-w-md text-xs font-bold leading-5 tracking-[.04em] text-[var(--ink-muted)]">{caption}</figcaption>}
    </figure>
  )
}
