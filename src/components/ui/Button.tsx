import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'action-button-primary',
  secondary: 'action-button-secondary',
  tertiary: 'action-button-tertiary',
  text: 'action-button-text',
}

const darkVariantClasses: Partial<Record<ButtonVariant, string>> = {
  primary: 'action-button-dark-primary',
  secondary: 'action-button-dark-secondary',
  tertiary: 'action-button-dark-tertiary',
  text: 'action-button-dark-text',
}

const base =
  'action-button inline-flex min-h-[3.2rem] items-center justify-center gap-2.5 whitespace-nowrap px-8 py-3.5 text-[.8rem] font-bold uppercase tracking-[.1em] leading-none transition-[background,color,transform,box-shadow,opacity] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-px active:translate-y-0 active:scale-[.985] disabled:opacity-50 disabled:active:translate-y-0'

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  dark?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  dark?: boolean
}

export function ButtonLink({ href, children, variant = 'primary', dark = false, className, onClick }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(base, variantClasses[variant], dark && darkVariantClasses[variant], className)}
    >
      {children}
    </Link>
  )
}

export function Button({ children, variant = 'primary', dark = false, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], dark && darkVariantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
