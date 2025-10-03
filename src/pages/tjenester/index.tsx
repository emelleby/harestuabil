import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import Link from "next/link";
import { GetStaticProps } from "next";
import { fetchServiceContent, ServiceContent } from "../../lib/services";

interface TjenesterProps {
  services: ServiceContent[];
}

export default function Tjenester({ services }: TjenesterProps) {
  return (
    <Layout>
      <BasicMeta url={"/tjenester"} title="Tjenester" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-foreground">
          Våre Tjenester
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Vi tilbyr et bredt spekter av biltjenester for å dekke alle dine
          behov. Våre erfarne mekanikere bruker moderne utstyr og originale
          reservedeler.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.slug}
              className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-3 text-foreground">
                {service.name}
              </h2>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {service.overview}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-foreground">
                  {service.pricing.description}
                </span>
                <Link
                  href={`/tjenester/${service.slug}`}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Les mer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const services = fetchServiceContent();

  return {
    props: {
      services,
    },
  };
};
