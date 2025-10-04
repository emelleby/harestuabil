import React from "react";
import styles from "../../public/styles/content.module.css";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import { LightRays } from "./ui/light-rays";

type Props = {
  title: string;
  slug: string;
  description?: string;
  keywords?: string[];
  children: React.ReactNode;
};

export default function PageLayout({
  title,
  slug,
  description = "",
  keywords = [],
  children,
}: Props) {
  const pageUrl = `/${slug}`;

  return (
    <Layout>
      <BasicMeta
        url={pageUrl}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta url={pageUrl} title={title} description={description} />
      <OpenGraphMeta url={pageUrl} title={title} description={description} />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            {description && <p className="">{description}</p>}
          </header>
          <div className={`${styles.content} content`}>
            <LightRays
              className=""
              count={20}
              color="rgba(210,105,30, 0.05)"
              blur={15}
              speed={16}
              length="90vh"
            />
            {children}
          </div>
        </article>
      </div>
    </Layout>
  );
}
