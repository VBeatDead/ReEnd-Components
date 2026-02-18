import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Crosshair } from "lucide-react";

import { CoordinateTag } from "./coordinate-tag";
import { DataStream } from "./data-stream";
import { DiamondLoader } from "./diamond-loader";
import { GlitchText } from "./glitch-text";
import { HoloCard } from "./holo-card";
import { HUDOverlay } from "./hud-overlay";
import { RadarChart } from "./radar-chart";
import { ScanDivider } from "./scan-divider";
import { TacticalBadge } from "./tactical-badge";
import { TacticalPanel } from "./tactical-panel";
import { WarningBanner } from "./warning-banner";

// ─── CoordinateTag ──────────────────────────────────────────────────────────

describe("CoordinateTag", () => {
  it("renders label and value", () => {
    render(<CoordinateTag label="LAT" value="37.77°N" />);
    expect(screen.getByText("LAT")).toBeInTheDocument();
    expect(screen.getByText("37.77°N")).toBeInTheDocument();
  });

  it("renders optional unit", () => {
    render(<CoordinateTag label="ALT" value="1024" unit="m" />);
    expect(screen.getByText("m")).toBeInTheDocument();
  });

  it("does not render unit element when omitted", () => {
    render(<CoordinateTag label="X" value="0" />);
    const el = document.querySelector("[class*=pr-2]");
    // unit span should not exist
    expect(screen.queryByText("m")).toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CoordinateTag label="REF" value="test" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<CoordinateTag label="X" value="0" className="my-custom" />);
    const el = document.querySelector(".my-custom");
    expect(el).not.toBeNull();
  });
});

// ─── DataStream ─────────────────────────────────────────────────────────────

describe("DataStream", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without crashing", () => {
    const { container } = render(<DataStream />);
    expect(container).toBeTruthy();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DataStream ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("accepts custom messages prop", () => {
    const { container } = render(
      <DataStream messages={["[SYS] Custom message"]} />,
    );
    expect(container).toBeTruthy();
  });

  it("applies custom className", () => {
    render(<DataStream className="stream-custom" />);
    const el = document.querySelector(".stream-custom");
    expect(el).not.toBeNull();
  });
});

// ─── DiamondLoader ──────────────────────────────────────────────────────────

