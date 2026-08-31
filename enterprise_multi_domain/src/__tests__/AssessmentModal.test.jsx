import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AssessmentModal from "../Components/AssessmentModal";

describe("AssessmentModal Component", () => {
  it("renders modal header and calculate risk score", () => {
    render(
      <AssessmentModal
        isOpen={true}
        onClose={vi.fn()}
        handleSubmit={vi.fn()}
        policies={[{ id: 1, regulation_type: "ISO 27001" }]}
      />
    );

    expect(screen.getByText("New Compliance Assessment")).toBeInTheDocument();
    expect(screen.getByText(/Risk Assessment Matrix/i)).toBeInTheDocument();
    expect(screen.getByText("Finalize Assessment")).toBeInTheDocument();
  });
});
