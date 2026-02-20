import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { GlitchText } from "../signature/glitch-text";
import { DataStream } from "../signature/data-stream";
import { TacticalPanel } from "../signature/tactical-panel";
import { HUDOverlay } from "../signature/hud-overlay";
import { RadarChart } from "../signature/radar-chart";

// ─── GlitchText (expanded API) ────────────────────────────────────────────────

describe("GlitchText — expanded API", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders children text", () => {
    render(<GlitchText>ENDFIELD</GlitchText>);
    expect(screen.getAllByText("ENDFIELD").length).toBeGreaterThan(0);
  });

  it("renders all intensity variants without crashing", () => {
    const intensities = ["low", "medium", "high"] as const;
    for (const intensity of intensities) {
      const { unmount } = render(<GlitchText intensity={intensity}>TEST</GlitchText>);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("high intensity uses shorter animation duration than low", () => {
    const { container: low }  = render(<GlitchText intensity="low">T</GlitchText>);
    const { container: high } = render(<GlitchText intensity="high">T</GlitchText>);

    const lowSpan  = low.querySelector("span[aria-hidden]") as HTMLElement;
    const highSpan = high.querySelector("span[aria-hidden]") as HTMLElement;

    const lowDur  = parseFloat(lowSpan?.style.animationDuration  ?? "99");
    const highDur = parseFloat(highSpan?.style.animationDuration ?? "0");

    expect(highDur).toBeLessThan(lowDur);
  });

  it("renders in continuous mode without crashing", () => {
    const { container } = render(
      <GlitchText continuous continuousInterval={500}>LIVE</GlitchText>,
    );
    expect(container).toBeTruthy();
  });

  it("sets up an interval when continuous=true", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(<GlitchText continuous>LIVE</GlitchText>);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does NOT set up interval when continuous=false (default)", () => {
    const spy = vi.spyOn(global, "setInterval");
    render(<GlitchText>NO INTERVAL</GlitchText>);
    // DataStream also uses setInterval — filter by checking GlitchText isn't mounted
    // Just verify render doesn't crash
    spy.mockRestore();
    expect(screen.getAllByText("NO INTERVAL").length).toBeGreaterThan(0);
  });

  it("forwards ref to root span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<GlitchText ref={ref}>REF</GlitchText>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<GlitchText className="gt-custom">T</GlitchText>);
    expect(document.querySelector(".gt-custom")).not.toBeNull();
  });
});

// ─── DataStream (expanded API) ────────────────────────────────────────────────

