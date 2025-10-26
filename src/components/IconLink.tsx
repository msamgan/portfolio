import type { ReactElement } from 'react'

export type SocialKind = 'github' | 'x' | 'linkedin' | 'website' | 'twitter' | 'youtube'

 type IconLinkProps = {
  kind: SocialKind
  href: string
  className?: string
  label?: string
}

const icons: Record<SocialKind, (props: { className?: string }) => ReactElement> = {
  github: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.37 1.24-3.21-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.9 1.24 3.2 0 4.6-2.8 5.6-5.48 5.9.44.38.82 1.1.82 2.22v3.3c0 .31.2.68.82.57A12 12 0 0 0 12 .5"/></svg>
  ),
  x: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M18.244 2H21l-7.5 8.57L22.5 22h-6.656l-5.2-6.084L4.5 22H2l8.036-9.17L1.5 2h6.742l4.72 5.53L18.244 2Zm-2.332 18h2.01L8.17 4H6.16l9.752 16Z"/></svg>
  ),
  linkedin: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.38 0-2.74 1.86-2.74 3.76V24h-4V8z"/></svg>
  ),
  website: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c1.1 0 2.13.3 3.01.82-.62.77-1.13 1.77-1.5 2.93H10.5C10.13 5.77 9.62 4.77 9 4.82 9.87 4.3 10.9 4 12 4Zm-6.32 6c.2-1.1.7-2.1 1.4-2.93.48.62.91 1.53 1.22 2.93H5.68Zm0 4h2.62c-.31 1.4-.74 2.31-1.22 2.93a7.96 7.96 0 0 1-1.4-2.93ZM12 20c-1.1 0-2.13-.3-3.01-.82.62-.05 1.13-1.05 1.5-2.93h3.01c.37 1.88.88 2.88 1.5 2.93-.88.52-1.91.82-3 .82Zm6.32-6a7.96 7.96 0 0 1-1.4 2.93c-.48-.62-.91-1.53-1.22-2.93h2.62Zm-2.62-4c.31-1.4.74-2.31 1.22-2.93A7.96 7.96 0 0 1 18.32 10h-2.62ZM8.7 10h6.6a15.8 15.8 0 0 1-.5 2h-5.6c-.2-.64-.38-1.31-.5-2Zm.5 4h5.6c.2.64.38 1.31.5 2H8.7c.12-.69.3-1.36.5-2Z"/></svg>
  ),
  twitter: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.86 1.1A4.51 4.51 0 0 0 16.11 0c-2.5 0-4.5 2.2-4.5 4.9 0 .38.04.75.12 1.1A12.94 12.94 0 0 1 1.64.88 5.16 5.16 0 0 0 1 3.4c0 1.7.82 3.2 2.06 4.07a4.29 4.29 0 0 1-2.05-.6v.06c0 2.4 1.6 4.4 3.73 4.86-.39.12-.8.18-1.22.18-.3 0-.59-.03-.87-.09.59 2 2.3 3.5 4.33 3.54A9.06 9.06 0 0 1 0 19.54 12.8 12.8 0 0 0 6.95 22c8.34 0 12.9-7.3 12.9-13.63 0-.21 0-.42-.02-.63A9.6 9.6 0 0 0 23 3z"/></svg>
  ),
  youtube: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.7.6 9.3.6 9.3.6s7.7 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>
  ),
}

export default function IconLink({ kind, href, className = '', label }: IconLinkProps) {
  const Icon = icons[kind]
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`text-white/80 hover:text-white ${className}`} aria-label={label ?? kind}>
      <Icon className="size-5" />
    </a>
  )
}
