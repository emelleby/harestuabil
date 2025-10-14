import type { PostContent } from '../../lib/posts'
import ArticleCard from './ArticleCard'

type RelatedPostsProps = {
  posts: PostContent[]
  currentSlug: string
}

/**
 * Related Posts component for Norwegian blog
 * Shows up to 3 related articles from the same category
 */
export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts.filter((post) => post.slug !== currentSlug).slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-border" lang="nb">
      <h2 className="text-2xl font-bold mb-6">Relaterte artikler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}

