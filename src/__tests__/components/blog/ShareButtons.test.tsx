import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ShareButtons from '../../../components/blog/ShareButtons'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
})

describe('ShareButtons', () => {
  const defaultProps = {
    url: '/posts/test-post',
    title: 'Test artikkel',
    description: 'Dette er en test beskrivelse',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Norwegian share label', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should display Norwegian "Del:" label
    expect(screen.getByText('Del:')).toBeInTheDocument()
  })

  it('should render Facebook share button', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have Facebook share link
    const facebookLink = screen.getByLabelText('Del på Facebook')
    expect(facebookLink).toBeInTheDocument()
    expect(facebookLink).toHaveAttribute('href')
    expect(facebookLink.getAttribute('href')).toContain('facebook.com')
  })

  it('should render Twitter/X share button', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have Twitter share link
    const twitterLink = screen.getByLabelText('Del på Twitter/X')
    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink).toHaveAttribute('href')
    expect(twitterLink.getAttribute('href')).toContain('twitter.com')
  })

  it('should render LinkedIn share button', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have LinkedIn share link
    const linkedinLink = screen.getByLabelText('Del på LinkedIn')
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href')
    expect(linkedinLink.getAttribute('href')).toContain('linkedin.com')
  })

  it('should render email share button', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have email share link
    const emailLink = screen.getByLabelText('Del via e-post')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href')
    expect(emailLink.getAttribute('href')).toContain('mailto:')
  })

  it('should render copy link button', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have copy link button
    const copyButton = screen.getByLabelText('Kopier lenke')
    expect(copyButton).toBeInTheDocument()
  })

  it('should copy link to clipboard when copy button is clicked', async () => {
    // Given: Share button props and mocked clipboard
    const writeTextMock = jest.spyOn(navigator.clipboard, 'writeText')
    
    // When: Rendering and clicking copy button
    render(<ShareButtons {...defaultProps} />)
    const copyButton = screen.getByLabelText('Kopier lenke')
    fireEvent.click(copyButton)
    
    // Then: Should call clipboard writeText
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
    })
  })

  it('should show "Kopiert!" message after copying', async () => {
    // Given: Share button props
    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    
    // When: Rendering and clicking copy button
    render(<ShareButtons {...defaultProps} />)
    const copyButton = screen.getByLabelText('Kopier lenke')
    fireEvent.click(copyButton)
    
    // Then: Should show Norwegian "Kopiert!" message
    await waitFor(() => {
      expect(screen.getByText('Kopiert!')).toBeInTheDocument()
    })
  })

  it('should have Norwegian language attribute', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    const { container } = render(<ShareButtons {...defaultProps} />)
    
    // Then: Should have lang="nb" attribute
    const div = container.querySelector('div[lang="nb"]')
    expect(div).toBeInTheDocument()
  })

  it('should encode URL and title in share links', () => {
    // Given: Share button props with special characters
    const props = {
      url: '/posts/test-post?param=value',
      title: 'Test & Special Characters',
      description: 'Description with special chars',
    }
    
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...props} />)
    
    // Then: Share links should have encoded URLs
    const facebookLink = screen.getByLabelText('Del på Facebook')
    expect(facebookLink.getAttribute('href')).toContain(encodeURIComponent('/posts/test-post?param=value'))
  })

  it('should open share links in new tab', () => {
    // Given: Share button props
    // When: Rendering the ShareButtons component
    render(<ShareButtons {...defaultProps} />)
    
    // Then: External share links should have target="_blank"
    const facebookLink = screen.getByLabelText('Del på Facebook')
    expect(facebookLink).toHaveAttribute('target', '_blank')
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

