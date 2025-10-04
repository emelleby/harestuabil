import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import { getPageBySlug } from "../lib/pages";
import PageLayout from "../components/PageLayout";
import { DottedMap } from "@/components/ui/magicui/dotted-map";
import { LightRays } from "@/components/ui/light-rays";

export type Props = {
  title: string;
  slug: string;
  description?: string;
  keywords?: string[];
  source: MDXRemoteSerializeResult;
};

// MDX components that can be used in page content
const components = {
  // Add any custom components you want to use in pages here
  // For example:
  // CustomComponent: ({ children }: { children: React.ReactNode }) => (
  //   <div className="custom-component">{children}</div>
  // )
};

export default function About({
  title,
  slug,
  description,
  keywords,
  source,
}: Props) {
  return (
    <div className="relative min-h-screen z-10">
      {/* DottedMap as background element */}
      {/* <div className="fixed inset-0 h-full z-0 opacity-20">
        <
          mapSamples={8000}
          dotRadius={0.15}
          dotColor="#53fdec"
          markerColor="#ec4899"
          className="w-full h-full"
        />
      </div> */}

      {/* Page content with higher z-index */}
      <PageLayout
        title={title}
        slug={slug}
        description={description}
        keywords={keywords}
      >
        {/* <LightRays
          className=""
          count={20}
          color="rgba(210,105,30, 0.05)"
          blur={15}
          speed={16}
          length="90vh"
        /> */}
        <MDXRemote {...source} components={components} />
      </PageLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = getPageBySlug("about");

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  const source = fs.readFileSync(pageData.fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      title: data.title,
      slug: data.slug,
      description: data.description || "",
      keywords: data.keywords || [],
      source: mdxSource,
    },
  };
};
