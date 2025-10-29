import Section from "./Section";
import { LinkButton } from "./Button";
import IconLink from "./IconLink";
import data from "../data.json";
import profileImage from "../assets/msamgan.jpeg";

export default function Hero() {
  const socials = Object.fromEntries(
    data.navigation.social.map((s) => [s.name.toLowerCase(), s.link]),
  ) as Record<string, string>;

  return (
    <Section
      id="home"
      className="pt-20 sm:pt-28 pb-16 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Abstract geometric figures */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Floating hexagon - top right */}
        <svg
          className="absolute top-10 right-1/4 w-32 h-32 animate-float"
          style={{ animationDuration: "6s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Triangle outline - left side */}
        <svg
          className="absolute top-1/4 left-16 w-24 h-24 animate-float"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 10 L90 85 L10 85 Z"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>

        {/* Circle with rings - bottom right */}
        <svg
          className="absolute bottom-32 right-12 w-28 h-28 animate-float"
          style={{ animationDuration: "7s", animationDelay: "0.5s" }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1"
            opacity="0.4"
            className="animate-pulse"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#34d399"
            strokeWidth="0.5"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>

        {/* Diamond shape - top left */}
        <svg
          className="absolute top-32 left-1/3 w-20 h-20 animate-float"
          style={{ animationDuration: "9s", animationDelay: "1.5s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 L95 50 L50 95 L5 50 Z"
            fill="none"
            stroke="url(#gradient3)"
            strokeWidth="1.5"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pentagon - middle right */}
        <svg
          className="absolute top-1/2 right-1/3 w-24 h-24 animate-float"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 L95 35 L77 85 L23 85 L5 35 Z"
            fill="none"
            stroke="url(#gradient4)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <defs>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>

        {/* Star - bottom left */}
        <svg
          className="absolute bottom-48 left-1/4 w-16 h-16 animate-float"
          style={{ animationDuration: "11s", animationDelay: "3s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 L61 38 L95 38 L68 58 L79 92 L50 72 L21 92 L32 58 L5 38 L39 38 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            opacity="0.5"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </svg>

        {/* Grid pattern overlay - subtle */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        {/* Curved line - top */}
        <svg
          className="absolute top-0 right-0 w-96 h-48 opacity-20"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q100,50 200,80 T400,60"
            fill="none"
            stroke="url(#gradient5)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dots pattern - scattered */}
        <svg
          className="absolute top-1/3 right-1/2 w-64 h-64 opacity-40"
          viewBox="0 0 100 100"
        >
          <circle
            cx="20"
            cy="20"
            r="1.5"
            fill="#22d3ee"
            className="animate-pulse"
          />
          <circle
            cx="40"
            cy="15"
            r="1"
            fill="#a78bfa"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="60"
            cy="25"
            r="1.5"
            fill="#34d399"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="30"
            cy="40"
            r="1"
            fill="#22d3ee"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <circle
            cx="70"
            cy="50"
            r="1.5"
            fill="#a78bfa"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="50"
            cy="65"
            r="1"
            fill="#34d399"
            className="animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />
          <circle
            cx="25"
            cy="75"
            r="1.5"
            fill="#22d3ee"
            className="animate-pulse"
            style={{ animationDelay: "1.2s" }}
          />
          <circle
            cx="80"
            cy="80"
            r="1"
            fill="#a78bfa"
            className="animate-pulse"
            style={{ animationDelay: "1.8s" }}
          />
        </svg>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 ring-1 ring-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm text-cyan-300 font-medium">
              Available for hire
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-violet-400 font-semibold mb-3">
              {data.username}
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              {data.name}
            </h1>
          </div>

          <p className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 text-transparent bg-clip-text">
            {data.title}
          </p>

          <p className="text-[var(--color-muted)] max-w-2xl leading-relaxed text-lg">
            {data.intro.text[0]}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <LinkButton href="/contact" className="btn-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Work with me
            </LinkButton>
            <LinkButton href="/projects" variant="secondary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              View Portfolio
            </LinkButton>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <div className="flex items-center gap-3">
              {socials.github && (
                <IconLink kind="github" href={socials.github} />
              )}
              {socials.linkedin && (
                <IconLink kind="linkedin" href={socials.linkedin} />
              )}
              {socials.twitter && (
                <IconLink kind="twitter" href={socials.twitter} />
              )}
              {socials.youtube && (
                <IconLink kind="youtube" href={socials.youtube} />
              )}
            </div>
          </div>
        </div>

        <div
          className="order-first lg:order-last animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative mx-auto aspect-square w-72 sm:w-96 lg:w-full max-w-md animate-float">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-violet-500 to-emerald-500 opacity-75 blur-xl" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-violet-500 to-emerald-500 p-[2px]">
              <div className="relative h-full w-full rounded-3xl bg-[var(--color-surface)] overflow-hidden">
                <img
                  src={profileImage}
                  alt={data.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="absolute -top-4 -right-4 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 text-black text-xs font-bold shadow-lg backdrop-blur-sm">
              Laravel Expert
            </div>
            <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500/90 to-violet-400/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
              9+ Years
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </Section>
  );
}
