import { useMemo, useState } from 'react'
import Head from 'next/head'
import type { GetStaticProps } from 'next'

import Layout from '../../components/Layout'
import BasicMeta from '../../components/meta/BasicMeta'
import OpenGraphMeta from '../../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../components/meta/TwitterCardMeta'
import ArticleCard from '../../components/blog/ArticleCard'
import BlogFilter from '../../components/blog/BlogFilter'
import BlogSearch from '../../components/blog/BlogSearch'
import Pagination from '../../components/Pagination'
import config from '../../lib/config'
import { countPosts, listPostContent, type PostContent } from '../../lib/posts'
import { listTags, type TagContent } from '../../lib/tags'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}

export default function Index({ posts, tags, pagination }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const url = '/posts'
  const title = 'Blogg - Bilvedlikehold og tips'
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

  // Featured post (first post) and regular posts for grid
  const featuredPost = posts[0]
  // For the grid, we want to show posts 2-6 (5 posts) when no filter/search is active
  // When filter/search is active, we show all filtered posts (no featured article)
  const regularPosts = searchQuery || selectedTag ? filteredPosts : posts.slice(1, 6) // Show posts 2-6 (5 posts) for the grid

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blogg</h1>
          <p className="text-lg text-muted-foreground">
            Nyttige artikler om bilvedlikehold, tips og råd fra våre eksperter
          </p>
        </div>

        {/* Featured Article Section - only show when no search/filter is active */}
        {featuredPost && !searchQuery && !selectedTag && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Utvalgt artikkel</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-muted/30 rounded-lg">
              <div className="lg:order-2">
                <ArticleCard post={featuredPost} />
              </div>
              <div className="lg:order-1 flex flex-col justify-center">
                <h3 className="text-xl font-medium mb-3 text-foreground">{featuredPost.title}</h3>
                {featuredPost.description && <p className="text-muted-foreground mb-4">{featuredPost.description}</p>}
                <p className="text-sm text-muted-foreground">Les mer om dette viktige temaet</p>
              </div>
            </div>
          </section>
        )}

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
                {regularPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {!searchQuery && !selectedTag && (
                <Pagination
                  current={pagination.current}
                  pages={pagination.pages}
                  link={{
                    href: (page) => (page === 1 ? '/posts' : '/posts/page/[page]'),
                    as: (page) => (page === 1 ? '/posts' : `/posts/page/${page}`)
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

export const getStaticProps: GetStaticProps = async () => {
  // For page 1, we need one extra post since the first post becomes the featured article
  // This ensures we show: 1 featured + 5 in grid = 6 total posts on page 1
  const postsToFetch = config.posts_per_page + 1
  const posts = listPostContent(1, postsToFetch)
  const tags = listTags()

  // Calculate pagination based on the adjusted logic:
  // Page 1: shows posts_per_page + 1 posts (1 featured + posts_per_page in grid)
  // Page 2+: shows posts_per_page posts each
  const totalPosts = countPosts()
  const remainingAfterPage1 = Math.max(0, totalPosts - postsToFetch)
  const additionalPages = Math.ceil(remainingAfterPage1 / config.posts_per_page)
  const totalPages = 1 + additionalPages

  const pagination = {
    current: 1,
    pages: totalPages
  }
  return {
    props: {
      posts,
      tags,
      pagination
    }
  }
}
