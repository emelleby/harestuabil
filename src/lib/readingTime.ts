/**
 * Calculate reading time estimation for blog post content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  // Remove HTML/MDX tags and count words
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).length
  const wordsPerMinute = 200
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Format reading time in Norwegian
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 minutt'
  }
  return `${minutes} minutter`
}

