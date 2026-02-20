import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Timeline, TimelineItem } from "../timeline";
import { Stepper } from "../stepper";
import { Pagination } from "../pagination";
import { Breadcrumb } from "../breadcrumb";
import { NumberInput } from "../number-input";

// ─── Timeline ─────────────────────────────────────────────────────────────────

describe("Timeline", () => {
  it("renders title", () => {
    render(
      <Timeline>
        <TimelineItem title="DEPLOYMENT STARTED" />
      </Timeline>,
    );
    expect(screen.getByText("DEPLOYMENT STARTED")).toBeInTheDocument();
  });

  it("renders date when provided", () => {
    render(
      <Timeline>
        <TimelineItem title="T" date="2026-02-01" />
      </Timeline>,
    );
    expect(screen.getByText("2026-02-01")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Timeline>
        <TimelineItem title="T" description="All systems nominal." />
      </Timeline>,
    );
    expect(screen.getByText("All systems nominal.")).toBeInTheDocument();
  });

  it("shows ◆ marker for complete status", () => {
    render(
      <Timeline>
        <TimelineItem title="Done" status="complete" />
      </Timeline>,
    );
    expect(screen.getByText("◆")).toBeInTheDocument();
  });

  it("shows ◆ marker for current status", () => {
    render(
      <Timeline>
        <TimelineItem title="In Progress" status="current" />
      </Timeline>,
    );
    expect(screen.getByText("◆")).toBeInTheDocument();
  });

  it("shows ◇ marker for upcoming status", () => {
    render(
      <Timeline>
        <TimelineItem title="Pending" status="upcoming" />
      </Timeline>,
    );
    expect(screen.getByText("◇")).toBeInTheDocument();
  });

  it("works with items prop", () => {
    const items = [
      { title: "STEP ONE", status: "complete" as const },
      { title: "STEP TWO", status: "current" as const },
      { title: "STEP THREE", status: "upcoming" as const },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByText("STEP ONE")).toBeInTheDocument();
    expect(screen.getByText("STEP TWO")).toBeInTheDocument();
    expect(screen.getByText("STEP THREE")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Timeline ref={ref}>
        <TimelineItem title="T" />
      </Timeline>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(
      <Timeline className="tl-custom">
        <TimelineItem title="T" />
      </Timeline>,
    );
    expect(document.querySelector(".tl-custom")).not.toBeNull();
  });
});

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "INIT" },
  { label: "CONFIGURE" },
  { label: "DEPLOY" },
  { label: "VERIFY" },
];

describe("Stepper", () => {
  it("renders all steps", () => {
    render(<Stepper steps={STEPS} currentStep={1} />);
    expect(screen.getByText("INIT")).toBeInTheDocument();
    expect(screen.getByText("CONFIGURE")).toBeInTheDocument();
    expect(screen.getByText("DEPLOY")).toBeInTheDocument();
    expect(screen.getByText("VERIFY")).toBeInTheDocument();
  });

  it("shows ◆ markers for complete steps (index < currentStep)", () => {
    render(<Stepper steps={STEPS} currentStep={2} />);
    // Steps 0 and 1 are complete (markers), step 2 is current
    const markers = screen.getAllByText("◆");
    // At least complete + current = 3 ◆ markers
    expect(markers.length).toBeGreaterThanOrEqual(2);
  });

  it("shows ◆ marker for current step (index === currentStep)", () => {
    render(<Stepper steps={STEPS} currentStep={0} />);
    // Step 0 is current → ◆
    expect(screen.getAllByText("◆").length).toBeGreaterThanOrEqual(1);
  });

  it("shows ◇ markers for upcoming steps (index > currentStep)", () => {
    render(<Stepper steps={STEPS} currentStep={1} />);
    // Steps 2 and 3 are upcoming → ◇
    const upcoming = screen.getAllByText("◇");
    expect(upcoming.length).toBeGreaterThanOrEqual(2);
  });

  it("connector after complete step has primary color class", () => {
    const { container } = render(<Stepper steps={STEPS} currentStep={2} />);
    // A complete connector should have bg-primary
    const primary = container.querySelector(".bg-primary");
    expect(primary).not.toBeNull();
  });

  it("renders horizontal orientation by default without crashing", () => {
    const { container } = render(<Stepper steps={STEPS} currentStep={1} />);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders vertical orientation without crashing", () => {
    const { container } = render(
      <Stepper steps={STEPS} currentStep={1} orientation="vertical" />,
    );
    expect(container.firstChild).not.toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stepper ref={ref} steps={STEPS} currentStep={0} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });
});

// ─── Pagination ───────────────────────────────────────────────────────────────

