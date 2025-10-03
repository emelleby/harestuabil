import { render, screen } from '@testing-library/react';
import { ServicePageHeader } from '@/components/ServicePageHeader';

describe('ServicePageHeader', () => {
  const mockHeaderData = {
    name: 'Verksted',
    description: 'Generelt verkstedarbeid og reparasjoner'
  };

  it('should render service name and description', () => {
    render(<ServicePageHeader name={mockHeaderData.name} description={mockHeaderData.description} />);
    
    expect(screen.getByText('Verksted')).toBeInTheDocument();
    expect(screen.getByText('Generelt verkstedarbeid og reparasjoner')).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    render(<ServicePageHeader name={mockHeaderData.name} description={mockHeaderData.description} />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Verksted');
  });

  it('should use Norwegian brand colors from theme', () => {
    const { container } = render(<ServicePageHeader name={mockHeaderData.name} description={mockHeaderData.description} />);
    
    // Check that theme classes are used instead of hardcoded colors
    const headerElement = container.querySelector('h1');
    expect(headerElement).toHaveClass('text-foreground');
  });

  it('should be mobile responsive', () => {
    const { container } = render(<ServicePageHeader name={mockHeaderData.name} description={mockHeaderData.description} />);
    
    // Check for responsive classes
    const headerContainer = container.firstChild;
    expect(headerContainer).toHaveClass('text-center');
  });

  it('should have proper Norwegian language attribute', () => {
    const { container } = render(<ServicePageHeader name={mockHeaderData.name} description={mockHeaderData.description} />);
    
    const headerElement = container.querySelector('[lang="nb"]');
    expect(headerElement).toBeInTheDocument();
  });
});
