import type { Metadata } from 'next'
import FAQAccordion from '@/components/shared/FAQAccordion'
import CTASection from '@/components/ui/CTASection'
import PageIntro from '@/components/ui/PageIntro'
import { faqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about artwork, print files, delivery, signage, clothing, installation and quote requests at Agos Design.',
}

export default function FAQPage() {
  return (
    <>
      <PageIntro
        label="FAQ"
        title="Useful answers before the job reaches production."
        copy="These answers cover common artwork, print, signage, clothing and delivery questions. Add confirmed Agos policies when supplied."
        primaryAction={{ label: 'Start a Quote', href: '/quote' }}
      />
      <section className="section-tight surface-paper production-rule">
        <div className="container grid gap-10 lg:grid-cols-[24rem_1fr]">
          <div data-reveal>
            <h2 className="heading-md">Questions</h2>
            <p className="body-muted mt-5 leading-8">
              If a question depends on material, size, surface or deadline, include those details in the quote form.
            </p>
          </div>
          <div data-reveal data-reveal-delay>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
