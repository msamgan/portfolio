import { useState, useEffect } from 'react'
import Section from './Section'
import data from '../data.json'

const stats = [
  { label: 'Years Experience', value: '9+', icon: '💼' },
  { label: 'Open Source Downloads', value: '21K+', icon: '📦' },
  { label: 'Projects Delivered', value: '50+', icon: '🚀' },
  { label: 'Technologies Mastered', value: '15+', icon: '⚡' },
]

const highlights = [
  { icon: '🏆', text: 'Laravel & PHP Expert' },
  { icon: '☁️', text: 'Cloud Architecture (AWS, Azure, GCP)' },
  { icon: '🌐', text: 'Full-Stack Development' },
  { icon: '🔧', text: 'DevOps & CI/CD' },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <Section
      id="about"
      title={
        <span className="inline-block">
          About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Me
          </span>
        </span>
      }
      subtitle="Crafting scalable solutions and building the future, one line of code at a time."
    >
      <div className="space-y-12">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Profile Card */}
          <div className={`lg:col-span-1 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="card sticky top-24 group">
              {/* Profile Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <div className="aspect-square relative">
                  <img
                    src={data.intro.img}
                    alt={data.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl ring-2 ring-cyan-500/0 group-hover:ring-cyan-500/50 transition-all duration-300" />
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{data.name}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {data.title.split('|')[0].trim()}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{data.contact.address}</span>
                </div>

                {/* Highlights */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group/item"
                    >
                      <span className="text-lg group-hover/item:scale-125 transition-transform">{highlight.icon}</span>
                      <span>{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Bio paragraphs */}
            <div className="space-y-5">
              {data.intro.text.map((para, idx) => (
                <p
                  key={idx}
                  style={{ animationDelay: `${(idx + 2) * 100}ms` }}
                  className={`text-[var(--color-muted)] leading-relaxed text-lg ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="btn btn-primary group"
              >
                <span>Get in Touch</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/projects"
                className="btn btn-secondary group"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{ animationDelay: `${(idx + 5) * 100}ms` }}
                className="card text-center group hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action banner */}
        <div className={`transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-emerald-500/10 ring-1 ring-white/10 p-8 group hover:ring-white/20 transition-all">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-[var(--color-muted)]">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>
              <a
                href="https://msamgan.s3.us-east-2.amazonaws.com/mohammed+samgan+khan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium whitespace-nowrap transition-all hover:scale-105 ring-1 ring-white/20 hover:ring-white/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