describe("DiamondLoader", () => {
  it("renders without crashing", () => {
    const { container } = render(<DiamondLoader />);
    expect(container).toBeTruthy();
  });

  it("renders label text when provided", () => {
    render(<DiamondLoader label="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders without label when omitted", () => {
    render(<DiamondLoader />);
    expect(screen.queryByText("Loading...")).toBeNull();
  });

  it("accepts size prop: sm, md, lg", () => {
    const { rerender } = render(<DiamondLoader size="sm" />);
    expect(document.querySelector("div[class*=flex]")).not.toBeNull();
    rerender(<DiamondLoader size="lg" />);
    expect(document.querySelector("div[class*=flex]")).not.toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DiamondLoader ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

// ─── GlitchText ─────────────────────────────────────────────────────────────

describe("GlitchText", () => {
  it("renders the children text", () => {
    render(<GlitchText>ENDFIELD</GlitchText>);
    // Text appears in multiple spans (visible + aria-hidden glitch layers)
    const matches = screen.getAllByText("ENDFIELD");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("forwards ref to root span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<GlitchText ref={ref}>REF</GlitchText>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<GlitchText className="glitch-custom">TEST</GlitchText>);
    const el = document.querySelector(".glitch-custom");
    expect(el).not.toBeNull();
  });
});

// ─── HoloCard ───────────────────────────────────────────────────────────────

describe("HoloCard", () => {
  it("renders title and subtitle", () => {
    render(
      <HoloCard title="Operator" subtitle="ENDFIELD Unit" icon={Crosshair} />,
    );
    expect(screen.getByText("Operator")).toBeInTheDocument();
    expect(screen.getByText("ENDFIELD Unit")).toBeInTheDocument();
  });

  it("renders optional value when provided", () => {
    render(
      <HoloCard
        title="Stat"
        subtitle="sub"
        icon={Crosshair}
        value="9999"
      />,
    );
    expect(screen.getByText("9999")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HoloCard title="T" subtitle="S" icon={Crosshair} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(
      <HoloCard
        title="T"
        subtitle="S"
        icon={Crosshair}
        className="holo-custom"
      />,
    );
    expect(document.querySelector(".holo-custom")).not.toBeNull();
  });
});

// ─── HUDOverlay ─────────────────────────────────────────────────────────────

describe("HUDOverlay", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without crashing", () => {
    const { container } = render(<HUDOverlay />);
    expect(container).toBeTruthy();
  });

  it("renders systemLabel", () => {
    render(<HUDOverlay systemLabel="UNIT::01" />);
    expect(screen.getByText("UNIT::01")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<HUDOverlay><span>child-content</span></HUDOverlay>);
    expect(screen.getByText("child-content")).toBeInTheDocument();
  });

  it("renders lat/lon when showCoords=true", () => {
    render(<HUDOverlay lat="LAT 10°N" lon="LON 20°E" showCoords />);
    expect(screen.getByText("LAT 10°N")).toBeInTheDocument();
    expect(screen.getByText("LON 20°E")).toBeInTheDocument();
  });

  it("hides coords when showCoords=false", () => {
    render(<HUDOverlay lat="LAT 10°N" showCoords={false} />);
    expect(screen.queryByText("LAT 10°N")).toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HUDOverlay ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

// ─── RadarChart ─────────────────────────────────────────────────────────────

const RADAR_DATA = [
  { label: "ATK", value: 80 },
  { label: "DEF", value: 60 },
  { label: "TECH", value: 90 },
];

describe("RadarChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<RadarChart data={RADAR_DATA} />);
    expect(container).toBeTruthy();
  });

  it("renders data labels", () => {
    render(<RadarChart data={RADAR_DATA} />);
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("TECH")).toBeInTheDocument();
  });

  it("accepts size prop", () => {
    const { container } = render(<RadarChart data={RADAR_DATA} size={200} />);
    expect(container).toBeTruthy();
  });

  it("accepts color prop", () => {
    const { container } = render(
      <RadarChart data={RADAR_DATA} color="cyan" />,
    );
    expect(container).toBeTruthy();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RadarChart data={RADAR_DATA} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

// ─── ScanDivider ────────────────────────────────────────────────────────────

describe("ScanDivider", () => {
  it("renders without crashing", () => {
    const { container } = render(<ScanDivider />);
    expect(container).toBeTruthy();
  });

  it("renders label text when provided", () => {
    render(<ScanDivider label="SECTION" />);
    expect(screen.getByText(/SECTION/)).toBeInTheDocument();
  });

  it("renders without label element when omitted", () => {
    render(<ScanDivider />);
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ScanDivider ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<ScanDivider className="divider-custom" />);
    expect(document.querySelector(".divider-custom")).not.toBeNull();
  });
});

// ─── TacticalBadge ──────────────────────────────────────────────────────────

describe("TacticalBadge", () => {
  it("renders children", () => {
    render(<TacticalBadge>ALPHA</TacticalBadge>);
    expect(screen.getByText("ALPHA")).toBeInTheDocument();
  });

  it("renders default variant without crashing", () => {
    const { container } = render(<TacticalBadge>OK</TacticalBadge>);
    expect(container).toBeTruthy();
  });

  it("renders all variants", () => {
    const variants = ["default", "success", "warning", "danger", "info"] as const;
    for (const variant of variants) {
      const { container } = render(
        <TacticalBadge variant={variant}>{variant}</TacticalBadge>,
      );
      expect(container).toBeTruthy();
    }
  });

  it("forwards ref to root span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<TacticalBadge ref={ref}>REF</TacticalBadge>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<TacticalBadge className="badge-custom">X</TacticalBadge>);
    expect(document.querySelector(".badge-custom")).not.toBeNull();
  });
});

// ─── TacticalPanel ──────────────────────────────────────────────────────────

describe("TacticalPanel", () => {
  it("renders title", () => {
    render(<TacticalPanel title="MISSION 01">content</TacticalPanel>);
    expect(screen.getByText("MISSION 01")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<TacticalPanel title="T"><span>panel-child</span></TacticalPanel>);
    expect(screen.getByText("panel-child")).toBeInTheDocument();
  });

  it("renders all status variants", () => {
    const statuses = ["online", "warning", "offline", "scanning"] as const;
    for (const status of statuses) {
      const { container } = render(
        <TacticalPanel title="T" status={status}>x</TacticalPanel>,
      );
      expect(container).toBeTruthy();
    }
  });

  it("defaults to online status", () => {
    render(<TacticalPanel title="T">x</TacticalPanel>);
    expect(screen.getByText("ONLINE")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TacticalPanel title="T" ref={ref}>x</TacticalPanel>);
    expect(ref.current).not.toBeNull();
  });
});

// ─── WarningBanner ──────────────────────────────────────────────────────────

describe("WarningBanner", () => {
  it("renders children", () => {
    render(<WarningBanner>Warning message here</WarningBanner>);
    expect(screen.getByText("Warning message here")).toBeInTheDocument();
  });

  it("renders CAUTION level by default", () => {
    render(<WarningBanner>msg</WarningBanner>);
    expect(screen.getByText("CAUTION")).toBeInTheDocument();
  });

  it("renders all warning levels", () => {
    const levels = ["caution", "alert", "critical"] as const;
    for (const level of levels) {
      const { unmount } = render(
        <WarningBanner level={level}>msg</WarningBanner>,
      );
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("shows CRITICAL label for critical level", () => {
    render(<WarningBanner level="critical">danger</WarningBanner>);
    expect(screen.getByText("CRITICAL")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<WarningBanner ref={ref}>msg</WarningBanner>);
    expect(ref.current).not.toBeNull();
  });
});
