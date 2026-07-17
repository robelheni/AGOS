import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import PageMotion from '@/components/motion/PageMotion'
import SplashScreen from '@/components/motion/SplashScreen'

export const metadata: Metadata = {
  title: {
    default: 'Agos Design – Print & Signs | Professional Printing & Signage',
    template: '%s | Agos Design – Print & Signs',
  },
  description: 'Professional printing, signage and branding services. Shop signs, banners, vehicle graphics, workwear printing and more. Call 07534 791817.',
  metadataBase: new URL('https://agosdesign.co.uk'),
  openGraph: {
    siteName: 'Agos Design – Print & Signs',
    type: 'website',
    title: 'Agos Design – Print & Signs',
    description: 'Premium print, signage, vehicle graphics, clothing and business branding production.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="site-shell">
          <SplashScreen />
          <PageMotion />
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
