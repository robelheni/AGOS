'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { label: string; href: string }[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname()
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeRef.current?.focus(), 80)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 140,
          background: 'rgba(10,10,9,.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 400ms cubic-bezier(.16,1,.3,1)',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 150,
          width: 'min(360px, 88vw)',
          background: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 480ms cubic-bezier(.16,1,.3,1)',
          willChange: 'transform',
          boxShadow: '-24px 0 80px rgba(10,10,9,.18)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          height: 'var(--header-height)',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}>
          <Link
            href="/"
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
              fontWeight: 900,
              letterSpacing: '-.07em',
              lineHeight: 1,
              textDecoration: 'none',
              color: 'var(--ink)',
            }}
          >
            AGOS
          </Link>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: '2.4rem',
              height: '2.4rem',
              display: 'grid',
              placeItems: 'center',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--ink)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <span style={{ position: 'absolute', width: '18px', height: '1.5px', background: 'currentColor', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '18px', height: '1.5px', background: 'currentColor', transform: 'rotate(-45deg)' }} />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Primary navigation" style={{ flex: 1, padding: '1rem 0' }}>
          {links.map((link, i) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.75rem',
                  fontSize: '1.08rem',
                  fontWeight: 600,
                  letterSpacing: '-.01em',
                  lineHeight: 1.2,
                  textDecoration: 'none',
                  color: active ? 'var(--accent)' : 'var(--ink)',
                  borderBottom: '1px solid var(--line)',
                  transition: 'color 160ms, background 160ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(12px)',
                  transitionDelay: isOpen ? `${80 + i * 40}ms` : '0ms',
                  transitionProperty: 'color, background, opacity, transform',
                  transitionDuration: isOpen ? `160ms, 160ms, 380ms, 380ms` : '0ms',
                  transitionTimingFunction: 'ease, ease, cubic-bezier(.16,1,.3,1), cubic-bezier(.16,1,.3,1)',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--paper-warm)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '.9rem', color: active ? 'var(--accent)' : 'var(--stone)', transition: 'transform 160ms' }}>→</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 1.75rem 2rem',
          borderTop: '1px solid var(--line)',
          display: 'grid',
          gap: '1.25rem',
          flexShrink: 0,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 400ms 260ms',
        }}>
          <Link
            href="/quote"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '.85rem 1.5rem',
              background: 'var(--ink)',
              color: '#fff',
              fontSize: '.68rem',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 160ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--charcoal-2)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--ink)')}
          >
            Get a Quote
          </Link>
          <div style={{ display: 'grid', gap: '.4rem' }}>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--ink-muted)', textDecoration: 'none' }}>{CONTACT_PHONE}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--ink-muted)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </div>
    </>
  )
}
