import { render, screen } from '@testing-library/react'
import { GetStaticProps } from 'next'

import Index, { getStaticProps } from '../../../pages/posts/index'

// Mock the dependencies
jest.mock('../../../lib/posts', () => ({
  listPostContent: jest.fn(() => [
    {
      slug: 'test-post',
      title: 'Test Bilartikkel',
      date: '2025-01-15',
      description: 'En test artikkel om bilvedlikehold',
      tags: ['vedlikehold']
    }
  ]),
  countPosts: jest.fn(() => 1)
}))

jest.mock('../../../lib/tags', () => ({
  listTags: jest.fn(() => [
    { slug: 'vedlikehold', name: 'Vedlikehold' },
    { slug: 'tips', name: 'Tips' }
  ])
}))

jest.mock('../../../lib/config', () => ({
  posts_per_page: 5
}))

describe('Blog Index Page', () => {
  const mockProps = {
    posts: [
      {
        slug: 'test-post',
        title: 'Test Bilartikkel',
        date: '2025-01-15',
        description: 'En test artikkel om bilvedlikehold',
        tags: ['vedlikehold'],
        fullPath: '/content/posts/test-post.mdx'
      }
    ],
    tags: [
      { slug: 'vedlikehold', name: 'Vedlikehold' },
      { slug: 'tips', name: 'Tips' }
    ],
    pagination: {
      current: 1,
      pages: 1
    }
  }

  it('should render blog page with Norwegian title', () => {
    render(<Index {...mockProps} />)
    
    expect(screen.getByText('Blogg')).toBeInTheDocument()
    expect(screen.getByText('Nyttige artikler om bilvedlikehold, tips og råd fra våre eksperter')).toBeInTheDocument()
  })

  it('should render featured article section', () => {
    render(<Index {...mockProps} />)
    
    expect(screen.getByText('Utvalgt artikkel')).toBeInTheDocument()
    expect(screen.getByText('Test Bilartikkel')).toBeInTheDocument()
  })

  it('should render search functionality', () => {
    render(<Index {...mockProps} />)
    
    expect(screen.getByLabelText('Søk i artikler')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Søk etter bilartikler, tips og råd...')).toBeInTheDocument()
  })

  it('should render filter buttons with Norwegian categories', () => {
    render(<Index {...mockProps} />)
    
    expect(screen.getByText('Filtrer artikler:')).toBeInTheDocument()
    expect(screen.getByText('Alle artikler')).toBeInTheDocument()
    expect(screen.getByText('Vedlikehold')).toBeInTheDocument()
    expect(screen.getByText('Tips')).toBeInTheDocument()
  })

  it('should render articles grid', () => {
    render(<Index {...mockProps} />)
    
    expect(screen.getByText('Alle artikler')).toBeInTheDocument()
    // The article should appear in the grid (not just featured section)
    expect(screen.getAllByText('Test Bilartikkel')).toHaveLength(2) // Once in featured, once in grid
  })
})

describe('getStaticProps', () => {
  it('should return posts, tags and pagination data', async () => {
    const result = await getStaticProps({})
    
    expect(result).toHaveProperty('props')
    expect(result.props).toHaveProperty('posts')
    expect(result.props).toHaveProperty('tags')
    expect(result.props).toHaveProperty('pagination')
  })
})
