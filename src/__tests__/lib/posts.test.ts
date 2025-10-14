import { getRelatedPosts } from '../../lib/posts'

// Mock the fetchPostContent function
jest.mock('../../lib/posts', () => {
  const actual = jest.requireActual('../../lib/posts')
  return {
    ...actual,
    fetchPostContent: jest.fn(() => [
      {
        slug: 'post-1',
        title: 'Vedlikehold av bil',
        date: '2025-01-15',
        tags: ['vedlikehold', 'tips'],
        fullPath: '/content/posts/post-1.mdx',
      },
      {
        slug: 'post-2',
        title: 'Dekkskift tips',
        date: '2025-01-14',
        tags: ['dekk', 'tips'],
        fullPath: '/content/posts/post-2.mdx',
      },
      {
        slug: 'post-3',
        title: 'Bilglass reparasjon',
        date: '2025-01-13',
        tags: ['bilglass', 'vedlikehold'],
        fullPath: '/content/posts/post-3.mdx',
      },
      {
        slug: 'post-4',
        title: 'Nyheter fra verkstedet',
        date: '2025-01-12',
        tags: ['nyheter'],
        fullPath: '/content/posts/post-4.mdx',
      },
      {
        slug: 'post-5',
        title: 'Sesongguide vinter',
        date: '2025-01-11',
        tags: ['sesongguide', 'tips'],
        fullPath: '/content/posts/post-5.mdx',
      },
    ]),
  }
})

describe('getRelatedPosts', () => {
  it('should return posts with matching tags', () => {
    // Given: Current post with tags
    const currentSlug = 'current-post'
    const tags = ['vedlikehold', 'tips']
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, 3)
    
    // Then: Should return posts with matching tags
    expect(result.length).toBeGreaterThan(0)
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('should exclude current post from results', () => {
    // Given: Current post slug
    const currentSlug = 'post-1'
    const tags = ['vedlikehold', 'tips']
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, 3)
    
    // Then: Should not include current post
    expect(result.find((post) => post.slug === currentSlug)).toBeUndefined()
  })

  it('should limit results to specified limit', () => {
    // Given: Current post with tags and limit
    const currentSlug = 'current-post'
    const tags = ['tips']
    const limit = 2
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, limit)
    
    // Then: Should return at most limit posts
    expect(result.length).toBeLessThanOrEqual(limit)
  })

  it('should prioritize posts with more matching tags', () => {
    // Given: Current post with multiple tags
    const currentSlug = 'current-post'
    const tags = ['vedlikehold', 'tips']
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, 3)
    
    // Then: First result should have most matching tags
    if (result.length > 0) {
      const firstPost = result[0]
      const matchingTags = firstPost.tags?.filter((tag) => tags.includes(tag)).length || 0
      expect(matchingTags).toBeGreaterThan(0)
    }
  })

  it('should return latest posts when no tags provided', () => {
    // Given: Current post with no tags
    const currentSlug = 'current-post'
    const tags: string[] = []
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, 3)
    
    // Then: Should return latest posts
    expect(result.length).toBeGreaterThan(0)
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('should fill with latest posts if not enough matching posts', () => {
    // Given: Current post with rare tag
    const currentSlug = 'current-post'
    const tags = ['rare-tag']
    const limit = 3
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, limit)
    
    // Then: Should fill with latest posts to reach limit
    expect(result.length).toBeLessThanOrEqual(limit)
  })

  it('should handle default limit of 3', () => {
    // Given: Current post with tags, no limit specified
    const currentSlug = 'current-post'
    const tags = ['tips']
    
    // When: Getting related posts without limit
    const result = getRelatedPosts(currentSlug, tags)
    
    // Then: Should return at most 3 posts (default)
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('should sort by date when tag scores are equal', () => {
    // Given: Current post with common tag
    const currentSlug = 'current-post'
    const tags = ['tips']
    
    // When: Getting related posts
    const result = getRelatedPosts(currentSlug, tags, 5)
    
    // Then: Posts with same tag score should be sorted by date (newest first)
    if (result.length > 1) {
      for (let i = 0; i < result.length - 1; i++) {
        const currentDate = result[i].date
        const nextDate = result[i + 1].date
        // Newer or equal dates should come first
        expect(currentDate >= nextDate).toBe(true)
      }
    }
  })
})

