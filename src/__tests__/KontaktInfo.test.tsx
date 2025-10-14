import { render, screen } from '@testing-library/react'
import { KontaktInfo } from '../components/KontaktInfo'

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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Phone: () => <div data-testid='phone-icon' />,
  Mail: () => <div data-testid='mail-icon' />,
  MapPin: () => <div data-testid='map-pin-icon' />,
  Clock: () => <div data-testid='clock-icon' />,
}))

describe('KontaktInfo Component', () => {
  const mockBusinessInfo = {
    address: 'Testveien 123\n1234 Oslo',
    phone: '+47 123 45 678',
    email: 'test@bilverksted.no',
    openingHours: {
      Mandag: '08:00 - 17:00',
      Tirsdag: '08:00 - 17:00',
      Onsdag: '08:00 - 17:00',
      Torsdag: '08:00 - 17:00',
      Fredag: '08:00 - 16:00',
      Lørdag: 'Stengt',
      Søndag: 'Stengt',
    },
  }

  it('should display address with Norwegian formatting', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    expect(screen.getByText('Besøksadresse')).toBeInTheDocument()
    // Address is rendered with whitespace-pre-line, so check for the full address
    expect(screen.getByText(/Testveien 123/)).toBeInTheDocument()
    expect(screen.getByText(/1234 Oslo/)).toBeInTheDocument()
  })

  it('should have click-to-call functionality for phone numbers', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    const phoneLink = screen.getByRole('link', { name: '+47 123 45 678' })
    expect(phoneLink).toHaveAttribute('href', 'tel:+47 123 45 678')
  })

  it('should have mailto links for email contact', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    const emailLink = screen.getByRole('link', { name: 'test@bilverksted.no' })
    expect(emailLink).toHaveAttribute('href', 'mailto:test@bilverksted.no')
  })

  it('should display opening hours with Norwegian day names', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    expect(screen.getByText('Åpningstider')).toBeInTheDocument()
    expect(screen.getByText('Mandag:')).toBeInTheDocument()
    expect(screen.getByText('Tirsdag:')).toBeInTheDocument()
    expect(screen.getByText('Onsdag:')).toBeInTheDocument()
    expect(screen.getByText('Torsdag:')).toBeInTheDocument()
    expect(screen.getByText('Fredag:')).toBeInTheDocument()
    expect(screen.getByText('Lørdag:')).toBeInTheDocument()
    expect(screen.getByText('Søndag:')).toBeInTheDocument()
  })

  it('should display opening hours correctly', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    // Check for multiple instances of the same time
    expect(screen.getAllByText('08:00 - 17:00')).toHaveLength(4) // Mon-Thu
    expect(screen.getByText('08:00 - 16:00')).toBeInTheDocument() // Friday
    expect(screen.getAllByText('Stengt')).toHaveLength(2) // Sat-Sun
  })

  it('should use default business information when none provided', () => {
    render(<KontaktInfo />)

    // Should display default information (using regex for whitespace-pre-line rendering)
    expect(screen.getByText(/Eksempelveien 123/)).toBeInTheDocument()
    expect(screen.getByText(/1234 Oslo/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '+47 123 45 678' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'post@bilverksted.no' })).toBeInTheDocument()
  })

  it('should have proper Norwegian language throughout', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    // Check for Norwegian headings
    expect(screen.getByText('Besøksadresse')).toBeInTheDocument()
    expect(screen.getByText('Kontakt oss')).toBeInTheDocument()
    expect(screen.getByText('Åpningstider')).toBeInTheDocument()
  })

  it('should have responsive grid layout', () => {
    render(<KontaktInfo businessInfo={mockBusinessInfo} />)

    // Should have multiple cards in a grid
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(1)
  })
})
