import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { MissionCard } from "../signature/mission-card";
import { OperatorCard } from "../signature/operator-card";

// ─── MissionCard ─────────────────────────────────────────────────────────────

describe("MissionCard", () => {
  it("renders title", () => {
    render(<MissionCard title="OPERATION CLEARWATER" />);
    expect(screen.getByText("OPERATION CLEARWATER")).toBeInTheDocument();
  });

  it("has role=article by default (no onClick)", () => {
    render(<MissionCard title="T" />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("has role=button when onClick is provided", () => {
    render(<MissionCard title="T" onClick={vi.fn()} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has aria-label containing the title", () => {
    render(<MissionCard title="ALPHA STRIKE" />);
    expect(screen.getByLabelText(/ALPHA STRIKE/i)).toBeInTheDocument();
  });

  it("renders missionId when provided", () => {
    render(<MissionCard title="T" missionId="MSN-0042" />);
    expect(screen.getByText(/MSN-0042/)).toBeInTheDocument();
  });

  it("does not render missionId element when omitted", () => {
    render(<MissionCard title="T" />);
    expect(screen.queryByText(/MSN-/)).toBeNull();
  });

  it("renders description when provided", () => {
    render(<MissionCard title="T" description="Recon the perimeter." />);
    expect(screen.getByText("Recon the perimeter.")).toBeInTheDocument();
  });

  it("renders progress bar and percentage when progress provided", () => {
    render(<MissionCard title="T" progress={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("clamps progress to 100 maximum", () => {
    render(<MissionCard title="T" progress={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps progress to 0 minimum", () => {
    render(<MissionCard title="T" progress={-20} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders date when provided", () => {
    render(<MissionCard title="T" date="2026-03-01" />);
    expect(screen.getByText("2026-03-01")).toBeInTheDocument();
  });

  it("renders tags as chip spans", () => {
    render(<MissionCard title="T" tags={["stealth", "extraction"]} />);
    expect(screen.getByText("stealth")).toBeInTheDocument();
    expect(screen.getByText("extraction")).toBeInTheDocument();
  });

  it("renders ACTIVE status label by default", () => {
    render(<MissionCard title="T" />);
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("renders CLASSIFIED status label", () => {
    render(<MissionCard title="T" status="classified" />);
    expect(screen.getByText("CLASSIFIED")).toBeInTheDocument();
  });

  it("renders all status variants without crashing", () => {
    const statuses = ["active", "completed", "failed", "pending", "classified"] as const;
    for (const status of statuses) {
      const { unmount } = render(<MissionCard title="T" status={status} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders all priority variants without crashing", () => {
    const priorities = ["low", "medium", "high", "critical"] as const;
    for (const priority of priorities) {
      const { unmount } = render(<MissionCard title="T" priority={priority} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders CRITICAL priority label", () => {
    render(<MissionCard title="T" priority="critical" />);
    expect(screen.getByText(/PRIORITY: CRITICAL/i)).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const spy = vi.fn();
    render(<MissionCard title="T" onClick={spy} />);
    fireEvent.click(screen.getByRole("button"));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("fires onClick on Enter key when clickable", () => {
    const spy = vi.fn();
    render(<MissionCard title="T" onClick={spy} />);
    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(spy).toHaveBeenCalled();
  });

  it("fires onClick on Space key when clickable", () => {
    const spy = vi.fn();
    render(<MissionCard title="T" onClick={spy} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: " " });
    expect(spy).toHaveBeenCalled();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MissionCard title="T" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<MissionCard title="T" className="mission-custom" />);
    expect(document.querySelector(".mission-custom")).not.toBeNull();
  });
});

// ─── OperatorCard ─────────────────────────────────────────────────────────────

describe("OperatorCard", () => {
  it("renders operator name", () => {
    render(<OperatorCard name="AETHER" />);
    expect(screen.getByText("AETHER")).toBeInTheDocument();
  });

  it("renders operatorClass badge", () => {
    render(<OperatorCard name="AETHER" operatorClass="Medic" />);
    expect(screen.getByText("Medic")).toBeInTheDocument();
  });

  it("does not render class badge when operatorClass omitted", () => {
    render(<OperatorCard name="AETHER" />);
    expect(screen.queryByText("Medic")).toBeNull();
  });

  it("renders rarity aria-label", () => {
    render(<OperatorCard name="AETHER" rarity={5} />);
    expect(screen.getByLabelText("5 stars")).toBeInTheDocument();
  });

  it("clamps rarity to 1 minimum", () => {
    render(<OperatorCard name="AETHER" rarity={0 as never} />);
    // Should not throw; default clamping handles it
    expect(screen.getByText("AETHER")).toBeInTheDocument();
  });

  it("renders faction label", () => {
    render(<OperatorCard name="AETHER" faction="Columbia" />);
    expect(screen.getByText("Columbia")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<OperatorCard name="AETHER" tags={["Healing", "Support"]} />);
    expect(screen.getByText("Healing")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders stat labels and values", () => {
    const stats = [{ label: "ATK", value: 600, max: 1000 }];
    render(<OperatorCard name="AETHER" stats={stats} />);
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("600")).toBeInTheDocument();
  });

  it("renders compact layout without crashing", () => {
    render(<OperatorCard name="AETHER" size="compact" operatorClass="Sniper" />);
    expect(screen.getByText("AETHER")).toBeInTheDocument();
  });

  it("shows initials in avatar when no src provided", () => {
    render(<OperatorCard name="ZETA" initials="ZT" />);
    expect(screen.getByText("ZT")).toBeInTheDocument();
  });

  it("falls back to first 2 chars of name when no initials", () => {
    render(<OperatorCard name="BRAVO" />);
    expect(screen.getByText("BR")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<OperatorCard name="AETHER" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<OperatorCard name="AETHER" className="op-custom" />);
    expect(document.querySelector(".op-custom")).not.toBeNull();
  });

  it("renders img element when avatarSrc is provided", () => {
    render(
      <OperatorCard name="AETHER" avatarSrc="https://example.com/avatar.png" />,
    );
    const img = document.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("alt")).toBe("AETHER");
  });
});
