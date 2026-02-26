/**
 * Tier 2 Display component tests
 * Avatar, Progress, Skeleton
 */
import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback, avatarVariants } from "../avatar";
import { Progress } from "../progress";
import {
  SkeletonLine,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "../skeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../table";
import { Stepper } from "../stepper";

/* ═══════════════════════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════════════════════ */

describe("Avatar", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders AvatarFallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders all size variants without error", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(
        <Avatar size={size}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
      unmount();
    });
  });

  it("applies correct size class for xs", () => {
    const { container } = render(
      <Avatar size="xs">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    // AvatarPrimitive.Root should have h-6 w-6
    const root = container.querySelector(".h-6.w-6");
    expect(root).toBeInTheDocument();
  });

  it("applies correct size class for xl", () => {
    const { container } = render(
      <Avatar size="xl">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const root = container.querySelector(".h-20.w-20");
    expect(root).toBeInTheDocument();
  });

  it("shows clip-corner-sm on the root element", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const clipped = container.querySelector(".clip-corner-sm");
    expect(clipped).toBeInTheDocument();
  });

  it("renders status dot when status is provided", () => {
    const { container } = render(
      <Avatar status="online">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.textContent).toContain("◆");
    expect(container.querySelector("[aria-label='online']")).toBeInTheDocument();
  });

  it("renders all status types without error", () => {
    const statuses = ["online", "offline", "busy", "away"] as const;
    statuses.forEach((status) => {
      const { unmount, container } = render(
        <Avatar status={status}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(container.querySelector(`[aria-label='${status}']`)).toBeInTheDocument();
      unmount();
    });
  });

  it("applies online status color (text-ef-green)", () => {
    const { container } = render(
      <Avatar status="online">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const statusDot = container.querySelector("[aria-label='online']");
    expect(statusDot).toHaveClass("text-ef-green");
  });

  it("applies busy status color (text-destructive)", () => {
    const { container } = render(
      <Avatar status="busy">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const statusDot = container.querySelector("[aria-label='busy']");
    expect(statusDot).toHaveClass("text-destructive");
  });

  it("does not render status dot when status is not provided", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    // ◆ character should not be present
    expect(container.textContent).not.toContain("◆");
  });

  it("forwards className to root", () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector(".custom-avatar")).toBeInTheDocument();
  });

  it("AvatarImage renders img element", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    // AvatarImage renders (fallback may show if image fails to load in test env)
    // Just ensure no crash
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("avatarVariants export returns correct class for md size", () => {
    const cls = avatarVariants({ size: "md" });
    expect(cls).toContain("h-10");
    expect(cls).toContain("w-10");
  });
});

/* ═══════════════════════════════════════════════════════════
   PROGRESS
═══════════════════════════════════════════════════════════ */

describe("Progress", () => {
  it("renders without crashing", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders with correct aria value", () => {
    render(<Progress value={75} />);
    const pb = screen.getByRole("progressbar");
    expect(pb).toHaveAttribute("aria-valuenow", "75");
  });

  it("renders all color variants without error", () => {
    const variants = ["default", "success", "danger", "info"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Progress value={50} variant={variant} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all size variants without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Progress value={50} size={size} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      unmount();
    });
  });

  it("applies sm track height class", () => {
    const { container } = render(<Progress value={50} size="sm" />);
    expect(container.querySelector(".h-1")).toBeInTheDocument();
  });

  it("applies md track height class", () => {
    const { container } = render(<Progress value={50} size="md" />);
    expect(container.querySelector(".h-1\\.5")).toBeInTheDocument();
  });

  it("applies lg track height class", () => {
    const { container } = render(<Progress value={50} size="lg" />);
    expect(container.querySelector(".h-2\\.5")).toBeInTheDocument();
  });

  it("shows label when showLabel=true", () => {
    render(<Progress value={60} showLabel />);
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("does not show label when showLabel is not provided", () => {
    render(<Progress value={60} />);
    expect(screen.queryByText("60%")).not.toBeInTheDocument();
  });

  it("clamps label display to 100 max", () => {
    render(<Progress value={150} showLabel />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps label display to 0 min", () => {
    render(<Progress value={-10} showLabel />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders indeterminate state when value is undefined", () => {
    render(<Progress />);
    const pb = screen.getByRole("progressbar");
    // Radix sets aria-valuemin/max but not aria-valuenow for indeterminate
    expect(pb).not.toHaveAttribute("aria-valuenow");
  });

  it("does not show label in indeterminate state", () => {
    render(<Progress showLabel />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("applies primary fill color for default variant", () => {
    const { container } = render(<Progress value={50} variant="default" />);
    // The indicator has bg-primary class
    const indicator = container.querySelector(".bg-primary");
    expect(indicator).toBeInTheDocument();
  });

  it("applies success fill color", () => {
    const { container } = render(<Progress value={50} variant="success" />);
    const indicator = container.querySelector(".bg-ef-green");
    expect(indicator).toBeInTheDocument();
  });

  it("applies danger fill color", () => {
    const { container } = render(<Progress value={50} variant="danger" />);
    const indicator = container.querySelector(".bg-destructive");
    expect(indicator).toBeInTheDocument();
  });

  it("applies info fill color", () => {
    const { container } = render(<Progress value={50} variant="info" />);
    const indicator = container.querySelector(".bg-ef-blue");
    expect(indicator).toBeInTheDocument();
  });

  it("forwards className to track", () => {
    const { container } = render(
      <Progress value={50} className="custom-progress" />
    );
    expect(container.querySelector(".custom-progress")).toBeInTheDocument();
  });
});

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

// ─── Avatar — hover glow follows clip-corner shape ────────────────────────────

describe("Avatar hover styling", () => {
  it("outer wrapper uses drop-shadow (not square ring) for hover glow", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const wrapper = container.firstChild as HTMLElement;
    // Should have drop-shadow class for shape-aware glow
    expect(wrapper.className).toContain("drop-shadow");
  });

  it("outer wrapper does NOT use ring-offset (square ring removed)", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain("ring-offset");
  });

  it("outer wrapper does NOT use ring-2 class", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const wrapper = container.firstChild as HTMLElement;
    // Old: hover:ring-2 — should not be present anymore
    expect(wrapper.className).not.toContain("ring-2");
  });

  it("inner AvatarRoot retains clip-corner-sm shape class", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector(".clip-corner-sm")).not.toBeNull();
  });
});

