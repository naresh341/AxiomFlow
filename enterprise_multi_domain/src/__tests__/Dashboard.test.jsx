import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../Pages/Dashboard";

// Mock recharts to avoid SVG/canvas issues in jsdom
vi.mock("recharts", () => ({
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Bar: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

const mockStore = configureStore({
  reducer: {
    approval: () => ({
      data: [],
      total: 0,
      loading: false,
    }),
    islogin: () => ({ isAuthenticated: true, user: { roles: ["admin"] } }),
  },
});

describe("Dashboard Page", () => {
  it("renders dashboard KPI stats", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("SLA Compliance")).toBeInTheDocument();
    expect(screen.getByText("Critical Alerts")).toBeInTheDocument();
  });

  it("renders chart sections", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Task Completion")).toBeInTheDocument();
  });
});
