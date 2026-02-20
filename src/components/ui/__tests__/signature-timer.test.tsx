import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

import { CountdownTimer } from "../signature/countdown-timer";

describe("CountdownTimer", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders with role=timer", () => {
    render(<CountdownTimer seconds={60} />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
  });

  it("renders HRS, MIN, SEC unit labels", () => {
    render(<CountdownTimer seconds={3661} />);
    expect(screen.getByText("HRS")).toBeInTheDocument();
    expect(screen.getByText("MIN")).toBeInTheDocument();
    expect(screen.getByText("SEC")).toBeInTheDocument();
  });

  it("renders DAYS unit label when showDays=true (default)", () => {
    // Set a date far in the future to ensure days > 0
    const future = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    render(<CountdownTimer targetDate={future} />);
    expect(screen.getByText("DAYS")).toBeInTheDocument();
  });

  it("hides DAYS unit when showDays=false", () => {
    const future = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    render(<CountdownTimer targetDate={future} showDays={false} />);
    expect(screen.queryByText("DAYS")).toBeNull();
  });

  it("hides DAYS section when autoHideZero=true and days=0", () => {
    // 30 seconds → days=0 → should hide DAYS
    render(<CountdownTimer seconds={30} autoHideZero />);
    expect(screen.queryByText("DAYS")).toBeNull();
  });

  it("renders label text when provided", () => {
    render(<CountdownTimer seconds={60} label="MISSION STARTS IN" />);
    expect(screen.getByText("MISSION STARTS IN")).toBeInTheDocument();
  });

  it("does not render label element when omitted", () => {
    render(<CountdownTimer seconds={60} />);
    expect(screen.queryByText("MISSION STARTS IN")).toBeNull();
  });

  it("fires onComplete when countdown reaches zero", () => {
    const spy = vi.fn();
    // seconds=0 → already expired → tick() fires immediately in useEffect
    render(<CountdownTimer seconds={0} onComplete={spy} />);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("does not fire onComplete twice for same expiry", () => {
    const spy = vi.fn();
    render(<CountdownTimer seconds={0} onComplete={spy} />);
    act(() => {
      vi.advanceTimersByTime(3000); // advance 3 more ticks
    });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("fires onComplete after interval elapses", () => {
    const spy = vi.fn();
    render(<CountdownTimer seconds={2} onComplete={spy} />);
    expect(spy).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(3000); // 3 ticks of 1s
    });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("renders 00 seconds formatted when no time left", () => {
    render(<CountdownTimer seconds={0} />);
    // Should show at least "00" for seconds
    expect(screen.getAllByText("00").length).toBeGreaterThan(0);
  });

  it("accepts sm size variant without crashing", () => {
    render(<CountdownTimer seconds={30} size="sm" />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
  });

  it("accepts lg size variant without crashing", () => {
    render(<CountdownTimer seconds={30} size="lg" />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CountdownTimer seconds={60} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<CountdownTimer seconds={60} className="ct-custom" />);
    expect(document.querySelector(".ct-custom")).not.toBeNull();
  });

  it("renders aria-label with time units", () => {
    render(<CountdownTimer seconds={3661} />);
    const timer = screen.getByRole("timer");
    expect(timer.getAttribute("aria-label")).toMatch(/Countdown:/);
  });
});
