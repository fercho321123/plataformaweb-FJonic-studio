import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardHeader from "./dashboardHeader";

// Mock del router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock del componente Image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

describe("DashboardHeader", () => {
  it("muestra el nombre FJONIC Studio", () => {
    render(<DashboardHeader />);
    expect(screen.getByText("FJONIC Studio")).toBeInTheDocument();
  });

  it("muestra el texto Plataforma Web", () => {
    render(<DashboardHeader />);
    expect(screen.getByText("Plataforma Web")).toBeInTheDocument();
  });
});