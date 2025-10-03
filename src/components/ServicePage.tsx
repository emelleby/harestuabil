import React from "react";
import { ServicePageHeader } from "@/components/ServicePageHeader";
import { OverviewSection } from "@/components/services/OverviewSection";
import { BenefitsSection } from "@/components/services/BenefitsSection";
import { ProcessSection } from "@/components/services/ProcessSection";
import { PricingSection } from "@/components/services/PricingSection";
import { FAQSection } from "@/components/services/FAQSection";
import { ServiceData } from "@/types/service";

interface ServicePageProps {
  serviceData: ServiceData;
}

export function ServicePage({
  serviceData,
}: ServicePageProps): React.ReactElement {
  return (
    <div lang="nb" className="container mx-auto px-4 py-8 space-y-8">
      {/* Service Header */}
      <ServicePageHeader
        name={serviceData.name}
        description={serviceData.description}
      />

      {/* Service Sections */}
      <OverviewSection content={serviceData.overview} />
      <BenefitsSection benefits={serviceData.benefits} />
      <ProcessSection steps={serviceData.process} />
      <PricingSection pricing={serviceData.pricing} />
      <FAQSection faqs={serviceData.faqs} />
    </div>
  );
}
