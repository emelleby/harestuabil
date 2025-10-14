import Link from 'next/link'
import type { TagContent } from '../../lib/tags'
import { Badge } from '../ui/badge'

type Props = {
  tag: TagContent
}
export default function TagButton({ tag }: Props) {
  return (
    <Badge variant="outline">
      <Link href={`/posts/tags/${tag.slug}`} className="inline-block text-sm text-foreground">
        {tag.name}
      </Link>
    </Badge>
  )
}
