import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PendingApprovals from "../Pages/Approval/PendingApprovals";

const mockStore = configureStore({
  reducer: {
    approval: () => ({
      data: [
        {
          approval_key: "APP-001",
          stage: "Review",
          requester_name: "Alice",
          priority: "High",
          status: "PENDING",
        },
      ],
      total: 1,
      loading: false,
    }),
    islogin: () => ({ isAuthenticated: true }),
  },
});

// Mock the outlet context
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => ({ isDrawerOpen: false, setIsDrawerOpen: vi.fn() }),
    useParams: () => ({ status: "pending" }),
  };
});

describe("PendingApprovals Page", () => {
  it("renders Pending Approvals page with search bar", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PendingApprovals />
        </BrowserRouter>
      </Provider>
    );

    // Renders filter controls which are always present
    expect(screen.getByText("ALL_PENDING")).toBeInTheDocument();
  });
});
