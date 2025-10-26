import Section from './Section'
import { profile } from '../theme'

export default function About() {
  return (
    <Section id="about" title="About" subtitle="A quick snapshot of who I am and what I do.">
      <div className="text-[var(--color-muted)] leading-relaxed max-w-4xl">
        <p className="whitespace-pre-line">{profile.intro}</p>
      </div>
    </Section>
  )
}
