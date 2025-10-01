# Local Norwegian Car Mechanic Website - Source Tree Structure

## Introduction

This document outlines the complete source tree structure for the Local Norwegian Car Mechanic Website project. The structure is organized to support Norwegian language requirements, maintainable code patterns, and efficient development workflows.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-01 | 1.0 | Initial source tree definition | Winston (Architect) |

## Project Root Structure

```
harestuabil/
├── .bmad-core/              # BMad framework configuration
├── .cursor/                 # Cursor IDE configuration
├── .windsurf/               # Windsurf IDE configuration
├── docs/                    # Project documentation
│   ├── architecture/        # Architecture documents
│   ├── front-end-spec/      # Frontend specifications
│   └── prd.md               # Product requirements document
├── public/                  # Static assets
│   ├── admin/               # DecapCMS configuration
│   ├── images/              # Image assets
│   └── styles/              # Global CSS files
├── src/                     # Source code
├── content/                 # MDX content files
├── meta/                    # Content metadata
├── .gitignore               # Git ignore file
├── components.json          # Shadcn/UI configuration
├── config.json              # Site configuration
├── global.d.ts              # Global TypeScript definitions
├── jest.config.js           # Jest testing configuration
├── next.config.js           # Next.js configuration
├── package.json             # Node.js dependencies
├── pnpm-lock.yaml           # Package lock file
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project README
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── netlify.toml             # Netlify deployment configuration
```

## Source Code Structure (src/)

```
src/
├── __tests__/               # Test files
│   ├── pagination.test.ts   # Pagination utility tests
│   └── [other test files]
├── assets/                  # Static assets imported in code
│   ├── github-alt.svg       # GitHub icon
│   └── twitter-alt.svg      # Twitter icon
├── components/              # React components
│   ├── meta/                # SEO and meta tag components
│   ├── ui/                  # Shadcn/UI components
│   ├── ui/magicui/          # Magic UI components
│   ├── [other components]
├── config/                  # Configuration files
│   └── navigation.ts        # Navigation configuration
├── contexts/                # React contexts
│   └── ThemeContext.tsx     # Theme toggle context
├── lib/                     # Utility functions and libraries
│   ├── authors.ts           # Author data utilities
│   ├── config.ts            # Configuration utilities
│   ├── pages.ts             # Page data utilities
│   ├── pagination.ts        # Pagination utilities
│   ├── posts.ts             # Blog post utilities
│   ├── tags.ts              # Tag utilities
│   └── utils.ts             # General utilities
├── pages/                   # Next.js pages
│   ├── _app.tsx             # App wrapper component
│   ├── about.tsx            # About page
│   ├── contact.tsx          # Contact page
│   ├── index.tsx            # Homepage
│   ├── partners.tsx         # Partners page
│   ├── program.tsx          # Program page
│   ├── posts/               # Blog-related pages
│   └── [other pages]
└── types/                   # TypeScript type definitions
    └── [type definition files]
```

## Component Structure (src/components/)

### Core Components

```
src/components/
├── Layout.tsx               # Main layout wrapper
├── PageLayout.tsx           # Page-specific layout
├── Header.tsx               # Site header with navigation
├── BrandLogo.tsx            # Brand logo component
├── Copyright.tsx            # Copyright footer
├── Date.tsx                 # Date display component
├── DesktopNavigation.tsx    # Desktop navigation menu
├── Pagination.tsx           # Pagination component
├── PostItem.tsx             # Blog post item
├── PostLayout.tsx           # Blog post layout
├── PostList.tsx             # Blog post list
├── SocialList.tsx           # Social media links
├── TagButton.tsx            # Tag button component
├── TagLink.tsx              # Tag link component
├── TagPostList.tsx          # Tagged post list
└── ThemeToggle.tsx          # Theme toggle button
```

### UI Components (src/components/ui/)

```
src/components/ui/
├── button.tsx               # Button component
├── [other shadcn/ui components]
└── magicui/                 # Magic UI components
    ├── dot-pattern.tsx      # Dot pattern background
    └── dotted-map.tsx       # Dotted map component
```

