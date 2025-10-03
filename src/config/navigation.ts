export interface NavigationItem {
  href: string;
  label: string;
  isActive?: (pathname: string) => boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Hjem',
    isActive: (pathname) => pathname === '/'
  },
  {
    href: '/posts',
    label: 'Blogg',
    isActive: (pathname) => pathname === '/posts' || pathname.startsWith('/posts/')
  },
  {
    href: '/services',
    label: 'Tjenester',
    isActive: (pathname) => pathname === '/services'
  },
  {
    href: '/about',
    label: 'Om oss',
    isActive: (pathname) => pathname === '/about'
  },
  {
    href: '/partners',
    label: 'Partnere',
    isActive: (pathname) => pathname === '/partners'
  },
  {
    href: '/contact',
    label: 'Kontakt',
    isActive: (pathname) => pathname === '/contact'
  }
];
