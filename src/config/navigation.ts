export interface NavigationItem {
  href: string;
  label: string;
  isActive?: (pathname: string) => boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    isActive: (pathname) => pathname === '/'
  },
  {
    href: '/posts',
    label: 'Blog',
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
    label: 'Partners',
    isActive: (pathname) => pathname === '/partners'
  },
  {
    href: '/contact',
    label: 'Contact',
    isActive: (pathname) => pathname === '/contact'
  }
];
