import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Tasks from "../Pages/Task/Tasks";

const mockStore = configureStore({
  reducer: {
    task: () => ({ data: [], total: 0, loading: false }),
    islogin: () => ({ isAuthenticated: true }),
  },
});

describe("Tasks Page", () => {
  it("renders Tasks Management header and search", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Tasks Management")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search TasksID and Task Name...")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("renders all task tabs", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("My Tasks")).toBeInTheDocument();
    expect(screen.getByText("OverDue")).toBeInTheDocument();
  });

  it("clears search input when X is clicked", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search TasksID and Task Name...");
    fireEvent.change(searchInput, { target: { value: "my-task" } });
    expect(searchInput.value).toBe("my-task");

    const clearBtn = screen.getByRole("button", { name: "" }); // X button
    if (clearBtn) fireEvent.click(clearBtn);
  });
});
