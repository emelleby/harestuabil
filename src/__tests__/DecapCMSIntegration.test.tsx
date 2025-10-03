import { render, screen } from "@testing-library/react";
import { ServicePage } from "@/components/ServicePage";

// Mock service data that would come from DecapCMS
const mockDecapCMSServiceData = {
  name: "Verksted",
  description: "Generelt verkstedarbeid og reparasjoner for alle bilmerker",
  overview:
    "Vi tilbyr omfattende verkstedtjenester for alle bilmerker. Våre erfarne mekanikere bruker moderne utstyr og originale reservedeler for å sikre at bilen din får den beste behandlingen.",
  benefits: [
    "Erfarne og sertifiserte mekanikere",
    "Moderne diagnostikkutstyr",
    "Originale og kvalitetsreservedeler",
    "Konkurransedyktige priser",
    "Rask og pålitelig service",
  ],
  process: [
    "Innledende diagnose og feilsøking",
    "Detaljert kostnadsoverslag",
    "Godkjenning fra kunde før arbeid starter",
    "Utførelse av reparasjoner og service",
    "Kvalitetskontroll og testing",
    "Levering av ferdig bil",
  ],
  pricing: {
    description: "Fra 950 kr per time",
    details:
      "Kontakt oss for et detaljert prisoverslag basert på din bils behov. Vi tilbyr alltid transparent prising uten skjulte kostnader.",
  },
  faqs: [
    {
      question: "Hvor lang tid tar en standard service?",
      answer:
        "En standard service tar vanligvis 2-3 timer, avhengig av bilens tilstand og hvilke arbeider som må utføres.",
    },
    {
      question: "Tilbyr dere garanti på arbeidet?",
      answer:
        "Ja, vi gir 12 måneders garanti på alt verkstedarbeid og 24 måneders garanti på reservedeler.",
    },
  ],
};

describe("DecapCMS Integration", () => {
  it("should render service page with DecapCMS data structure", () => {
    render(<ServicePage serviceData={mockDecapCMSServiceData} />);

    // Verify that all DecapCMS fields are rendered correctly
    expect(screen.getByText("Verksted")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Generelt verkstedarbeid og reparasjoner for alle bilmerker"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Vi tilbyr omfattende verkstedtjenester/)
    ).toBeInTheDocument();
  });

  it("should render Norwegian field labels from DecapCMS", () => {
    render(<ServicePage serviceData={mockDecapCMSServiceData} />);

    // Check that Norwegian section headings are displayed
    expect(screen.getByText("Oversikt")).toBeInTheDocument();
    expect(screen.getByText("Fordeler")).toBeInTheDocument();
    expect(screen.getByText("Prosess")).toBeInTheDocument();
    expect(screen.getByText("Priser")).toBeInTheDocument();
    expect(screen.getByText("Ofte stilte spørsmål")).toBeInTheDocument();
  });

  it("should handle DecapCMS list fields correctly", () => {
    render(<ServicePage serviceData={mockDecapCMSServiceData} />);

    // Verify benefits list from DecapCMS
    expect(
      screen.getByText("Erfarne og sertifiserte mekanikere")
    ).toBeInTheDocument();
    expect(screen.getByText("Moderne diagnostikkutstyr")).toBeInTheDocument();
    expect(
      screen.getByText("Originale og kvalitetsreservedeler")
    ).toBeInTheDocument();

    // Verify process steps from DecapCMS
    expect(
      screen.getByText("Innledende diagnose og feilsøking")
    ).toBeInTheDocument();
    expect(screen.getByText("Detaljert kostnadsoverslag")).toBeInTheDocument();
    expect(
      screen.getByText("Godkjenning fra kunde før arbeid starter")
    ).toBeInTheDocument();
  });

  it("should handle DecapCMS object fields correctly", () => {
    render(<ServicePage serviceData={mockDecapCMSServiceData} />);

    // Verify pricing object from DecapCMS
    expect(screen.getByText("Fra 950 kr per time")).toBeInTheDocument();
    expect(
      screen.getByText(/Kontakt oss for et detaljert prisoverslag/)
    ).toBeInTheDocument();
  });

  it("should handle DecapCMS nested list fields correctly", () => {
    render(<ServicePage serviceData={mockDecapCMSServiceData} />);

    // Verify FAQ nested objects from DecapCMS
    expect(
      screen.getByText("Hvor lang tid tar en standard service?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "En standard service tar vanligvis 2-3 timer, avhengig av bilens tilstand og hvilke arbeider som må utføres."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tilbyr dere garanti på arbeidet?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ja, vi gir 12 måneders garanti på alt verkstedarbeid og 24 måneders garanti på reservedeler."
      )
    ).toBeInTheDocument();
  });
});
