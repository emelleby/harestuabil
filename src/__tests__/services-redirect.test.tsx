import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import Services from "@/pages/tjenester";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Services Redirect", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    mockReplace.mockClear();
  });

  it("should redirect to /tjenester", () => {
    render(<Services />);

    expect(mockReplace).toHaveBeenCalledWith("/tjenester");
  });

  it("should render nothing while redirecting", () => {
    const { container } = render(<Services />);

    expect(container.firstChild).toBeNull();
  });
});