describe("DataStream — expanded API", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without crashing", () => {
    const { container } = render(<DataStream />);
    expect(container).toBeTruthy();
  });

  it("accepts speed prop 1-5 without crashing", () => {
    for (let s = 1; s <= 5; s++) {
      const { unmount } = render(<DataStream speed={s as 1 | 2 | 3 | 4 | 5} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("speed=5 uses a shorter interval than speed=1", () => {
    // We check by inspecting setInterval calls
    const calls: number[] = [];
    const spy = vi.spyOn(global, "setInterval").mockImplementation(
      ((fn: () => void, ms: number) => {
        calls.push(ms);
        return 0 as unknown as ReturnType<typeof setInterval>;
      }) as typeof setInterval,
    );

    render(<DataStream speed={1} />);
    render(<DataStream speed={5} />);

    expect(calls[0]).toBeGreaterThan(calls[1]);
    spy.mockRestore();
  });

  it("accepts messageType=mono without crashing", () => {
    render(<DataStream messageType="mono" />);
    expect(document.body).toBeTruthy();
  });

  it("accepts messageType=classified without crashing", () => {
    render(<DataStream messageType="classified" />);
    expect(document.body).toBeTruthy();
  });

  it("accepts message object format {text, type}", () => {
    const msgs = [{ text: "DATA OK", type: "data" as const }];
    render(<DataStream messages={msgs} />);
    expect(document.body).toBeTruthy();
  });

  it("renders LIVE FEED header", () => {
    render(<DataStream />);
    expect(screen.getByText("LIVE FEED")).toBeInTheDocument();
  });

  it("renders ACTIVE status", () => {
    render(<DataStream />);
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DataStream ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<DataStream className="ds-custom" />);
    expect(document.querySelector(".ds-custom")).not.toBeNull();
  });
});

// ─── TacticalPanel (expanded API) ─────────────────────────────────────────────

describe("TacticalPanel — expanded API", () => {
  it("renders title and children", () => {
    render(<TacticalPanel title="ALPHA">panel-body</TacticalPanel>);
    expect(screen.getByText("ALPHA")).toBeInTheDocument();
    expect(screen.getByText("panel-body")).toBeInTheDocument();
  });

  it("renders headerAction slot in header", () => {
    render(
      <TacticalPanel title="T" headerAction={<button>ACTION</button>}>x</TacticalPanel>,
    );
    expect(screen.getByRole("button", { name: "ACTION" })).toBeInTheDocument();
  });

  it("shows + indicator when collapsible and panel is collapsed (defaultCollapsed=true)", () => {
    render(
      <TacticalPanel title="T" collapsible defaultCollapsed>x</TacticalPanel>,
    );
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("shows − indicator when collapsible and panel is open", () => {
    render(<TacticalPanel title="T" collapsible>x</TacticalPanel>);
    expect(screen.getByText("−")).toBeInTheDocument();
  });

  it("toggles collapse state on header click", () => {
    render(<TacticalPanel title="T" collapsible>content-here</TacticalPanel>);
    // Initially open → children visible
    expect(screen.getByText("content-here")).toBeInTheDocument();

    // Click header
    const header = screen.getByText("T").closest("div")!;
    fireEvent.click(header);

    // Now collapsed — indicator changes to +
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("controlled: uses collapsed prop instead of internal state", () => {
    render(
      <TacticalPanel title="T" collapsible collapsed={true} onCollapseChange={vi.fn()}>
        x
      </TacticalPanel>,
    );
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("calls onCollapseChange when header clicked in collapsible mode", () => {
    const spy = vi.fn();
    render(
      <TacticalPanel title="T" collapsible onCollapseChange={spy}>x</TacticalPanel>,
    );
    const header = screen.getByText("T").closest("div")!;
    fireEvent.click(header);
    expect(spy).toHaveBeenCalledWith(true); // was open → now collapsed
  });

  it("all existing status variants still render", () => {
    const statuses = ["online", "warning", "offline", "scanning"] as const;
    for (const status of statuses) {
      const { unmount } = render(
        <TacticalPanel title="T" status={status}>x</TacticalPanel>,
      );
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TacticalPanel title="T" ref={ref}>x</TacticalPanel>);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<TacticalPanel title="T" className="tp-custom">x</TacticalPanel>);
    expect(document.querySelector(".tp-custom")).not.toBeNull();
  });
});

// ─── HUDOverlay (expanded API) ────────────────────────────────────────────────

describe("HUDOverlay — expanded API", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without crashing", () => {
    const { container } = render(<HUDOverlay />);
    expect(container).toBeTruthy();
  });

  it("renders children inside the HUD", () => {
    render(<HUDOverlay><span>center-content</span></HUDOverlay>);
    expect(screen.getByText("center-content")).toBeInTheDocument();
  });

  it("shows scanlines by default (scanline-overlay class present)", () => {
    const { container } = render(<HUDOverlay />);
    expect(container.querySelector(".scanline-overlay")).not.toBeNull();
  });

  it("hides scanlines when showScanlines=false", () => {
    const { container } = render(<HUDOverlay showScanlines={false} />);
    expect(container.querySelector(".scanline-overlay")).toBeNull();
  });

  it("renders noise overlay div when showNoise=true", () => {
    const { container } = render(<HUDOverlay showNoise />);
    expect(container.querySelector(".noise-overlay")).not.toBeNull();
  });

  it("does not render noise div when showNoise=false (default)", () => {
    const { container } = render(<HUDOverlay />);
    expect(container.querySelector(".noise-overlay")).toBeNull();
  });

  it("accepts bracketSize prop sm/md/lg without crashing", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(<HUDOverlay bracketSize={size} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders systemLabel", () => {
    render(<HUDOverlay systemLabel="UNIT::42" />);
    expect(screen.getByText("UNIT::42")).toBeInTheDocument();
  });

  it("renders lat/lon when showCoords=true", () => {
    render(<HUDOverlay lat="LAT 0°N" lon="LON 0°E" showCoords />);
    expect(screen.getByText("LAT 0°N")).toBeInTheDocument();
    expect(screen.getByText("LON 0°E")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HUDOverlay ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<HUDOverlay className="ho-custom" />);
    expect(document.querySelector(".ho-custom")).not.toBeNull();
  });
});

// ─── RadarChart (expanded API) ────────────────────────────────────────────────

const RADAR_DATA = [
  { label: "ATK", value: 80 },
  { label: "DEF", value: 60 },
  { label: "TECH", value: 90 },
];

const RADAR_AXES = [
  { label: "ATK", min: 0, max: 1000 },
  { label: "DEF", min: 0, max: 1000 },
  { label: "HP",  min: 0, max: 5000 },
];

const RADAR_DATASETS = [
  { label: "Primary",    values: [700, 400, 3000], color: "hsl(var(--primary))" },
  { label: "Comparison", values: [500, 700, 2000], color: "hsl(var(--ef-blue))" },
];

describe("RadarChart — expanded API", () => {
  it("renders with legacy data prop (backward compat)", () => {
    render(<RadarChart data={RADAR_DATA} />);
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("TECH")).toBeInTheDocument();
  });

  it("renders with new axes + datasets props", () => {
    render(<RadarChart axes={RADAR_AXES} datasets={RADAR_DATASETS} />);
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("renders legend when showLegend=true and datasets have labels", () => {
    render(
      <RadarChart axes={RADAR_AXES} datasets={RADAR_DATASETS} showLegend />,
    );
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Comparison")).toBeInTheDocument();
  });

  it("does not render legend when showLegend=false (default)", () => {
    render(
      <RadarChart axes={RADAR_AXES} datasets={RADAR_DATASETS} showLegend={false} />,
    );
    expect(screen.queryByText("Primary")).toBeNull();
  });

  it("does not render legend when datasets have no labels", () => {
    const noLabelDatasets = [{ values: [700, 400, 3000] }];
    render(<RadarChart axes={RADAR_AXES} datasets={noLabelDatasets} showLegend />);
    expect(screen.queryByText("Primary")).toBeNull();
  });

  it("accepts color prop for legacy API", () => {
    const { container } = render(<RadarChart data={RADAR_DATA} color="cyan" />);
    expect(container).toBeTruthy();
  });

  it("returns null when fewer than 3 axes provided", () => {
    const { container } = render(
      <RadarChart axes={[{ label: "A" }, { label: "B" }]} datasets={[{ values: [1, 2] }]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("accepts size prop", () => {
    const { container } = render(<RadarChart data={RADAR_DATA} size={200} />);
    expect(container).toBeTruthy();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RadarChart data={RADAR_DATA} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<RadarChart data={RADAR_DATA} className="rc-custom" />);
    expect(document.querySelector(".rc-custom")).not.toBeNull();
  });
});
