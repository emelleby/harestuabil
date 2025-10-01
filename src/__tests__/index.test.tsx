import { render, screen, fireEvent } from "@testing-library/react";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the Layout component to avoid complex dependencies
jest.mock("../components/Layout", () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

// Mock the Button component
jest.mock("../components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
}));

// Import after mocks
import Index from "../pages/index";
import { useRouter } from "next/router";

describe("Homepage Hero Section", () => {
  beforeEach(() => {
    render(<Index />);
  });

  describe("Hero Section Structure", () => {
    it("should render hero section with full-width layout", () => {
      const heroSection = screen.getByRole("main");
      expect(heroSection).toBeInTheDocument();
    });

    it("should display Norwegian value proposition text", () => {
      const valueProposition = screen.getByText(/Din lokale bilpartner/i);
      expect(valueProposition).toBeInTheDocument();
      expect(valueProposition).toHaveTextContent("Din lokale bilpartner");

      // Check for the full value proposition in the paragraph
      const fullValueProposition = screen.getByText(
        /Harestua Bil - din lokale partner, med god kaffe og personlig service som sparer deg tid, penger og frustrasjoner/i
      );
      expect(fullValueProposition).toBeInTheDocument();
    });

    it("should have Norwegian language attribute", () => {
      const mainElement = screen.getByRole("main");
      expect(mainElement).toHaveAttribute("lang", "nb");
    });
  });

  describe("Workshop Imagery", () => {
    it("should display workshop background image", () => {
      const heroSection = screen.getByRole("banner");
      expect(heroSection).toHaveStyle({
        backgroundImage: 'url("/images/service.webp")',
      });
    });

    it("should have proper background image styling", () => {
      const heroSection = screen.getByRole("banner");
      expect(heroSection).toHaveClass("bg-cover", "bg-center", "bg-no-repeat");
    });
  });

  describe("Call-to-Action Buttons", () => {
    const mockRouter = {
      push: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    };

    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    it("should display primary CTA button with Norwegian text", () => {
      const primaryCTA = screen.getByRole("button", { name: /kontakt oss/i });
      expect(primaryCTA).toBeInTheDocument();
    });

    it("should display secondary CTA button with Norwegian text", () => {
      const secondaryCTA = screen.getByRole("button", {
        name: /våre tjenester/i,
      });
      expect(secondaryCTA).toBeInTheDocument();
    });

    it("should have proper ARIA labels for CTAs", () => {
      const primaryCTA = screen.getByRole("button", { name: /kontakt oss/i });
      const secondaryCTA = screen.getByRole("button", {
        name: /våre tjenester/i,
      });

      expect(primaryCTA).toHaveAttribute("aria-label");
      expect(secondaryCTA).toHaveAttribute("aria-label");
    });

    it("should navigate to contact page when primary CTA is clicked", () => {
      const primaryCTA = screen.getByRole("button", { name: /kontakt oss/i });

      fireEvent.click(primaryCTA);

      expect(mockRouter.push).toHaveBeenCalledWith("/contact");
    });

    it("should navigate to services page when secondary CTA is clicked", () => {
      const secondaryCTA = screen.getByRole("button", {
        name: /våre tjenester/i,
      });

      fireEvent.click(secondaryCTA);

      expect(mockRouter.push).toHaveBeenCalledWith("/services");
    });

    it("should have proper button styling classes", () => {
      const primaryCTA = screen.getByRole("button", { name: /kontakt oss/i });
      const secondaryCTA = screen.getByRole("button", {
        name: /våre tjenester/i,
      });

      expect(primaryCTA).toHaveClass(
        "bg-primary",
        "hover:bg-primary/90",
        "text-primary-foreground"
      );
      expect(secondaryCTA).toHaveClass(
        "border-primary",
        "text-primary",
        "bg-background/80"
      );
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive text sizing classes", () => {
      const valueProposition = screen.getByText(/Din lokale bilpartner/i);
      expect(valueProposition.className).toMatch(/text-/);
    });

    it("should have mobile-first responsive layout", () => {
      const heroSection = screen.getByRole("main");
      expect(heroSection.className).toMatch(/w-full/);
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it("should support keyboard navigation", () => {
      const primaryCTA = screen.getByRole("button", { name: /kontakt oss/i });
      expect(primaryCTA).toHaveAttribute("tabIndex");
    });

    it("should have semantic HTML structure", () => {
      const mainElement = screen.getByRole("main");
      const heroSection = screen.getByRole("banner");

      expect(mainElement).toBeInTheDocument();
      expect(heroSection).toBeInTheDocument();
    });
  });
});
