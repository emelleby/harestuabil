import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { ServiceData } from "@/types/service";

const servicesDirectory = path.join(process.cwd(), "content/services");

export type ServiceContent = {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly overview: string;
  readonly image?: string;
  readonly benefits: string[];
  readonly process: string[];
  readonly pricing: {
    description: string;
    details: string;
  };
  readonly faqs: Array<{
    question: string;
    answer: string;
  }>;
  readonly updated: string;
  readonly fullPath: string;
};

let serviceCache: ServiceContent[];

export function fetchServiceContent(): ServiceContent[] {
  if (serviceCache) {
    return serviceCache;
  }

  try {
    // Check if services directory exists
    if (!fs.existsSync(servicesDirectory)) {
      console.warn(`Services directory does not exist: ${servicesDirectory}`);
      return [];
    }

    // Get file names under /services
    const fileNames = fs.readdirSync(servicesDirectory);
    const allServicesData = fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map((fileName) => {
        try {
          // Read markdown file as string
          const fullPath = path.join(servicesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");

          // Use gray-matter to parse the service metadata section
          const matterResult = matter(fileContents, {
            engines: {
              yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
            },
          });

          const matterData = {
            ...matterResult.data,
            fullPath
          } as ServiceContent;

          const slug = fileName.replace(/\.mdx$/, "");

          // Validate slug string
          if (matterData.slug !== slug) {
            throw new Error(
              `Slug field "${matterData.slug}" does not match file name "${slug}" in ${fileName}`
            );
          }

          return matterData;
        } catch (error) {
          console.error(`Error processing service file ${fileName}:`, error);
          throw error;
        }
      });

    // Sort services by name
    serviceCache = allServicesData.sort((a, b) => {
      return a.name.localeCompare(b.name, 'nb');
    });

    return serviceCache;
  } catch (error) {
    console.error('Error fetching service content:', error);
    throw error;
  }
}

export function getServiceBySlug(slug: string): ServiceContent | null {
  const services = fetchServiceContent();
  return services.find(service => service.slug === slug) || null;
}

export function getAllServiceSlugs(): string[] {
  return fetchServiceContent().map(service => service.slug);
}

export function convertToServiceData(serviceContent: ServiceContent): ServiceData {
  return {
    name: serviceContent.name,
    description: serviceContent.description,
    overview: serviceContent.overview,
    image: serviceContent.image,
    benefits: serviceContent.benefits,
    process: serviceContent.process,
    pricing: serviceContent.pricing,
    faqs: serviceContent.faqs
  };
}
