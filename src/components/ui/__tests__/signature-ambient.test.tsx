import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { MatrixGrid } from "../signature/matrix-grid";
import { FrequencyBars } from "../signature/frequency-bars";

// ─── MatrixGrid ───────────────────────────────────────────────────────────────

describe("MatrixGrid", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without crashing", () => {
    const { container } = render(<MatrixGrid />);
    expect(container).toBeTruthy();
  });

  it("renders aria-hidden=true (decorative)", () => {
    render(<MatrixGrid />);
    const root = document.querySelector("[aria-hidden='true']");
    expect(root).not.toBeNull();
  });

  it("renders correct number of dot divs (cols × rows)", () => {
    const { container } = render(<MatrixGrid cols={5} rows={4} />);
    // Structure: container > div.overflow-hidden > div[display:grid] > dot divs
    const grid = container.querySelector("div > div > div");
    expect(grid?.children).toHaveLength(20);
  });

  it("uses default cols=20 rows=10 (200 dots)", () => {
    const { container } = render(<MatrixGrid />);
    const grid = container.querySelector("div > div > div");
    expect(grid?.children).toHaveLength(200);
  });

  it("renders static mode without animation interval", () => {
    // In static mode, no setInterval should fire
    const setIntervalSpy = vi.spyOn(global, "setInterval");
    render(<MatrixGrid static />);
    // No interval should have been set
    expect(setIntervalSpy).not.toHaveBeenCalled();
    setIntervalSpy.mockRestore();
  });

  it("sets interval in animated mode (non-static)", () => {
    const setIntervalSpy = vi.spyOn(global, "setInterval");
    render(<MatrixGrid />);
    expect(setIntervalSpy).toHaveBeenCalled();
    setIntervalSpy.mockRestore();
  });

  it("clears interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");
    const { unmount } = render(<MatrixGrid />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("applies dotSize to grid cells inline style", () => {
    const { container } = render(<MatrixGrid cols={2} rows={2} dotSize={6} />);
    // First dot: container > div.overflow-hidden > div[display:grid] > div (first dot)
    const firstDot = container.querySelector("div > div > div > div") as HTMLElement;
    expect(firstDot?.style.width).toBe("6px");
    expect(firstDot?.style.height).toBe("6px");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MatrixGrid ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<MatrixGrid className="mg-custom" />);
    expect(document.querySelector(".mg-custom")).not.toBeNull();
  });
});

// ─── FrequencyBars ────────────────────────────────────────────────────────────

describe("FrequencyBars", () => {
  it("renders without crashing", () => {
    const { container } = render(<FrequencyBars />);
    expect(container).toBeTruthy();
  });

  it("renders aria-hidden=true (decorative)", () => {
    render(<FrequencyBars />);
    const root = document.querySelector("[aria-hidden='true']");
    expect(root).not.toBeNull();
  });

  it("renders correct number of bar spans (barCount)", () => {
    const { container } = render(<FrequencyBars barCount={8} />);
    const bars = container.querySelectorAll("span");
    expect(bars).toHaveLength(8);
  });

  it("uses default barCount=12", () => {
    const { container } = render(<FrequencyBars />);
    const bars = container.querySelectorAll("span");
    expect(bars).toHaveLength(12);
  });

  it("sets animationPlayState=paused on each bar when paused=true", () => {
    const { container } = render(<FrequencyBars paused />);
    const bars = container.querySelectorAll("span");
    bars.forEach((bar) => {
      expect((bar as HTMLElement).style.animationPlayState).toBe("paused");
    });
  });

  it("sets animationPlayState=running on each bar by default", () => {
    const { container } = render(<FrequencyBars />);
    const bars = container.querySelectorAll("span");
    bars.forEach((bar) => {
      expect((bar as HTMLElement).style.animationPlayState).toBe("running");
    });
  });

  it("sets transformOrigin to center bottom on each bar", () => {
    const { container } = render(<FrequencyBars barCount={3} />);
    const bars = container.querySelectorAll("span");
    bars.forEach((bar) => {
      expect((bar as HTMLElement).style.transformOrigin).toBe("center bottom");
    });
  });

  it("applies container height via inline style", () => {
    const { container } = render(<FrequencyBars height={48} />);
    const root = container.firstChild as HTMLElement;
    expect(root?.style.height).toBe("48px");
  });

  it("applies all color variants without crashing", () => {
    const colors = ["primary", "success", "danger", "info", "muted"] as const;
    for (const color of colors) {
      const { unmount } = render(<FrequencyBars color={color} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("applies slow speed (1.4s animation duration)", () => {
    const { container } = render(<FrequencyBars speed="slow" barCount={1} />);
    const bar = container.querySelector("span") as HTMLElement;
    expect(bar?.style.animation).toContain("1.4s");
  });

  it("applies fast speed (0.4s animation duration)", () => {
    const { container } = render(<FrequencyBars speed="fast" barCount={1} />);
    const bar = container.querySelector("span") as HTMLElement;
    expect(bar?.style.animation).toContain("0.4s");
  });

  it("applies medium speed (0.8s animation duration) by default", () => {
    const { container } = render(<FrequencyBars barCount={1} />);
    const bar = container.querySelector("span") as HTMLElement;
    expect(bar?.style.animation).toContain("0.8s");
  });

  it("sets different animationDelay per bar for organic effect", () => {
    const { container } = render(<FrequencyBars barCount={3} />);
    const bars = Array.from(container.querySelectorAll("span")) as HTMLElement[];
    const delays = bars.map((b) => b.style.animationDelay);
    // At least one pair should differ (bar 0: 0.00s, bar 1: 0.13s, bar 2: 0.26s)
    expect(new Set(delays).size).toBeGreaterThan(1);
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FrequencyBars ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<FrequencyBars className="fb-custom" />);
    expect(document.querySelector(".fb-custom")).not.toBeNull();
  });
});
