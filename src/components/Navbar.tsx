import { useState, useEffect } from 'react'
import Container from './Container'
import data from '../data.json'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#oss', label: 'Open Source' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-white/10 shadow-lg' 
        : 'backdrop-blur-sm bg-[var(--color-bg)]/40 border-b border-white/5'
    }`}>
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-bold tracking-tight text-lg group">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 group-hover:from-cyan-300 group-hover:to-violet-400 transition-all">
            {data.username}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white transition-colors relative link-hover font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-sm text-white/90 hover:text-white ring-1 ring-white/10 hover:ring-white/20 transition-all hover:scale-105"
        >
          Hire me
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[var(--color-bg)]/95 backdrop-blur-lg">
          <Container className="py-4">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium text-center hover:shadow-lg transition-all"
              >
                Hire me
              </a>
            </nav>
          </Container>
        </div>
      )}
    </div>
  )
}
