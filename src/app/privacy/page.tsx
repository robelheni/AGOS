import type { Metadata } from 'next'
import PageIntro from '@/components/ui/PageIntro'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Agos Design – Print & Signs.',
}

const sections = [
  {
    title: 'Who we are',
    copy: `Agos Design – Print & Signs is responsible for the personal data submitted through this website. Contact: ${CONTACT_EMAIL}, ${CONTACT_PHONE}.`,
  },
  {
    title: 'What data may be collected',
    copy: 'Name, contact details, company name, quote details, project descriptions, artwork notes and files or file metadata submitted through forms.',
  },
  {
    title: 'How data may be used',
    copy: 'To respond to enquiries, prepare quotes, discuss production requirements, process orders and keep necessary business records.',
  },
  {
    title: 'Data sharing',
    copy: 'Personal data should not be sold. Relevant details may need to be shared with suppliers or delivery providers where required to complete work.',
  },
  {
    title: 'Retention',
    copy: 'Retention periods should be confirmed with legal or accounting advice and added here before publication.',
  },
  {
    title: 'Your rights',
    copy: `To ask about personal data, contact ${CONTACT_EMAIL}. UK GDPR rights and ICO complaint routes should be reviewed by a qualified legal source.`,
  },
  {
    title: 'Cookies',
    copy: 'This implementation does not add analytics or advertising cookies. Update this section if analytics, tracking or embedded services are added.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="Privacy policy."
        copy="This page is a plain-language draft and must receive legal review before publication."
      />
      <section className="section-tight surface-paper">
        <div className="container grid gap-10 lg:grid-cols-[24rem_1fr]">
          <aside className="bg-[var(--paper-warm)] p-6 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-2xl font-extrabold">Legal review required</h2>
            <p className="body-muted mt-4 leading-8">
              This is an editable placeholder privacy policy. Confirm company details, lawful basis, retention and data processors before publishing.
            </p>
          </aside>
          <div className="divide-y divide-[var(--line)]">
            {sections.map((section) => (
              <section key={section.title} className="py-7 first:pt-0">
                <h2 className="heading-md">{section.title}</h2>
                <p className="body-lg body-muted mt-4 max-w-4xl">{section.copy}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
