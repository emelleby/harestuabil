# Local Norwegian Car Mechanic Website - Coding Standards

## Introduction

This document defines the coding standards and best practices for the Local Norwegian Car Mechanic Website project. These standards ensure consistency, maintainability, and quality across the codebase while supporting Norwegian language requirements and cultural considerations.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-01 | 1.0 | Initial coding standards definition | Winston (Architect) |

## General Principles

### Code Philosophy

1. **Clarity Over Cleverness**: Write code that is immediately understandable to Norwegian developers
2. **Consistency is Key**: Follow established patterns throughout the codebase
3. **Norwegian First**: Prioritize Norwegian language requirements and cultural context
4. **Performance Conscious**: Consider Norwegian network conditions and device usage patterns
5. **Accessibility by Default**: Ensure all code meets Norwegian accessibility standards

### Development Approach

- **Mobile-First Development**: Design for mobile devices first, then enhance for larger screens
- **Progressive Enhancement**: Ensure functionality works without JavaScript, then enhance
- **Component-Based Thinking**: Build reusable, self-contained components
- **Semantic HTML**: Use HTML elements for their intended purpose

## TypeScript Standards

### Type Definitions

```typescript
// Use descriptive type names with Norwegian context where appropriate
interface ServiceInfo {
  id: string;
  navn: string; // Use Norwegian property names for domain-specific concepts
  beskrivelse: string;
  pris?: number; // Optional properties
  varighet: number; // Duration in minutes
}

// Use union types for Norwegian-specific enums
type ServiceType = 'verksted' | 'dekk-og-felg' | 'dekkhotell' | 'bilglass';

// Use generic types with Norwegian documentation
interface KontaktSkjema<T> {
  // Skjemadata for kontaktskjema
  data: T;
  status: 'innsendt' | 'behandlings' | 'fullført';
}
```

### Function Naming

```typescript
// Use Norwegian function names for domain-specific logic
function beregnServicePris(serviceType: ServiceType, varighet: number): number {
  // Calculate service price based on type and duration
  return basePriser[serviceType] * (varighet / 60);
}

// Use English for generic utility functions
function formatDate(date: Date): string {
  // Format date according to Norwegian standards
  return date.toLocaleDateString('nb-NO');
}
```

## React Component Standards

### Component Structure

```tsx
// File: src/components/ServiceCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ServiceInfo } from '@/types/service';

interface ServiceCardProps {
  service: ServiceInfo;
  onKontakt?: (serviceId: string) => void;
}

export function ServiceCard({ service, onKontakt }: ServiceCardProps): React.ReactElement {
  return (
    <div className="service-card">
      <h3 className="service-title">{service.navn}</h3>
      <p className="service-description">{service.beskrivelse}</p>
      {service.pris && (
        <p className="service-price">Fra {service.pris} kr</p>
      )}
      <Button onClick={() => onKontakt?.(service.id)}>
        Kontakt oss
      </Button>
    </div>
  );
}
```

### Component Naming Conventions

- **Use PascalCase** for component names: `ServiceCard`, `KontaktSkjema`
- **Use Norwegian names** for domain-specific components: `VerkstedInfo`, `DekkhotellPriser`
- **Use English names** for generic components: `Button`, `Modal`, `Layout`
- **File names** should match component names: `ServiceCard.tsx`

### Props Interface

```typescript
// Always define props interface
interface KontaktSkjemaProps {
  onSubmit: (data: KontaktData) => void;
  serviceType?: ServiceType;
  className?: string;
  children?: React.ReactNode;
}

// Use default props where appropriate
export function KontaktSkjema({
  onSubmit,
  serviceType,
  className = '',
  children
}: KontaktSkjemaProps) {
  // Component implementation
}
```

## CSS and Styling Standards

### Tailwind CSS Usage

```tsx
// Use Tailwind classes with Norwegian comments
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-6 p-4 md:p-6 lg:p-8
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
  {/* Tjeneste-grid responsivt oppsett */}
</div>

// Use CSS variables for Norwegian-specific values
:root {
  --farge-hoved: #1e3a5f; /* Hovedfarge for merkevaren */
  --farge-sekundær: #8b4513; /* Sekundærfarge for aksenter */
  --farge-suksess: #2d6a4f; /* Suksessføre for bekreftelser */
}
```

### Component-Specific Styles

```tsx
// Use CSS modules for complex component-specific styles
import styles from './ServiceCard.module.css';

<div className={styles.serviceCard}>
  <h3 className={styles.title}>{service.navn}</h3>
</div>
```

### Responsive Design

```tsx
// Mobile-first approach with Tailwind breakpoints
<div className="
  w-full px-4 py-2        // Mobile (default)
  sm:px-6 sm:py-3        // Small screens
  md:px-8 md:py-4        // Medium screens
  lg:px-10 lg:py-5       // Large screens
">
  {/* Innhold med responsiv padding */}
</div>
```

## File Organization Standards

### Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Shadcn/UI components
│   ├── forms/          # Form-specific components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
│       ├── services/   # Service-related components
│       ├── contact/    # Contact-related components
│       └── blog/       # Blog-related components
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── pages/              # Next.js pages
└── styles/             # Global styles and CSS modules
```

### File Naming

- **Components**: PascalCase with `.tsx` extension: `ServiceCard.tsx`
- **Utilities**: camelCase with `.ts` extension: `formatPris.ts`
- **Types**: camelCase with `.ts` extension: `serviceTypes.ts`
- **Hooks**: camelCase with `use` prefix: `useKontaktSkjema.ts`
- **Constants**: UPPER_SNAKE_CASE: `SERVICE_PRISER.ts`

## Content and Language Standards

### Norwegian Language Implementation

```typescript
// Language constants for Norwegian UI text
export const NORWEGIAN_TEXTS = {
  navigation: {
    hjem: 'Hjem',
    tjenester: 'Tjenester',
    blogg: 'Blogg',
    omOss: 'Om Oss',
    kontakt: 'Kontakt',
  },
  services: {
    verksted: 'Verksted',
    dekkOgFelg: 'Dekk og felg',
    dekkhotell: 'Dekkhotell',
    bilglass: 'Bilglass',
  },
  contact: {
    navn: 'Navn',
    epost: 'E-post',
    telefon: 'Telefon',
    melding: 'Melding',
    send: 'Send inn',
  },
};
```

### Date and Number Formatting

```typescript
// Norwegian date formatting
function formaterDato(dato: Date): string {
  return dato.toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Norwegian currency formatting
function formaterPris(pris: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(pris);
}

// Norwegian phone number formatting
function formaterTelefonnummer(telefon: string): string {
  // Format as +47 XX XX XX XX
  const cleaned = telefon.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `+47 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
  }
  return telefon;
}
```

## Performance Standards

### Image Optimization

```tsx
// Use Next.js Image component for all images
import Image from 'next/image';

<Image
  src="/images/verksted.jpg"
  alt="Moderne verksted med utstyr"
  width={800}
  height={600}
  className="rounded-lg shadow-md"
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```typescript
// Dynamic imports for code splitting
const KontaktSkjema = dynamic(() => import('@/components/KontaktSkjema'), {
  loading: () => <div>Laster kontaktskjema...</div>,
  ssr: false, // Client-side only for interactive components
});
```

### Bundle Optimization

```typescript
// Import specific functions instead of entire libraries
import { format } from 'date-fns'; // Instead of importing entire date-fns
import { clsx } from 'clsx'; // Instead of utility libraries with many unused functions
```

## Testing Standards

### Unit Tests

```typescript
// Test file: src/components/__tests__/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '../ServiceCard';

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    navn: 'Verksted',
    beskrivelse: 'Generelt verkstedarbeid',
    pris: 500,
  };

  it('should display service name in Norwegian', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Verksted')).toBeInTheDocument();
  });

  it('should display price in Norwegian currency format', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Fra 500 kr')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// Test file: src/__tests__/kontakt-skjema.integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { KontaktSkjema } from '@/components/KontaktSkjema';

describe('KontaktSkjema Integration', () => {
  it('should submit form with Norwegian data', async () => {
    const mockSubmit = jest.fn();
    render(<KontaktSkjema onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/navn/i), {
      target: { value: 'Ola Nordmann' },
    });
    fireEvent.change(screen.getByLabelText(/epost/i), {
      target: { value: 'ola@eksempel.no' },
    });
    fireEvent.click(screen.getByText(/send/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      navn: 'Ola Nordmann',
      epost: 'ola@eksempel.no',
    });
  });
});
```

## Accessibility Standards

### ARIA Implementation

```tsx
// Norwegian ARIA labels and descriptions
<button
  aria-label="Send kontaktskjema"
  aria-describedby="skjema-hjelpetekst"
  className="btn btn-primary"
>
  Send
</button>
<div id="skjema-hjelpetekst" className="sr-only">
  Fyll ut alle påkrevde felter og klikk send for å kontakte oss
</div>
```

### Semantic HTML

```tsx
// Use semantic HTML elements with Norwegian language
<main lang="nb" className="hovedinnhold">
  <section aria-labelledby="tjenester-tittel">
    <h2 id="tjenester-tittel">Våre tjenester</h2>
    <div className="tjenester-grid">
      {/* Service cards */}
    </div>
  </section>
</main>
```

## Git Standards

### Commit Messages

```bash
# Use Norwegian commit messages when appropriate
feat: legg til kontaktskjema med norske felter
fix: reparere responsiv visning på mobil
docs: oppdater dokumentasjon med norske eksempler
refactor: endre navn på service-komponenter til norsk
test: legg til tester for norsk språkstøtte
```

### Branch Naming

```bash
# Use descriptive branch names
feature/norsk-kontaktskjema
feature/service-sider-på-norsk
fix/mobil-responsivitet
docs/norsk-dokumentasjon
```

## Code Review Standards

### Review Checklist

- [ ] Norwegian language implementation is correct
- [ ] Accessibility standards are met (WCAG AA)
- [ ] Mobile responsiveness is implemented
- [ ] Performance optimizations are in place
- [ ] TypeScript types are properly defined
- [ ] Tests are written and passing
- [ ] Component follows established patterns
- [ ] Code is well-documented with Norwegian comments

### Review Comments

```typescript
// Good review comment with Norwegian context
/*
  God implementasjon av kontaktskjemaet! 
  Vurder å legge til validering for norske telefonnummere
  (format: +47 XX XX XX XX) for bedre brukeropplevelse.
  
  Mangler også aria-labels for skjermleser-støtte på norsk.
*/
```

---

**Coding Standards Complete** 📋

These standards ensure consistency, quality, and Norwegian language support throughout the Local Norwegian Car Mechanic Website project. All developers should follow these guidelines to maintain a cohesive and maintainable codebase.