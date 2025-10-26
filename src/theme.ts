// Theme tokens shared across the app (colors, radii, shadows)
// Note: All profile/content data now comes from src/data.json

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
