import { profile } from '../theme'
import Section from './Section'
import { LinkButton } from './Button'
import IconLink from './IconLink'

export default function Hero() {
  return (
    <Section id="home" className="pt-10 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm text-cyan-300">{profile.username}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg text-white/80">{profile.title}</p>
          <p className="mt-6 text-[var(--color-muted)] max-w-2xl leading-relaxed">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="#contact" className="btn-primary">Work with me</LinkButton>
            <LinkButton href={profile.website} target="_blank" rel="noreferrer" variant="secondary">View Portfolio</LinkButton>
            <div className="ml-1 inline-flex items-center gap-3 text-white/80">
              <IconLink kind="github" />
              <IconLink kind="linkedin" />
              <IconLink kind="x" />
              <IconLink kind="website" />
            </div>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <div className="relative mx-auto aspect-square w-64 sm:w-80 rounded-2xl bg-gradient-to-tr from-cyan-400/30 via-violet-500/20 to-emerald-400/20 p-[2px]">
            <div className="absolute inset-0 rounded-2xl bg-[var(--color-surface)]/60 ring-1 ring-white/5 backdrop-blur" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="text-center text-sm text-white/70">Your photo or logo here</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
