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
    href: '/tjenester',
    label: 'Tjenester',
    isActive: (pathname) => pathname === '/tjenester' || pathname.startsWith('/tjenester/')
  },
  {
    href: '/om-oss',
    label: 'Om oss',
    isActive: (pathname) => pathname === '/om-oss'
  },
  {
    href: '/partnere',
    label: 'Partnere',
    isActive: (pathname) => pathname === '/partnere'
  },
  {
    href: '/kontakt',
    label: 'Kontakt',
    isActive: (pathname) => pathname === '/kontakt'
  }
];

// // Debug function to check navigation consistency
// export const debugNavigation = () => {
//   if (typeof window !== 'undefined') {
//     navigationItems.forEach(item => {
//       const isActive = item.isActive
//         ? item.isActive(window.location.pathname)
//         : window.location.pathname === item.href;
//     });
//   }
// };