describe("Pagination", () => {
  it("renders PREV and NEXT buttons", () => {
    render(
      <Pagination totalPages={10} currentPage={5} onPageChange={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument();
  });

  it("calls onPageChange when page number clicked", () => {
    const spy = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={spy} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange(currentPage - 1) when PREV clicked", () => {
    const spy = vi.fn();
    render(<Pagination totalPages={10} currentPage={5} onPageChange={spy} />);
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(spy).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange(currentPage + 1) when NEXT clicked", () => {
    const spy = vi.fn();
    render(<Pagination totalPages={10} currentPage={5} onPageChange={spy} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(spy).toHaveBeenCalledWith(6);
  });

  it("PREV is disabled on first page", () => {
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
  });

  it("NEXT is disabled on last page", () => {
    render(
      <Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("shows current page with aria-current=page", () => {
    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: "Page 3" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("shows ellipsis for large page counts", () => {
    render(
      <Pagination totalPages={20} currentPage={10} onPageChange={vi.fn()} />,
    );
    // Should render the … character (ellipsis span)
    const ellipses = document.querySelectorAll('[aria-hidden="true"]');
    const hasEllipsis = Array.from(ellipses).some((el) =>
      el.textContent?.includes("…"),
    );
    expect(hasEllipsis).toBe(true);
  });

  it("forwards ref to nav element", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Pagination ref={ref} totalPages={5} currentPage={1} onPageChange={vi.fn()} />,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("applies custom className", () => {
    render(
      <Pagination
        className="pg-custom"
        totalPages={5}
        currentPage={1}
        onPageChange={vi.fn()}
      />,
    );
    expect(document.querySelector(".pg-custom")).not.toBeNull();
  });
});

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

const BC_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "DOCS", href: "/docs" },
  { label: "COMPONENTS" },
];

describe("Breadcrumb", () => {
  it("renders all items", () => {
    render(<Breadcrumb items={BC_ITEMS} />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("DOCS")).toBeInTheDocument();
    expect(screen.getByText("COMPONENTS")).toBeInTheDocument();
  });

  it("renders default › separator between items", () => {
    render(<Breadcrumb items={BC_ITEMS} />);
    // Should have 2 separator › chars for 3 items
    expect(screen.getAllByText("›").length).toBe(2);
  });

  it("uses custom separator when provided", () => {
    render(<Breadcrumb items={BC_ITEMS} separator={<span>/</span>} />);
    expect(screen.getAllByText("/").length).toBe(2);
  });

  it("last item has aria-current=page", () => {
    render(<Breadcrumb items={BC_ITEMS} />);
    expect(screen.getByText("COMPONENTS")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("items with href render as anchor tags", () => {
    render(<Breadcrumb items={BC_ITEMS} />);
    const homeLink = screen.getByRole("link", { name: "HOME" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("last item does not render as link even with href", () => {
    const items = [
      { label: "HOME", href: "/" },
      { label: "CURRENT", href: "/current" },
    ];
    render(<Breadcrumb items={items} />);
    // Last item (CURRENT) should not be a link
    expect(screen.queryByRole("link", { name: "CURRENT" })).toBeNull();
    expect(screen.getByText("CURRENT")).toBeInTheDocument();
  });

  it("forwards ref to nav element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb ref={ref} items={BC_ITEMS} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("applies custom className", () => {
    render(<Breadcrumb className="bc-custom" items={BC_ITEMS} />);
    expect(document.querySelector(".bc-custom")).not.toBeNull();
  });
});

// ─── NumberInput ──────────────────────────────────────────────────────────────

describe("NumberInput", () => {
  it("renders with default value 0 when no defaultValue provided", () => {
    render(<NumberInput />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(0);
  });

  it("renders with provided defaultValue", () => {
    render(<NumberInput defaultValue={5} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(5);
  });

  it("+ button increments value", () => {
    render(<NumberInput defaultValue={3} />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(4);
  });

  it("− button decrements value", () => {
    render(<NumberInput defaultValue={3} />);
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("calls onChange with new value on increment", () => {
    const spy = vi.fn();
    render(<NumberInput defaultValue={5} onChange={spy} />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(spy).toHaveBeenCalledWith(6);
  });

  it("calls onChange with new value on decrement", () => {
    const spy = vi.fn();
    render(<NumberInput defaultValue={5} onChange={spy} />);
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    expect(spy).toHaveBeenCalledWith(4);
  });

  it("respects max constraint", () => {
    render(<NumberInput defaultValue={10} max={10} />);
    const incBtn = screen.getByRole("button", { name: "Increment" });
    expect(incBtn).toBeDisabled();
  });

  it("respects min constraint", () => {
    render(<NumberInput defaultValue={0} min={0} />);
    const decBtn = screen.getByRole("button", { name: "Decrement" });
    expect(decBtn).toBeDisabled();
  });

  it("ArrowUp key increments value", () => {
    render(<NumberInput defaultValue={7} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue(8);
  });

  it("forwards ref to input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<NumberInput ref={ref} defaultValue={1} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });
});
