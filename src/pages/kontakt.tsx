import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import fs from 'fs'
import yaml from 'js-yaml'
import { getPageBySlug } from '../lib/pages'
import PageLayout from '../components/PageLayout'
import { ContactForm } from '../components/ContactForm'
import { KontaktInfo } from '../components/KontaktInfo'
import { KartVisning } from '../components/KartVisning'
import { OfteStilteSporsmal } from '../components/OfteStilteSporsmal'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export type Props = {
  title: string
  slug: string
  description?: string
  keywords?: string[]
  source: MDXRemoteSerializeResult
}

// MDX components that can be used in page content
const components = {
  // Add any custom components you want to use in pages here
}

export default function Contact({ title, slug, description, keywords, source }: Props) {
  return (
    <PageLayout title={title} slug={slug} description={description} keywords={keywords}>
      {/* Page Content from MDX */}
      <div className="mb-12">
        <MDXRemote {...source} components={components} />
      </div>

      {/* Contact Form - Prominently displayed */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Kontakt oss</CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-4">
            <ContactForm />
          </CardContent>
        </Card>
      </section>

      {/* Business Information */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Besøk Oss</h2>
        <KontaktInfo />
      </section>

      {/* Map */}
      <section className="mb-16">
        <KartVisning />
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <OfteStilteSporsmal />
      </section>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = getPageBySlug('contact')

  if (!pageData) {
    return {
      notFound: true
    }
  }

  const source = fs.readFileSync(pageData.fullPath, 'utf8')
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
    }
  })
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      title: data.title,
      slug: data.slug,
      description: data.description || '',
      keywords: data.keywords || [],
      source: mdxSource
    }
  }
}
