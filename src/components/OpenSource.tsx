import Section from "./Section";

const packages = [
  {
    name: "Laravel Env Keys Checker",
    desc: "Validate and audit environment keys across Laravel projects to prevent misconfigurations.",
    link: "https://github.com/msamgan/laravel-env-keys-checker",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    downloads: "21K+",
    badge: "Package",
  },
  {
    name: "Laravel Pint VS Code Extension",
    desc: "Developer experience boost for running Laravel Pint directly in VS Code.",
    link: "https://marketplace.visualstudio.com/items?itemName=msamgan.laravel-pint-vscode",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
    downloads: "10K+",
    badge: "Extension",
  },
];

export default function OpenSource() {
  return (
    <Section
      id="oss"
      title="Open Source"
      subtitle="21,000+ downloads across Laravel packages and VS Code extensions."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {packages.map((p, index) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="card group transition-all duration-500 hover:shadow-2xl cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon and badge header */}
            <div className="flex items-start justify-between mb-5">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[var(--color-muted)] group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-all">
                  {p.badge}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="font-semibold">{p.downloads}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-violet-300 transition-all duration-300">
                {p.name}
              </h3>

              <p className="text-[var(--color-muted)] text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {p.desc}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-2 pt-2">
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 font-medium inline-flex items-center gap-1">
                  View Project
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Animated border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 opacity-20 blur-xl" />
            </div>
          </a>
        ))}
      </div>

      {/* Additional info section */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-emerald-500/5 border border-white/5 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">
                More on GitHub
              </h4>
              <p className="text-sm text-[var(--color-muted)]">
                Check out my other open-source contributions and projects
              </p>
            </div>
          </div>

          <a
            href="https://github.com/msamgan"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </Section>
  );
}
