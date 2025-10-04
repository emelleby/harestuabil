import Link from "next/link";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";
import { ServiceContent } from "@/lib/services";

interface ServiceCardProps {
  service: ServiceContent;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/tjenester/${service.slug}`}
      className="block group !decoration-transparent"
    >
      <div className="relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <ShineBorder
          className="rounded-lg"
          borderWidth={1}
          duration={14}
          shineColor={["#a855f7", "#3b82f6", "#06b6d4"]}
        />

        {/* Card Content */}
        <div className="relative bg-card border border-border rounded-lg overflow-hidden">
          {/* Image Section with Overlay */}
          <div className="relative h-48 w-full">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Ingen bilde</span>
              </div>
            )}

            {/* Service heading overlay */}
            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-3xl font-semibold text-white rounded px-2 py-1 bg-black/50">
                {service.name}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <h3 className="text-muted-foreground mb-4">
              {service.description}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {service.overview}
            </p>

            {/* Footer with pricing and button */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-foreground">
                {service.pricing.description}
              </span>
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer group-hover:bg-primary/90 transition-colors">
                Les mer
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
