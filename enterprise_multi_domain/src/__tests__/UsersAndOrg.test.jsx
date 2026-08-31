import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UsersAndOrg from "../Pages/User_And_Organization/UsersAndOrg";

const mockStore = configureStore({
  reducer: {
    islogin: () => ({ isAuthenticated: true }),
    UserOrg: () => ({ data: [], loading: false }),
    teams: () => ({ data: [], loading: false }),
  },
});

vi.mock("../Pages/User_And_Organization/UsersAndOrg", async (importOriginal) => {
  const actual = await importOriginal();
  return actual;
});

describe("UsersAndOrg Page", () => {
  it("renders Users & Organization page header with tabs", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UsersAndOrg />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Users & Organization/i)).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Roles & Permissions")).toBeInTheDocument();
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("Organization Settings")).toBeInTheDocument();
  });

  it("renders Invite User and Import Users buttons", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UsersAndOrg />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Invite User")).toBeInTheDocument();
    expect(screen.getByText("Import Users")).toBeInTheDocument();
  });
});
