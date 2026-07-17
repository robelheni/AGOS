'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageMotion() {
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    root.classList.add('motion-ready')

    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const rafId = requestAnimationFrame(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-reveal], [data-reveal-delay], [data-reveal-delay-2], [data-reveal-grid], [data-reveal-img]'
        )
      )

      if (reduceMotion || !('IntersectionObserver' in window)) {
        targets.forEach((t) => t.classList.add('is-visible'))
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      )

      observerRef.current = observer
      targets.forEach((t) => observer.observe(t))
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [pathname])

  return null
}
