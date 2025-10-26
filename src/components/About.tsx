import Section from './Section'
import data from '../data.json'

export default function About() {
  return (
    <Section id="about" title="About" subtitle="A quick snapshot of who I am and what I do.">
      <div className="text-[var(--color-muted)] leading-relaxed max-w-4xl space-y-4">
        {data.intro.text.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </Section>
  )
}
