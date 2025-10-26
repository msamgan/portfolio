import { profile } from '../theme'
import type { SocialKey } from '../theme'

type IconLinkProps = {
  kind: SocialKey
  href?: string
  className?: string
  label?: string
}

import type { ReactElement } from 'react'
const icons: Record<SocialKey, (props: { className?: string }) => ReactElement> = {
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
}

export default function IconLink({ kind, href, className = '', label }: IconLinkProps) {
  const url = href ?? profile.socials[kind]
  const Icon = icons[kind]
  return (
    <a href={url} target="_blank" rel="noreferrer" className={`text-white/80 hover:text-white ${className}`} aria-label={label ?? kind}>
      <Icon className="size-5" />
    </a>
  )
}
