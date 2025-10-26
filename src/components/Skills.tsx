import Section from './Section'

const skills = [
  {
    title: 'Languages & Frameworks',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    items: ['PHP', 'Laravel', 'JavaScript', 'TypeScript', 'Node.js', 'React'],
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Cloud & DevOps',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: ['AWS', 'Azure', 'GCP', 'CI/CD', 'Docker', 'GitHub Actions'],
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    title: 'Databases & Messaging',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'],
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    title: 'Practices',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    items: ['System Design', 'API Integrations', 'ERP', 'Testing', 'Performance'],
    gradient: 'from-amber-500 to-orange-500'
  },
]

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tech" subtitle="A toolbox crafted by building at scale.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, index) => (
          <div
            key={group.title}
            className="card group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${group.gradient} bg-opacity-10`}>
                <div className="text-white">
                  {group.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="badge group-hover:bg-white/10 group-hover:text-white transition-all"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Hover effect indicator */}
            <div className={`mt-4 h-1 w-0 rounded-full bg-gradient-to-r ${group.gradient} transition-all duration-500 group-hover:w-full`} />
          </div>
        ))}
      </div>

      {/* Additional highlight section */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-emerald-500/5 ring-1 ring-white/10 backdrop-blur-sm">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              9+
            </div>
            <div className="text-white/80">Years of Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-300">
              21K+
            </div>
            <div className="text-white/80">Package Downloads</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
              50+
            </div>
            <div className="text-white/80">Projects Delivered</div>
          </div>
        </div>
      </div>
    </Section>
  )
}
