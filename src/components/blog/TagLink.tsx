import Link from 'next/link'
import type { TagContent } from '../../lib/tags'

type Props = {
  tag: TagContent
}
export default function Tag({ tag }: Props) {
  return <Link href={`/posts/tags/${tag.slug}`}>{'#' + tag.name}</Link>
}
