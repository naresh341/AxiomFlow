import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CreateTaskModal from "../Components/CreateTaskModal";

const mockStore = configureStore({
  reducer: {
    UserOrg: () => ({ data: [] }),
    workflows: () => ({ currentWorkflowVersions: [] }),
  },
});

describe("CreateTaskModal Component", () => {
  it("renders Create Task modal and basic fields", () => {
    render(
      <Provider store={mockStore}>
        <CreateTaskModal
          isOpen={true}
          onClose={vi.fn()}
          onCreate={vi.fn()}
        />
      </Provider>
    );

    expect(screen.getAllByText("Create Task")[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Sync Customer Data")).toBeInTheDocument();
  });
});
