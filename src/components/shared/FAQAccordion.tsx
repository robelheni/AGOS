'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FAQ } from '@/types'

interface FAQAccordionProps {
  faqs: FAQ[]
  dark?: boolean
}

export default function FAQAccordion({ faqs, dark = false }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <div className={dark ? 'divide-y divide-[var(--line-dark)]' : 'divide-y divide-[var(--line)]'}>
      {faqs.map((faq) => {
        const open = openId === faq.id
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              className="button-reset flex w-full min-h-[4.75rem] items-center justify-between gap-6 py-5 text-left"
              aria-expanded={open}
            >
              <span className="text-lg font-extrabold leading-snug">{faq.question}</span>
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--paper)]">
                {open ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <div className={`${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid transition-[grid-template-rows,opacity] duration-[var(--duration-base)] ease-[var(--ease-out)]`}>
              <div className="overflow-hidden">
                <p className={dark ? 'body-muted pb-6 leading-8' : 'body-muted pb-6 leading-8'}>{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
