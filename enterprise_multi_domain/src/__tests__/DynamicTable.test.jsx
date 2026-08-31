import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DynamicTable from "../Components/DynamicTable";

describe("DynamicTable Component", () => {
  const tableHead = [
    { field: "srno", header: "SR NO" },
    { field: "name", header: "NAME" },
    { field: "status", header: "STATUS" },
    { field: "action", header: "ACTION" },
  ];

  const tableData = [
    { id: 1, name: "John Doe", status: "Active" },
    { id: 2, name: "Jane Smith", status: "Draft" },
  ];

  it("renders table headers and data rows correctly", () => {
    render(
      <DynamicTable
        tableData={tableData}
        tableHead={tableHead}
        first={0}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.getByText("NAME")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
