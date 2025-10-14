import { parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import PostDate from '../Date'
import { Card, CardContent } from '../ui/card'
import type { PostContent } from '../../lib/posts'

type Props = {
  post: PostContent
}

export default function ArticleCard({ post }: Props) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border border-border">
      <Link href={`/posts/${post.slug}`} className="block text-foreground">
        {post.image ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-sm">Bilartikkel</p>
            </div>
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <PostDate date={parseISO(post.date)} />
            {post.tags && post.tags.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {post.tags[0]}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.description}</p>
          )}

          <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all duration-200">
            <span>Les mer</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
