import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

import { StatusBar } from "../signature/status-bar";
import { CommandOutput } from "../signature/command-output";
import type { LogEntry } from "../signature/command-output";
import { MatrixGrid } from "../signature/matrix-grid";
import { FrequencyBars } from "../signature/frequency-bars";
import { CountdownTimer } from "../signature/countdown-timer";

// ─── StatusBar ────────────────────────────────────────────────────────────────

describe("StatusBar", () => {
  it("renders with role=meter", () => {
    render(<StatusBar value={50} />);
    expect(screen.getByRole("meter")).toBeInTheDocument();
  });

  it("sets aria-valuenow to value", () => {
    render(<StatusBar value={70} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "70");
  });

  it("sets aria-valuemin to 0", () => {
    render(<StatusBar value={50} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemin", "0");
  });

  it("sets aria-valuemax to max prop", () => {
    render(<StatusBar value={50} max={200} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemax", "200");
  });

  it("clamps value to max", () => {
    render(<StatusBar value={150} max={100} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
  });

  it("clamps value to 0 minimum", () => {
    render(<StatusBar value={-10} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "0");
  });

  it("renders label text when provided", () => {
    render(<StatusBar value={50} label="HP" />);
    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("does not render label when omitted", () => {
    render(<StatusBar value={50} />);
    // No visible label span (aria-label is on the meter, not a separate element)
    expect(screen.queryByText("HP")).toBeNull();
  });

  it("shows value/max when showValue=true", () => {
    render(<StatusBar value={75} max={100} showValue />);
    expect(screen.getByText("75/100")).toBeInTheDocument();
  });

  it("does not show value when showValue=false (default)", () => {
    render(<StatusBar value={75} max={100} />);
    expect(screen.queryByText("75/100")).toBeNull();
  });

  it("renders correct number of segment spans", () => {
    const { container } = render(<StatusBar value={50} segments={8} />);
    // Segments are <span class="seg ..."> inside a flex wrapper
    const segs = container.querySelectorAll("span.seg");
    expect(segs).toHaveLength(8);
  });

  it("renders all variants without crashing", () => {
    const variants = ["health", "energy", "shield", "experience"] as const;
    for (const variant of variants) {
      const { unmount } = render(<StatusBar value={50} variant={variant} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(<StatusBar value={50} size={size} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<StatusBar value={50} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<StatusBar value={50} className="sb-custom" />);
    expect(document.querySelector(".sb-custom")).not.toBeNull();
  });
});

// ─── CommandOutput ────────────────────────────────────────────────────────────

const SAMPLE_ENTRIES: LogEntry[] = [
  { level: "system",  message: "System initialized." },
  { level: "info",    message: "Connecting to server..." },
  { level: "success", message: "Connection established." },
  { level: "warning", message: "High latency detected." },
  { level: "error",   message: "Packet loss exceeded threshold." },
];

describe("CommandOutput", () => {
  it("renders all entry messages", () => {
    render(<CommandOutput entries={SAMPLE_ENTRIES} />);
    expect(screen.getByText("System initialized.")).toBeInTheDocument();
    expect(screen.getByText("Connecting to server...")).toBeInTheDocument();
    expect(screen.getByText("Connection established.")).toBeInTheDocument();
    expect(screen.getByText("High latency detected.")).toBeInTheDocument();
    expect(screen.getByText("Packet loss exceeded threshold.")).toBeInTheDocument();
  });

  it("renders default header text TERMINAL", () => {
    render(<CommandOutput entries={[]} />);
    expect(screen.getByText("TERMINAL")).toBeInTheDocument();
  });

  it("renders custom headerText", () => {
    render(<CommandOutput entries={[]} headerText="COMMS RELAY" />);
    expect(screen.getByText("COMMS RELAY")).toBeInTheDocument();
  });

  it("hides header when showHeader=false", () => {
    render(<CommandOutput entries={[]} showHeader={false} />);
    expect(screen.queryByText("TERMINAL")).toBeNull();
  });

  it("shows empty state when entries is empty", () => {
    render(<CommandOutput entries={[]} />);
    expect(screen.getByText("No output.")).toBeInTheDocument();
  });

  it("does not show empty state when entries exist", () => {
    render(<CommandOutput entries={[{ level: "info", message: "OK" }]} />);
    expect(screen.queryByText("No output.")).toBeNull();
  });

  it("renders log area with role=log", () => {
    render(<CommandOutput entries={[]} />);
    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("renders blinking cursor by default", () => {
    const { container } = render(<CommandOutput entries={[]} />);
    // Cursor is a span with animate-pulse and w-2 h-4
    const cursor = container.querySelector("span.animate-pulse");
    expect(cursor).not.toBeNull();
  });

  it("hides cursor when showCursor=false", () => {
    const { container } = render(
      <CommandOutput entries={[]} showCursor={false} />,
    );
    const cursor = container.querySelector("span.animate-pulse");
    expect(cursor).toBeNull();
  });

  it("renders timestamps when showTimestamp=true and timestamp provided", () => {
    const entries: LogEntry[] = [
      { level: "info", message: "Event", timestamp: "2026-02-20/12:00:00" },
    ];
    render(<CommandOutput entries={entries} showTimestamp />);
    expect(screen.getByText("2026-02-20/12:00:00")).toBeInTheDocument();
  });

  it("renders entry with explicit id without crashing", () => {
    const entries: LogEntry[] = [
      { id: "entry-1", level: "success", message: "OK" },
    ];
    render(<CommandOutput entries={entries} />);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("uses id-indexed keys (renders multiple entries without key conflicts)", () => {
    const entries: LogEntry[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      level: "info" as const,
      message: `Entry ${i}`,
    }));
    render(<CommandOutput entries={entries} />);
    expect(screen.getByText("Entry 9")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CommandOutput entries={[]} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<CommandOutput entries={[]} className="co-custom" />);
    expect(document.querySelector(".co-custom")).not.toBeNull();
  });
});

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

// ─── CountdownTimer ──────────────────────────────────────────────────────────

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
