import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ConfirmPaymentModal from "../Components/PaymentModal";

describe("ConfirmPaymentModal Component", () => {
  const payload = {
    subscription: { plan_name: "ENTERPRISE", billing_cycle: "ANNUAL", price: 1200 },
    billing: { billing_email: "billing@acme.com", billing_contact_name: "John Doe" }
  };

  it("renders payment modal and requires agreement before pay", () => {
    render(
      <BrowserRouter>
        <ConfirmPaymentModal
          isOpen={true}
          onClose={vi.fn()}
          payload={payload}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Enterprise Billing Confirmation")).toBeInTheDocument();
    const payBtn = screen.getByText("Confirm & Pay");
    expect(payBtn).toBeDisabled();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(payBtn).not.toBeDisabled();
  });
});
