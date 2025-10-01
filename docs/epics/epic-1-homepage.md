# Epic 1: Homepage Design & Implementation

## Overview

Transform the existing Next.js blog template homepage into a compelling, conversion-focused Norwegian mechanic website homepage that immediately communicates the local value proposition, establishes trust through authentic imagery, and drives contact form engagement.

## Epic Goal

Create a professional, trustworthy homepage that embodies Norwegian "koselig" hospitality while clearly communicating the local mechanic value proposition and driving customer engagement.

## Business Value

- **First Impression**: Create immediate trust and credibility with potential customers
- **Local Connection**: Establish the business as a local Norwegian alternative to city shops
- **Conversion Driver**: Guide visitors toward contact forms and service inquiries
- **Brand Foundation**: Set the visual and tonal direction for the entire website

## User Stories

### Story 1.1: Hero Section with Authentic Norwegian Messaging
**As a** local Norwegian car owner searching for mechanic services,  
**I want** to immediately see a welcoming hero section with authentic local imagery and clear value proposition,  
**so that** I feel this is the trustworthy, convenient local alternative to big city shops.

### Story 1.2: Value Proposition & Service Highlights
**As a** potential customer evaluating local options,  
**I want** to quickly understand the specific advantages of choosing this local mechanic,  
**so that** I can make an informed decision without reading extensive content.

### Story 1.3: Trust Indicators & Social Proof
**As a** skeptical Norwegian consumer,  
**I want** to see evidence that other local customers trust this mechanic,  
**so that** I feel confident choosing them for my car maintenance needs.

### Story 1.4: Navigation & Footer Polish
**As a** website visitor wanting to explore services or contact the shop,  
**I want** clear, intuitive navigation and comprehensive footer information,  
**so that** I can easily find what I need and understand the business details.

## Technical Requirements

### Design System Integration
- Use existing Shadcn/UI components and Tailwind v4 styling
- Implement Norwegian color palette (deep blue #1e3a5f, warm brown #8b4513, accent orange #d2691e)
- Apply responsive design with mobile-first approach
- Ensure WCAG AA accessibility compliance

### Content Requirements
- Norwegian language throughout (Bokmål)
- Authentic imagery (stock photos/placeholders for development)
- Clear value proposition: "Din lokale bilpartner - med god kaffe og personlig service som sparer deg tid, penger og frustrasjoner"
- Contact information prominently displayed

### Performance Requirements
- Core Web Vitals "Good" scores
- Load under 3 seconds on 4G mobile
- Optimize images with Next.js Image component
- Implement lazy loading for below-the-fold content

## Dependencies

### Prerequisites
- Existing Shadcn/UI and Tailwind v4 setup
- Norwegian language constants defined
- Image assets prepared (stock photos for development)

### Integration Points
- Navigation system (src/config/navigation.ts)
- Contact page linking
- Service pages navigation
- Footer components

## Acceptance Criteria

### Hero Section
- [ ] Full-width hero section with authentic workshop photo
- [ ] Value proposition prominently displayed in Norwegian
- [ ] Primary CTA button linking to contact form
- [ ] Secondary CTA for service exploration
- [ ] Mobile-optimized layout with responsive text sizing
- [ ] Accessibility compliance with proper ARIA labels

### Value Proposition Section
- [ ] 3-4 key advantages with relevant iconography
- [ ] Clear, concise Norwegian descriptions
- [ ] Mobile-responsive grid layout
- [ ] Consistent visual design with hero section
- [ ] Hover states or micro-interactions for engagement

### Trust Indicators Section
- [ ] Customer testimonials section (placeholder content)
- [ ] Years in business or local establishment indicators
- [ ] Certifications or professional badges if applicable
- [ ] Mobile-optimized carousel or grid layout
- [ ] Authentic, non-corporate styling

### Navigation & Footer
- [ ] Responsive navigation with Norwegian labels
- [ ] Mobile hamburger menu with smooth animations
- [ ] Footer with complete business information
- [ ] Social media links if applicable
- [ ] Consistent styling with existing components

## Implementation Notes

### Technical Considerations
- Maintain existing component patterns for consistency
- Use CSS variables for Norwegian brand colors
- Implement responsive images with Next.js Image component
- Ensure proper Norwegian language attributes (lang="nb")

### Content Considerations
- All text must be in Norwegian Bokmål
- Cultural references should feel authentic to Norwegian users
- Coffee invitation imagery and text where appropriate
- Local community focus throughout

### Performance Considerations
- Optimize hero image for fast loading
- Implement lazy loading for non-critical images
- Minimize JavaScript for better mobile performance
- Test on Norwegian network conditions

## Definition of Done

- [ ] All user stories implemented with acceptance criteria met
- [ ] Homepage fully responsive across all device sizes
- [ ] Norwegian language implementation complete
- [ ] Accessibility compliance verified (WCAG AA)
- [ ] Performance targets met (Core Web Vitals "Good")
- [ ] Cross-browser compatibility tested
- [ ] Integration with navigation and footer confirmed
- [ ] Contact form links functional
- [ ] Ready for review and deployment

## Risks and Mitigations

### Risk 1: Image Asset Availability
**Mitigation**: Use high-quality stock photos for development, plan for authentic photoshoot before launch

### Risk 2: Norwegian Cultural Authenticity
**Mitigation**: Review with Norwegian stakeholders, incorporate cultural references throughout

### Risk 3: Mobile Performance
**Mitigation**: Optimize images, implement lazy loading, test on actual Norwegian mobile devices

## Success Metrics

- Page load time under 3 seconds on 4G mobile
- Contact form click-through rate from homepage > 15%
- Mobile usability score > 95%
- Time on page > 2 minutes
- Bounce rate < 40%

---

**Epic 1 Complete** ✅

This epic provides the foundation for the Norwegian mechanic website by creating a compelling, trustworthy homepage that establishes the local value proposition and drives customer engagement.