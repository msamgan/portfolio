import {useEffect, useState} from 'react'
import Container from './Container'
import data from '../data.json'

const links = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/services', label: 'Services'},
    {href: '/projects', label: 'Projects'},
    {href: '/tools', label: 'Tools'},
    {href: '/posts', label: 'Blog'},
    {href: '/contact', label: 'Contact'},
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)

            // Track active section
            const sections = ['about', 'skills', 'experience', 'contact']
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const {offsetTop, offsetHeight} = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }

            if (window.scrollY < 100) {
                setActiveSection('')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isLinkActive = (href: string) => {
        const currentPath = window.location.pathname
        const hash = href.includes('#') ? href.split('#')[1] : ''

        if (href === '/' && currentPath === '/' && !activeSection) return true
        if (hash && activeSection === hash) return true
        if (href === currentPath) return true
        if (!href.includes('#') && currentPath === href) return true

        return false
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
                ? 'backdrop-blur-xl bg-[var(--color-bg)]/90 border-b border-white/10 shadow-2xl'
                : 'backdrop-blur-md bg-[var(--color-bg)]/60 border-b border-white/5'
        }`}>
            {/* Animated top border gradient */}
            <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-opacity duration-500 ${
                    isScrolled ? 'opacity-100' : 'opacity-0'
                }`}/>

            <Container className="flex h-20 items-center justify-between">
                <a href="/" className="font-bold tracking-tight text-xl group relative z-10">
          <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 group-hover:from-violet-400 group-hover:via-cyan-300 group-hover:to-violet-400 transition-all duration-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            {data.username}
          </span>
                    {/* Animated underline */}
                    <span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-300"/>
                </a>

                {/* Desktop navigation */}
                <nav className="hidden md:flex gap-1 text-sm items-center">
                    {links.map((l) => {
                        const isActive = isLinkActive(l.href)
                        return (
                            <a
                                key={l.href}
                                href={l.href}
                                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                                    isActive
                                        ? 'text-white bg-white/10 shadow-lg shadow-cyan-500/20'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {l.label}
                                {/* Active indicator dot */}
                                {isActive && (
                                    <span
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full animate-pulse"/>
                                )}
                                {/* Hover underline */}
                                {!isActive && (
                                    <span
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-3/4 transition-all duration-300 rounded-full"/>
                                )}
                            </a>
                        )
                    })}
                </nav>

                {/* Desktop CTA */}
                <a
                    href="/contact"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-sm text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                    <span className="relative z-10">Hire me</span>
                    <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                    {/* Shine effect */}
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
                </a>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2.5 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all duration-200 relative group"
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        {/* Hamburger icon with animation */}
                        <div className="absolute">
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}/>
                            <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                                isOpen ? 'opacity-0' : 'opacity-100'
                            }`}/>
                            <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                                isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                            }`}/>
                        </div>
                    </div>
                    {/* Ripple effect ring */}
                    <span
                        className="absolute inset-0 rounded-xl ring-2 ring-cyan-400/0 group-hover:ring-cyan-400/30 transition-all duration-300"/>
                </button>
            </Container>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div
                    className="border-t border-white/10 bg-gradient-to-b from-[var(--color-bg)]/95 to-[var(--color-surface)]/95 backdrop-blur-xl shadow-2xl">
                    <Container className="py-6">
                        <nav className="flex flex-col gap-2">
                            {links.map((l, index) => {
                                const isActive = isLinkActive(l.href)
                                return (
                                    <a
                                        key={l.href}
                                        href={l.href}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                            animation: isOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none'
                                        }}
                                        className={`flex items-center justify-between px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-500/10'
                                                : 'text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10'
                                        }`}
                                    >
                                        <span>{l.label}</span>
                                        {isActive ? (
                                            <span
                                                className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full animate-pulse"/>
                                        ) : (
                                            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M9 5l7 7-7 7"/>
                                            </svg>
                                        )}
                                    </a>
                                )
                            })}
                            <a
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    animationDelay: `${links.length * 50}ms`,
                                    animation: isOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none'
                                }}
                                className="mt-4 px-5 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-center hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 relative overflow-hidden group"
                            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Hire me
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
                                <span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
                            </a>
                        </nav>
                    </Container>
                </div>
            </div>
        </div>
    )
}
