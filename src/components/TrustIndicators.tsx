import React, { useState } from "react";
import { Star, MapPin, Award, Users, Calendar, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
}

interface Certification {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Kari Nordmann",
    location: "Harestua",
    rating: 5,
    comment:
      "Fantastisk service! Rask, pålitelig og alltid ærlig rådgivning. Anbefales!",
  },
  {
    id: "testimonial-2",
    name: "Ola Svendsen",
    location: "Røykenvik",
    rating: 5,
    comment:
      "Rask og pålitelig service. De fikset bilen min samme dag til en god pris.",
  },
  {
    id: "testimonial-3",
    name: "Anne Hansen",
    location: "Svingen",
    rating: 5,
    comment:
      "Ærlig og god service. Føler meg alltid trygg når jeg leverer bilen min her.",
  },
  {
    id: "testimonial-4",
    name: "Per Johansen",
    location: "Grua",
    rating: 5,
    comment: "Beste verkstedet på Harestua! Personlig service og ekte fagfolk.",
  },
];

const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Autorisert bilverksted",
    description: "Godkjent av Statens vegvesen",
    icon: Award,
  },
  {
    id: "cert-2",
    name: "Miljøfyrtårn",
    description: "Sertifisert for bærekraftig drift",
    icon: Building,
  },
  {
    id: "cert-3",
    name: "Norsk Bilbransjeforbund",
    description: "Medlem av bransjeorganisasjonen",
    icon: Users,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center" aria-label={`${rating} av 5 stjerner`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-full bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>
          <blockquote className="text-card-foreground italic mb-4 flex-grow">
            "{testimonial.comment}"
          </blockquote>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" aria-hidden="true" />
            <span>
              {testimonial.name}, {testimonial.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function TrustIndicators(): React.ReactElement {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const headingId = "trust-indicators-heading";
  const certificationsId = "certifications-heading";

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <>
      {/* Testimonials Section */}
      <section
        role="region"
        aria-labelledby={headingId}
        aria-label="Tilbakemeldinger fra kunder"
        lang="nb"
        className="w-full py-16 px-4 md:py-24 bg-muted/30 relative"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2
              id={headingId}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Hva våre kunder sier
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vi er stolte av å ha tjent det lokale samfunnet siden 2015
            </p>
          </div>

          {/* Desktop grid view */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile carousel view */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                aria-label="Forrige tilbakemelding"
                className="rounded-full"
              >
                ←
              </Button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentTestimonialIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Gå til tilbakemelding ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                aria-label="Neste tilbakemelding"
                className="rounded-full"
              >
                →
              </Button>
            </div>
          </div>

          {/* Establishment Indicators */}
          <div className="mt-16 border-t border-border pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Calendar className="text-primary mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-1">
                  Etablert 2015
                </h3>
                <p className="text-muted-foreground text-sm">
                  Over 8 år i bransjen
                </p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="text-primary mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-1">
                  Lokal bedrift
                </h3>
                <p className="text-muted-foreground text-sm">
                  Hjertet av Harestua
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Building className="text-primary mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-1">
                  Registrert i Norge
                </h3>
                <p className="text-muted-foreground text-sm">
                  Org.nr: 123 456 789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        role="region"
        aria-labelledby={certificationsId}
        aria-label="Sertifikater og medlemskap"
        lang="nb"
        className="w-full py-16 px-4 md:py-24 bg-background relative"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2
              id={certificationsId}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Våre sertifikater og medlemskap
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vi er stolte av våre faglige sertifikater og medlemskap i
              bransjeorganisasjoner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((certification) => (
              <Card
                key={certification.id}
                className="bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <certification.icon size={32} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {certification.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {certification.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
