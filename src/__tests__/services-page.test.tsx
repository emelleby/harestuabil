import { render, screen } from "@testing-library/react";
import Tjenester from "@/pages/tjenester/index";
import { ServiceContent } from "@/lib/services";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Layout component
jest.mock("@/components/Layout", () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

// Mock BasicMeta component
jest.mock("@/components/meta/BasicMeta", () => {
  return () => <div data-testid="basic-meta" />;
});

describe("Tjenester Page", () => {
  const mockServices: ServiceContent[] = [
    {
      slug: "verksted",
      name: "Verksted",
      description: "Generelt verkstedarbeid og reparasjoner for alle bilmerker",
      overview: "Vi tilbyr omfattende verkstedtjenester for alle bilmerker.",
      benefits: ["Erfarne mekanikere", "Moderne utstyr"],
      process: ["Diagnose", "Reparasjon"],
      pricing: {
        description: "Fra 950 kr per time",
        details: "Kontakt oss for prisoverslag",
      },
      faqs: [
        {
          question: "Hvor lang tid tar service?",
          answer: "2-3 timer vanligvis",
        },
      ],
      updated: "2025-10-03",
      fullPath: "/path/to/verksted.mdx",
    },
    {
      slug: "dekk-og-felg",
      name: "Dekk og felg",
      description: "Dekkskift, balansering og felgreparasjoner",
      overview: "Vi tilbyr komplette dekk- og felgtjenester.",
      benefits: ["Profesjonell montering", "Stort utvalg"],
      process: ["Vurdering", "Montering"],
      pricing: {
        description: "Fra 200 kr per dekk",
        details: "Prisen inkluderer montering",
      },
      faqs: [
        {
          question: "Når bør jeg skifte dekk?",
          answer: "Ved temperatur under 7°C",
        },
      ],
      updated: "2025-10-03",
      fullPath: "/path/to/dekk-og-felg.mdx",
    },
    {
      slug: "dekkhotell",
      name: "Dekkhotell",
      description: "Trygg og tørr oppbevaring av dekk gjennom hele året",
      overview:
        "Vårt dekkhotell tilbyr profesjonell oppbevaring av dine sesongdekk.",
      benefits: ["Trygg oppbevaring", "Gratis henting"],
      process: ["Bestilling", "Innlevering"],
      pricing: {
        description: "Fra 600 kr per sesong",
        details: "Inkluderer henting og levering",
      },
      faqs: [
        {
          question: "Hvor lenge kan dekk oppbevares?",
          answer: "Både sesong og helår",
        },
      ],
      updated: "2025-10-03",
      fullPath: "/path/to/dekkhotell.mdx",
    },
    {
      slug: "bilglass",
      name: "Bilglass",
      description: "Reparasjon og utskifting av frontruter og bilglass",
      overview: "Vi tilbyr profesjonelle bilglasstjenester.",
      benefits: ["Sertifiserte teknikere", "Originalglass"],
      process: ["Vurdering", "Reparasjon"],
      pricing: {
        description: "Fra 350 kr for steinsprutreparasjon",
        details: "Utskifting fra 3500 kr",
      },
      faqs: [
        {
          question: "Kan alle steinsprut repareres?",
          answer: "Avhenger av størrelse og plassering",
        },
      ],
      updated: "2025-10-03",
      fullPath: "/path/to/bilglass.mdx",
    },
  ];

  it("should render tjenester page with Norwegian heading", () => {
    render(<Tjenester services={mockServices} />);

    expect(screen.getByText("Våre Tjenester")).toBeInTheDocument();
    expect(
      screen.getByText(/Vi tilbyr et bredt spekter av biltjenester/)
    ).toBeInTheDocument();
  });

  it("should render all service cards", () => {
    render(<Tjenester services={mockServices} />);

    mockServices.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      expect(screen.getByText(service.pricing.description)).toBeInTheDocument();
    });
  });

  it("should render links to individual service pages", () => {
    render(<Tjenester services={mockServices} />);

    const links = screen.getAllByText("Les mer");
    expect(links).toHaveLength(mockServices.length);

    links.forEach((link, index) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        `/tjenester/${mockServices[index].slug}`
      );
    });
  });

  it("should use Norwegian language throughout", () => {
    render(<Tjenester services={mockServices} />);

    // Check for Norwegian text elements
    expect(screen.getByText("Våre Tjenester")).toBeInTheDocument();
    expect(screen.getAllByText("Les mer")).toHaveLength(mockServices.length);
    expect(
      screen.getByText(/moderne utstyr og originale reservedeler/)
    ).toBeInTheDocument();
  });

  it("should have responsive grid layout classes", () => {
    render(<Tjenester services={mockServices} />);

    const gridContainer = screen.getByText("Verksted").closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1", "md:grid-cols-2");
  });

  it("should use semantic theme colors", () => {
    render(<Tjenester services={mockServices} />);

    // Check that theme color classes are used instead of hardcoded colors
    const heading = screen.getByText("Våre Tjenester");
    expect(heading).toHaveClass("text-foreground");

    const description = screen.getByText(/Vi tilbyr et bredt spekter/);
    expect(description).toHaveClass("text-muted-foreground");
  });
});
