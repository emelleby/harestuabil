import { render, screen } from "@testing-library/react";
import { ServicePage } from "@/components/ServicePage";

describe("ServicePage", () => {
  const mockServiceData = {
    name: "Verksted",
    description: "Generelt verkstedarbeid og reparasjoner",
    overview: "Vi tilbyr omfattende verkstedtjenester for alle bilmerker.",
    benefits: [
      "Erfarne mekanikere",
      "Moderne utstyr",
      "Konkurransedyktige priser",
    ],
    process: [
      "Innledende diagnose",
      "Kostnadsoverslag",
      "Utførelse av arbeid",
      "Kvalitetskontroll",
    ],
    pricing: {
      description: "Priser fra 800 kr per time",
      details: "Kontakt oss for detaljert prisoverslag",
    },
    faqs: [
      {
        question: "Hvor lang tid tar en service?",
        answer: "En standard service tar vanligvis 2-3 timer.",
      },
    ],
  };

  it("should render service page with Norwegian content", () => {
    render(<ServicePage serviceData={mockServiceData} />);

    expect(screen.getByText("Verksted")).toBeInTheDocument();
    expect(
      screen.getByText("Generelt verkstedarbeid og reparasjoner")
    ).toBeInTheDocument();
  });

  it("should render all standardized sections", () => {
    render(<ServicePage serviceData={mockServiceData} />);

    // Check for section headings in Norwegian
    expect(screen.getByText("Oversikt")).toBeInTheDocument();
    expect(screen.getByText("Fordeler")).toBeInTheDocument();
    expect(screen.getByText("Prosess")).toBeInTheDocument();
    expect(screen.getByText("Priser")).toBeInTheDocument();
    expect(screen.getByText("Ofte stilte spørsmål")).toBeInTheDocument();
  });

  it("should have proper Norwegian language attribute", () => {
    const { container } = render(<ServicePage serviceData={mockServiceData} />);
    const servicePageElement = container.querySelector('[lang="nb"]');
    expect(servicePageElement).toBeInTheDocument();
  });

  it("should render benefits list correctly", () => {
    render(<ServicePage serviceData={mockServiceData} />);

    expect(screen.getByText("Erfarne mekanikere")).toBeInTheDocument();
    expect(screen.getByText("Moderne utstyr")).toBeInTheDocument();
    expect(screen.getByText("Konkurransedyktige priser")).toBeInTheDocument();
  });

  it("should render process steps correctly", () => {
    render(<ServicePage serviceData={mockServiceData} />);

    expect(screen.getByText("Innledende diagnose")).toBeInTheDocument();
    expect(screen.getByText("Kostnadsoverslag")).toBeInTheDocument();
    expect(screen.getByText("Utførelse av arbeid")).toBeInTheDocument();
    expect(screen.getByText("Kvalitetskontroll")).toBeInTheDocument();
  });

  it("should render FAQ section correctly", () => {
    render(<ServicePage serviceData={mockServiceData} />);

    expect(
      screen.getByText("Hvor lang tid tar en service?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("En standard service tar vanligvis 2-3 timer.")
    ).toBeInTheDocument();
  });
});
