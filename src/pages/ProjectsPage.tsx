import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import OpenSource from '../components/OpenSource'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

export default function ProjectsPage() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{width: `${scrollProgress}%`, transition: 'width 0.1s ease'}}
            />

            <Navbar/>

            {/* Hero section for projects page */}
            <section
                className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"/>
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
                        style={{animationDelay: '1s'}}/>
                    <div
                        className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
                        style={{animationDelay: '2s'}}/>
                </div>

                {/* Content */}
                <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Projects & Open Source
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                        Building in Public
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                        Explore my open-source work and featured projects that have helped thousands of developers
                        worldwide.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">31K+</div>
                            <div className="text-sm text-[var(--color-muted)]">Total Downloads</div>
                        </div>
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">5+</div>
                            <div className="text-sm text-[var(--color-muted)]">Featured Projects</div>
                        </div>
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
                            <div className="text-sm text-[var(--color-muted)]">Open Source</div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="relative">
                {/* Keep section IDs for deep links */}
                <OpenSource/>
                <Projects/>
            </main>

            <Footer/>

            {/* Scroll to top button */}
            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow"
                    aria-label="Scroll to top"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>
                </button>
            )}
        </>
    )
}
