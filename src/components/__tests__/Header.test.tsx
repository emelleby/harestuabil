import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { Header } from "../Header";
import { ThemeProvider } from "../../contexts/ThemeContext";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  pathname: "/",
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  reload: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const HeaderWithTheme = () => (
  <ThemeProvider>
    <Header />
  </ThemeProvider>
);

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test("renders brand logo", () => {
    render(<HeaderWithTheme />);
    // Check that brand logo exists and is a link to homepage
    const brandLogo = screen.getByRole("link", { name: /go to homepage/i });
    expect(brandLogo).toBeInTheDocument();
    expect(brandLogo).toHaveAttribute("href", "/");
  });

  test("renders desktop navigation links", () => {
    render(<HeaderWithTheme />);
    // Check that navigation exists and has multiple links
    const navigation = screen.getByRole("navigation", {
      name: /main navigation/i,
    });
    expect(navigation).toBeInTheDocument();

    // Check that there are navigation links (without checking specific content)
    const navLinks = navigation.querySelectorAll("a");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test("renders theme toggle button", () => {
    render(<HeaderWithTheme />);
    const themeToggle = screen.getByLabelText(/switch to/i);
    expect(themeToggle).toBeInTheDocument();
  });

  // Test for Norwegian navigation labels
  test("renders Norwegian navigation labels", () => {
    render(<HeaderWithTheme />);

    // Check that navigation contains Norwegian labels
    expect(screen.getByText("Hjem")).toBeInTheDocument();
    expect(screen.getByText("Blogg")).toBeInTheDocument();
    expect(screen.getByText("Tjenester")).toBeInTheDocument();
    expect(screen.getByText("Om oss")).toBeInTheDocument();
    expect(screen.getByText("Partnere")).toBeInTheDocument();
    expect(screen.getByText("Kontakt")).toBeInTheDocument();
  });

  test("mobile menu toggle works with Norwegian labels", () => {
    render(<HeaderWithTheme />);

    // Desktop navigation should be visible
    const desktopNav = screen.getByRole("navigation", {
      name: /main navigation/i,
    });
    expect(desktopNav).toBeInTheDocument();

    // Click mobile menu button with Norwegian label
    const menuButton = screen.getByLabelText("Åpne meny");
    fireEvent.click(menuButton);

    // Mobile menu should now be open (button should have changed to Norwegian close label)
    const closeButton = screen.queryByLabelText("Lukk meny");
    expect(closeButton).toBeInTheDocument();
  });

  test("mobile menu has enhanced animations", () => {
    render(<HeaderWithTheme />);

    // Click mobile menu button
    const menuButton = screen.getByLabelText("Åpne meny");
    fireEvent.click(menuButton);

    // Check that mobile navigation has Norwegian aria-label
    const mobileNav = screen.getByLabelText("Mobil navigasjon");
    expect(mobileNav).toBeInTheDocument();

    // Check that menu items have hover effects
    const menuItems = screen.getAllByRole("link");
    expect(menuItems.length).toBeGreaterThan(0);

    // Check that first menu item has hover class
    expect(menuItems[0]).toHaveClass("hover:translate-x-1");
  });

  test("mobile menu closes on escape key", () => {
    render(<HeaderWithTheme />);

    // Open mobile menu
    const menuButton = screen.getByLabelText("Åpne meny");
    fireEvent.click(menuButton);

    // Verify menu is open
    expect(screen.getByLabelText("Lukk meny")).toBeInTheDocument();

    // Press escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    // Menu should be closed (button should have open label again)
    expect(screen.getByLabelText("Åpne meny")).toBeInTheDocument();
  });

  test("theme toggle functionality", async () => {
    render(<HeaderWithTheme />);

    const themeToggle = screen.getByLabelText(/switch to/i);

    // Click theme toggle
    fireEvent.click(themeToggle);

    // Should attempt to save theme to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
