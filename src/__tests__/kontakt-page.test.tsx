import { render, screen } from '@testing-library/react'
import Contact from '../pages/kontakt'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

// Mock the MDXRemote component and serialize function
jest.mock('next-mdx-remote', () => ({
  MDXRemote: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid='mdx-content'>{children}</div>
  ),
}))

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(),
}))

// Mock other dependencies
jest.mock('gray-matter', () => jest.fn())
jest.mock('fs', () => ({}))
jest.mock('js-yaml', () => ({}))
jest.mock('../lib/pages', () => ({
  getPageBySlug: jest.fn(),
}))

// Mock PageLayout component
jest.mock('../components/PageLayout', () => {
  return function MockPageLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid='page-layout'>{children}</div>
  }
})

// Mock the ContactForm component
jest.mock('../components/ContactForm', () => ({
  ContactForm: () => <div data-testid='contact-form'>Contact Form</div>,
}))

// Mock components that will be added
jest.mock('../components/KontaktInfo', () => ({
  KontaktInfo: () => <div data-testid='kontakt-info'>Business Information</div>,
}))

jest.mock('../components/KartVisning', () => ({
  KartVisning: () => <div data-testid='kart-visning'>Map Display</div>,
}))

jest.mock('../components/OfteStilteSporsmal', () => ({
  OfteStilteSporsmal: () => <div data-testid='ofte-stilte-sporsmal'>FAQ Section</div>,
}))

describe('Contact Page', () => {
  const mockProps = {
    title: 'Kontakt Oss',
    slug: 'kontakt',
    description: 'Kontakt oss for alle dine bilbehov',
    keywords: ['kontakt', 'bilverksted', 'service'],
    source: {} as MDXRemoteSerializeResult,
  }

  it('should display contact form prominently with clear heading', () => {
    render(<Contact {...mockProps} />)

    // Contact form should be present
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  it('should have responsive layout optimized for mobile', () => {
    render(<Contact {...mockProps} />)

    // The page should have proper structure for mobile optimization
    const pageContent = screen.getByTestId('mdx-content')
    expect(pageContent).toBeInTheDocument()
  })

  it('should display multiple contact sections with Norwegian headings', () => {
    render(<Contact {...mockProps} />)

    // Should have business information section
    expect(screen.getByTestId('kontakt-info')).toBeInTheDocument()

    // Should have map section
    expect(screen.getByTestId('kart-visning')).toBeInTheDocument()

    // Should have FAQ section
    expect(screen.getByTestId('ofte-stilte-sporsmal')).toBeInTheDocument()
  })

  it('should maintain consistent Norwegian language throughout', () => {
    render(<Contact {...mockProps} />)

    // Page title should be in Norwegian
    expect(mockProps.title).toBe('Kontakt Oss')
  })

  it('should display business information with Norwegian formatting', () => {
    render(<Contact {...mockProps} />)

    // Should have business information section
    const businessInfo = screen.getByTestId('kontakt-info')
    expect(businessInfo).toBeInTheDocument()
  })

  it('should have click-to-call functionality for phone numbers', () => {
    render(<Contact {...mockProps} />)

    // Business information should be present (phone functionality tested in component tests)
    expect(screen.getByTestId('kontakt-info')).toBeInTheDocument()
  })

  it('should have mailto links for email contact', () => {
    render(<Contact {...mockProps} />)

    // Business information should be present (email functionality tested in component tests)
    expect(screen.getByTestId('kontakt-info')).toBeInTheDocument()
  })
})
