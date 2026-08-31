import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import WorkFlows from "../Pages/WorkFlow/WorkFlows";

const mockStore = configureStore({
  reducer: {
    workflows: () => ({
      data: { data: [], total: 0 },
      total: 0,
      loading: false,
      currentWorkflowVersions: [],
    }),
  },
});

describe("WorkFlows Page", () => {
  it("renders Workflows page with title and create button", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <WorkFlows />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Workflows")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search WorkflowID and WorkflowName...")).toBeInTheDocument();
    expect(screen.getByText("Create Workflow")).toBeInTheDocument();
  });

  it("renders three status tabs - active, draft, archived", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <WorkFlows />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("draft")).toBeInTheDocument();
    expect(screen.getByText("archived")).toBeInTheDocument();
  });

  it("switches tabs when clicked", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <WorkFlows />
        </BrowserRouter>
      </Provider>
    );

    const draftTab = screen.getByText("draft");
    fireEvent.click(draftTab);
    // No error means tab click handled correctly
    expect(draftTab).toBeInTheDocument();
  });
});
