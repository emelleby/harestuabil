import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ValueProposition } from "../components/ValueProposition";
import { TrustIndicators } from "../components/TrustIndicators";

export default function Index() {
  const router = useRouter();
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <main lang="nb" className="w-full">
        <section
          role="banner"
          aria-labelledby="hero-heading"
          className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/service.webp')",
          }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

          {/* Content HERO*/}
          <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-heading"
                className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-100 mb-6 leading-tight drop-shadow-lg"
              >
                Din lokale bilpartner
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-100/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
                Harestua Bil - din lokale partner, med god kaffe og personlig
                service som sparer deg tid, penger og frustrasjoner
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-lg"
                  aria-label="Kontakt oss for å bestille time eller få mer informasjon"
                  tabIndex={0}
                  onClick={() => router.push("/contact")}
                >
                  Kontakt oss
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary dark:hover:bg-primary/10 hover:text-primary px-8 py-3 bg-background/80 backdrop-blur-sm shadow-lg"
                  aria-label="Se oversikt over våre tjenester"
                  tabIndex={0}
                  onClick={() => router.push("/services")}
                >
                  Våre tjenester
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <ValueProposition />

        {/* Trust Indicators Section */}
        <TrustIndicators />
      </main>
    </Layout>
  );
}
