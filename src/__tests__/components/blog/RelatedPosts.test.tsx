import { render, screen } from '@testing-library/react'
import type { PostContent } from '../../../lib/posts'
import RelatedPosts from '../../../components/blog/RelatedPosts'

const mockPosts: PostContent[] = [
  {
    slug: 'post-1',
    title: 'Første artikkel',
    date: '2025-01-15',
    tags: ['vedlikehold'],
    fullPath: '/content/posts/post-1.mdx',
  },
  {
    slug: 'post-2',
    title: 'Andre artikkel',
    date: '2025-01-14',
    tags: ['tips'],
    fullPath: '/content/posts/post-2.mdx',
  },
  {
    slug: 'post-3',
    title: 'Tredje artikkel',
    date: '2025-01-13',
    tags: ['nyheter'],
    fullPath: '/content/posts/post-3.mdx',
  },
]

describe('RelatedPosts', () => {
  it('should render related posts section with Norwegian heading', () => {
    // Given: Related posts
    const currentSlug = 'current-post'
    
    // When: Rendering the RelatedPosts component
    render(<RelatedPosts posts={mockPosts} currentSlug={currentSlug} />)
    
    // Then: Should display Norwegian heading
    expect(screen.getByText('Relaterte artikler')).toBeInTheDocument()
  })

  it('should display up to 3 related posts', () => {
    // Given: More than 3 related posts
    const currentSlug = 'current-post'
    const manyPosts = [...mockPosts, ...mockPosts] // 6 posts
    
    // When: Rendering the RelatedPosts component
    render(<RelatedPosts posts={manyPosts} currentSlug={currentSlug} />)
    
    // Then: Should display only first 3 posts
    expect(screen.getByText('Første artikkel')).toBeInTheDocument()
    expect(screen.getByText('Andre artikkel')).toBeInTheDocument()
    expect(screen.getByText('Tredje artikkel')).toBeInTheDocument()
  })

  it('should filter out current post', () => {
    // Given: Posts including the current post
    const currentSlug = 'post-1'
    
    // When: Rendering the RelatedPosts component
    render(<RelatedPosts posts={mockPosts} currentSlug={currentSlug} />)
    
    // Then: Should not display current post, only other posts
    expect(screen.queryByText('Første artikkel')).not.toBeInTheDocument()
    expect(screen.getByText('Andre artikkel')).toBeInTheDocument()
    expect(screen.getByText('Tredje artikkel')).toBeInTheDocument()
  })

  it('should not render when no related posts available', () => {
    // Given: Only the current post
    const currentSlug = 'post-1'
    const singlePost = [mockPosts[0]]
    
    // When: Rendering the RelatedPosts component
    const { container } = render(<RelatedPosts posts={singlePost} currentSlug={currentSlug} />)
    
    // Then: Should not render anything
    expect(container.firstChild).toBeNull()
  })

  it('should not render when posts array is empty', () => {
    // Given: Empty posts array
    const currentSlug = 'current-post'
    
    // When: Rendering the RelatedPosts component
    const { container } = render(<RelatedPosts posts={[]} currentSlug={currentSlug} />)
    
    // Then: Should not render anything
    expect(container.firstChild).toBeNull()
  })

  it('should have Norwegian language attribute', () => {
    // Given: Related posts
    const currentSlug = 'current-post'
    
    // When: Rendering the RelatedPosts component
    const { container } = render(<RelatedPosts posts={mockPosts} currentSlug={currentSlug} />)
    
    // Then: Should have lang="nb" attribute
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('lang', 'nb')
  })

  it('should use grid layout for responsive design', () => {
    // Given: Related posts
    const currentSlug = 'current-post'
    
    // When: Rendering the RelatedPosts component
    const { container } = render(<RelatedPosts posts={mockPosts} currentSlug={currentSlug} />)
    
    // Then: Should have grid layout classes
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })
})

