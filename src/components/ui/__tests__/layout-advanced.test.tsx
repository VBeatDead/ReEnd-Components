import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ViewToggle } from "../view-toggle";
import { FilterBar, FilterChip } from "../filter-bar";
import { BottomSheet } from "../bottom-sheet";
import { Carousel, CarouselItem } from "../carousel";
import { SessionTimeoutModal } from "../session-timeout-modal";

// ════════════════════════════════════════════════════════════════════════════
// ViewToggle
// ════════════════════════════════════════════════════════════════════════════

describe("ViewToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders grid and list buttons", () => {
    render(<ViewToggle />);
    expect(screen.getByLabelText("Grid view")).toBeInTheDocument();
    expect(screen.getByLabelText("List view")).toBeInTheDocument();
  });

  it("defaults to grid view", () => {
    render(<ViewToggle />);
    const gridBtn = screen.getByLabelText("Grid view");
    expect(gridBtn.getAttribute("aria-pressed")).toBe("true");
  });

  it("switches to list view on click", () => {
    const onChange = vi.fn();
    render(<ViewToggle onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("List view"));
    expect(onChange).toHaveBeenCalledWith("list");
  });

  it("persists value to localStorage when storageKey is provided", () => {
    render(<ViewToggle storageKey="test-view" />);
    fireEvent.click(screen.getByLabelText("List view"));
    expect(localStorage.getItem("test-view")).toBe("list");
  });

  it("reads initial value from localStorage", () => {
    localStorage.setItem("test-view", "list");
    render(<ViewToggle storageKey="test-view" />);
    const listBtn = screen.getByLabelText("List view");
    expect(listBtn.getAttribute("aria-pressed")).toBe("true");
  });

  it("respects controlled value prop", () => {
    render(<ViewToggle value="list" />);
    const listBtn = screen.getByLabelText("List view");
    expect(listBtn.getAttribute("aria-pressed")).toBe("true");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// FilterBar + FilterChip
// ════════════════════════════════════════════════════════════════════════════

describe("FilterBar", () => {
  const filters = [
    {
      id: "rarity",
      label: "Rarity",
      options: [
        { label: "5★", value: "5" },
        { label: "6★", value: "6" },
      ],
    },
  ];

  it("renders filter buttons", () => {
    render(<FilterBar filters={filters} />);
    expect(screen.getByText("Rarity")).toBeInTheDocument();
  });

  it("opens dropdown on filter button click", () => {
    render(<FilterBar filters={filters} />);
    fireEvent.click(screen.getByText("Rarity"));
    expect(screen.getByText("◇ 5★")).toBeInTheDocument();
  });

  it("calls onFilterChange when an option is clicked", () => {
    const onFilterChange = vi.fn();
    render(
      <FilterBar
        filters={filters}
        activeFilters={{}}
        onFilterChange={onFilterChange}
      />,
    );
    fireEvent.click(screen.getByText("Rarity"));
    fireEvent.click(screen.getByText("◇ 5★"));
    expect(onFilterChange).toHaveBeenCalledWith("rarity", ["5"]);
  });

  it("shows CLEAR ALL button when chips are provided", () => {
    const onClearAll = vi.fn();
    render(
      <FilterBar
        filters={filters}
        chips={[{ label: "5★", value: "5", filterId: "rarity" }]}
        onClearAll={onClearAll}
      />,
    );
    expect(screen.getByText("CLEAR ALL")).toBeInTheDocument();
  });

  it("calls onClearAll when clear button is clicked", () => {
    const onClearAll = vi.fn();
    render(
      <FilterBar
        filters={filters}
        chips={[{ label: "5★", value: "5", filterId: "rarity" }]}
        onClearAll={onClearAll}
      />,
    );
    fireEvent.click(screen.getByText("CLEAR ALL"));
    expect(onClearAll).toHaveBeenCalled();
  });

  it("renders chips when provided", () => {
    render(
      <FilterBar
        filters={filters}
        chips={[{ label: "5★", value: "5", filterId: "rarity" }]}
      />,
    );
    expect(screen.getByText("5★")).toBeInTheDocument();
  });

  it("FilterChip calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(<FilterChip label="Test" onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText("Remove Test filter"));
    expect(onRemove).toHaveBeenCalled();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// BottomSheet
// ════════════════════════════════════════════════════════════════════════════

describe("BottomSheet", () => {
  it("does not render when closed", () => {
    render(
      <BottomSheet open={false} onClose={vi.fn()}>
        Content
      </BottomSheet>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <BottomSheet open onClose={vi.fn()}>
        Content
      </BottomSheet>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <BottomSheet open onClose={vi.fn()} title="Settings">
        Content
      </BottomSheet>,
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <BottomSheet open onClose={vi.fn()}>
        Hello World
      </BottomSheet>,
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <BottomSheet open onClose={onClose}>
        Content
      </BottomSheet>,
    );
    // Click the backdrop (first child of the portal container)
    const backdrop = container.ownerDocument.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        Content
      </BottomSheet>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Carousel
// ════════════════════════════════════════════════════════════════════════════

describe("Carousel", () => {
  it("renders children slides", () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>,
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("renders navigation arrows when showArrows is true", () => {
    render(
      <Carousel showArrows>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>,
    );
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
  });

  it("renders dot indicators when showDots is true", () => {
    render(
      <Carousel showDots>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>,
    );
    expect(screen.getByLabelText("Go to slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 2")).toBeInTheDocument();
  });

  it("disables prev button on first slide (no loop)", () => {
    render(
      <Carousel showArrows>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>,
    );
    expect(screen.getByLabelText("Previous slide")).toBeDisabled();
  });

  it("does not render arrows with only one slide", () => {
    render(
      <Carousel showArrows>
        <CarouselItem>Only slide</CarouselItem>
      </Carousel>,
    );
    expect(screen.queryByLabelText("Previous slide")).not.toBeInTheDocument();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// SessionTimeoutModal
// ════════════════════════════════════════════════════════════════════════════

describe("SessionTimeoutModal", () => {
  it("renders when open", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={120}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    expect(screen.getByText(/SESSION EXPIRING/)).toBeInTheDocument();
  });

  it("shows title text always", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={120}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    expect(screen.getByText(/SESSION EXPIRING/)).toBeInTheDocument();
  });

  it("calls onExtend when STAY CONNECTED button is clicked", () => {
    const onExtend = vi.fn();
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={120}
        onExtend={onExtend}
        onLogout={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("STAY CONNECTED"));
    expect(onExtend).toHaveBeenCalled();
  });

  it("calls onLogout when LOG OUT button is clicked", () => {
    const onLogout = vi.fn();
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={120}
        onExtend={vi.fn()}
        onLogout={onLogout}
      />,
    );
    fireEvent.click(screen.getByText("LOG OUT"));
    expect(onLogout).toHaveBeenCalled();
  });

  it("calls onAutoLogout when secondsRemaining reaches 0", () => {
    const onAutoLogout = vi.fn();
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={0}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
        onAutoLogout={onAutoLogout}
      />,
    );
    expect(onAutoLogout).toHaveBeenCalled();
  });

  it("does not call onAutoLogout when modal is closed", () => {
    const onAutoLogout = vi.fn();
    render(
      <SessionTimeoutModal
        open={false}
        secondsRemaining={0}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
        onAutoLogout={onAutoLogout}
      />,
    );
    expect(onAutoLogout).not.toHaveBeenCalled();
  });

  it("shows warning color class when secondsRemaining > warningAt (default 60)", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={121}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    // Dialog portals to document.body — use document.querySelector
    const countdown = document.querySelector("[aria-live='polite']");
    expect(countdown?.className).toContain("text-ef-orange");
  });

  it("shows critical color class when secondsRemaining <= warningAt", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={59}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
        warningAt={60}
      />,
    );
    const countdown = document.querySelector("[aria-live='polite']");
    expect(countdown?.className).toContain("text-ef-red");
  });

  it("applies faster pulse animation when secondsRemaining <= 30", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={25}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    const countdown = document.querySelector("[aria-live='polite']");
    expect(countdown?.className).toContain(
      "animate-[pulse_0.5s_ease-in-out_infinite]",
    );
  });

  it("formats countdown as MM:SS", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={167}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    expect(screen.getByText("02:47")).toBeInTheDocument();
  });

  it("shows description text", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={120}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    expect(screen.getByText(/expire due to inactivity/)).toBeInTheDocument();
  });

  it("renders remaining time label", () => {
    render(
      <SessionTimeoutModal
        open
        secondsRemaining={60}
        onExtend={vi.fn()}
        onLogout={vi.fn()}
      />,
    );
    expect(screen.getByText("remaining")).toBeInTheDocument();
  });
});
