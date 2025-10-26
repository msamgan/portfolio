import Section from './Section'
import data from '../data.json'

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="A few highlights. Explore more on my site.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.projects.map((p, index) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="card group transition-all duration-300 hover:shadow-2xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Project image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-tr from-cyan-400/10 via-violet-500/10 to-emerald-400/10">
              {p.img ? (
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Project info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {p.name}
                </h3>
                <svg className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {p.description}
              </p>

              {/* Footer with links */}
              <div className="flex items-center gap-4 pt-2">
                <span className="inline-flex items-center gap-1 text-sm text-cyan-300 font-medium">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>

                {p.repo && (
                  <a
                    href={p.repo}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
                    aria-label="View repository"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Progress bar effect */}
            <div className="h-1 w-0 mt-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* View all projects CTA */}
      <div className="mt-12 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 text-white transition-all hover:scale-105"
        >
          <span>Want to see more?</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </Section>
  )
}
