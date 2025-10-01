import React, { useRef, useEffect } from "react";
import { MapPin, Wrench, Users, TrendingUp } from "lucide-react";

interface AdvantageCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const advantages: AdvantageCard[] = [
  {
    id: "local-workshop",
    title: "Lokalt verksted",
    description:
      "Din lokale bilpartner på Harestua. Rask service uten å reise til byen.",
    icon: MapPin,
  },
  {
    id: "expert-mechanics",
    title: "Erfarne mekanikere",
    description:
      "Sertifiserte mekanikere med lang erfaring med alle bilmerker.",
    icon: Wrench,
  },
  {
    id: "personal-service",
    title: "Personlig service",
    description:
      "Med god kaffe og ærlig rådgivning som sparer deg tid og penger.",
    icon: Users,
  },
  {
    id: "competitive-prices",
    title: "Konkurransedyktige priser",
    description: "Rimelige priser og faste kostnader uten skjulte gebyrer.",
    icon: TrendingUp,
  },
];

export function ValueProposition(): React.ReactElement {
  const headingId = "value-proposition-heading";
  const sectionRef = useRef<HTMLElement>(null);

  // Handle keyboard navigation for cards
  const handleKeyDown = (event: React.KeyboardEvent, cardId: string) => {
    const cards = Array.from(document.querySelectorAll('[role="article"]'));
    const currentIndex = cards.findIndex((card) => card.id === cardId);

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % cards.length;
        (cards[nextIndex] as HTMLElement).focus();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        (cards[prevIndex] as HTMLElement).focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        // Could trigger a modal or more information here
        break;
    }
  };

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby={headingId}
      aria-label="Fordeler med Harestua Bil"
      lang="nb"
      className="w-full py-16 px-4 md:py-24 bg-background relative"
      tabIndex={-1}
    >
      {/* Subtle background accent using Norwegian brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            id={headingId}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Hvorfor velge oss?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vi kombinerer ekte norsk håndverk med moderne teknologi for å gi deg
            den beste bilpleien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {advantages.map((advantage) => (
            <article
              key={advantage.id}
              id={advantage.id}
              className="bg-card rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-accent/50 cursor-pointer border border-border group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              tabIndex={0}
              role="article"
              aria-labelledby={`${advantage.id}-title`}
              aria-describedby={`${advantage.id}-description`}
              onKeyDown={(e) => handleKeyDown(e, advantage.id)}
            >
              {/* Subtle accent line on top of card */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <advantage.icon
                      size={24}
                      className="text-primary group-hover:text-primary/80 transition-colors duration-300"
                    />
                  </div>
                </div>
                <h3
                  id={`${advantage.id}-title`}
                  className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300"
                >
                  {advantage.title}
                </h3>
                <p
                  id={`${advantage.id}-description`}
                  className="text-muted-foreground leading-relaxed text-sm"
                >
                  {advantage.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
