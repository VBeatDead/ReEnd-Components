import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  SkeletonLine,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "../skeleton";

// ─── SkeletonLine ─────────────────────────────────────────────────────────────

describe("SkeletonLine", () => {
  it("renders without crashing", () => {
    const { container } = render(<SkeletonLine />);
    expect(container.firstChild).toBeTruthy();
  });

  it("has aria-hidden=true (decorative)", () => {
    const { container } = render(<SkeletonLine />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });

  it("applies animate-skeleton class", () => {
    const { container } = render(<SkeletonLine />);
    expect((container.firstChild as HTMLElement).className).toContain("animate-skeleton");
  });

  it("applies width variant classes", () => {
    const widths = ["full", "3/4", "1/2", "1/3", "1/4"] as const;
    for (const width of widths) {
      const { container } = render(<SkeletonLine width={width} />);
      expect(container).toBeTruthy();
    }
  });

  it("applies height variant classes", () => {
    const heights = ["xs", "sm", "md", "lg"] as const;
    for (const height of heights) {
      const { container } = render(<SkeletonLine height={height} />);
      expect(container).toBeTruthy();
    }
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SkeletonLine ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<SkeletonLine className="sl-custom" />);
    expect(document.querySelector(".sl-custom")).not.toBeNull();
  });
});

// ─── SkeletonText ─────────────────────────────────────────────────────────────

describe("SkeletonText", () => {
  it("renders default 3 lines", () => {
    const { container } = render(<SkeletonText />);
    // SkeletonText renders N SkeletonLine divs inside a wrapper
    const lines = container.querySelectorAll(".animate-skeleton");
    expect(lines).toHaveLength(3);
  });

  it("renders specified number of lines", () => {
    const { container } = render(<SkeletonText lines={5} />);
    const lines = container.querySelectorAll(".animate-skeleton");
    expect(lines).toHaveLength(5);
  });

  it("has aria-hidden=true", () => {
    const { container } = render(<SkeletonText />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SkeletonText ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className to wrapper", () => {
    render(<SkeletonText className="st-custom" />);
    expect(document.querySelector(".st-custom")).not.toBeNull();
  });
});

// ─── SkeletonAvatar ───────────────────────────────────────────────────────────

describe("SkeletonAvatar", () => {
  it("renders without crashing", () => {
    const { container } = render(<SkeletonAvatar />);
    expect(container.firstChild).toBeTruthy();
  });

  it("has aria-hidden=true", () => {
    const { container } = render(<SkeletonAvatar />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SkeletonAvatar size={size} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("applies clip-corner-sm class", () => {
    const { container } = render(<SkeletonAvatar />);
    expect((container.firstChild as HTMLElement).className).toContain("clip-corner-sm");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SkeletonAvatar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<SkeletonAvatar className="sa-custom" />);
    expect(document.querySelector(".sa-custom")).not.toBeNull();
  });
});

// ─── SkeletonCard ─────────────────────────────────────────────────────────────

describe("SkeletonCard", () => {
  it("renders without crashing", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toBeTruthy();
  });

  it("has aria-hidden=true", () => {
    const { container } = render(<SkeletonCard />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });

  it("renders multiple skeleton lines inside", () => {
    const { container } = render(<SkeletonCard lines={3} />);
    const lines = container.querySelectorAll(".animate-skeleton");
    expect(lines.length).toBeGreaterThan(0);
  });

  it("shows avatar skeleton when showAvatar=true", () => {
    const { container } = render(<SkeletonCard showAvatar />);
    // SkeletonAvatar renders with clip-corner-sm
    expect(container.querySelector(".clip-corner-sm")).not.toBeNull();
  });

  it("does not render avatar skeleton when showAvatar=false (default)", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector(".clip-corner-sm")).toBeNull();
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SkeletonCard ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(<SkeletonCard className="sc-custom" />);
    expect(document.querySelector(".sc-custom")).not.toBeNull();
  });
});
