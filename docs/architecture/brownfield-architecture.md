# Local Norwegian Car Mechanic Website - Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the Local Norwegian Car Mechanic Website codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on implementing the Norwegian mechanic website features as defined in the PRD.

### Document Scope

Focused on transforming the existing Next.js blog template into a Norwegian car mechanic website while maintaining the existing Shadcn/UI and Tailwind v4 foundation.

### Change Log

| Date   | Version | Description                 | Author    |
| ------ | ------- | --------------------------- | --------- |
| 2025-10-01 | 1.0     | Initial brownfield analysis | Winston (Architect) |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `src/pages/_app.tsx` - App wrapper with ThemeProvider
- **Configuration**: `config.json`, `public/admin/config.yml`, `tailwind.config.js`
- **Core Business Logic**: Currently minimal - mostly blog functionality in `src/lib/`
- **API Definitions**: None currently - static site generation
- **Key Algorithms**: None currently - simple content rendering

### Enhancement Impact Areas

Based on the PRD requirements, these files will need significant modification:
- `src/pages/index.tsx` - Transform from blog homepage to mechanic homepage
- `src/config/navigation.ts` - Update navigation for Norwegian mechanic site
- `src/components/Header.tsx` - Add phone number prominence
- `src/pages/about.tsx` - Transform to "Om Oss" with mechanic information
- `src/pages/contact.tsx` - Enhance with Netlify Forms and Norwegian fields
- New service pages needed: Verksted, Dekk og felg, Dekkhotell, Bilglass

## High Level Architecture

### Technical Summary

### Actual Tech Stack (from package.json)

| Category  | Technology | Version | Notes                      |
| --------- | ---------- | ------- | -------------------------- |
| Runtime   | Node.js    | Current | Next.js 15.1.6 runtime    |
| Framework | Next.js    | 15.1.6  | Static export configuration |
| Language  | TypeScript | 5.9.2   | Strict typing enabled      |
| Styling   | Tailwind   | 4.1.13  | Latest version with v4 features |
| UI        | Shadcn/UI  | Latest  | Radix UI based components  |
| CMS       | DecapCMS   | Latest  | Git-based CMS for content  |
| Hosting   | Netlify    | N/A     | Static site deployment     |

### Repository Structure Reality Check

- Type: Monorepo (single Next.js application)
- Package Manager: npm (package-lock.json present)
- Notable: Static export configuration (`output: 'export'`) for Netlify deployment

## Source Tree and Module Organization

### Project Structure (Actual)

```text
project-root/
├── src/
│   ├── components/          # React components
│   │   ├── meta/           # SEO meta components
│   │   ├── ui/             # Shadcn/UI components
│   │   └── [other components]
│   ├── contexts/           # React contexts (ThemeContext)
│   ├── lib/                # Utility functions and data loading
│   ├── pages/              # Next.js pages (Pages Router)
│   └── config/             # Configuration files
├── content/                # MDX content for CMS
│   ├── pages/              # Static pages
│   └── posts/              # Blog posts
├── public/                 # Static assets
│   ├── admin/              # DecapCMS configuration
│   └── styles/             # Global CSS
├── docs/                   # Project documentation
└── config.json             # Site configuration
```

### Key Modules and Their Purpose

- **Layout System**: `src/components/Layout.tsx` - Main layout wrapper with Header
- **Navigation**: `src/config/navigation.ts` - Navigation structure and active state logic
- **Content Management**: `src/lib/posts.ts`, `src/lib/pages.ts` - MDX content loading
- **Meta Components**: `src/components/meta/` - SEO and social media meta tags
- **Theme System**: `src/contexts/ThemeContext.tsx` - Dark/light theme toggle
- **CMS Integration**: DecapCMS configuration in `public/admin/config.yml`

## Data Models and APIs

### Data Models

Currently using file-based content management:

- **Blog Posts**: MDX files in `content/posts/` with frontmatter
- **Static Pages**: MDX files in `content/pages/` with frontmatter
- **Site Configuration**: JSON file at `config.json`
- **Authors & Tags**: YAML files in `meta/` directory

### API Specifications

- **No REST APIs**: Static site generation with no server-side endpoints
- **Netlify Forms**: Will be implemented for contact form submissions
- **DecapCMS API**: Git-based content management through Netlify

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Navigation Mismatch**: Current navigation (Home, Blog, Program, Partners, About, Contact) doesn't match PRD requirements (Hjem, Tjenester, Blogg, Om Oss, Kontakt)
2. **Generic Content**: All content is currently blog/template focused, needs complete transformation to mechanic-specific content
3. **Missing Service Pages**: No service pages exist yet (Verksted, Dekk og felg, etc.)
4. **Contact Form**: Basic contact page exists but no Netlify Forms integration
5. **Language**: All content currently in English, needs Norwegian translation

### Workarounds and Gotchas

