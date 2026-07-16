'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isDark = isHome && !scrolled && !menuOpen

  return (
    <>
      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          zIndex: 120,
          minHeight: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 450ms cubic-bezier(.16,1,.3,1), box-shadow 450ms cubic-bezier(.16,1,.3,1), backdrop-filter 450ms',
          background: isDark ? 'transparent' : 'rgba(250,250,248,0.96)',
          boxShadow: isDark ? 'none' : '0 1px 0 rgba(20,20,18,0.07)',
          backdropFilter: isDark ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isDark ? 'none' : 'blur(20px)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', width: '100%', paddingInline: 'clamp(1.75rem, 4vw, 3.75rem)' }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Agos Design home"
            style={{
              flexShrink: 0,
              textDecoration: 'none',
              lineHeight: 0,
            }}
          >
            <Image
              src={isDark ? '/images/agos/Logo2.jpg' : '/images/agos/Logo.png'}
              alt="Agos Design"
              width={120}
              height={48}
              priority
              className={isDark ? 'nav-logo--dark' : 'nav-logo--light'}
              style={{
                height: isDark ? 'clamp(90px, 22vw, 150px)' : 'clamp(72px, 14vw, 100px)',
                width: 'auto',
                display: 'block',
                mixBlendMode: isDark ? 'normal' : 'multiply',
                transition: 'height 450ms cubic-bezier(.16,1,.3,1)',
              }}
            />
          </Link>

          {/* Right side */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quote CTA */}
            <Link
              href="/quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '.6rem 1.2rem',
                fontSize: '.65rem',
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 220ms, color 220ms, box-shadow 220ms',
                ...(isDark
                  ? {
                      color: 'rgba(255,255,255,.8)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.28)',
                    }
                  : {
                      background: 'var(--ink)',
                      color: '#fff',
                    }),
              }}
            >
              Get a Quote
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '2.8rem',
                height: '2.8rem',
                padding: 0,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isDark ? '#fff' : 'var(--ink)',
                transition: 'color 450ms cubic-bezier(.16,1,.3,1)',
                flexShrink: 0,
              }}
            >
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'currentColor' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'currentColor' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'currentColor' }} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  )
}
