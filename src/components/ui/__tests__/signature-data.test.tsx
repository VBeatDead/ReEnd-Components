import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { TacticalTable } from "../signature/tactical-table";
import type { TacticalTableColumn } from "../signature/tactical-table";

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