- **Static Export**: Next.js configured for static export (`output: 'export'`) - dynamic features limited
- **Image Optimization**: Next.js Image component available but needs configuration for static export
- **Styling**: Global CSS in `public/styles/` - mixed with Tailwind approach
- **Build Process**: Custom webpack configuration for YAML and SVG loading

## Integration Points and External Dependencies

### External Services

| Service  | Purpose  | Integration Type | Key Files                      |
| -------- | -------- | ---------------- | ------------------------------ |
| Netlify  | Hosting   | Static deployment | `netlify.toml`, `next.config.js` |
| DecapCMS | Content   | Git-based CMS    | `public/admin/config.yml`      |
| GitHub   | Repository | Git integration  | DecapCMS backend config        |

### Internal Integration Points

- **Content Management**: DecapCMS → Git → Netlify build pipeline
- **Theme System**: Context provider wraps entire app in `_app.tsx`
- **Navigation**: Centralized configuration with active state detection
- **Meta Tags**: Consistent SEO implementation across all pages

## Development and Deployment

### Local Development Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Access CMS: Navigate to `/admin` for DecapCMS interface
4. Content editing: Edit MDX files in `content/` directory

### Build and Deployment Process

- **Build Command**: `npm run build` (creates static export in `dist/`)
- **Deployment**: Netlify automatic deployment from main branch
- **Environments**: Single production environment (no staging configured)

## Testing Reality

### Current Test Coverage

- Unit Tests: Minimal configuration with Jest (`jest.config.js`)
- Integration Tests: None currently implemented
- E2E Tests: None
- Manual Testing: Primary QA method

### Running Tests

```bash
npm test           # Runs unit tests (minimal coverage)
```

## Enhancement Impact Analysis

### Files That Will Need Modification

Based on the PRD requirements, these files will be affected:

- `src/pages/index.tsx` - Complete transformation to mechanic homepage
- `src/config/navigation.ts` - Update navigation structure and labels
- `src/components/Header.tsx` - Add phone number prominence, Norwegian labels
- `src/pages/about.tsx` - Transform to "Om Oss" with mechanic information
- `src/pages/contact.tsx` - Enhance with Netlify Forms and Norwegian fields
- `src/pages/program.tsx` - Repurpose or remove (not in PRD requirements)
- `src/pages/partners.tsx` - Repurpose or remove (not in PRD requirements)
- `config.json` - Update site title, description, and metadata
- `public/admin/config.yml` - Add Norwegian content fields

### New Files/Modules Needed

- `src/pages/tjenester/[service].tsx` - Dynamic service page template
- `src/components/ServiceCard.tsx` - Service display component
- `src/components/ContactForm.tsx` - Norwegian contact form component
- `src/components/TrustIndicator.tsx` - Trust building components
- `content/pages/verksted.mdx` - Verksted service page content
- `content/pages/dekk-og-felg.mdx` - Dekk og felg service page content
- `content/pages/dekkhotell.mdx` - Dekkhotell service page content
- `content/pages/bilglass.mdx` - Bilglass service page content

### Integration Considerations

- Must maintain existing Shadcn/UI component patterns
- Norwegian language support throughout the application
- Netlify Forms integration for contact functionality
- Image optimization with Next.js Image component
- DecapCMS configuration for Norwegian content editing

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
npm run dev         # Start development server
npm run build       # Production build (static export)
npm run start       # Start production server
npm test            # Run unit tests
```

### Development Workflow

1. **Content Updates**: Edit MDX files in `content/` directory
2. **Component Development**: Create components in `src/components/`
3. **Styling**: Use Tailwind classes with existing theme system
4. **CMS Management**: Access `/admin` for DecapCMS interface
5. **Deployment**: Push to main branch for automatic Netlify deployment

### Debugging and Troubleshooting

- **Development Server**: Runs on port 3000 by default
- **Static Export Issues**: Check `next.config.js` export configuration
- **Styling Issues**: Verify Tailwind configuration and CSS imports
- **Content Issues**: Check MDX frontmatter and file structure

## Norwegian Localization Requirements

### Language Implementation

- **All UI Text**: Translate to Norwegian (Hjem, Tjenester, Blogg, Om Oss, Kontakt)
- **Form Fields**: Norwegian labels (Navn, E-post, Telefon, Melding)
- **Date Formats**: Norwegian date formatting (DD.MM.YYYY)
- **Currency**: Norwegian krone formatting (kr 1.234,56)
- **Phone Numbers**: Norwegian format (+47 12 34 56 78)

### Cultural Considerations

- **"Koselig" Atmosphere**: Warm, welcoming design elements
- **Hospitality Cues**: Coffee invitation imagery and text
- **Local Focus**: Emphasize local community connection
- **Practicality**: Clear, straightforward information presentation
- **Trust Building**: Authentic photos and transparent business information

---

**Brownfield Architecture Document Complete**

This document captures the current state of the Next.js blog template codebase and provides the foundation for transforming it into a Norwegian car mechanic website. The existing Shadcn/UI and Tailwind v4 foundation provides a solid base for implementing the PRD requirements while maintaining code quality and developer experience.