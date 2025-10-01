# Epic 2: Service Pages Completion & Polish

## Overview

Complete all service pages to a production-ready standard, ensure CMS editability for non-technical staff, and maintain consistent Norwegian design language across all service offerings (Verksted, Dekk og felg, Dekkhotell, Bilglass).

## Epic Goal

Create comprehensive, professional service pages that clearly communicate offerings, benefits, and value while maintaining consistent Norwegian design language and enabling easy content management through DecapCMS.

## Business Value

- **Service Clarity**: Clearly communicate what services are offered and their benefits
- **Local Advantage**: Differentiate from city competitors with Norwegian-specific messaging
- **Content Management**: Enable non-technical staff to update service information
- **SEO Foundation**: Establish strong service pages for local search optimization

## User Stories

### Story 2.1: Service Page Template Standardization
**As a** website visitor exploring service options,  
**I want** consistent, clear information across all service pages with uniform layout and navigation,  
**so that** I can easily compare services and understand what each offering includes.

### Story 2.2: Complete Remaining Service Pages
**As a** potential customer looking for specific services,  
**I want** complete information about all offered services with local Norwegian context,  
**so that** I can make an informed decision about which services I need.

### Story 2.3: Service Page Content Polish & SEO Optimization
**As a** local Norwegian searching for specific car services,  
**I want** well-optimized service pages that appear in local search results,  
**so that** I can easily find this local mechanic when searching for my specific needs.

### Story 2.4: Cross-Service Navigation & Conversion Optimization
**As a** visitor comparing multiple services,  
**I want** easy navigation between related services and clear paths to contact,  
**so that** I can quickly get quotes for the specific services I need.

## Technical Requirements

### Page Structure
- Standardized template for all service pages
- Consistent header structure with service name and brief description
- Uniform section organization: Overview, Benefits, Process, Pricing, FAQs
- Mobile-responsive layout matching homepage design patterns
- All pages fully editable via DecapCMS with predefined fields

### CMS Integration
- DecapCMS configuration for Norwegian service content
- Custom fields for service-specific information
- Editorial workflow for content approval
- Preview functionality for content changes

### SEO Implementation
- Norwegian keyword optimization for each service
- Structured data markup (Service, LocalBusiness)
- Meta descriptions and title tags optimized for local search
- Internal linking between related services

## Dependencies

### Prerequisites
- Epic 1: Homepage Design & Implementation completed
- Norwegian language constants defined
- DecapCMS configuration updated for service content
- Service content prepared in Norwegian

### Integration Points
- Navigation system updates for service pages
- Contact form integration with service pre-selection
- Homepage service preview sections
- Blog content linking to services

## Service Pages to Create

### 1. Verksted (General Workshop Services)
- **Content Focus**: General maintenance, repairs, inspections
- **Key Sections**: Service overview, common repairs, maintenance schedule, benefits
- **Norwegian Angle**: Local convenience, personalized service, Norwegian standards compliance

### 2. Dekk og Felg (Tires and Rims)
- **Content Focus**: Tire sales, installation, storage, rim services
- **Key Sections**: Tire brands, seasonal changes, rim selection, pricing
- **Norwegian Angle**: Winter tire expertise, Norwegian road conditions, seasonal preparation

### 3. Dekkhotell (Tire Hotel)
- **Content Focus**: Seasonal tire storage and management
- **Key Sections**: Storage process, benefits, pricing, scheduling
- **Norwegian Angle**: Norwegian seasonal requirements, convenience, cost savings

### 4. Bilglass (Auto Glass)
- **Content Focus**: Windshield repair, replacement, calibration
- **Key Sections**: Service types, insurance handling, quality guarantee
- **Norwegian Angle**: Norwegian weather conditions, safety standards, insurance expertise

## Acceptance Criteria

### Template Standardization
- [ ] Consistent template implemented across all service pages
- [ ] Uniform header structure with service name and brief description
- [ ] Standardized section organization (Overview, Benefits, Process, Pricing, FAQs)
- [ ] Mobile-responsive layout matching homepage design
- [ ] All pages fully editable via DecapCMS
- [ ] Norwegian language implementation throughout

### Service Page Content
- [ ] All four service pages completed with Norwegian content
- [ ] Service-specific imagery reflecting actual workshop capabilities
- [ ] Clear differentiation from big city competitors
- [ ] Consistent call-to-action patterns leading to contact form
- [ ] Norwegian cultural references and local advantages highlighted

### SEO Optimization
- [ ] Each service page includes targeted Norwegian keywords
- [ ] Meta descriptions and title tags optimized for local search
- [ ] Structured data markup implemented on all service pages
- [ ] Internal linking between related services and blog content
- [ ] Image alt text optimized with Norwegian service terminology

### Navigation & Conversion
- [ ] Clear CTAs at multiple points on each page
- [ ] Service comparison table or guide for common combinations
- [ ] Mobile-optimized sticky contact CTA on scroll
- [ ] Consistent contact form pre-population with service type
- [ ] Smooth transitions between service pages maintaining user context

## Implementation Notes

### Technical Considerations
- Create reusable ServicePage component template
- Implement dynamic routing for service pages
- Use CMS data for service content management
- Ensure proper Norwegian language attributes

### Content Considerations
- All service descriptions in Norwegian Bokmål
- Local Norwegian advantages highlighted for each service
- Practical, straightforward information presentation
- Cultural references appropriate for Norwegian customers

### SEO Considerations
- Focus on local Norwegian search terms
- Implement service-specific schema markup
- Optimize for "bilverksted [service] [byen]" searches
- Include location-based keywords throughout

## Definition of Done

- [ ] All four service pages implemented with consistent template
- [ ] Norwegian content complete for all services
- [ ] DecapCMS integration functional for all service content
- [ ] SEO optimization implemented on all pages
- [ ] Mobile responsiveness verified across all service pages
- [ ] Cross-service navigation implemented
- [ ] Contact form integration with service pre-selection
- [ ] Internal linking strategy implemented
- [ ] Ready for review and deployment

## Risks and Mitigations

### Risk 1: Service Content Complexity
**Mitigation**: Work with mechanic to ensure accurate service descriptions, use clear simple language

### Risk 2: CMS Configuration Complexity
**Mitigation**: Test CMS configuration thoroughly, provide clear documentation for content editors

### Risk 3: SEO Implementation
**Mitigation**: Follow Norwegian SEO best practices, validate structured data markup

### Risk 4: Mobile Performance
**Mitigation**: Optimize images, implement lazy loading, test on Norwegian mobile devices

## Success Metrics

- Service pages load under 3 seconds on 4G mobile
- Contact form conversion rate from service pages > 20%
- Local search ranking improvement for service keywords
- Time on service pages > 3 minutes
- Bounce rate < 35%

---

**Epic 2 Complete** ✅

This epic provides comprehensive service pages that clearly communicate offerings, benefits, and value while maintaining consistent Norwegian design language and enabling easy content management through DecapCMS.