import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { EmptyState } from "../empty-state";
import { Alert } from "../alert";

// ─── EmptyState ───────────────────────────────────────────────────────────────

describe("EmptyState", () => {
  it("renders with explicit title", () => {
    render(<EmptyState title="NOTHING HERE" />);
    expect(screen.getByText("NOTHING HERE")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="T" description="Check again later." />);
    expect(screen.getByText("Check again later.")).toBeInTheDocument();
  });

  it("does not render description element when omitted", () => {
    render(<EmptyState title="T" />);
    expect(screen.queryByText("Check again later.")).toBeNull();
  });

  it("renders action slot", () => {
    render(
      <EmptyState title="T" action={<button>Retry</button>} />,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("renders icon slot", () => {
    render(
      <EmptyState title="T" icon={<svg data-testid="icon" />} />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("search preset supplies default title", () => {
    render(<EmptyState variant="search" />);
    expect(screen.getByText("NO RESULTS FOUND")).toBeInTheDocument();
  });

  it("error preset supplies default title and description", () => {
    render(<EmptyState variant="error" />);
    expect(screen.getByText("FAILED TO LOAD")).toBeInTheDocument();
    expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
  });

  it("permission preset", () => {
    render(<EmptyState variant="permission" />);
    expect(screen.getByText("ACCESS RESTRICTED")).toBeInTheDocument();
  });

  it("empty preset", () => {
    render(<EmptyState variant="empty" />);
    expect(screen.getByText("NO ITEMS YET")).toBeInTheDocument();
  });

  it("explicit title overrides preset title", () => {
    render(<EmptyState variant="search" title="CUSTOM TITLE" />);
    expect(screen.getByText("CUSTOM TITLE")).toBeInTheDocument();
    expect(screen.queryByText("NO RESULTS FOUND")).toBeNull();
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(<EmptyState title="T" size={size} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<EmptyState title="T" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<EmptyState title="T" className="es-custom" />);
    expect(document.querySelector(".es-custom")).not.toBeNull();
  });
});

// ─── Alert ────────────────────────────────────────────────────────────────────

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something happened.</Alert>);
    expect(screen.getByText("Something happened.")).toBeInTheDocument();
  });

  it("renders with role=alert", () => {
    render(<Alert>msg</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="NOTICE" variant="info">msg</Alert>);
    expect(screen.getByText("NOTICE")).toBeInTheDocument();
  });

  it("does not render title element when omitted", () => {
    render(<Alert>msg</Alert>);
    expect(screen.queryByText("NOTICE")).toBeNull();
  });

  it("renders default icon (◆) for info variant", () => {
    render(<Alert variant="info">msg</Alert>);
    expect(screen.getByText("◆")).toBeInTheDocument();
  });

  it("renders ✓ icon for success variant", () => {
    render(<Alert variant="success">msg</Alert>);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders ⚠ icon for warning variant", () => {
    render(<Alert variant="warning">msg</Alert>);
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("renders ✕ icon for error variant", () => {
    render(<Alert variant="error">msg</Alert>);
    // There will be two ✕: one as default icon, possibly one for dismiss if shown
    expect(screen.getAllByText("✕").length).toBeGreaterThan(0);
  });

  it("renders all variants without crashing", () => {
    const variants = ["info", "success", "warning", "error"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Alert variant={variant}>msg</Alert>);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders dismiss button when dismissible=true", () => {
    render(<Alert dismissible>msg</Alert>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not render dismiss button by default", () => {
    render(<Alert>msg</Alert>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("calls onDismiss when dismiss button clicked", () => {
    const spy = vi.fn();
    render(<Alert dismissible onDismiss={spy}>msg</Alert>);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("renders custom icon when provided", () => {
    render(<Alert icon={<span>CUSTOM_ICON</span>}>msg</Alert>);
    expect(screen.getByText("CUSTOM_ICON")).toBeInTheDocument();
  });

  it("has aria-live=assertive for error variant", () => {
    render(<Alert variant="error">msg</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("has aria-live=polite for non-error variants", () => {
    render(<Alert variant="info">msg</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>msg</Alert>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<Alert className="al-custom">msg</Alert>);
    expect(document.querySelector(".al-custom")).not.toBeNull();
  });
});
