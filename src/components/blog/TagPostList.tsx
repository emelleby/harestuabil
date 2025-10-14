import type { PostContent } from '../../lib/posts'
import type { TagContent } from '../../lib/tags'
import ArticleCard from './ArticleCard'
import Pagination from './Pagination'

type Props = {
  posts: PostContent[]
  tag: TagContent
  pagination: {
    current: number
    pages: number
  }
}
export default function TagPostList({ posts, tag, pagination }: Props) {
  return (
    <div className="flex flex-col mx-auto my-0 max-w-[1200px] w-full px-6">
      <h1 className="mb-8 p-0 font-thin text-3xl md:text-4xl text-muted-foreground">
        All posts / <span className="font-bold text-foreground">{tag.name}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((it) => (
          <div key={it.slug} className="list-none mb-6">
            <ArticleCard post={it} />
          </div>
        ))}
      </div>

      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => '/posts/tags/[[...slug]]',
          as: (page) => (page === 1 ? '/posts/tags/' + tag.slug : `/posts/tags/${tag.slug}/${page}`)
        }}
      />
    </div>
  )
}