### Meta Components (src/components/meta/)

```
src/components/meta/
├── BasicMeta.tsx            # Basic meta tags
├── JsonLdMeta.tsx           # JSON-LD structured data
├── OpenGraphMeta.tsx        # Open Graph meta tags
└── TwitterCardMeta.tsx      # Twitter Card meta tags
```

## Page Structure (src/pages/)

### Main Pages

```
src/pages/
├── _app.tsx                 # App wrapper with ThemeProvider
├── index.tsx                # Homepage (to be transformed)
├── about.tsx                # About page (to become "Om Oss")
├── contact.tsx              # Contact page (to be enhanced)
├── partners.tsx             # Partners page (to be repurposed)
└── program.tsx              # Program page (to be repurposed)
```

### Blog Pages

```
src/pages/posts/
├── index.tsx                # Blog listing page
├── page/                    # Paginated blog pages
│   └── [page].tsx           # Dynamic blog page
└── tags/                    # Tag-based blog pages
    └── [[...slug]].tsx      # Dynamic tag pages
```

### Individual Blog Post

```
src/pages/posts/
└── [post].tsx               # Individual blog post page
```

## Content Structure (content/)

### Static Pages

```
content/pages/
├── about.mdx                # About page content
├── contact.mdx              # Contact page content
└── [other static pages]
```

### Blog Posts

```
content/posts/
├── license.mdx              # License information
├── lorem-ipsum.mdx          # Sample blog post
├── markdown-syntax.mdx      # Markdown syntax guide
├── references.mdx           # Reference information
├── rich-content-with-mdx.mdx # MDX features demo
└── welcome.mdx              # Welcome blog post
```

## Norwegian-Specific Structure (To Be Implemented)

### Service Pages

```
src/pages/tjenester/
├── index.tsx                # Services overview page
├── verksted.tsx             # Verksted service page
├── dekk-og-felg.tsx         # Dekk og felg service page
├── dekkhotell.tsx           # Dekkhotell service page
└── bilglass.tsx             # Bilglass service page
```

### Service Components

```
src/components/services/
├── ServiceCard.tsx          # Service display card
├── ServiceList.tsx          # Service list component
├── ServiceDetail.tsx        # Service detail component
└── ServiceForm.tsx          # Service inquiry form
```

### Contact Components

```
src/components/contact/
├── KontaktSkjema.tsx        # Norwegian contact form
├── KontaktInfo.tsx          # Contact information display
├── KartVisning.tsx          # Map display component
└── OfteStilteSporsmal.tsx   # FAQ component
```

### Norwegian Content

```
content/pages/
├── verksted.mdx             # Verksted service content
├── dekk-og-felg.mdx         # Dekk og felg service content
├── dekkhotell.mdx           # Dekkhotell service content
├── bilglass.mdx             # Bilglass service content
└── om-oss.mdx               # About us content (Norwegian)
```

## Configuration Files

### Site Configuration

```
config.json                  # Site-wide configuration
{
  "base_url": "https://example.no/",
  "site_title": "Lokalt Bilverksted",
  "site_description": "Din lokale bilpartner",
  "site_keywords": [
    { "keyword": "bilverksted" },
    { "keyword": "dekkhotell" },
    { "keyword": "bilglass" }
  ],
  "posts_per_page": 5,
  "twitter_account": "@verksted",
  "github_account": "verksted"
}
```

### Navigation Configuration

```
src/config/navigation.ts     # Navigation structure
export const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Hjem' },
  { href: '/tjenester', label: 'Tjenester' },
  { href: '/blogg', label: 'Blogg' },
  { href: '/om-oss', label: 'Om Oss' },
  { href: '/kontakt', label: 'Kontakt' }
];
```

### CMS Configuration

