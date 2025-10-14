import { render, screen, fireEvent } from '@testing-library/react'
import { OfteStilteSporsmal } from '../components/OfteStilteSporsmal'

// Mock the UI components
jest.mock('../components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid='card'>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='card-content'>{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='card-header'>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid='card-title'>{children}</h3>
  ),
}))

// Mock the Accordion components
jest.mock('../components/ui/accordion', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='accordion'>{children}</div>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='accordion-content'>{children}</div>
  ),
  AccordionItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid='accordion-item' data-value={value}>
      {children}
    </div>
  ),
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <button data-testid='accordion-trigger'>{children}</button>
  ),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  HelpCircle: () => <div data-testid='help-circle-icon' />,
}))

describe('OfteStilteSporsmal Component', () => {
  const mockFAQItems = [
    {
      id: '1',
      question: 'Hvor lang tid tar en vanlig service?',
      answer: 'En vanlig service tar vanligvis 2-4 timer.',
    },
    {
      id: '2',
      question: 'Tilbyr dere henteservice?',
      answer: 'Ja, vi tilbyr henteservice innenfor Oslo-området.',
    },
    {
      id: '3',
      question: 'Hvor mye koster en service?',
      answer: 'Prisen varierer avhengig av bilmodell og arbeider.',
    },
  ]

  it('should display FAQ section with Norwegian heading', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    expect(screen.getByText('Ofte Stilte Spørsmål')).toBeInTheDocument()
    expect(screen.getByTestId('help-circle-icon')).toBeInTheDocument()
  })

  it('should display all FAQ questions', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    expect(screen.getByText('Hvor lang tid tar en vanlig service?')).toBeInTheDocument()
    expect(screen.getByText('Tilbyr dere henteservice?')).toBeInTheDocument()
    expect(screen.getByText('Hvor mye koster en service?')).toBeInTheDocument()
  })

  it('should display FAQ answers', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    expect(screen.getByText('En vanlig service tar vanligvis 2-4 timer.')).toBeInTheDocument()
    expect(
      screen.getByText('Ja, vi tilbyr henteservice innenfor Oslo-området.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Prisen varierer avhengig av bilmodell og arbeider.')
    ).toBeInTheDocument()
  })

  it('should implement expandable/collapsible FAQ items with accordion', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    // Should have accordion structure
    expect(screen.getByTestId('accordion')).toBeInTheDocument()
    expect(screen.getAllByTestId('accordion-item')).toHaveLength(3)
    expect(screen.getAllByTestId('accordion-trigger')).toHaveLength(3)
    expect(screen.getAllByTestId('accordion-content')).toHaveLength(3)
  })

  it('should use default FAQ items when none provided', () => {
    render(<OfteStilteSporsmal />)

    // Should display default Norwegian FAQ items
    expect(screen.getByText('Ofte Stilte Spørsmål')).toBeInTheDocument()
    expect(screen.getByText(/Hvor lang tid tar en vanlig service/)).toBeInTheDocument()
    expect(screen.getByText(/Tilbyr dere henteservice/)).toBeInTheDocument()
    expect(screen.getByText(/Hvor mye koster en service/)).toBeInTheDocument()
    expect(screen.getByText(/Kan jeg vente mens bilen blir reparert/)).toBeInTheDocument()
    expect(screen.getByText(/Hvor lang garanti gir dere/)).toBeInTheDocument()
    expect(screen.getByText(/Må jeg bestille time på forhånd/)).toBeInTheDocument()
  })

  it('should have proper Norwegian language content', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    // Check for Norwegian heading
    expect(screen.getByText('Ofte Stilte Spørsmål')).toBeInTheDocument()

    // Check for Norwegian question words (multiple instances expected)
    expect(screen.getAllByText(/Hvor/)).toHaveLength(2) // "Hvor lang tid" and "Hvor mye koster"
    expect(screen.getByText(/Tilbyr/)).toBeInTheDocument() // "Tilbyr dere"
  })

  it('should have accordion items with proper value attributes', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    const accordionItems = screen.getAllByTestId('accordion-item')
    expect(accordionItems[0]).toHaveAttribute('data-value', '1')
    expect(accordionItems[1]).toHaveAttribute('data-value', '2')
    expect(accordionItems[2]).toHaveAttribute('data-value', '3')
  })

  it('should render questions as accordion triggers', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    const triggers = screen.getAllByTestId('accordion-trigger')
    expect(triggers[0]).toHaveTextContent('Hvor lang tid tar en vanlig service?')
    expect(triggers[1]).toHaveTextContent('Tilbyr dere henteservice?')
    expect(triggers[2]).toHaveTextContent('Hvor mye koster en service?')
  })

  it('should render answers as accordion content', () => {
    render(<OfteStilteSporsmal faqItems={mockFAQItems} />)

    const contents = screen.getAllByTestId('accordion-content')
    expect(contents[0]).toHaveTextContent('En vanlig service tar vanligvis 2-4 timer.')
    expect(contents[1]).toHaveTextContent('Ja, vi tilbyr henteservice innenfor Oslo-området.')
    expect(contents[2]).toHaveTextContent('Prisen varierer avhengig av bilmodell og arbeider.')
  })
})
