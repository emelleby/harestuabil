import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import ArticleCard from '../../../components/blog/ArticleCard'
import BlogFilter from '../../../components/blog/BlogFilter'
import BlogSearch from '../../../components/blog/BlogSearch'
import Pagination from '../../../components/blog/Pagination'
import Layout from '../../../components/Layout'
import BasicMeta from '../../../components/meta/BasicMeta'
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta'
import config from '../../../lib/config'
import { countPosts, fetchPostContent, type PostContent } from '../../../lib/posts'
import { listTags, type TagContent } from '../../../lib/tags'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  page: number
  pagination: {
    current: number
    pages: number
  }
}
export default function Page({ posts, tags, pagination, page }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const url = `/posts/page/${page}`
  const title = `Blogg - Side ${page}`
  const description = 'Les våre artikler om bilvedlikehold, tips og råd for å holde bilen din i topp stand.'

  // Filter posts based on selected tag and search query
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) => post.title.toLowerCase().includes(query) || post.description?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [posts, selectedTag, searchQuery])

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="bilvedlikehold, biltips, verksted, bilreparasjon" />
      </Head>
      <BasicMeta url={url} title={title} description={description} />
      <OpenGraphMeta url={url} title={title} description={description} />
      <TwitterCardMeta url={url} title={title} description={description} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blogg - Side {page}</h1>
          <p className="text-lg text-muted-foreground">
            Nyttige artikler om bilvedlikehold, tips og råd fra våre eksperter
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <BlogSearch placeholder="Søk i artikler..." onSearch={setSearchQuery} />
          <BlogFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />
        </div>

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            {searchQuery
              ? `Søkeresultater for "${searchQuery}"`
              : selectedTag
              ? `Artikler i kategorien "${tags.find((t) => t.slug === selectedTag)?.name}"`
              : 'Alle artikler'}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery || selectedTag
                  ? 'Ingen artikler funnet. Prøv å endre søket eller filteret.'
                  : 'Ingen artikler tilgjengelig for øyeblikket.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {!searchQuery && !selectedTag && (
                <Pagination
                  current={pagination.current}
                  pages={pagination.pages}
                  link={{
                    href: (pageNum) => (pageNum === 1 ? '/posts' : '/posts/page/[page]'),
                    as: (pageNum) => (pageNum === 1 ? '/posts' : `/posts/page/${pageNum}`)
                  }}
                />
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string, 10)

  // For paginated pages (page 2+), we need to account for the fact that
  // page 1 shows posts_per_page + 1 posts (1 featured + posts_per_page in grid)
  // So we need to adjust the effective page number for the listPostContent function
  const postsOnPage1 = config.posts_per_page + 1

  // Calculate how many posts to skip:
  // Page 2 should skip the first (posts_per_page + 1) posts from page 1
  // Page 3 should skip (posts_per_page + 1) + posts_per_page posts, etc.
  const postsToSkip = postsOnPage1 + (page - 2) * config.posts_per_page

  // Get all posts and manually slice them
  const allPosts = fetchPostContent()
  const posts = allPosts.slice(postsToSkip, postsToSkip + config.posts_per_page)

  const tags = listTags()

  // Calculate total pages using the same logic as the main page
  const totalPosts = countPosts()
  const remainingAfterPage1 = Math.max(0, totalPosts - postsOnPage1)
  const additionalPages = Math.ceil(remainingAfterPage1 / config.posts_per_page)
  const totalPages = 1 + additionalPages

  const pagination = {
    current: page,
    pages: totalPages
  }
  return {
    props: {
      page,
      posts,
      tags,
      pagination
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Calculate total pages using the same logic as getStaticProps
  const totalPosts = countPosts()
  const postsOnPage1 = config.posts_per_page + 1
  const remainingAfterPage1 = Math.max(0, totalPosts - postsOnPage1)
  const additionalPages = Math.ceil(remainingAfterPage1 / config.posts_per_page)
  const totalPages = 1 + additionalPages

  // Generate paths for pages 2 and onwards (page 1 is handled by /posts)
  const paths = Array.from(Array(totalPages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() }
  }))
  return {
    paths: paths,
    fallback: false
  }
}
