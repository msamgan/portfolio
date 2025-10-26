import type { ReactNode } from 'react'
import Container from './Container'

export default function Section({ id, title, subtitle, children, className = '' }: {
  id?: string
  title?: string | ReactNode
  subtitle?: string | ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-10">
            {title && <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">{title}</h2>}
            {subtitle && <p className="mt-2 text-[var(--color-muted)] max-w-3xl">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
