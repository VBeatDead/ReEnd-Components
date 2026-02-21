import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Crosshair } from "lucide-react";

import { CoordinateTag } from "../signature/coordinate-tag";
import { DiamondLoader } from "../signature/diamond-loader";
import { HoloCard } from "../signature/holo-card";
import { ScanDivider } from "../signature/scan-divider";
import { TacticalBadge } from "../signature/tactical-badge";
import { WarningBanner } from "../signature/warning-banner";

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
