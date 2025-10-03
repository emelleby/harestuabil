import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import { ServicePage } from "@/components/ServicePage";
import { ServiceData } from "@/types/service";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  convertToServiceData,
} from "@/lib/services";

interface ServicePageProps {
  serviceData: ServiceData;
  slug: string;
}

export default function ServicePageRoute({
  serviceData,
  slug,
}: ServicePageProps) {
  return (
    <Layout>
      <BasicMeta
        url={`/tjenester/${slug}`}
        title={serviceData.name}
        description={serviceData.description}
      />
      <ServicePage serviceData={serviceData} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const serviceSlugs = getAllServiceSlugs();

  const paths = serviceSlugs.map((service) => ({
    params: { service },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const serviceSlug = params?.service as string;

  const serviceContent = getServiceBySlug(serviceSlug);

  if (!serviceContent) {
    return {
      notFound: true,
    };
  }

  const serviceData = convertToServiceData(serviceContent);

  return {
    props: {
      serviceData,
      slug: serviceSlug,
    },
  };
};
