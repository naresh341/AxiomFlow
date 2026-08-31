import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Paginator from "../Components/Paginator";

describe("Paginator Component", () => {
  it("renders without crashing with valid props", () => {
    const { container } = render(
      <Paginator
        first={0}
        rows={10}
        totalRecords={50}
        onPageChange={vi.fn()}
      />
    );
    // PrimeReact renders paginator content
    expect(container.firstChild).toBeTruthy();
  });
});

