import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Sidebar from "../Navigation/Sidebar";

const mockStore = configureStore({
  reducer: {
    islogin: () => ({ isAuthenticated: true, user: { name: "Test User" } }),
  },
});

describe("Sidebar Component", () => {
  it("renders brand title and section headers", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Sidebar isMobileOpen={true} onCloseMobile={() => {}} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getAllByText("AxiomFlow")[0]).toBeInTheDocument();
    expect(screen.getByText("Main Menu")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("calls onCloseMobile when mobile nav link is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Sidebar isMobileOpen={true} onCloseMobile={handleClose} />
        </BrowserRouter>
      </Provider>
    );

    const dashboardLink = screen.getByText("Dashboard");
    fireEvent.click(dashboardLink);
    expect(handleClose).toHaveBeenCalled();
  });
});
