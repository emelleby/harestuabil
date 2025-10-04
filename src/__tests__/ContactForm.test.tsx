import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

// Mock fetch for form submission tests
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all Norwegian form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/navn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tjeneste type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/melding/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/personvern/i)).toBeInTheDocument();
  });

  it("should have service type dropdown with all available services", async () => {
    render(<ContactForm />);

    const serviceSelect = screen.getByRole("combobox");
    expect(serviceSelect).toBeInTheDocument();

    // Click to open dropdown
    fireEvent.click(serviceSelect);

    // Check for service options
    await waitFor(() => {
      expect(screen.getAllByText("Verksted")).toHaveLength(2); // One in select, one in dropdown
      expect(screen.getAllByText("Dekk og felg")).toHaveLength(2);
      expect(screen.getAllByText("Dekkhotell")).toHaveLength(2);
      expect(screen.getAllByText("Bilglass")).toHaveLength(2);
    });
  });

  it("should show Norwegian validation errors for required fields", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /send/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/navn er påkrevd/i)).toBeInTheDocument();
      expect(screen.getByText(/e-post er påkrevd/i)).toBeInTheDocument();
      expect(screen.getByText(/tjeneste type er påkrevd/i)).toBeInTheDocument();
      expect(screen.getByText(/melding er påkrevd/i)).toBeInTheDocument();
      expect(
        screen.getByText(/du må akseptere personvernerklæringen/i)
      ).toBeInTheDocument();
    });
  });

  it("should validate Norwegian email format", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/e-post/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/ugyldig e-postadresse/i)).toBeInTheDocument();
    });
  });

  it("should submit form with Netlify Forms configuration", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response);

    render(<ContactForm />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/navn/i), {
      target: { value: "Ola Nordmann" },
    });
    fireEvent.change(screen.getByLabelText(/e-post/i), {
      target: { value: "ola@eksempel.no" },
    });
    fireEvent.change(screen.getByLabelText(/telefon/i), {
      target: { value: "+47 123 45 678" },
    });
    // Select service type
    const serviceSelect = screen.getByRole("combobox");
    fireEvent.click(serviceSelect);
    await waitFor(() => {
      const verkstedOptions = screen.getAllByText("Verksted");
      fireEvent.click(verkstedOptions[1]); // Click the dropdown option, not the selected value
    });
    fireEvent.change(screen.getByLabelText(/melding/i), {
      target: { value: "Trenger hjelp med bilen min" },
    });
    fireEvent.click(screen.getByLabelText(/personvern/i));

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: expect.stringContaining("form-name=kontakt"),
        })
      );
    });
  });

  it("should show success message after successful submission", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response);

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/navn/i), {
      target: { value: "Ola Nordmann" },
    });
    fireEvent.change(screen.getByLabelText(/e-post/i), {
      target: { value: "ola@eksempel.no" },
    });
    // Select service type
    const serviceSelect = screen.getByRole("combobox");
    fireEvent.click(serviceSelect);
    await waitFor(() => {
      const verkstedOptions = screen.getAllByText("Verksted");
      fireEvent.click(verkstedOptions[1]); // Click the dropdown option, not the selected value
    });
    fireEvent.change(screen.getByLabelText(/melding/i), {
      target: { value: "Test melding" },
    });
    fireEvent.click(screen.getByLabelText(/personvern/i));
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/takk for din henvendelse/i)).toBeInTheDocument();
    });
  });

  it("should have honeypot field for spam protection", () => {
    render(<ContactForm />);

    const honeypotField = screen.getByTestId("honeypot-field");
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).toHaveStyle("display: none");
  });

  it("should have proper form attributes for Netlify Forms", () => {
    render(<ContactForm />);

    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("data-netlify", "true");
    expect(form).toHaveAttribute("name", "kontakt");
    expect(form).toHaveAttribute("method", "POST");
  });
});