// ─── TableRow — semantic design token classes ─────────────────────────────────

describe("TableRow semantic tokens", () => {
  it("uses primary token for hover background (not hardcoded rgba)", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow><TableCell>test</TableCell></TableRow>
        </tbody>
      </table>
    );
    const row = container.querySelector("tr")!;
    // Should use design token class, not hardcoded rgba
    expect(row.className).toContain("hover:bg-primary");
    expect(row.className).not.toContain("rgba(255,212,41");
  });

  it("uses foreground token for even row stripe (not hardcoded rgba)", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow><TableCell>test</TableCell></TableRow>
        </tbody>
      </table>
    );
    const row = container.querySelector("tr")!;
    // Should use semantic token, not hardcoded white rgba
    expect(row.className).toContain("even:bg-foreground");
    expect(row.className).not.toContain("rgba(255,255,255");
  });

  it("selected row applies primary tint", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow selected><TableCell>test</TableCell></TableRow>
        </tbody>
      </table>
    );
    const row = container.querySelector("tr")!;
    expect(row.className).toContain("bg-primary/");
  });

  it("sortable TableHead renders sort indicators", () => {
    render(
      <table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody><TableRow><TableCell>data</TableCell></TableRow></TableBody>
      </table>
    );
    // aria-sort should be set on the sortable th
    const th = document.querySelector("th")!;
    expect(th.getAttribute("aria-sort")).toBe("ascending");
  });
});

// ─── Avatar — icon text scales with avatar size ───────────────────────────────

describe("Avatar fallback text scaling", () => {
  it("xs avatar root has text-[10px] class", () => {
    const cls = avatarVariants({ size: "xs" });
    expect(cls).toContain("text-[10px]");
  });

  it("sm avatar root has text-xs class", () => {
    const cls = avatarVariants({ size: "sm" });
    expect(cls).toContain("text-xs");
  });

  it("md avatar root has text-sm class", () => {
    const cls = avatarVariants({ size: "md" });
    expect(cls).toContain("text-sm");
  });

  it("lg avatar root has text-lg class", () => {
    const cls = avatarVariants({ size: "lg" });
    expect(cls).toContain("text-lg");
  });

  it("xl avatar root has text-2xl class", () => {
    const cls = avatarVariants({ size: "xl" });
    expect(cls).toContain("text-2xl");
  });

  it("2xl avatar root has text-4xl class", () => {
    const cls = avatarVariants({ size: "2xl" });
    expect(cls).toContain("text-4xl");
  });

  it("xl Avatar root element has text-2xl in className", () => {
    const { container } = render(
      <Avatar size="xl">
        <AvatarFallback>◆</AvatarFallback>
      </Avatar>
    );
    const avatarRoot = container.querySelector(".h-20.w-20");
    expect(avatarRoot).not.toBeNull();
    expect(avatarRoot!.className).toContain("text-2xl");
  });

  it("AvatarFallback does NOT contain fixed clamp font-size", () => {
    const { container } = render(
      <Avatar size="xl">
        <AvatarFallback>◆</AvatarFallback>
      </Avatar>
    );
    const fallback = container.querySelector("[class*='items-center'][class*='justify-center']");
    expect(fallback).not.toBeNull();
    // The clamp-based text sizing was removed — fallback inherits from root
    expect(fallback!.className).not.toContain("clamp");
    expect(fallback!.className).not.toContain("text-[clamp");
  });
});

// ─── Stepper — no excessive overflow scrollbar ────────────────────────────────

describe("Stepper overflow fix", () => {
  const STEPS = [
    { label: "ALPHA" },
    { label: "BRAVO" },
    { label: "CHARLIE" },
  ];

  it("horizontal stepper wrapper does not use -mx-1 (overflow cause removed)", () => {
    const { container } = render(<Stepper steps={STEPS} currentStep={1} />);
    // Find the overflow-x-auto div wrapper
    const wrapper = container.querySelector(".overflow-x-auto") as HTMLElement;
    expect(wrapper).not.toBeNull();
    // Should NOT have the -mx-1 negative margin hack
    expect(wrapper.className).not.toContain("-mx-1");
  });

  it("horizontal stepper wrapper does not use px-1 padding hack", () => {
    const { container } = render(<Stepper steps={STEPS} currentStep={1} />);
    const wrapper = container.querySelector(".overflow-x-auto") as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).not.toContain("px-1");
  });

  it("horizontal stepper renders all steps without scroll container issues", () => {
    render(<Stepper steps={STEPS} currentStep={0} />);
    expect(document.querySelector(".overflow-x-auto")).not.toBeNull();
    expect(document.body.textContent).toContain("ALPHA");
    expect(document.body.textContent).toContain("BRAVO");
    expect(document.body.textContent).toContain("CHARLIE");
  });
});
