# Local Norwegian Car Mechanic Website - Streamlined UI/UX Specification

## Introduction

This streamlined specification defines the minimum viable user experience for the Norwegian car mechanic website, focusing exclusively on essential features that directly solve core user problems. All features are evaluated based on: direct user impact on core tasks (high), business value (contributes to primary KPIs), technical feasibility (minimal complexity), and usage frequency (supports daily activities).

## Core User Goals & Principles

### Target User Persona
**Local Norwegian Car Owner** - Needs convenient, trustworthy car maintenance without traveling to the city. Values practicality, reliability, and personal service.

### Core Usability Goals
- Find contact information within 10 seconds of landing on site
- Complete contact form submission on mobile in under 2 minutes
- Understand services offered without extensive reading
- Feel confident in mechanic's credibility within 30 seconds

### Essential Design Principles
1. **Contact First** - Phone number and contact form immediately visible
2. **Mobile Optimized** - Designed for mobile-first local searches
3. **Clear Services** - Simple, understandable service descriptions
4. **Trust Signals** - Authentic photos and clear business information

## Essential Information Architecture

### Site Structure
```
Hjem (Home)
├── Tjenester (Services)
│   ├── Verksted (Workshop)
│   ├── Dekk og felg (Tires & Rims)
│   ├── Dekkhotell (Tire Hotel)
│   └── Bilglass (Auto Glass)
├── Blogg (Blog)
├── Om Oss (About Us)
└── Kontakt (Contact)
```

**Justification:** Simple, flat structure enables users to find any page within 2 clicks, supporting the primary goal of quick contact and service information discovery.

### Navigation Structure
- **Primary Navigation:** Hjem, Tjenester, Blogg, Om Oss, Kontakt
- **Mobile:** Hamburger menu with phone number prominently displayed
- **Contact Priority:** Phone number in header on all pages

**Justification:** Norwegian users expect simple navigation with immediate access to contact information for local services.

## Critical User Flows

### Emergency Contact Flow
**Goal:** Enable immediate contact for urgent car problems

**Path:** Homepage → Phone number click OR Contact page → Form submission

**Justification:** Emergency situations are the highest priority use case for mechanic services. Direct phone access is essential for Norwegian users in urgent situations.

### Service Information Flow
**Goal:** Help users understand services and benefits quickly

**Path:** Homepage → Tjenester → Specific service → Contact

**Justification:** Users need to understand what services are offered before committing to contact. Clear service information builds trust and reduces friction.

## Essential Wireframes

### Homepage
**Required Elements:**
- Header with logo, navigation, and prominent phone number
- Hero section with authentic workshop photo and value proposition
- Service overview with 4 main services and brief descriptions
- Contact information section with phone, email, and address
- Simple footer with business hours

**Justification:** Homepage must immediately establish credibility, show services, and provide contact options to support the primary conversion goal.

### Service Pages
**Required Elements:**
- Service name and brief description
- Key benefits (3-4 bullet points)
- Contact button
- Related services (simple links)

**Justification:** Service pages need to provide essential information without overwhelming users, supporting quick decision-making.

### Contact Page
**Required Elements:**
- Contact form with fields: Navn, E-post, Telefon, Melding
- Phone number with click-to-call
- Address with map
- Business hours
- Simple FAQ (3-4 common questions)

**Justification:** Contact page must provide multiple contact methods and essential business information to accommodate different user preferences.

### Blog Listing
**Required Elements:**
- Simple list of articles with title, date, and brief excerpt
- Category filtering (Vedlikehold, Tips, Sesonnguide)
- Pagination

**Justification:** Blog builds trust and expertise but should remain simple to maintain focus on core service information.

## Core Component Library

### Header & Navigation
**Variants:** Desktop horizontal navigation, Mobile hamburger menu
**States:** Default, Mobile menu open
**Usage:** Consistent navigation with phone number prominence

**Justification:** Navigation is the primary way users find information and contact options.

### Service Card
**Variants:** Grid layout (3 columns desktop, 1 column mobile)
**States:** Default with hover effect
**Usage:** Display services consistently across the site

**Justification:** Service cards provide scannable information about offerings, supporting quick decision-making.

### Contact Form
**Variants:** Full form on contact page, simplified on service pages
**States:** Default, Validation errors, Success
**Usage:** Enable users to contact the mechanic with specific inquiries

**Justification:** Contact form is the primary conversion tool for users who prefer digital communication over phone calls.

### Blog Card
**Variants:** List layout for blog listing
**States:** Default with hover effect
**Usage:** Display blog posts in a consistent, scannable format

**Justification:** Blog cards support trust-building through expertise demonstration while maintaining simplicity.

## Essential Branding & Style

### Color Palette
As per existing theme in globals.css

### Typography
- **Primary:** Inter - Clean, modern sans-serif
- **Type Scale:** H1 (2.5rem), H2 (2rem), H3 (1.5rem), Body (1rem)
- **Norwegian Support:** Proper rendering of æ, ø, å characters

**Justification:** Clear typography ensures readability and professional appearance while supporting Norwegian language requirements.

## Core Accessibility Requirements

### Compliance Target
WCAG 2.1 AA compliance with Norwegian accessibility requirements

### Essential Requirements
- **Color Contrast:** Minimum 4.5:1 for normal text
- **Keyboard Navigation:** Full keyboard access to all interactive elements
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Touch Targets:** Minimum 44px × 44px for mobile

**Justification:** Accessibility is essential for serving all Norwegian users, including elderly demographic common for mechanic services.

## Mobile-First Responsiveness

### Breakpoints
- **Mobile:** 320px - 767px (Primary focus)
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

### Mobile Adaptations
- Single column layout
- Large touch targets (minimum 44px)
- Prominent phone number with click-to-call
- Simplified navigation with hamburger menu

**Justification:** Norwegian users primarily search for local services on mobile devices, making mobile optimization critical for business success.

## Performance Requirements

### Core Goals
- Page load under 3 seconds on 4G mobile
- Contact form completion under 2 minutes
- Animation performance at 60fps

### Essential Optimizations
- Next.js Image component for all images
- Lazy loading for below-the-fold content
- Minimal third-party dependencies
- Optimized for Norwegian network conditions

**Justification:** Performance directly impacts user experience and search rankings, critical for local business discovery.

## Implementation Priorities

### Phase 1: Foundation (Week 1-2)
1. Setup Next.js with Tailwind v4 and Shadcn/UI
2. Create basic layout structure with responsive navigation
3. Implement homepage with hero section and service overview
4. Build contact page with Netlify Forms integration

### Phase 2: Core Pages (Week 3-4)
1. Create service pages with consistent template
2. Implement blog listing and individual post templates
3. Add about page with basic business information
4. Ensure mobile responsiveness across all pages

### Phase 3: Polish & Launch (Week 5-6)
1. Optimize performance and accessibility
2. Test on Norwegian mobile devices and networks
3. Finalize content and imagery
4. Launch with basic analytics setup

## Success Metrics

### Core KPIs
- Contact form completion rate: 80%+
- Mobile usability score: 95%+
- Page load time: Under 3 seconds on 4G
- Local search ranking improvement for Norwegian keywords

### Business Impact
- Increase in local customer inquiries by 30% within 6 months
- Reduction in basic information phone calls
- Positive feedback on website usability from Norwegian customers

---

**Streamlined Specification Complete** 🎯

This specification contains only essential features required to solve core user problems effectively. All features are justified based on direct user impact, business value, technical feasibility, and usage frequency. Nice-to-have features have been moved to a separate backlog document for future consideration.