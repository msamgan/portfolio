import Section from './Section'
import data from '../data.json'

// Optional: local image map for any service images that are bundled locally.
// If an image path from data.json isn't mapped here, we gracefully show a placeholder.
// Add imports here if you later place the images in src/assets/services.
// Example:
// import webDev from '../assets/services/WebDevelopment.png'
// const localImages: Record<string, string> = { 'src/assets/services/WebDevelopment.png': webDev }
const localImages: Record<string, string> = {}

export default function Services() {
  return (
    <Section id="services" title="Services" subtitle="Ways I can help your team ship faster and smarter.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.services.map((s, index) => (
          <div
            key={s.name}
            className="card group transition-all duration-300 hover:shadow-2xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Service image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-tr from-cyan-400/10 via-violet-500/10 to-emerald-400/10">
              {localImages[s.img] ? (
                <img
                  src={localImages[s.img]}
                  alt={s.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Service info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {s.name}
                </h3>
              </div>

              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {s.description}
              </p>
            </div>

            {/* Progress bar hover effect */}
            <div className="h-1 w-0 mt-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </Section>
  )
}
