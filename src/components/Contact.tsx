import Section from './Section'
import { profile } from '../theme'
import { LinkButton } from './Button'
import IconLink from './IconLink'

export default function Contact() {
  return (
    <Section id="contact" title="Let’s build something great" subtitle="I’m available for consulting, collaborations, and leadership roles.">
      <div className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Get in touch</h3>
          <p className="mt-1 text-[var(--color-muted)]">Email me or connect via socials. I typically reply within a day.</p>
          <div className="mt-3 flex items-center gap-3 text-white/80">
            <IconLink kind="github" />
            <IconLink kind="linkedin" />
            <IconLink kind="x" />
            <IconLink kind="website" />
          </div>
        </div>
        <div className="flex gap-3">
          <LinkButton href={`mailto:${profile.email}`} className="btn-primary">Email {profile.username}</LinkButton>
          <LinkButton href={profile.website} variant="secondary" target="_blank" rel="noreferrer">Portfolio</LinkButton>
        </div>
      </div>
    </Section>
  )
}
