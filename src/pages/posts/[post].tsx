// import fs from 'fs'
import * as fs from 'node:fs'
import { YouTubeEmbed } from '@next/third-parties/google'
import { parseISO } from 'date-fns'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import MDXImage from '../../components/blog/MDXImage'
import PostLayout from '../../components/blog/PostLayout'
import { fetchPostContent, getRelatedPosts, type PostContent } from '../../lib/posts'
import { calculateReadingTime } from '../../lib/readingTime'

export type Props = {
  title: string
  dateString: string
  slug: string
  tags: string[]
  author: string
  description?: string
  image?: string
  readingTime: number
  relatedPosts: PostContent[]
  source: MDXRemoteSerializeResult
}

// MDX components for blog posts with Norwegian support
const components = {
  // Custom image component with caption support
  img: (props: { src: string; alt: string; caption?: string; width?: number; height?: number }) => (
    <MDXImage {...props} />
  ),
  Image: MDXImage,
  // Video embeds
  YouTubeEmbed,
  YouTube: ({ videoId }: { videoId: string }) => <YouTubeEmbed videoid={videoId} height={400} />,
  // Placeholder components for removed social embeds
  InstagramEmbed: ({ url }: { url: string }) => (
    <div style={{ padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
      <p>
        Instagram embed removed -{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          View on Instagram
        </a>
      </p>
    </div>
  ),
  TwitterTweetEmbed: ({ tweetId }: { tweetId: string }) => (
    <div style={{ padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
      <p>
        Twitter embed removed -{' '}
        <a href={`https://twitter.com/i/web/status/${tweetId}`} target="_blank" rel="noopener noreferrer">
          View Tweet
        </a>
      </p>
    </div>
  )
}

export default function Post({
  title,
  dateString,
  slug,
  tags,
  author,
  description = '',
  image,
  readingTime,
  relatedPosts,
  source
}: Props) {
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
      image={image}
      readingTime={readingTime}
      relatedPosts={relatedPosts}
    >
      <MDXRemote {...source} components={components} />
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map((it) => `/posts/${it.slug}`)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string
  const slugToPostContent = ((postContents) => {
    const hash = {}
    postContents.forEach((it) => {
      hash[it.slug] = it
    })
    return hash
  })(fetchPostContent())

  const source = fs.readFileSync(slugToPostContent[slug].fullPath, 'utf8')
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
    }
  })
  const mdxSource = await serialize(content, { scope: data })

  // Calculate reading time from content
  const readingTime = calculateReadingTime(content)

  // Get related posts by tags (max 3)
  const relatedPosts = getRelatedPosts(slug, data.tags || [], 3)

  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: data.description || '',
      ...(data.image && { image: data.image }),
      tags: data.tags,
      author: data.author,
      readingTime,
      relatedPosts,
      source: mdxSource
    }
  }
}
