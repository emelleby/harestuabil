import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import { getPageBySlug } from "../../lib/pages";
import { fetchServiceContent, ServiceContent } from "../../lib/services";
import PageLayout from "../../components/PageLayout";
import ServiceCard from "../../components/ServiceCard";

export type Props = {
  title: string;
  slug: string;
  description?: string;
  keywords?: string[];
  source: MDXRemoteSerializeResult;
  services: ServiceContent[];
};

// MDX components that can be used in page content
const components = {
  // Add any custom components you want to use in pages here
  // For example:
  // CustomComponent: ({ children }: { children: React.ReactNode }) => (
  //   <div className="custom-component">{children}</div>
  // )
};

export default function Tjenester({
  title,
  slug,
  description,
  keywords,
  source,
  services,
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

        {/* MDX Content - Header/Intro Section */}
        <MDXRemote {...source} components={components} />

        {/* Service Listings Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch page data from MDX
  const pageData = getPageBySlug("tjenester");

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

  // Fetch services data
  const services = fetchServiceContent();

  return {
    props: {
      title: data.title,
      slug: data.slug,
      description: data.description || "",
      keywords: data.keywords || [],
      source: mdxSource,
      services,
    },
  };
};
