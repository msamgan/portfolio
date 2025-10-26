// Theme tokens and profile constants for Mohammed Samgan Khan (msamgan)
export const profile = {
  name: 'Mohammed Samgan Khan',
  username: 'msamgan',
  title: 'Software Engineer | Laravel Artisan | Open Source Enthusiast',
  website: 'https://msamgan.com',
  email: 'hello@msamgan.com',
  location: 'India',
  socials: {
    github: 'https://github.com/msamgan',
    x: 'https://x.com/msamgan',
    linkedin: 'https://www.linkedin.com/in/msamgan',
    website: 'https://msamgan.com',
  },
  intro: `I’m a seasoned Software Engineer with over 9 years of experience delivering scalable, high-performance software across logistics, e-commerce, and cloud infrastructure. I specialize in full-stack development with deep expertise in PHP (Laravel), JavaScript, and modern frameworks like Node.js and React, and have led the design, development, and deployment of complex applications from scratch.

Throughout my career, I’ve optimized systems for major logistics providers, reduced operational costs, and improved performance through API integrations and ERP implementations. My work has saved companies hundreds of thousands in maintenance and helped streamline warehouse and delivery operations. I also have hands-on experience with cloud platforms (AWS, Azure, GCP), CI/CD pipelines, and both SQL and NoSQL databases.

Beyond the workplace, I’m an active open-source contributor with over 21,000 combined downloads across Laravel packages and VS Code extensions. My contributions include tools like Laravel Env Keys Checker and Laravel Pint VS Code Extension, and I’ve collaborated on projects by industry leaders like Nuno Maduro and Tighten. Learn more about my work and projects at msamgan.com.`,
};

// Color palette using CSS variables declared in App.css
export const theme = {
  colors: {
    bg: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    muted: 'var(--color-muted)',
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    ring: 'var(--color-ring)',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    pill: '999px',
  },
  shadow: {
    soft: '0 10px 30px -10px rgba(0,0,0,0.35)',
    ring: '0 0 0 3px var(--color-ring)',
  },
};

export type SocialKey = keyof typeof profile.socials;
