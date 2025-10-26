import Container from './Container'
import data from '../data.json'

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 py-12 text-sm overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <Container>
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <a href="#home" className="inline-block font-bold text-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                {data.username}
              </span>
            </a>
            <p className="text-white/60 text-sm">
              Building scalable, high-performance software solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="#about" className="text-white/60 hover:text-cyan-300 transition-colors link-hover">About</a>
              <a href="#skills" className="text-white/60 hover:text-cyan-300 transition-colors link-hover">Skills</a>
              <a href="#projects" className="text-white/60 hover:text-cyan-300 transition-colors link-hover">Projects</a>
              <a href="#contact" className="text-white/60 hover:text-cyan-300 transition-colors link-hover">Contact</a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              {data.navigation.social.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-cyan-300 transition-colors link-hover"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="text-white/50">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-white/60 hover:text-white transition-colors text-sm">
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