```
public/admin/config.yml      # DecapCMS configuration
backend:
  name: git-gateway
  repo: username/repo
  branch: main

collections:
  - name: "pages"
    label: "Sider"
    folder: "content/pages/"
    fields:
      - { label: "Tittel", name: "title", widget: "string" }
      - { label: "Innhold", name: "body", widget: "markdown" }
```

## Asset Structure

### Images

```
public/images/
├── verksted/                # Workshop images
│   ├── verksted-eksteriør.jpg
│   ├── verksted-interiør.jpg
│   └── mekaniker-i-arbeid.jpg
├── tjenester/               # Service images
│   ├── dekkhotell.jpg
│   ├── bilglass.jpg
│   └── dekk-bytte.jpg
├── team/                    # Team photos
│   ├── mekaniker-1.jpg
│   └── mekaniker-2.jpg
└── logo/                    # Logo files
    ├── logo.svg
    ├── logo@2x.png
    └── favicon.ico
```

### Styles

```
public/styles/
├── global.css               # Global styles
├── content.module.css       # Content-specific styles
└── [other style files]
```

## Testing Structure

### Test Files

```
src/__tests__/
├── components/              # Component tests
│   ├── Header.test.tsx
│   ├── ServiceCard.test.tsx
│   └── KontaktSkjema.test.tsx
├── lib/                     # Utility tests
│   ├── pagination.test.ts
│   └── utils.test.ts
└── pages/                   # Page tests
    ├── index.test.tsx
    └── kontakt.test.tsx
```

### Test Configuration

```
jest.config.js               # Jest configuration
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],
};
```

## Build and Deployment Structure

### Build Output

```
dist/                        # Build output directory
├── _next/                   # Next.js build artifacts
├── images/                  # Optimized images
├── pages/                   # Static pages
└── static/                  # Static assets
```

### Deployment Configuration

```
netlify.toml                 # Netlify configuration
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
```

## File Naming Conventions

### Components

- **PascalCase**: `ServiceCard.tsx`, `KontaktSkjema.tsx`
- **Descriptive names**: `VerkstedInfo.tsx`, `DekkhotellPriser.tsx`
- **File extension**: `.tsx` for React components with JSX

### Utilities

- **camelCase**: `formatPris.ts`, `validerTelefon.ts`
- **Descriptive names**: `hentServiceData.ts`, `beregnTotalPris.ts`
- **File extension**: `.ts` for TypeScript utilities

### Pages

- **kebab-case**: `verksted.tsx`, `dekk-og-felg.tsx`
- **Norwegian names**: `om-oss.tsx`, `kontakt-oss.tsx`
- **File extension**: `.tsx` for React pages

### Content

- **kebab-case**: `verksted.mdx`, `dekkhotell.mdx`
- **Norwegian names**: `om-oss.mdx`, `priser.mdx`
- **File extension**: `.mdx` for MDX content

## Import Path Conventions

### Absolute Imports

```typescript
// Use @ alias for absolute imports
import { ServiceCard } from '@/components/services/ServiceCard';
import { formatPris } from '@/lib/utils';
import { ServiceType } from '@/types/service';
```

### Relative Imports

```typescript
// Use relative imports for local files
import { RelatedServices } from './RelatedServices';
import { ServiceDetails } from '../ServiceDetails';
```

### Third-Party Imports

```typescript
// Group third-party imports
import React from 'react';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
```

## Norwegian Language Implementation

### Language Files

```
src/lib/
├── norsk Tekster.ts         # Norwegian UI text constants
├── formatering.ts           # Norwegian formatting utilities
└── validering.ts            # Norwegian validation rules
```

### Type Definitions

```
src/types/
├── service.ts               # Service-related types
├── kontakt.ts               # Contact form types
└── norsk.ts                 # Norwegian language types
```

---

**Source Tree Structure Complete** 🌳

This source tree structure provides an organized foundation for the Local Norwegian Car Mechanic Website project. The structure supports Norwegian language requirements, maintainable code patterns, and efficient development workflows while leveraging the existing Next.js and Shadcn/UI foundation.