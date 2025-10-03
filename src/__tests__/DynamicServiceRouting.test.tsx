import { render, screen } from '@testing-library/react';
import ServicePageRoute from '@/pages/tjenester/[service]';
import { ServiceData } from '@/types/service';

// Mock the Layout component
jest.mock('@/components/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

// Mock the BasicMeta component
jest.mock('@/components/meta/BasicMeta', () => {
  return function MockBasicMeta({ url, title, description }: { url: string; title: string; description: string }) {
    return (
      <div data-testid="basic-meta" data-url={url} data-title={title} data-description={description} />
    );
  };
});

describe('Dynamic Service Routing', () => {
  const mockVerkstedData: ServiceData = {
    name: 'Verksted',
    description: 'Generelt verkstedarbeid og reparasjoner for alle bilmerker',
    overview: 'Vi tilbyr omfattende verkstedtjenester for alle bilmerker.',
    benefits: [
      'Erfarne og sertifiserte mekanikere',
      'Moderne diagnostikkutstyr'
    ],
    process: [
      'Innledende diagnose og feilsøking',
      'Detaljert kostnadsoverslag'
    ],
    pricing: {
      description: 'Fra 950 kr per time',
      details: 'Kontakt oss for et detaljert prisoverslag.'
    },
    faqs: [
      {
        question: 'Hvor lang tid tar en standard service?',
        answer: 'En standard service tar vanligvis 2-3 timer.'
      }
    ]
  };

  it('should render service page with correct layout structure', () => {
    render(<ServicePageRoute serviceData={mockVerkstedData} />);
    
    // Check that Layout wrapper is present
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    
    // Check that BasicMeta is configured correctly
    const basicMeta = screen.getByTestId('basic-meta');
    expect(basicMeta).toHaveAttribute('data-title', 'Verksted');
    expect(basicMeta).toHaveAttribute('data-description', 'Generelt verkstedarbeid og reparasjoner for alle bilmerker');
    expect(basicMeta).toHaveAttribute('data-url', '/tjenester/verksted');
  });

  it('should render service content correctly', () => {
    render(<ServicePageRoute serviceData={mockVerkstedData} />);
    
    // Check that service content is rendered
    expect(screen.getByText('Verksted')).toBeInTheDocument();
    expect(screen.getByText('Generelt verkstedarbeid og reparasjoner for alle bilmerker')).toBeInTheDocument();
    expect(screen.getByText(/Vi tilbyr omfattende verkstedtjenester/)).toBeInTheDocument();
  });

  it('should render Norwegian section headings', () => {
    render(<ServicePageRoute serviceData={mockVerkstedData} />);
    
    // Check Norwegian section headings
    expect(screen.getByText('Oversikt')).toBeInTheDocument();
    expect(screen.getByText('Fordeler')).toBeInTheDocument();
    expect(screen.getByText('Prosess')).toBeInTheDocument();
    expect(screen.getByText('Priser')).toBeInTheDocument();
    expect(screen.getByText('Ofte stilte spørsmål')).toBeInTheDocument();
  });

  it('should handle different service types', () => {
    const mockDekkData: ServiceData = {
      name: 'Dekk og felg',
      description: 'Dekkskift, balansering og felgreparasjoner',
      overview: 'Vi tilbyr komplette dekk- og felgtjenester.',
      benefits: ['Profesjonell dekkmontering'],
      process: ['Vurdering av eksisterende dekk'],
      pricing: {
        description: 'Fra 200 kr per dekk',
        details: 'Prisen inkluderer montering.'
      },
      faqs: [
        {
          question: 'Når bør jeg skifte dekk?',
          answer: 'Sommerdekk bør skiftes når temperaturen er under 7°C.'
        }
      ]
    };

    render(<ServicePageRoute serviceData={mockDekkData} />);
    
    // Check that different service data is rendered correctly
    expect(screen.getByText('Dekk og felg')).toBeInTheDocument();
    expect(screen.getByText('Dekkskift, balansering og felgreparasjoner')).toBeInTheDocument();
    expect(screen.getByText('Fra 200 kr per dekk')).toBeInTheDocument();
  });
});
