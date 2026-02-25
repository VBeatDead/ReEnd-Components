import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RichTextEditor } from "../rich-text-editor";

// ════════════════════════════════════════════════════════════════════════════
// RichTextEditor
// ════════════════════════════════════════════════════════════════════════════

describe("RichTextEditor", () => {
  it("renders a textarea in markdown mode by default", () => {
    render(<RichTextEditor />);
    const ta = screen.getByRole("textbox");
    expect(ta.tagName).toBe("TEXTAREA");
  });

  it("shows placeholder text when empty", () => {
    render(<RichTextEditor placeholder="Write here..." />);
    expect(screen.getByPlaceholderText("Write here...")).toBeInTheDocument();
  });

  it("renders initial value in textarea", () => {
    render(<RichTextEditor value="Hello **world**" />);
    expect(screen.getByDisplayValue("Hello **world**")).toBeInTheDocument();
  });

  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);
    const ta = screen.getByRole("textbox");
    fireEvent.change(ta, { target: { value: "New content" } });
    expect(onChange).toHaveBeenCalledWith("New content");
  });

  it("renders MARKDOWN and PREVIEW mode toggle buttons", () => {
    render(<RichTextEditor />);
    expect(screen.getByText("MARKDOWN")).toBeInTheDocument();
    expect(screen.getByText("PREVIEW")).toBeInTheDocument();
  });

  it("switches to preview mode when PREVIEW is clicked", () => {
    render(<RichTextEditor value="# Hello" />);
    fireEvent.click(screen.getByText("PREVIEW"));
    // In preview mode, textarea is gone and rendered HTML is shown
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    // h1 should be rendered
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders formatted headings in preview", () => {
    render(<RichTextEditor value="## Section Title" mode="preview" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("shows character count in footer", () => {
    render(<RichTextEditor value="hello" />);
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/characters/)).toBeInTheDocument();
  });

  it("shows character limit when maxLength provided", () => {
    render(<RichTextEditor value="hello" maxLength={100} />);
    expect(screen.getByText(/5 \/ 100/)).toBeInTheDocument();
  });

  it("enforces maxLength — rejects input beyond limit", () => {
    const onChange = vi.fn();
    render(<RichTextEditor maxLength={5} onChange={onChange} />);
    const ta = screen.getByRole("textbox");
    fireEvent.change(ta, { target: { value: "123456789" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders toolbar buttons for formatting", () => {
    render(<RichTextEditor />);
    expect(screen.getByTitle("Bold (**text**)")).toBeInTheDocument();
    expect(screen.getByTitle("Italic (*text*)")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 1")).toBeInTheDocument();
    expect(screen.getByTitle("Horizontal divider (---)")).toBeInTheDocument();
  });

  it("is disabled when disabled prop set — textarea not interactive", () => {
    render(<RichTextEditor disabled />);
    // Wrapper should have pointer-events-none (opacity-38)
    const { container } = render(<RichTextEditor disabled value="test" />);
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });

  it("renders aria-label on textarea", () => {
    render(<RichTextEditor />);
    expect(screen.getByLabelText("Rich text editor content")).toBeInTheDocument();
  });

  it("accepts controlledMode prop", () => {
    render(<RichTextEditor value="test" mode="preview" />);
    // No textarea in preview mode
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("calls onModeChange when toggle clicked", () => {
    const onModeChange = vi.fn();
    render(<RichTextEditor onModeChange={onModeChange} />);
    fireEvent.click(screen.getByText("PREVIEW"));
    expect(onModeChange).toHaveBeenCalledWith("preview");
  });
});
