import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { SortControl } from "../sort-control";

const defaultOptions = [
  { id: "name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "status", label: "Status" },
];

// ─── SortControl ────────────────────────────────────────────────────────────

describe("SortControl", () => {
  it("renders SORT label and all option buttons", () => {
    render(<SortControl options={defaultOptions} />);
    expect(screen.getByText("SORT")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("clicking an inactive option calls onSortChange with 'asc'", () => {
    const handler = vi.fn();
    render(
      <SortControl options={defaultOptions} onSortChange={handler} />,
    );
    fireEvent.click(screen.getByText("Name"));
    expect(handler).toHaveBeenCalledWith("name", "asc");
  });

  it("clicking active asc option calls onSortChange with 'desc'", () => {
    const handler = vi.fn();
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="asc"
        onSortChange={handler}
      />,
    );
    fireEvent.click(screen.getByText("Name"));
    expect(handler).toHaveBeenCalledWith("name", "desc");
  });

  it("clicking active desc option calls onSortChange with 'none'", () => {
    const handler = vi.fn();
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="desc"
        onSortChange={handler}
      />,
    );
    fireEvent.click(screen.getByText("Name"));
    expect(handler).toHaveBeenCalledWith("name", "none");
  });

  it("clicking a different option calls onSortChange(newId, 'asc')", () => {
    const handler = vi.fn();
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="asc"
        onSortChange={handler}
      />,
    );
    fireEvent.click(screen.getByText("Date"));
    expect(handler).toHaveBeenCalledWith("date", "asc");
  });

  it("active option has aria-pressed true", () => {
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="asc"
      />,
    );
    expect(screen.getByText("Name").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("inactive option has aria-pressed false", () => {
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="asc"
      />,
    );
    expect(screen.getByText("Date").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("shows direction indicator ▲ for asc", () => {
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="asc"
      />,
    );
    expect(screen.getByText("\u25B2")).toBeInTheDocument();
  });

  it("shows direction indicator ▼ for desc", () => {
    render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="desc"
      />,
    );
    expect(screen.getByText("\u25BC")).toBeInTheDocument();
  });

  it("shows no indicator when direction is none or not active", () => {
    const { container } = render(
      <SortControl
        options={defaultOptions}
        activeId="name"
        direction="none"
      />,
    );
    expect(screen.queryByText("\u25B2")).not.toBeInTheDocument();
    expect(screen.queryByText("\u25BC")).not.toBeInTheDocument();
    // All buttons should have aria-pressed false since direction is none
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });
});
