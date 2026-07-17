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
    <footer id="site-footer" className="site-footer">
      <div className="container">
        <div className="footer-brand">
          <Link href="/" aria-label="Agos Design home" className="footer-logo-link">
            <Image src="/images/agos/Logo2.jpg" alt="Agos Design" width={1536} height={1024} className="footer-logo" />
          </Link>

          <p className="footer-summary">
            Signs, print and branded surfaces for businesses that need to look considered in the real world.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-contact">
            <p className="footer-contact__copy">
              Printing, signage, clothing, banners, vehicle graphics and branded materials — made to be seen.
            </p>
            <div className="footer-contact__links">
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>
                {CONTACT_PHONE}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Services navigation">
            <p>Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="Company navigation">
            <p>Company</p>
            <ul>
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {COMPANY_FULL_NAME}</p>
          <p>Print / Signs / Clothing / Graphics</p>
        </div>
      </div>
    </footer>
  )
}
