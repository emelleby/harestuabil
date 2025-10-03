import { render, screen } from '@testing-library/react';
import ServicePageRoute from '@/pages/tjenester/[service]';
import { ServiceData } from '@/types/service';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Layout component
jest.mock('@/components/Layout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

// Mock BasicMeta component
jest.mock('@/components/meta/BasicMeta', () => {
  return ({ url, title, description }: { url: string; title: string; description: string }) => (
    <div data-testid="basic-meta" data-url={url} data-title={title} data-description={description} />
  );
});

// Mock ServicePage component
jest.mock('@/components/ServicePage', () => {
  return {
    ServicePage: ({ serviceData }: { serviceData: ServiceData }) => (
      <div data-testid="service-page">
        <h1>{serviceData.name}</h1>
        <p>{serviceData.description}</p>
      </div>
    )
  };
});

describe('Service Page Routing', () => {
  const mockServiceData: ServiceData = {
    name: 'Verksted',
    description: 'Generelt verkstedarbeid og reparasjoner for alle bilmerker',
    overview: 'Vi tilbyr omfattende verkstedtjenester for alle bilmerker.',
    benefits: [
      'Erfarne og sertifiserte mekanikere',
      'Moderne diagnostikkutstyr',
      'Originale og kvalitetsreservedeler'
    ],
    process: [
      'Innledende diagnose og feilsøking',
      'Detaljert kostnadsoverslag',
      'Utførelse av reparasjoner og service'
    ],
    pricing: {
      description: 'Fra 950 kr per time',
      details: 'Kontakt oss for et detaljert prisoverslag basert på din bils behov.'
    },
    faqs: [
      {
        question: 'Hvor lang tid tar en standard service?',
        answer: 'En standard service tar vanligvis 2-3 timer, avhengig av bilens tilstand.'
      },
      {
        question: 'Tilbyr dere garanti på arbeidet?',
        answer: 'Ja, vi gir 12 måneders garanti på alt verkstedarbeid.'
      }
    ]
  };

  it('should render service page with correct data', () => {
    render(<ServicePageRoute serviceData={mockServiceData} />);

    expect(screen.getByTestId('service-page')).toBeInTheDocument();
    expect(screen.getByText('Verksted')).toBeInTheDocument();
    expect(screen.getByText('Generelt verkstedarbeid og reparasjoner for alle bilmerker')).toBeInTheDocument();
  });

  it('should set correct meta tags', () => {
    render(<ServicePageRoute serviceData={mockServiceData} />);

    const metaElement = screen.getByTestId('basic-meta');
    expect(metaElement).toHaveAttribute('data-title', 'Verksted');
    expect(metaElement).toHaveAttribute('data-description', 'Generelt verkstedarbeid og reparasjoner for alle bilmerker');
    expect(metaElement).toHaveAttribute('data-url', '/tjenester/verksted');
  });

  it('should handle service data with Norwegian content', () => {
    const norwegianServiceData: ServiceData = {
      name: 'Dekkhotell',
      description: 'Trygg og tørr oppbevaring av dekk gjennom hele året',
      overview: 'Vårt dekkhotell tilbyr profesjonell oppbevaring av dine sesongdekk.',
      benefits: [
        'Trygg og tørr oppbevaring i klimakontrollerte lokaler',
        'Gratis henting og levering av dekk'
      ],
      process: [
        'Bestilling av dekkhotell-plass via telefon eller e-post',
        'Avtale tidspunkt for innlevering av dekk'
      ],
      pricing: {
        description: 'Fra 600 kr per sesong',
        details: 'Prisen inkluderer oppbevaring, vask, merking og henting/levering.'
      },
      faqs: [
        {
          question: 'Hvor lenge kan dekk oppbevares hos dere?',
          answer: 'Vi tilbyr både sesongoppbevaring (6 måneder) og helårsoppbevaring.'
        }
      ]
    };

    render(<ServicePageRoute serviceData={norwegianServiceData} />);

    expect(screen.getByText('Dekkhotell')).toBeInTheDocument();
    expect(screen.getByText('Trygg og tørr oppbevaring av dekk gjennom hele året')).toBeInTheDocument();
  });

  it('should generate correct URL for service with spaces and special characters', () => {
    const serviceWithSpaces: ServiceData = {
      ...mockServiceData,
      name: 'Dekk og felg'
    };

    render(<ServicePageRoute serviceData={serviceWithSpaces} />);

    const metaElement = screen.getByTestId('basic-meta');
    expect(metaElement).toHaveAttribute('data-url', '/tjenester/dekk-og-felg');
  });
});
