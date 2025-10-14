import type { PostContent } from '../../lib/posts'
import type { TagContent } from '../../lib/tags'
import Pagination from './Pagination'
import PostItem from './PostItem'
import TagLink from './TagLink'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}
export default function PostList({ posts, tags, pagination }: Props) {
  return (
    <div className="flex mx-auto my-0 max-w-[1200px] w-full px-6">
      <div className="posts flex flex-col flex-1">
        <ul className="post-list m-0 p-0 flex-1">
          {posts.map((it) => (
            <li key={it.slug} className="list-none mb-6">
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? '/posts' : '/posts/page/[page]'),
            as: (page) => (page === 1 ? null : `/posts/page/${page}`)
          }}
        />
      </div>
      <ul className="categories hidden md:block m-0 p-0">
        {tags.map((it) => (
          <li key={it.slug} className="list-none mb-3">
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
    </div>
  )
}
