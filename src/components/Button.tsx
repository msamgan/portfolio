import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'btn '
  const variantClass =
    variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'hover:bg-white/5'
  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function LinkButton({ variant = 'primary', className = '', children, href, ...rest }: LinkProps) {
  const base = 'btn '
  const variantClass =
    variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'hover:bg-white/5'
  return (
    <a className={`${base} ${variantClass} ${className}`} href={href} {...rest}>
      {children}
    </a>
  )
}
