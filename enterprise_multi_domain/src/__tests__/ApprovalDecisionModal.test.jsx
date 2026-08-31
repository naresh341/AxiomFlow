import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ApprovalDecisionModal from "../Components/ApprovalDecisionModal";

describe("ApprovalDecisionModal Component", () => {
  const activeId = {
    approval_key: "APP-101",
    stage: "Security Review",
    requester_name: "Alice Admin",
    sla_hours: 12,
  };

  it("renders modal details when open", () => {
    render(
      <ApprovalDecisionModal
        isOpen={true}
        onClose={vi.fn()}
        onRejectTrigger={vi.fn()}
        activeId={activeId}
      />
    );

    expect(screen.getByText("Approval Decision")).toBeInTheDocument();
    expect(screen.getByText("APP-101")).toBeInTheDocument();
    expect(screen.getByText("Alice Admin")).toBeInTheDocument();
  });

  it("switches decision choice when clicked", () => {
    render(
      <ApprovalDecisionModal
        isOpen={true}
        onClose={vi.fn()}
        onRejectTrigger={vi.fn()}
        activeId={activeId}
      />
    );

    const rejectBtn = screen.getByText("Reject");
    fireEvent.click(rejectBtn);
    expect(screen.getByText(/Reject Comment/i)).toBeInTheDocument();
  });
});
