import type { Metadata } from 'next'
import Link from 'next/link'
import QuoteForm from '@/components/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Start a Quote',
  description: 'Request a quote for signs, printing, clothing, vehicle graphics, window graphics, business print, design and installation work from Agos Design.',
}

const helps = [
  'Service type',
  'Approximate size',
  'Quantity',
  'Deadline',
  'Design needs',
  'Installation needs',
  'Reference files',
]

export default function QuotePage() {
  return (
    <>
      <section className="quote-hero">
        <div className="container">
          <div className="quote-hero__inner">
            <p>Quote request</p>
            <h1>Start a Quote</h1>
            <span>Give the job enough detail to quote it properly. Pick the closest service, add the practical details, then send any reference files.</span>
          </div>
        </div>
      </section>

      <section className="quote-shell">
        <div className="container">
          <div className="quote-layout">
            <aside className="quote-sidebar">
              <p>What helps most</p>
              <div>
                {helps.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <small>
                Not sure? Send what you have. Service type and rough size are enough to start.
              </small>
              <Link href="/contact">
                Send a message instead
              </Link>
            </aside>

            <div className="quote-form-panel">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
