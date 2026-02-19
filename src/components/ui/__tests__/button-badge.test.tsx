import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button, buttonVariants } from "../button";
import { Badge, badgeVariants } from "../badge";

// ════════════════════════════════════════════════════════════════════════════
// Button
// ════════════════════════════════════════════════════════════════════════════

describe("Button", () => {
  // ── Render ──────────────────────────────────────────────────────────────────
  it("renders button element by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Button>DEPLOY ◆</Button>);
    expect(screen.getByText("DEPLOY ◆")).toBeInTheDocument();
  });

  // ── Variants ─────────────────────────────────────────────────────────────────
  it("renders all variants without error", () => {
    const variants = ["primary", "secondary", "ghost", "danger", "link", "icon"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Label</Button>);
      expect(screen.getByRole("button")).toBeTruthy();
      unmount();
    });
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-primary");
    expect(btn.className).toContain("clip-corner");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border");
    expect(btn.className).toContain("bg-transparent");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-transparent");
    expect(btn.className).toContain("text-muted-foreground");
  });

  it("applies danger variant classes", () => {
    render(<Button variant="danger">Danger</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-destructive");
    expect(btn.className).toContain("clip-corner");
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────────
  it("renders all sizes without error", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "icon"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Label</Button>);
      expect(screen.getByRole("button")).toBeTruthy();
      unmount();
    });
  });

  it("applies correct size class for xs", () => {
    render(<Button size="xs">XS</Button>);
    expect(screen.getByRole("button").className).toContain("h-7");
  });

  it("applies correct size class for md (default)", () => {
    render(<Button>MD</Button>);
    expect(screen.getByRole("button").className).toContain("h-11");
  });

  // ── Disabled ──────────────────────────────────────────────────────────────────
  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Loading ──────────────────────────────────────────────────────────────────
  it("renders spinner when loading=true", () => {
    const { container } = render(<Button loading>Loading</Button>);
    const spinner = container.querySelector(".animate-diamond-spin");
    expect(spinner).not.toBeNull();
  });

  it("disables button when loading=true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets aria-busy when loading=true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy");
  });

  it("still renders children text when loading", () => {
    render(<Button loading>Processing</Button>);
    expect(screen.getByText("Processing")).toBeInTheDocument();
  });

  // ── Click handler ─────────────────────────────────────────────────────────────
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when loading", () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── className merge ───────────────────────────────────────────────────────────
  it("accepts and merges custom className", () => {
    render(<Button className="custom-class">Label</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  // ── forwardRef ────────────────────────────────────────────────────────────────
  it("forwards ref to button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("BUTTON");
  });

  // ── asChild ───────────────────────────────────────────────────────────────────
  it("renders as anchor when asChild is used", () => {
    render(
      <Button asChild>
        <a href="/test">Navigate</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /navigate/i });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("applies button classes to child element when asChild", () => {
    render(
      <Button asChild variant="secondary">
        <a href="/test">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("clip-corner");
  });

  // ── Accessibility ─────────────────────────────────────────────────────────────
  it("supports aria-label", () => {
    render(<Button aria-label="Close dialog">✕</Button>);
    expect(screen.getByLabelText("Close dialog")).toBeInTheDocument();
  });

  it("has correct type attribute (button by default)", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  // ── buttonVariants export ─────────────────────────────────────────────────────
  it("exports buttonVariants function", () => {
    expect(typeof buttonVariants).toBe("function");
    const classes = buttonVariants({ variant: "primary", size: "md" });
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
  });

  it("displayName is set correctly", () => {
    expect(Button.displayName).toBe("Button");
  });
});

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
