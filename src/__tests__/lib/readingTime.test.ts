import { calculateReadingTime, formatReadingTime } from '../../lib/readingTime'

describe('readingTime', () => {
  describe('calculateReadingTime', () => {
    it('should calculate reading time for short content', () => {
      // Given: A short text with ~50 words
      const content = 'Dette er en kort tekst. '.repeat(10)
      
      // When: Calculating reading time
      const result = calculateReadingTime(content)
      
      // Then: Should return 1 minute (minimum)
      expect(result).toBe(1)
    })

    it('should calculate reading time for medium content', () => {
      // Given: A medium text with ~400 words (2 minutes at 200 wpm)
      const content = 'Dette er en tekst med flere ord. '.repeat(60)
      
      // When: Calculating reading time
      const result = calculateReadingTime(content)
      
      // Then: Should return 2 minutes
      expect(result).toBe(2)
    })

    it('should calculate reading time for long content', () => {
      // Given: A long text with ~1000 words (5 minutes at 200 wpm)
      const content = 'Dette er en lang tekst med mange ord. '.repeat(140)
      
      // When: Calculating reading time
      const result = calculateReadingTime(content)
      
      // Then: Should return 5 minutes
      expect(result).toBe(5)
    })

    it('should strip HTML tags before counting words', () => {
      // Given: Content with HTML tags
      const content = '<p>Dette er en <strong>tekst</strong> med <em>HTML</em> tags.</p>'.repeat(40)
      
      // When: Calculating reading time
      const result = calculateReadingTime(content)
      
      // Then: Should count only text words, not tags
      expect(result).toBeGreaterThan(0)
    })

    it('should handle empty content', () => {
      // Given: Empty content
      const content = ''
      
      // When: Calculating reading time
      const result = calculateReadingTime(content)
      
      // Then: Should return 1 minute (minimum)
      expect(result).toBe(1)
    })
  })

  describe('formatReadingTime', () => {
    it('should format 1 minute in Norwegian singular form', () => {
      // Given: 1 minute
      const minutes = 1
      
      // When: Formatting reading time
      const result = formatReadingTime(minutes)
      
      // Then: Should use singular "minutt"
      expect(result).toBe('1 minutt')
    })

    it('should format multiple minutes in Norwegian plural form', () => {
      // Given: 5 minutes
      const minutes = 5
      
      // When: Formatting reading time
      const result = formatReadingTime(minutes)
      
      // Then: Should use plural "minutter"
      expect(result).toBe('5 minutter')
    })

    it('should format 2 minutes in Norwegian plural form', () => {
      // Given: 2 minutes
      const minutes = 2
      
      // When: Formatting reading time
      const result = formatReadingTime(minutes)
      
      // Then: Should use plural "minutter"
      expect(result).toBe('2 minutter')
    })
  })
})

