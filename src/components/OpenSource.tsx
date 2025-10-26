import Section from './Section'

const packages = [
  {
    name: 'Laravel Env Keys Checker',
    desc: 'Validate and audit environment keys across Laravel projects to prevent misconfigurations.',
    link: 'https://github.com/msamgan/laravel-env-keys-checker'
  },
  {
    name: 'Laravel Pint VS Code Extension',
    desc: 'Developer experience boost for running Laravel Pint directly in VS Code.',
    link: 'https://marketplace.visualstudio.com/items?itemName=msamgan.laravel-pint'
  },
]

export default function OpenSource() {
  return (
    <Section id="oss" title="Open Source" subtitle="21,000+ downloads across Laravel packages and VS Code extensions.">
      <div className="grid gap-6 sm:grid-cols-2">
        {packages.map((p) => (
          <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className="card hover:ring-white/15 transition">
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-2 text-[var(--color-muted)]">{p.desc}</p>
            <span className="mt-4 inline-block text-sm text-cyan-300">View project →</span>
          </a>
        ))}
      </div>
    </Section>
  )
}
