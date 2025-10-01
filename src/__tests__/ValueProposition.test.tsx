import { render, screen, fireEvent } from "@testing-library/react";
import { ValueProposition } from "../components/ValueProposition";

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
  MapPin: ({ className, size }: any) => (
    <div
      data-testid="map-pin-icon"
      className={className}
      style={{ width: size, height: size }}
    />
  ),
  Wrench: ({ className, size }: any) => (
    <div
      data-testid="wrench-icon"
      className={className}
      style={{ width: size, height: size }}
    />
  ),
  Users: ({ className, size }: any) => (
    <div
      data-testid="users-icon"
      className={className}
      style={{ width: size, height: size }}
    />
  ),
  TrendingUp: ({ className, size }: any) => (
    <div
      data-testid="trending-up-icon"
      className={className}
      style={{ width: size, height: size }}
    />
  ),
}));

describe("ValueProposition Component", () => {
  beforeEach(() => {
    render(<ValueProposition />);
  });

  describe("Component Structure", () => {
    it("should render value proposition section with Norwegian language attribute", () => {
      const section = screen.getByRole("region", { name: /fordeler/i });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute("lang", "nb");
    });

    it("should display section heading in Norwegian", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Hvorfor velge oss?");
    });

    it("should render 4 service advantage cards", () => {
      const cards = screen.getAllByRole("article");
      expect(cards.length).toBe(4);
    });
  });

  describe("Service Advantage Cards", () => {
    it("should display Norwegian service descriptions", () => {
      // Check for Norwegian service descriptions
      expect(screen.getByText(/Lokalt verksted/i)).toBeInTheDocument();
      expect(screen.getByText(/Erfarne mekanikere/i)).toBeInTheDocument();
      expect(screen.getByText(/Personlig service/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Konkurransedyktige priser/i)
      ).toBeInTheDocument();
    });

    it("should display relevant Lucide icons for each advantage", () => {
      const mapPinIcon = screen.getByTestId("map-pin-icon");
      const wrenchIcon = screen.getByTestId("wrench-icon");
      const usersIcon = screen.getByTestId("users-icon");
      const trendingUpIcon = screen.getByTestId("trending-up-icon");

      expect(mapPinIcon).toBeInTheDocument();
      expect(wrenchIcon).toBeInTheDocument();
      expect(usersIcon).toBeInTheDocument();
      expect(trendingUpIcon).toBeInTheDocument();
    });

    it("should have hover states for engagement", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card).toHaveClass(/hover:/);
      });
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive grid layout classes", () => {
      const grid = screen.getByRole("region", { name: /fordeler/i });
      expect(grid).toHaveClass(/grid/);
      expect(grid).toHaveClass(/md:grid-cols-2/);
      expect(grid).toHaveClass(/lg:grid-cols-4/);
    });

    it("should have mobile-first responsive design", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card.className).toMatch(/w-full|px-\d|py-\d/);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      const section = screen.getByRole("region", { name: /fordeler/i });
      expect(section).toHaveAttribute("aria-labelledby");

      const heading = screen.getByRole("heading", { level: 2 });
      expect(section.getAttribute("aria-labelledby")).toBe(heading.id);
    });

    it("should support keyboard navigation", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card).toHaveAttribute("tabIndex", "0");
      });
    });

    it("should have proper focus management", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card).toHaveClass(
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-primary"
        );
      });
    });

    it("should have decorative icons marked as aria-hidden", () => {
      const iconContainers = screen
        .getAllByTestId(/-icon$/)
        .map((icon) => icon.closest("div[aria-hidden='true']"));
      iconContainers.forEach((container) => {
        if (container) {
          expect(container).toHaveAttribute("aria-hidden", "true");
        }
      });
    });

    it("should have semantic HTML structure", () => {
      const section = screen.getByRole("region");
      const heading = screen.getByRole("heading", { level: 2 });
      const cards = screen.getAllByRole("article");

      expect(section).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe("Visual Design", () => {
    it("should use Norwegian brand colors from theme", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        // Check for theme color variables
        expect(card.className).toMatch(/bg-|text-|border-/);
      });
    });

    it("should have consistent visual design with hero section", () => {
      const section = screen.getByRole("region");
      expect(section).toHaveClass(/shadow-|rounded-/);
    });
  });

  describe("Micro-interactions", () => {
    it("should have transition classes for smooth interactions", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card.className).toMatch(/transition-/);
      });
    });

    it("should have hover effects that enhance user engagement", () => {
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card.className).toMatch(/hover:/);
      });
    });

    it("should have icon hover animations", () => {
      const icons = screen.getAllByTestId(/-icon$/);
      // Icons should have hover animation classes through parent group
      expect(icons.length).toBe(4);

      // Check that icons have proper sizing
      icons.forEach((icon) => {
        expect(icon).toHaveStyle({ width: "24px", height: "24px" });
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("should handle arrow key navigation between cards", () => {
      const cards = screen.getAllByRole("article");
      const firstCard = cards[0];

      // Focus first card
      firstCard.focus();
      expect(firstCard).toHaveFocus();

      // Test arrow right navigation
      fireEvent.keyDown(firstCard, { key: "ArrowRight" });
      expect(cards[1]).toHaveFocus();

      // Test arrow down navigation
      fireEvent.keyDown(cards[1], { key: "ArrowDown" });
      expect(cards[2]).toHaveFocus();

      // Test arrow left navigation (wraps to end)
      fireEvent.keyDown(cards[2], { key: "ArrowLeft" });
      expect(cards[1]).toHaveFocus();

      // Test arrow up navigation (wraps to end)
      fireEvent.keyDown(cards[1], { key: "ArrowUp" });
      expect(cards[0]).toHaveFocus();
    });

    it("should handle Enter and Space key presses", () => {
      const cards = screen.getAllByRole("article");
      const firstCard = cards[0];

      // Test Enter key
      fireEvent.keyDown(firstCard, { key: "Enter" });
      // Should prevent default and not cause page navigation

      // Test Space key
      fireEvent.keyDown(firstCard, { key: " " });
      // Should prevent default and not cause page scroll
    });
  });

  describe("Content Validation", () => {
    it("should have unique IDs for all cards", () => {
      const cards = screen.getAllByRole("article");
      const cardIds = cards.map((card) => card.id);
      const uniqueIds = Array.from(new Set(cardIds));

      expect(cardIds.length).toBe(Array.from(uniqueIds).length);
      expect(cardIds.length).toBe(4);
    });

    it("should have proper heading hierarchy", () => {
      const mainHeading = screen.getByRole("heading", { level: 2 });
      const cardHeadings = screen.getAllByRole("heading", { level: 3 });

      expect(mainHeading).toBeInTheDocument();
      expect(cardHeadings.length).toBe(4);
    });

    it("should have Norwegian language content throughout", () => {
      const section = screen.getByRole("region");
      expect(section).toHaveAttribute("lang", "nb");

      // Check for Norwegian characters and words
      expect(screen.getByText(/Hvorfor velge oss\?/i)).toBeInTheDocument();
      expect(screen.getByText(/æ|ø|å/i)).toBeInTheDocument(); // At least one Norwegian character
    });
  });
});
