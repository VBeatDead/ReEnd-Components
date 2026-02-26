import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Badge, badgeVariants } from "../badge";

// ════════════════════════════════════════════════════════════════════════════
// Badge
// ════════════════════════════════════════════════════════════════════════════

describe("Badge", () => {
  // ── Render ──────────────────────────────────────────────────────────────────
  it("renders without crashing", () => {
    render(<Badge>ONLINE</Badge>);
    expect(screen.getByText("ONLINE")).toBeInTheDocument();
  });

  it("renders as a <span> element", () => {
    const { container } = render(<Badge>Test</Badge>);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span?.tagName).toBe("SPAN");
  });

  it("renders children content", () => {
    render(<Badge>STATUS ◆</Badge>);
    expect(screen.getByText("STATUS ◆")).toBeInTheDocument();
  });

  // ── Variants ─────────────────────────────────────────────────────────────────
  it("renders all variants without error", () => {
    const variants = [
      "default",
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "purple",
    ] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toBeTruthy();
      unmount();
    });
  });

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default").closest("span");
    expect(badge?.className).toContain("text-muted-foreground");
  });

  it("applies primary variant classes", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText("Primary").closest("span");
    expect(badge?.className).toContain("text-primary");
    expect(badge?.className).toContain("border-primary");
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success").closest("span");
    expect(badge?.className).toContain("text-ef-green");
  });

  it("applies warning variant classes", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning").closest("span");
    expect(badge?.className).toContain("text-ef-orange");
  });

  it("applies danger variant classes", () => {
    render(<Badge variant="danger">Danger</Badge>);
    const badge = screen.getByText("Danger").closest("span");
    expect(badge?.className).toContain("text-destructive");
  });

  it("applies info variant classes", () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText("Info").closest("span");
    expect(badge?.className).toContain("text-ef-blue");
  });

  it("applies purple variant classes", () => {
    render(<Badge variant="purple">Rare</Badge>);
    const badge = screen.getByText("Rare").closest("span");
    expect(badge?.className).toContain("text-ef-purple");
  });

  // ── Removable ─────────────────────────────────────────────────────────────────
  it("does not render remove button by default", () => {
    render(<Badge>Label</Badge>);
    expect(screen.queryByRole("button", { name: /remove/i })).toBeNull();
  });

  it("renders remove button when removable=true", () => {
    render(<Badge removable>Label</Badge>);
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls onRemove when × button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Label
      </Badge>,
    );
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not throw when removable=true but onRemove is not provided", () => {
    render(<Badge removable>Label</Badge>);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /remove/i })),
    ).not.toThrow();
  });

  it("stopPropagation is called on remove button click", () => {
    const parentClick = vi.fn();
    render(
      <div onClick={parentClick}>
        <Badge removable onRemove={vi.fn()}>
          Label
        </Badge>
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(parentClick).not.toHaveBeenCalled();
  });

  // ── className merge ───────────────────────────────────────────────────────────
  it("accepts and merges custom className", () => {
    render(<Badge className="custom-badge">Label</Badge>);
    const badge = screen.getByText("Label").closest("span");
    expect(badge?.className).toContain("custom-badge");
  });

  // ── forwardRef ────────────────────────────────────────────────────────────────
  it("forwards ref to span element", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("SPAN");
  });

  // ── badgeVariants export ──────────────────────────────────────────────────────
  it("exports badgeVariants function", () => {
    expect(typeof badgeVariants).toBe("function");
    const classes = badgeVariants({ variant: "primary" });
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
  });

  it("displayName is set correctly", () => {
    expect(Badge.displayName).toBe("Badge");
  });

  // ── HTML attributes pass-through ──────────────────────────────────────────────
  it("passes through HTML attributes", () => {
    render(<Badge data-testid="my-badge">Label</Badge>);
    expect(screen.getByTestId("my-badge")).toBeInTheDocument();
  });

  it("passes title attribute", () => {
    render(<Badge title="Status badge">Label</Badge>);
    expect(screen.getByTitle("Status badge")).toBeInTheDocument();
  });
});
