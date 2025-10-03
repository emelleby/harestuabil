import React from "react";
import { render, screen } from "@testing-library/react";
import { TrustIndicators } from "@/components/TrustIndicators";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("TrustIndicators", () => {
  it("should render trust indicators section correctly", () => {
    render(<TrustIndicators />);

    // Check if the main section is rendered
    const mainSection = document.querySelector(
      'section[aria-labelledby="trust-indicators-heading"]'
    );
    expect(mainSection).toBeInTheDocument();

    // Check if the heading is rendered
    const heading = document.getElementById("trust-indicators-heading");
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName).toBe("H2");

    // Check that a subheading exists (without checking specific content)
    const subheading = mainSection?.querySelector("p");
    expect(subheading).toBeInTheDocument();
  });

  it("should render customer testimonials", () => {
    render(<TrustIndicators />);

    // Check that testimonials section exists
    const testimonialsSection = document.querySelector(
      'section[aria-labelledby="trust-indicators-heading"]'
    );
    expect(testimonialsSection).toBeInTheDocument();

    // Check that testimonial cards are rendered (without checking specific content)
    const testimonialCards =
      testimonialsSection.querySelectorAll('[class*="card"]');
    expect(testimonialCards.length).toBeGreaterThan(0);

    // Check that testimonials have quotes (blockquotes)
    const quotes = testimonialsSection.querySelectorAll("blockquote");
    expect(quotes.length).toBeGreaterThan(0);
  });

  it("should render star ratings", () => {
    render(<TrustIndicators />);

    // Check that star ratings are rendered (without exact count)
    const starElements = screen.getAllByLabelText(/stjerner/i);
    expect(starElements.length).toBeGreaterThan(0);

    // Check that stars have the correct icon
    const starIcons = document.querySelectorAll(".lucide-star");
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it("should render establishment indicators", () => {
    render(<TrustIndicators />);

    // Check that establishment section exists with icons and text
    const establishmentSection = document.querySelector(
      'section[aria-labelledby="trust-indicators-heading"]'
    );

    // Check for icons (Calendar, MapPin, Building)
    const icons = establishmentSection.querySelectorAll(
      ".lucide-calendar, .lucide-map-pin, .lucide-building"
    );
    expect(icons.length).toBeGreaterThan(0);

    // Check for establishment information headings
    const headings = establishmentSection.querySelectorAll("h3");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("should render certifications and badges", () => {
    render(<TrustIndicators />);

    // Check that certifications section exists
    const certificationsSection = document.querySelector(
      'section[aria-labelledby="certifications-heading"]'
    );
    expect(certificationsSection).toBeInTheDocument();

    // Check that certification cards are rendered
    const certCards = certificationsSection.querySelectorAll('[class*="card"]');
    expect(certCards.length).toBeGreaterThan(0);

    // Check for certification icons
    const certIcons = certificationsSection.querySelectorAll(
      ".lucide-award, .lucide-building, .lucide-users"
    );
    expect(certIcons.length).toBeGreaterThan(0);
  });

  it("should have correct Norwegian language attributes", () => {
    render(<TrustIndicators />);

    // Check if sections have lang="nb"
    const sections = document.querySelectorAll('section[lang="nb"]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it("should be accessible with proper ARIA labels", () => {
    render(<TrustIndicators />);

    // Check if sections have proper ARIA labels
    const regions = screen.getAllByRole("region");
    expect(regions.length).toBeGreaterThan(0);

    // Check if carousel controls are accessible (if implemented)
    const carouselControls = screen.queryAllByRole("button", {
      name: /(forrige|neste)/i,
    });
    if (carouselControls.length > 0) {
      carouselControls.forEach((control) => {
        expect(control).toHaveAttribute("aria-label");
      });
    }
  });
});
