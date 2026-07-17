import Image from 'next/image'
import Link from 'next/link'
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_FULL_NAME } from '@/lib/constants'

const services = [
  { label: 'Shop Signs', href: '/services/shop-signs' },
  { label: 'Vehicle Graphics', href: '/services/vehicle-graphics' },
  { label: 'Window Graphics', href: '/services/window-graphics' },
  { label: 'Workwear Printing', href: '/services/workwear-printing' },
  { label: 'Banner Printing', href: '/services/banner-printing' },
  { label: 'Business Cards', href: '/services/business-cards' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
]

const company = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top */}
        <div className="border-b border-[var(--line-dark)] py-14 lg:py-20">
          <Link
            href="/"
            aria-label="Agos Design home"
            className="block w-fit opacity-[.18] transition-opacity hover:opacity-[.26]"
          >
            <Image
              src="/images/agos/Logo2.jpg"
              alt="Agos Design"
              width={1536}
              height={1024}
              className="h-auto w-[min(72vw,44rem)]"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.9fr)_minmax(0,.9fr)] lg:gap-20 lg:py-20">
          {/* Left: contact + tagline */}
          <div>
            <p className="mb-8 max-w-[22rem] text-[.95rem] font-medium leading-[1.72] text-[rgba(255,255,255,.4)]">
              Printing, signage, clothing, banners, vehicle graphics and branded materials — made to be seen.
            </p>
            <div className="grid gap-2.5">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                className="text-[.95rem] font-semibold text-[rgba(255,255,255,.65)] transition-colors hover:text-white"
              >
                {CONTACT_PHONE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[.95rem] font-semibold text-[rgba(255,255,255,.65)] transition-colors hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <p className="fine-label mb-6 text-[rgba(255,255,255,.25)]">Services</p>
            <ul className="grid gap-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[.88rem] font-medium text-[rgba(255,255,255,.45)] transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <p className="fine-label mb-6 text-[rgba(255,255,255,.25)]">Company</p>
            <ul className="grid gap-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[.88rem] font-medium text-[rgba(255,255,255,.45)] transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2 border-t border-[var(--line-dark)] py-7 text-[.72rem] font-semibold text-[rgba(255,255,255,.22)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY_FULL_NAME}</p>
          <p>Print / Signs / Clothing / Graphics</p>
        </div>
      </div>
    </footer>
  )
}
