import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  copy?: string
  label?: string
  dark?: boolean
  className?: string
}

export default function SectionHeader({ title, copy, label, dark = false, className }: SectionHeaderProps) {
  return (
    <header className={cn('max-w-5xl border-t pt-6', dark ? 'border-[var(--line-dark)]' : 'border-[var(--line)]', className)}>
      {label && <p className="mb-5 text-xs font-black tracking-[.18em] text-[var(--accent)]">{label}</p>}
      <h2 className={cn('font-display text-[clamp(2.35rem,5.7vw,5.8rem)] font-semibold leading-[.94] tracking-[-.055em]', dark ? 'text-[var(--paper)]' : 'text-[var(--ink)]')}>{title}</h2>
      {copy && <p className="body-lg body-muted mt-7 max-w-3xl">{copy}</p>}
    </header>
  )
}
