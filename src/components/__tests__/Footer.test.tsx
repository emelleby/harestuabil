import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer Component", () => {
  test("renders company information", () => {
    render(<Footer />);

    // Check company name
    expect(screen.getByText("Harestua Bilverksted")).toBeInTheDocument();

    // Check company description
    expect(
      screen.getByText(/Din lokale bilpartner på Harestua/)
    ).toBeInTheDocument();
  });

  test("renders quick links", () => {
    render(<Footer />);

    // Check navigation links
    expect(screen.getByText("Hjem")).toBeInTheDocument();
    expect(screen.getByText("Tjenester")).toBeInTheDocument();
    expect(screen.getByText("Om oss")).toBeInTheDocument();
    expect(screen.getByText("Kontakt")).toBeInTheDocument();
  });

  test("renders contact information", () => {
    render(<Footer />);

    // Check address
    expect(screen.getByText("Røyseveien 123")).toBeInTheDocument();
    expect(screen.getByText("3520 Harestua")).toBeInTheDocument();

    // Check phone
    expect(screen.getByText("+47 64 87 65 43")).toBeInTheDocument();

    // Check email
    expect(screen.getByText("post@harestuabilverksted.no")).toBeInTheDocument();
  });

  test("renders opening hours", () => {
    render(<Footer />);

    // Check opening hours
    expect(screen.getByText("Man-Fre: 08:00 - 17:00")).toBeInTheDocument();
    expect(screen.getByText("Lørdag: 09:00 - 14:00")).toBeInTheDocument();
    expect(screen.getByText("Søndag: Stengt")).toBeInTheDocument();
  });

  test("renders social media links", () => {
    render(<Footer />);

    // Check social media buttons with aria-labels
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  test("renders copyright information", () => {
    render(<Footer />);

    // Check copyright text with current year
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} Harestua Bilverksted. Alle rettigheter reservert.`
      )
    ).toBeInTheDocument();

    // Check organization number
    expect(screen.getByText("Org.nr: 987 654 321 MVA")).toBeInTheDocument();
  });

  test("renders bottom links", () => {
    render(<Footer />);

    // Check privacy and terms links
    expect(screen.getByText("Personvern")).toBeInTheDocument();
    expect(screen.getByText("Betingelser")).toBeInTheDocument();
  });

  test("has correct language attribute", () => {
    render(<Footer />);

    // Check Norwegian language attribute
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("lang", "nb");
  });

  test("has semantic HTML structure", () => {
    render(<Footer />);

    // Check for footer landmark
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Check for navigation landmarks
    const navigation = screen.getAllByRole("navigation");
    expect(navigation.length).toBeGreaterThan(0);
  });
});
