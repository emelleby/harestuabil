import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";

export default function Services() {
  return (
    <Layout>
      <BasicMeta url={"/services"} title="Tjenester" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Tjenester</h1>
        <p className="text-lg text-muted-foreground">
          This is the services page. The header should be visible and
          responsive.
        </p>
      </div>
    </Layout>
  );
}
