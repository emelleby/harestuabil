import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { parseISO } from 'date-fns'
import PostDate from '../Date'
import { PostContent } from '../../lib/posts'
import { Card } from '../ui/card'

type Props = {
  post: PostContent
}

export default function ArticleCard({ post }: Props) {
  return (
    <Card>
      <Link href={'/blogg/' + post.slug} className="block text-foreground">
        {post.image && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-md">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="p-4">
          <PostDate date={parseISO(post.date)} />
          <h3 className="mt-2 text-lg font-medium">{post.title}</h3>
          {post.description && <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>}
        </div>
      </Link>
    </Card>
  )
}
