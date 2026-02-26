import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PullToRefresh } from "../pull-to-refresh";

// ════════════════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════════════════

const vibrateSpy = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  vibrateSpy.mockClear();
  Object.defineProperty(navigator, "vibrate", {
    value: vibrateSpy,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

/**
 * Simulates a touch pull gesture on the container element.
 * Returns the container for further assertions.
 */
function simulatePull(
  container: HTMLElement,
  startY: number,
  endY: number,
  options?: { release?: boolean },
) {
  const wrapper = container.firstElementChild as HTMLElement;

  // Ensure scrollTop is 0 so PTR activates
  Object.defineProperty(wrapper, "scrollTop", {
    value: 0,
    writable: true,
    configurable: true,
  });

  fireEvent.touchStart(wrapper, {
    touches: [{ clientY: startY }],
  });

  fireEvent.touchMove(wrapper, {
    touches: [{ clientY: endY }],
  });

  if (options?.release !== false) {
    fireEvent.touchEnd(wrapper);
  }

  return wrapper;
}

function getWrapper(container: HTMLElement) {
  return container.firstElementChild as HTMLElement;
}

// ════════════════════════════════════════════════════════════════════════════
// PullToRefresh
// ════════════════════════════════════════════════════════════════════════════

describe("PullToRefresh", () => {
  it("renders children", () => {
    render(
      <PullToRefresh onRefresh={() => Promise.resolve()}>
        <p>Content here</p>
      </PullToRefresh>,
    );
    expect(screen.getByText("Content here")).toBeInTheDocument();
  });

  it("starts in idle phase", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()}>
        <p>Child</p>
      </PullToRefresh>,
    );
    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("idle");
  });

  it("shows indicator on touch start and move down", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 130, { release: false });

    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("pulling");
    expect(screen.getByTestId("ptr-diamond")).toBeInTheDocument();
  });

  it("indicator opacity increases with pull distance", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()}>
        <p>Child</p>
      </PullToRefresh>,
    );

    // Pull 30px out of 60px threshold => opacity should be 0.5
    simulatePull(container, 100, 130, { release: false });

    const indicator = screen.getByTestId("ptr-indicator");
    const opacity = parseFloat(indicator.style.opacity);
    expect(opacity).toBe(0.5);
  });

  it("reaches threshold phase at threshold distance", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()} threshold={60}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165, { release: false });

    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("threshold");
  });

  it("calls navigator.vibrate(10) on threshold", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()} threshold={60}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165, { release: false });

    expect(vibrateSpy).toHaveBeenCalledWith(10);
  });

  it("calls navigator.vibrate(20) on release at threshold", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()} threshold={60}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    expect(vibrateSpy).toHaveBeenCalledWith(20);
  });

  it("calls onRefresh when released at threshold", () => {
    const onRefresh = vi.fn(() => Promise.resolve());
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('shows "SYNCING..." text during refreshing', () => {
    const onRefresh = vi.fn(
      () => new Promise<void>((resolve) => setTimeout(resolve, 2000)),
    );
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("refreshing");
    expect(screen.getByTestId("ptr-label")).toHaveTextContent("SYNCING...");
    expect(screen.getByTestId("ptr-spinner")).toBeInTheDocument();
  });

  it('shows "UPDATED" on complete', async () => {
    let resolveRefresh: () => void;
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve;
        }),
    );
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    // Resolve the refresh
    await act(async () => {
      resolveRefresh!();
    });

    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("complete");
    expect(screen.getByTestId("ptr-label")).toHaveTextContent("UPDATED");
    expect(screen.getByTestId("ptr-check")).toHaveTextContent("✓");
  });

  it("returns to idle after complete phase (1s delay)", async () => {
    let resolveRefresh: () => void;
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve;
        }),
    );
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh}>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    await act(async () => {
      resolveRefresh!();
    });

    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("complete");

    // Advance by 1s to trigger auto-hide
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(wrapper.getAttribute("data-ptr-phase")).toBe("idle");
  });

  it("disabled prop prevents refresh", () => {
    const onRefresh = vi.fn(() => Promise.resolve());
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} disabled>
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);

    expect(onRefresh).not.toHaveBeenCalled();
    const wrapper = getWrapper(container);
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("idle");
  });

  it("does NOT trigger if not at scrollTop 0", () => {
    const onRefresh = vi.fn(() => Promise.resolve());
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh}>
        <p>Child</p>
      </PullToRefresh>,
    );

    const wrapper = getWrapper(container);

    // Set scrollTop to non-zero
    Object.defineProperty(wrapper, "scrollTop", {
      value: 100,
      writable: true,
      configurable: true,
    });

    fireEvent.touchStart(wrapper, {
      touches: [{ clientY: 100 }],
    });

    fireEvent.touchMove(wrapper, {
      touches: [{ clientY: 200 }],
    });

    fireEvent.touchEnd(wrapper);

    expect(onRefresh).not.toHaveBeenCalled();
    expect(wrapper.getAttribute("data-ptr-phase")).toBe("idle");
  });

  it("does NOT trigger on upward pull", () => {
    const onRefresh = vi.fn(() => Promise.resolve());
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh}>
        <p>Child</p>
      </PullToRefresh>,
    );

    // Pull upward (endY < startY)
    simulatePull(container, 200, 100);

    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("uses custom refreshingLabel and completeLabel", async () => {
    let resolveRefresh: () => void;
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve;
        }),
    );
    const { container } = render(
      <PullToRefresh
        onRefresh={onRefresh}
        refreshingLabel="LOADING DATA..."
        completeLabel="DONE"
      >
        <p>Child</p>
      </PullToRefresh>,
    );

    simulatePull(container, 100, 165);
    expect(screen.getByTestId("ptr-label")).toHaveTextContent("LOADING DATA...");

    await act(async () => {
      resolveRefresh!();
    });

    expect(screen.getByTestId("ptr-label")).toHaveTextContent("DONE");
  });

  it("renders with correct aria structure", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => Promise.resolve()}>
        <p>Child</p>
      </PullToRefresh>,
    );

    const indicator = screen.getByTestId("ptr-indicator");
    expect(indicator.getAttribute("aria-hidden")).toBe("true");
    expect(indicator.classList.contains("pointer-events-none")).toBe(true);
  });
});
