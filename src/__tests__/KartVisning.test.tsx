import { render, screen } from '@testing-library/react'
import { KartVisning } from '../components/KartVisning'

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
  MapPin: () => <div data-testid='map-pin-icon' />,
}))

// Mock environment variables
const originalEnv = process.env

describe('KartVisning Component', () => {
  const mockLocation = {
    latitude: 59.9139,
    longitude: 10.7522,
    address: 'Testveien 123, 1234 Oslo',
  }

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should display map with Google Maps API when API key is available', () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'test-api-key'

    render(<KartVisning location={mockLocation} />)

    expect(screen.getByText('Finn oss')).toBeInTheDocument()
    expect(screen.getByTitle('Verksted lokasjon')).toBeInTheDocument()

    const iframe = screen.getByTitle('Verksted lokasjon')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'))
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('Testveien%20123%2C%201234%20Oslo')
    )
  })

  it('should display fallback when Google Maps API key is not available', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    render(<KartVisning location={mockLocation} />)

    expect(screen.getByText('Finn oss')).toBeInTheDocument()
    expect(
      screen.getByText('Kart vil vises når Google Maps API er konfigurert')
    ).toBeInTheDocument()
    expect(screen.getAllByText('Testveien 123, 1234 Oslo')).toHaveLength(2) // Appears in fallback and below map
  })

  it('should use default location when none provided', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    render(<KartVisning />)

    expect(screen.getByText('Finn oss')).toBeInTheDocument()
    expect(screen.getAllByText('Eksempelveien 123, 1234 Oslo')).toHaveLength(2) // Appears in fallback and below map
  })

  it('should have proper GDPR-compliant iframe attributes', () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'test-api-key'

    render(<KartVisning location={mockLocation} />)

    const iframe = screen.getByTitle('Verksted lokasjon')
    expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade')
    expect(iframe).toHaveAttribute('loading', 'lazy')
    expect(iframe).toHaveAttribute('allowFullScreen')
  })

  it('should display address below the map', () => {
    render(<KartVisning location={mockLocation} />)

    expect(screen.getAllByText('Testveien 123, 1234 Oslo')).toHaveLength(2) // Appears in fallback and below map
  })

  it('should have Norwegian heading', () => {
    render(<KartVisning location={mockLocation} />)

    expect(screen.getByText('Finn oss')).toBeInTheDocument()
  })

  it('should be optimized for mobile display with aspect-video', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    render(<KartVisning location={mockLocation} />)

    // Check for aspect-video class in the outer map container
    const mapContainer = screen
      .getByText('Kart vil vises når Google Maps API er konfigurert')
      .closest('.aspect-video')
    expect(mapContainer).toHaveClass('aspect-video')
  })

  it('should encode address properly for Google Maps URL', () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'test-api-key'
    const locationWithSpecialChars = {
      latitude: 59.9139,
      longitude: 10.7522,
      address: 'Øvre gate 123, 1234 Oslo',
    }

    render(<KartVisning location={locationWithSpecialChars} />)

    const iframe = screen.getByTitle('Verksted lokasjon')
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('%C3%98vre%20gate%20123%2C%201234%20Oslo')
    )
  })
})
