import { parseISO } from 'date-fns'
import Link from 'next/link'
import type { PostContent } from '../../lib/posts'
import FormatDate from '../FormatDate'

type Props = {
  post: PostContent
}
export default function PostItem({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`} className="inline-block text-foreground">
      <FormatDate date={parseISO(post.date)} />
      <h2 className="m-0 font-medium">{post.title}</h2>
    </Link>
  )
}
