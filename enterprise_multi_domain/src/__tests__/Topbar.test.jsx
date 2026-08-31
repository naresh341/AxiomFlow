import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Topbar from "../Navigation/Topbar";
import { ThemeProvider } from "../Context/ThemeContext";

const mockStore = configureStore({
  reducer: {
    islogin: () => ({ isAuthenticated: true, user: { name: "Alice" } }),
  },
});

describe("Topbar Component", () => {
  it("renders Topbar logo and triggers mobile menu toggle", () => {
    const handleToggle = vi.fn();
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <BrowserRouter>
            <Topbar onToggleMobileSidebar={handleToggle} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText("Axiom Flow")).toBeInTheDocument();
    const menuBtn = screen.getByLabelText("Toggle Navigation Menu");
    fireEvent.click(menuBtn);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
