import Container from './Container'
import { profile } from '../theme'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#oss', label: 'Open Source' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:rgb(10_15_30_/_0.55)] border-b border-white/5">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">
          <span className="text-cyan-300">{profile.username}</span>
          <span className="text-white/50">.dev</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm text-white/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={profile.website} className="text-sm text-white/80 hover:text-white" target="_blank" rel="noreferrer">
          Hire me
        </a>
      </Container>
    </div>
  )
}
