import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Card,
  cardVariants,
  CardHeader,
  CardMeta,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "../card";

// ════════════════════════════════════════════════════════════════════════════
// Card (root)
// ════════════════════════════════════════════════════════════════════════════

describe("Card", () => {
  // ── Render ──────────────────────────────────────────────────────────────────
  it("renders without crashing", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as a <div> element", () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders children content", () => {
    render(<Card><span>Child content</span></Card>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  // ── Base classes ─────────────────────────────────────────────────────────────
  it("applies bg-surface-1 and border classes by default", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-surface-1");
    expect(card.className).toContain("border");
    expect(card.className).toContain("border-border");
  });

  it("applies transition class", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("transition-all");
  });

  it("applies relative positioning for pseudo-element corners", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("relative");
  });

  it("applies corner bracket classes (before/after pseudo-elements)", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("before:content-['']");
    expect(card.className).toContain("after:content-['']");
    expect(card.className).toContain("before:border-primary/40");
    expect(card.className).toContain("after:border-primary/40");
  });

  // ── Hoverable variant ─────────────────────────────────────────────────────────
  it("does not apply hover classes by default", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("cursor-pointer");
    expect(card.className).not.toContain("hover:-translate-y-1");
  });

  it("applies hover classes when hoverable=true", () => {
    const { container } = render(<Card hoverable>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("cursor-pointer");
    expect(card.className).toContain("hover:-translate-y-1");
    expect(card.className).toContain("hover:border-primary/20");
  });

  it("intensifies bracket corners on hover when hoverable=true", () => {
    const { container } = render(<Card hoverable>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("hover:before:border-primary/60");
    expect(card.className).toContain("hover:after:border-primary/60");
  });

  // ── Selected variant ──────────────────────────────────────────────────────────
  it("does not apply selected classes by default", () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    // border-2 and bg-primary/[0.06] are unique to the selected state.
    // Note: before:border-primary/40 / after:border-primary/40 exist in corner brackets,
    // so we test for the bare "border-2" + background token instead.
    expect(card.className).not.toContain("border-2");
    expect(card.className).not.toContain("bg-primary/[0.06]");
  });

  it("applies selected classes when selected=true", () => {
    const { container } = render(<Card selected>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-primary/40");
    expect(card.className).toContain("bg-primary/[0.06]");
    expect(card.className).toContain("border-2");
  });

  it("can be both hoverable and selected simultaneously", () => {
    const { container } = render(<Card hoverable selected>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("cursor-pointer");
    expect(card.className).toContain("border-primary/40");
    expect(card.className).toContain("bg-primary/[0.06]");
  });

  // ── className merge ───────────────────────────────────────────────────────────
  it("merges custom className", () => {
    const { container } = render(<Card className="w-72 custom-card">Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("w-72");
    expect(card.className).toContain("custom-card");
  });

  // ── forwardRef ────────────────────────────────────────────────────────────────
  it("forwards ref to div element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref</Card>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  // ── Event handlers ────────────────────────────────────────────────────────────
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Card hoverable onClick={onClick} data-testid="card">Clickable</Card>);
    fireEvent.click(screen.getByTestId("card"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("passes through HTML attributes", () => {
    render(<Card data-testid="my-card">Test</Card>);
    expect(screen.getByTestId("my-card")).toBeInTheDocument();
  });

  // ── displayName ───────────────────────────────────────────────────────────────
  it("has correct displayName", () => {
    expect(Card.displayName).toBe("Card");
  });

  // ── cardVariants export ───────────────────────────────────────────────────────
  it("exports cardVariants function", () => {
    expect(typeof cardVariants).toBe("function");
    const classes = cardVariants({ hoverable: true, selected: false });
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardHeader
// ════════════════════════════════════════════════════════════════════════════

describe("CardHeader", () => {
  it("renders without crashing", () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders as a <div>", () => {
    const { container } = render(<CardHeader>H</CardHeader>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies flex layout and padding", () => {
    const { container } = render(<CardHeader>H</CardHeader>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("flex");
    expect(el.className).toContain("p-5");
  });

  it("merges custom className", () => {
    const { container } = render(<CardHeader className="custom">H</CardHeader>);
    expect((container.firstChild as HTMLElement).className).toContain("custom");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>H</CardHeader>);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("has correct displayName", () => {
    expect(CardHeader.displayName).toBe("CardHeader");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardMeta
// ════════════════════════════════════════════════════════════════════════════

describe("CardMeta", () => {
  it("renders without crashing", () => {
    render(<CardMeta>TACTICAL</CardMeta>);
    expect(screen.getByText("TACTICAL")).toBeInTheDocument();
  });

  it("renders as a <p>", () => {
    const { container } = render(<CardMeta>M</CardMeta>);
    expect(container.firstChild?.nodeName).toBe("P");
  });

  it("applies overline typography classes", () => {
    const { container } = render(<CardMeta>M</CardMeta>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("font-mono");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("text-primary");
    expect(el.className).toContain("tracking-[0.15em]");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardMeta ref={ref}>M</CardMeta>);
    expect(ref.current?.tagName).toBe("P");
  });

  it("has correct displayName", () => {
    expect(CardMeta.displayName).toBe("CardMeta");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardTitle
// ════════════════════════════════════════════════════════════════════════════

describe("CardTitle", () => {
  it("renders without crashing", () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("renders as a <h3>", () => {
    const { container } = render(<CardTitle>T</CardTitle>);
    expect(container.firstChild?.nodeName).toBe("H3");
  });

  it("applies display font and uppercase classes", () => {
    const { container } = render(<CardTitle>T</CardTitle>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("font-display");
    expect(el.className).toContain("font-bold");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("text-foreground");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<CardTitle ref={ref}>T</CardTitle>);
    expect(ref.current?.tagName).toBe("H3");
  });

  it("has correct displayName", () => {
    expect(CardTitle.displayName).toBe("CardTitle");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardDescription
// ════════════════════════════════════════════════════════════════════════════

describe("CardDescription", () => {
  it("renders without crashing", () => {
    render(<CardDescription>Some description text.</CardDescription>);
    expect(screen.getByText("Some description text.")).toBeInTheDocument();
  });

  it("renders as a <p>", () => {
    const { container } = render(<CardDescription>D</CardDescription>);
    expect(container.firstChild?.nodeName).toBe("P");
  });

  it("applies muted text and relaxed leading", () => {
    const { container } = render(<CardDescription>D</CardDescription>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-muted-foreground");
    expect(el.className).toContain("leading-relaxed");
    expect(el.className).toContain("text-sm");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref}>D</CardDescription>);
    expect(ref.current?.tagName).toBe("P");
  });

  it("has correct displayName", () => {
    expect(CardDescription.displayName).toBe("CardDescription");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardBody
// ════════════════════════════════════════════════════════════════════════════

describe("CardBody", () => {
  it("renders without crashing", () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders as a <div>", () => {
    const { container } = render(<CardBody>B</CardBody>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies padding", () => {
    const { container } = render(<CardBody>B</CardBody>);
    expect((container.firstChild as HTMLElement).className).toContain("p-5");
  });

  it("merges custom className", () => {
    const { container } = render(<CardBody className="text-center">B</CardBody>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("p-5");
    expect(el.className).toContain("text-center");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardBody ref={ref}>B</CardBody>);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("has correct displayName", () => {
    expect(CardBody.displayName).toBe("CardBody");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// CardFooter
// ════════════════════════════════════════════════════════════════════════════

describe("CardFooter", () => {
  it("renders without crashing", () => {
    render(<CardFooter>Actions</CardFooter>);
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders as a <div>", () => {
    const { container } = render(<CardFooter>F</CardFooter>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies flex layout, padding, and top border", () => {
    const { container } = render(<CardFooter>F</CardFooter>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("flex");
    expect(el.className).toContain("items-center");
    expect(el.className).toContain("border-t");
    expect(el.className).toContain("border-border");
    expect(el.className).toContain("px-5");
  });

  it("merges custom className", () => {
    const { container } = render(<CardFooter className="justify-end">F</CardFooter>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("justify-end");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref}>F</CardFooter>);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("has correct displayName", () => {
    expect(CardFooter.displayName).toBe("CardFooter");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Composition
// ════════════════════════════════════════════════════════════════════════════

describe("Card composition", () => {
  it("renders all sub-components together without error", () => {
    render(
      <Card hoverable data-testid="full-card">
        <CardHeader>
          <div>
            <CardMeta>TACTICAL</CardMeta>
            <CardTitle>Deployment Alpha</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <CardDescription>
            Mission briefing for the next deployment cycle.
          </CardDescription>
        </CardBody>
        <CardFooter>
          <button>Confirm</button>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByTestId("full-card")).toBeInTheDocument();
    expect(screen.getByText("TACTICAL")).toBeInTheDocument();
    expect(screen.getByText("Deployment Alpha")).toBeInTheDocument();
    expect(screen.getByText("Mission briefing for the next deployment cycle.")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
