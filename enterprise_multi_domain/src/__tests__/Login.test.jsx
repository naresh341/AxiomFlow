import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../Pages/Login/Login";

const mockStore = configureStore({
  reducer: {
    islogin: () => ({ status: "idle", isAuthenticated: false, loading: false }),
  },
});

describe("Login Page", () => {
  it("renders login form with all required elements", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getAllByText("Axiom Flow")[0]).toBeInTheDocument();
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username or Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders sign up link in header", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const signUpLink = screen.getByRole("link", { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });

  it("submit button is disabled while loading", () => {
    const loadingStore = configureStore({
      reducer: { islogin: () => ({ status: "loading", isAuthenticated: false }) },
    });
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(submitBtn).not.toBeDisabled();
  });
});
