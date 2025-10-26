import Section from './Section'
import { LinkButton } from './Button'
import IconLink from './IconLink'
import data from '../data.json'

export default function Contact() {
  const socials = Object.fromEntries(
    data.navigation.social.map((s) => [s.name.toLowerCase(), s.link])
  ) as Record<string, string>

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Let's build something great
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            I'm available for consulting, collaborations, and leadership roles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Get in touch</h3>
                  <p className="text-[var(--color-muted)]">
                    Email me or connect via socials. I typically reply within a day.
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Email</div>
                    <a href={`mailto:${data.contact.email}`} className="text-white hover:text-cyan-300 transition-colors">
                      {data.contact.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Location</div>
                    <div className="text-white">{data.contact.address}</div>
                  </div>
                </div>

                {/* Social links */}
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Connect</div>
                  <div className="flex items-center gap-3">
                    {socials.github && <IconLink kind="github" href={socials.github} />}
                    {socials.linkedin && <IconLink kind="linkedin" href={socials.linkedin} />}
                    {socials.twitter && <IconLink kind="twitter" href={socials.twitter} />}
                    {socials.youtube && <IconLink kind="youtube" href={socials.youtube} />}
                  </div>
                </div>
              </div>

              {/* CTA section */}
              <div className="flex flex-col justify-center space-y-6 md:border-l md:border-white/10 md:pl-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for work
                  </div>

                  <h4 className="text-xl font-semibold text-white">
                    Ready to start your project?
                  </h4>
                  <p className="text-[var(--color-muted)]">
                    Let's discuss how I can help bring your ideas to life.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <LinkButton href={`mailto:${data.contact.email}`} className="btn-primary justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send me an email
                  </LinkButton>
                  <LinkButton href="#projects" variant="secondary" className="justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    View my work
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
