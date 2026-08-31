import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AuditLogsSystem from "../Pages/Admin_And_Government/AuditLogs";

// Mock child components to avoid deep Redux dependencies
vi.mock("../Pages/Admin_And_Government/UserAction", () => ({
  default: () => <div data-testid="user-action">User Action Content</div>,
}));
vi.mock("../Pages/Admin_And_Government/SystemLogs", () => ({
  default: () => <div data-testid="system-logs">System Logs Content</div>,
}));
vi.mock("../Pages/Admin_And_Government/AdminAction", () => ({
  default: () => <div data-testid="admin-action">Admin Actions Content</div>,
}));

describe("AuditLogs Page", () => {
  it("renders User Audit Logs title by default", () => {
    render(
      <BrowserRouter>
        <AuditLogsSystem />
      </BrowserRouter>
    );

    expect(screen.getByText("User Audit Logs")).toBeInTheDocument();
    expect(screen.getByText("User Actions")).toBeInTheDocument();
    expect(screen.getByText("Admin Actions")).toBeInTheDocument();
    expect(screen.getByText("System Logs")).toBeInTheDocument();
  });

  it("switches to Admin Actions tab when clicked", () => {
    render(
      <BrowserRouter>
        <AuditLogsSystem />
      </BrowserRouter>
    );

    const adminTab = screen.getByText("Admin Actions");
    fireEvent.click(adminTab);
    expect(screen.getByTestId("admin-action")).toBeInTheDocument();
  });

  it("switches to System Logs tab when clicked", () => {
    render(
      <BrowserRouter>
        <AuditLogsSystem />
      </BrowserRouter>
    );

    const sysTab = screen.getByText("System Logs");
    fireEvent.click(sysTab);
    // Check system log mocked content renders
    expect(screen.getByTestId("system-logs")).toBeInTheDocument();
  });
});
