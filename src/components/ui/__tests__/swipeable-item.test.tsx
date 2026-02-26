import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SwipeableItem } from "../swipeable-item";
import type { SwipeAction } from "../swipeable-item";

// ─── Mock navigator.vibrate ──────────────────────────────────────────────────

const vibrateMock = vi.fn();

beforeEach(() => {
  vibrateMock.mockClear();
  Object.defineProperty(navigator, "vibrate", {
    value: vibrateMock,
    writable: true,
    configurable: true,
  });
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const deleteAction: SwipeAction = {
  label: "DELETE",
  variant: "delete",
  onTrigger: vi.fn(),
};

const archiveAction: SwipeAction = {
  label: "ARCHIVE",
  variant: "archive",
  onTrigger: vi.fn(),
};

function createAction(overrides?: Partial<SwipeAction>): SwipeAction {
  return {
    label: "ACTION",
    variant: "delete",
    onTrigger: vi.fn(),
    ...overrides,
  };
}

/**
 * Dispatch a PointerEvent directly (jsdom's fireEvent doesn't properly propagate
 * clientX / pointerId for PointerEvent — use native dispatch + act() instead).
 */
function dispatchPointer(
  element: HTMLElement,
  type: string,
  clientX: number,
  pointerId = 1,
) {
  act(() => {
    element.dispatchEvent(
      new PointerEvent(type, {
        clientX,
        clientY: 0,
        pointerId,
        bubbles: true,
        cancelable: true,
        isPrimary: true,
      }),
    );
  });
}

/**
 * Simulate a full horizontal swipe: pointerdown → pointermove → pointerup.
 */
function simulateSwipe(
  element: HTMLElement,
  distance: number,
  pointerId = 1,
) {
  element.setPointerCapture = vi.fn();
  element.releasePointerCapture = vi.fn();

  dispatchPointer(element, "pointerdown", 0, pointerId);
  dispatchPointer(element, "pointermove", distance, pointerId);
  dispatchPointer(element, "pointerup", distance, pointerId);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("SwipeableItem", () => {
  it("renders children", () => {
    render(
      <SwipeableItem>
        <span>List item content</span>
      </SwipeableItem>,
    );
    expect(screen.getByText("List item content")).toBeInTheDocument();
  });

  it("renders left swipe action button when leftSwipeAction provided", () => {
    render(
      <SwipeableItem leftSwipeAction={deleteAction}>
        <span>Item</span>
      </SwipeableItem>,
    );
    expect(screen.getByTestId("swipe-action-right")).toBeInTheDocument();
    expect(screen.getByText("DELETE")).toBeInTheDocument();
  });

  it("does not render right action when not provided", () => {
    render(
      <SwipeableItem leftSwipeAction={deleteAction}>
        <span>Item</span>
      </SwipeableItem>,
    );
    expect(screen.queryByTestId("swipe-action-left")).toBeNull();
  });

  it("translates content on pointer move", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    // pointerdown at x=100, then move to x=50 → deltaX = -50
    dispatchPointer(content, "pointerdown", 100);
    dispatchPointer(content, "pointermove", 50);

    expect(content.style.transform).toBe("translateX(-50px)");
  });

  it("snaps back when below reveal threshold (< 80px)", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    simulateSwipe(content, -60); // 60px left swipe, below 80px threshold

    // After pointer up, snaps back to 0
    expect(content.style.transform).toBe("translateX(0px)");
    expect(action.onTrigger).not.toHaveBeenCalled();
  });

  it("snaps back between reveal and trigger threshold (80-160px) without triggering", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    simulateSwipe(content, -120); // 120px left swipe, between 80 and 160

    // After pointer up, snaps back without triggering
    expect(content.style.transform).toBe("translateX(0px)");
    expect(action.onTrigger).not.toHaveBeenCalled();
  });

  it("triggers action when swipe exceeds trigger threshold (> 160px)", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    simulateSwipe(content, -180); // 180px left swipe, above 160px trigger

    expect(action.onTrigger).toHaveBeenCalledOnce();
  });

  it("calls navigator.vibrate(10) at reveal threshold", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    // pointerdown at x=200, then move to x=110 → deltaX = -90 (past 80px threshold)
    dispatchPointer(content, "pointerdown", 200);
    dispatchPointer(content, "pointermove", 110);

    expect(vibrateMock).toHaveBeenCalledWith(10);
  });

  it("calls navigator.vibrate(20) at trigger threshold", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    // pointerdown at x=200, then move to x=30 → deltaX = -170 (past 160px trigger)
    dispatchPointer(content, "pointerdown", 200);
    dispatchPointer(content, "pointermove", 30);

    expect(vibrateMock).toHaveBeenCalledWith(20);
  });

  it("disabled prop prevents swipe", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action} disabled>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    dispatchPointer(content, "pointerdown", 100);
    dispatchPointer(content, "pointermove", -100);

    // Should remain at 0 since disabled
    expect(content.style.transform).toBe("translateX(0px)");
    expect(action.onTrigger).not.toHaveBeenCalled();
  });

  it("blocks left-direction swipe when leftSwipeAction is not provided", () => {
    const action = createAction({ label: "RIGHT_ONLY" });
    render(
      <SwipeableItem rightSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    // Attempt left swipe (negative delta): down at 200, move to 50 → deltaX = -150
    dispatchPointer(content, "pointerdown", 200);
    dispatchPointer(content, "pointermove", 50);

    // No leftSwipeAction, so clamped to 0
    expect(content.style.transform).toBe("translateX(0px)");
  });

  it("blocks right-direction swipe when rightSwipeAction is not provided", () => {
    const action = createAction({ label: "LEFT_ONLY" });
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    content.setPointerCapture = vi.fn();

    // Attempt right swipe (positive delta): down at 0, move to 150 → deltaX = +150
    dispatchPointer(content, "pointerdown", 0);
    dispatchPointer(content, "pointermove", 150);

    // No rightSwipeAction, so clamped to 0
    expect(content.style.transform).toBe("translateX(0px)");
  });

  it("calls onTrigger on the correct action when auto-triggered", () => {
    const leftAction = createAction({ label: "DEL" });
    const rightAction = createAction({ label: "ARCH" });
    render(
      <SwipeableItem leftSwipeAction={leftAction} rightSwipeAction={rightAction}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");

    // Right swipe (positive delta) triggers right action
    simulateSwipe(content, 180);

    expect(rightAction.onTrigger).toHaveBeenCalledOnce();
    expect(leftAction.onTrigger).not.toHaveBeenCalled();
  });

  it("snaps back after trigger", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    simulateSwipe(content, -180);

    // Action was triggered
    expect(action.onTrigger).toHaveBeenCalledOnce();
    // Content snaps back to 0
    expect(content.style.transform).toBe("translateX(0px)");
  });

  it("calls setPointerCapture on pointer down", () => {
    const action = createAction();
    render(
      <SwipeableItem leftSwipeAction={action}>
        <span>Item</span>
      </SwipeableItem>,
    );
    const content = screen.getByTestId("swipe-content");
    const setCapture = vi.fn();
    content.setPointerCapture = setCapture;

    dispatchPointer(content, "pointerdown", 0, 42);

    expect(setCapture).toHaveBeenCalledWith(42);
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <SwipeableItem ref={ref}>
        <span>Item</span>
      </SwipeableItem>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("renders both left and right action panels when both provided", () => {
    render(
      <SwipeableItem leftSwipeAction={deleteAction} rightSwipeAction={archiveAction}>
        <span>Item</span>
      </SwipeableItem>,
    );
    expect(screen.getByTestId("swipe-action-right")).toBeInTheDocument();
    expect(screen.getByTestId("swipe-action-left")).toBeInTheDocument();
  });
});
