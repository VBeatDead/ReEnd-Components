import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { StatusBar } from "../signature/status-bar";
import { CommandOutput } from "../signature/command-output";
import type { LogEntry } from "../signature/command-output";

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
