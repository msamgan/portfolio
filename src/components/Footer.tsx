import Container from './Container'
import { profile } from '../theme'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 py-10 text-sm text-white/60">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#home" className="hover:text-white">Back to top</a>
          <a href={profile.website} target="_blank" rel="noreferrer" className="hover:text-white">msamgan.com</a>
        </div>
      </Container>
    </footer>
  )
}
