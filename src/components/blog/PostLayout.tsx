import Image from 'next/image'
import type React from 'react'
import styles from '../../../public/styles/content.module.css'
import { getAuthor } from '../../lib/authors'
import type { PostContent } from '../../lib/posts'
import { formatReadingTime } from '../../lib/readingTime'
import { getTag } from '../../lib/tags'
import Author from '../Author'
import Copyright from '../Copyright'
import FormatDate from '../FormatDate'
import Layout from '../Layout'
import BasicMeta from '../meta/BasicMeta'
import JsonLdMeta from '../meta/JsonLdMeta'
import OpenGraphMeta from '../meta/OpenGraphMeta'
import TwitterCardMeta from '../meta/TwitterCardMeta'
import { SocialList } from '../SocialList'
import RelatedPosts from './RelatedPosts'
import ShareButtons from './ShareButtons'
import TagButton from './TagButton'

type Props = {
  title: string
  date: Date
  slug: string
  tags: string[]
  author: string
  description?: string
  image?: string
  readingTime?: number
  relatedPosts?: PostContent[]
  children: React.ReactNode
}
export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  description = '',
  image,
  readingTime,
  relatedPosts,
  children
}: Props) {
  const keywords = tags.map((it) => getTag(it)?.name || it)
  const authorName = getAuthor(author).name
  return (
    <Layout>
      <BasicMeta url={`/posts/${slug}`} title={title} keywords={keywords} description={description} />
      <TwitterCardMeta url={`/posts/${slug}`} title={title} description={description} image={image} />
      <OpenGraphMeta url={`/posts/${slug}`} title={title} description={description} image={image} />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className="w-full relative" lang="nb">
        {/* Featured image background */}
        {image && (
          <div className="w-full h-[500px] relative overflow-hidden z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
            <div className="max-w-max mx-auto h-full">
              <Image src={image} alt={title} width={1200} height={500} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* White content container overlaying the image */}
        <div
          className={`sticky top-0 max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 z-20 ${image ? 'lg:-mt-64 -mt-96' : 'pt-8'}`}
        >
          <div className="bg-background rounded-lg shadow-lg p-4 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
              {/* Sidebar column - appears first on mobile */}
              <aside className="lg:order-last order-first">
                <div className="lg:sticky lg:top-8 space-y-3 lg:space-y-5">
                  {/* Date */}
                  <div className="text-sm text-muted-foreground">
                    <FormatDate date={date} />
                  </div>

                  {/* Author */}
                  <div className="pb-6 border-b border-border">
                    <h3 className="text-sm font-semibold mb-3 text-foreground">Authors</h3>
                    <Author author={getAuthor(author)} showAvatar={true} />
                  </div>

                  {/* Categories/Tags */}
                  {tags.length > 0 && (
                    <div className="pb-6 border-b border-border">
                      <h3 className="text-sm font-semibold mb-3 text-foreground">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((it) => {
                          const tag = getTag(it)
                          if (!tag) return null
                          return <TagButton key={it} tag={tag} />
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reading time */}
                  {readingTime && (
                    <div className="pb-6 border-b border-border">
                      <h3 className="text-sm font-semibold mb-3 text-foreground">Lesetid</h3>
                      <p className="text-sm text-muted-foreground">{formatReadingTime(readingTime)}</p>
                    </div>
                  )}

                  {/* Social sharing buttons - icons only on mobile, full labels on desktop */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-foreground">Del artikkelen</h3>
                    <div className="lg:hidden">
                      <ShareButtons
                        url={`/posts/${slug}`}
                        title={title}
                        description={description}
                        layout="horizontal"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <ShareButtons url={`/posts/${slug}`} title={title} description={description} layout="vertical" />
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main content column */}
              <article className="min-w-0">
                <header className="mb-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                    {title}
                  </h1>
                </header>
                <div className={styles.content}>{children}</div>
              </article>
            </div>
            {/* Related articles section */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-12">
                <RelatedPosts posts={relatedPosts} currentSlug={slug} />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="text-center mb-8">
              <SocialList />
            </div>
            <Copyright />
          </footer>
        </div>
      </div>
    </Layout>
  )
}
