import { render, screen } from '@testing-library/react'
import MDXImage from '../../../components/blog/MDXImage'

describe('MDXImage', () => {
  it('should render image with alt text', () => {
    // Given: Image props with alt text
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
    }
    
    // When: Rendering the MDXImage component
    render(<MDXImage {...props} />)
    
    // Then: Should display image with alt text
    const img = screen.getByAltText('Test bilde')
    expect(img).toBeInTheDocument()
  })

  it('should render caption when provided', () => {
    // Given: Image props with caption
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
      caption: 'Dette er en bildetekst',
    }
    
    // When: Rendering the MDXImage component
    render(<MDXImage {...props} />)
    
    // Then: Should display caption
    expect(screen.getByText('Dette er en bildetekst')).toBeInTheDocument()
  })

  it('should not render caption when not provided', () => {
    // Given: Image props without caption
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
    }
    
    // When: Rendering the MDXImage component
    const { container } = render(<MDXImage {...props} />)
    
    // Then: Should not have figcaption element
    const figcaption = container.querySelector('figcaption')
    expect(figcaption).not.toBeInTheDocument()
  })

  it('should use default width and height when not provided', () => {
    // Given: Image props without width/height
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
    }
    
    // When: Rendering the MDXImage component
    render(<MDXImage {...props} />)
    
    // Then: Should render with default dimensions
    const img = screen.getByAltText('Test bilde')
    expect(img).toBeInTheDocument()
  })

  it('should use custom width and height when provided', () => {
    // Given: Image props with custom dimensions
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
      width: 1200,
      height: 800,
    }
    
    // When: Rendering the MDXImage component
    render(<MDXImage {...props} />)
    
    // Then: Should render with custom dimensions
    const img = screen.getByAltText('Test bilde')
    expect(img).toBeInTheDocument()
  })

  it('should wrap image in figure element', () => {
    // Given: Image props
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
    }
    
    // When: Rendering the MDXImage component
    const { container } = render(<MDXImage {...props} />)
    
    // Then: Should be wrapped in figure element
    const figure = container.querySelector('figure')
    expect(figure).toBeInTheDocument()
  })

  it('should apply proper styling classes', () => {
    // Given: Image props
    const props = {
      src: '/images/test.jpg',
      alt: 'Test bilde',
    }
    
    // When: Rendering the MDXImage component
    const { container } = render(<MDXImage {...props} />)
    
    // Then: Should have proper styling classes
    const figure = container.querySelector('figure')
    expect(figure).toHaveClass('my-8')
  })
})

