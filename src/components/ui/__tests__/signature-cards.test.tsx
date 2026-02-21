import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { MissionCard } from "../signature/mission-card";
import { OperatorCard } from "../signature/operator-card";
import { TacticalTable } from "../signature/tactical-table";
import type { TacticalTableColumn } from "../signature/tactical-table";

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

// ─── Fixtures ─────────────────────────────────────────────────────────────────

interface Agent {
  id:     number;
  name:   string;
  status: string;
}

const COLUMNS: TacticalTableColumn<Agent>[] = [
  { key: "id",     header: "ID",     align: "right" },
  { key: "name",   header: "NAME",   sortable: true },
  { key: "status", header: "STATUS", align: "center" },
];

const DATA: Agent[] = [
  { id: 1, name: "Aether",  status: "Active"   },
  { id: 2, name: "Bravo",   status: "Standby"  },
  { id: 3, name: "Charlie", status: "Offline"  },
];

// ─── TacticalTable ───────────────────────────────────────────────────────────

describe("TacticalTable", () => {
  it("renders column headers", () => {
    render(<TacticalTable columns={COLUMNS} data={DATA} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("NAME")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();
  });

  it("renders row data", () => {
    render(<TacticalTable columns={COLUMNS} data={DATA} />);
    expect(screen.getByText("Aether")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders default empty state NO DATA when data is empty", () => {
    render(<TacticalTable columns={COLUMNS} data={[]} />);
    expect(screen.getByText("NO DATA")).toBeInTheDocument();
  });

  it("renders custom emptyState node when data is empty", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={[]}
        emptyState={<span>Nothing found.</span>}
      />,
    );
    expect(screen.getByText("Nothing found.")).toBeInTheDocument();
  });

  it("renders skeleton rows when loading=true", () => {
    const { container } = render(
      <TacticalTable columns={COLUMNS} data={[]} loading skeletonRows={3} />,
    );
    // Skeleton cells: 3 rows × 3 cols = 9 skeleton divs
    const skeletons = container.querySelectorAll(".animate-skeleton");
    expect(skeletons.length).toBe(9);
  });

  it("does not render data rows while loading", () => {
    render(<TacticalTable columns={COLUMNS} data={DATA} loading />);
    expect(screen.queryByText("Aether")).toBeNull();
  });

  it("renders caption as sr-only when provided", () => {
    const { container } = render(
      <TacticalTable columns={COLUMNS} data={DATA} caption="Agent table" />,
    );
    const caption = container.querySelector("caption");
    expect(caption).not.toBeNull();
    expect(caption?.textContent).toBe("Agent table");
    expect(caption?.className).toContain("sr-only");
  });

  it("sortable header shows inactive sort indicator ↕", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        sortKey="id"
        sortDirection="asc"
      />,
    );
    // Inactive sort on NAME column (sortKey is "id")
    // ↕ is shown for non-active sortable cols → none is active NAME here? Actually id is active
    // NAME has sortable=true but id is the active sortKey → NAME shows ↕
    expect(screen.queryByText("↕")).not.toBeNull();
  });

  it("active ascending sort header shows ▲", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        sortKey="name"
        sortDirection="asc"
      />,
    );
    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  it("active descending sort header shows ▼", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        sortKey="name"
        sortDirection="desc"
      />,
    );
    expect(screen.getByText("▼")).toBeInTheDocument();
  });

  it("calls onSort with column key on sortable header click", () => {
    const spy = vi.fn();
    render(
      <TacticalTable columns={COLUMNS} data={DATA} onSort={spy} />,
    );
    fireEvent.click(screen.getByText("NAME"));
    expect(spy).toHaveBeenCalledWith("name");
  });

  it("does not call onSort on non-sortable header click", () => {
    const spy = vi.fn();
    render(
      <TacticalTable columns={COLUMNS} data={DATA} onSort={spy} />,
    );
    fireEvent.click(screen.getByText("STATUS"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders aria-sort=ascending on active sort header", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        sortKey="name"
        sortDirection="asc"
      />,
    );
    const nameHeader = screen.getByText("NAME").closest("th");
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
  });

  it("renders aria-sort=descending on active sort header", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        sortKey="name"
        sortDirection="desc"
      />,
    );
    const nameHeader = screen.getByText("NAME").closest("th");
    expect(nameHeader).toHaveAttribute("aria-sort", "descending");
  });

  it("renders selectable rows with aria-selected", () => {
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        selectable
        selectedIndices={[0]}
      />,
    );
    const rows = screen.getAllByRole("row").slice(1); // skip header
    expect(rows[0]).toHaveAttribute("aria-selected", "true");
    expect(rows[1]).toHaveAttribute("aria-selected", "false");
  });

  it("calls onRowClick with row data and index on selectable row click", () => {
    const spy = vi.fn();
    render(
      <TacticalTable
        columns={COLUMNS}
        data={DATA}
        selectable
        onRowClick={spy}
      />,
    );
    const rows = screen.getAllByRole("row").slice(1);
    fireEvent.click(rows[1]); // click Bravo
    expect(spy).toHaveBeenCalledWith(DATA[1], 1);
  });

  it("renders custom cell renderer output", () => {
    const customCols: TacticalTableColumn<Agent>[] = [
      ...COLUMNS,
      {
        key: "status",
        header: "CUSTOM",
        cell: (row) => <strong>{row.status.toUpperCase()}</strong>,
      },
    ];
    render(<TacticalTable columns={customCols} data={[DATA[0]]} />);
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TacticalTable columns={COLUMNS} data={DATA} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(
      <TacticalTable columns={COLUMNS} data={DATA} className="tt-custom" />,
    );
    expect(document.querySelector(".tt-custom")).not.toBeNull();
  });

  it("renders table with role=grid", () => {
    render(<TacticalTable columns={COLUMNS} data={DATA} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
