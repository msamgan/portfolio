import Section from './Section'
import { profile } from '../theme'

const projects = [
  {
    name: 'Logistics Optimization Platform',
    desc: 'Optimized warehouse and delivery operations with ERP and API integrations.',
    link: profile.website + '/projects',
  },
  {
    name: 'E‑commerce Engine',
    desc: 'High‑performance platform with real‑time inventory and order orchestration.',
    link: profile.website + '/projects',
  },
  {
    name: 'Cloud Cost Insights',
    desc: 'Visibility and automation to cut cloud spend and improve reliability.',
    link: profile.website + '/projects',
  },
]

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="A few highlights. Explore more on my site.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className="card hover:ring-white/15 transition">
            <div className="aspect-video w-full rounded-lg bg-gradient-to-tr from-cyan-400/20 via-violet-500/15 to-emerald-400/15 mb-4" />
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-2 text-[var(--color-muted)]">{p.desc}</p>
            <span className="mt-4 inline-block text-sm text-cyan-300">View details →</span>
          </a>
        ))}
      </div>
    </Section>
  )
}
