// Joins a site-relative path (e.g. "blog/hello" or "og/default.png") onto
// BASE_URL. Astro normalizes `base` to have no trailing slash regardless of
// how it's configured, so plain string concatenation drops the separator —
// always go through this helper for internal links instead.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const suffix = path.replace(/^\/+/, '');
  return `${base}/${suffix}`;
}

export const SITE = {
  title: 'Justin Kracht',
  description:
    'Psychometrics, people analytics, and interactive explainers of correlation-matrix geometry.',
  author: 'Justin Kracht',
  locale: 'en-US',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/blog', label: 'Blog' },
  { href: '/cv', label: 'CV' },
  { href: '/about', label: 'About' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'https://github.com/JustinKracht', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/justinkracht/', label: 'LinkedIn' },
  { href: 'https://orcid.org/0000-0002-3979-4472', label: 'ORCID' },
] as const;

// GoatCounter site code — replace 'justinkracht' with the real code once the
// account is created at https://www.goatcounter.com/, or leave unset to
// disable analytics entirely.
export const GOATCOUNTER_SITE = '';
