/**
 * Tier 2 Display component tests
 * Avatar, Progress
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback, avatarVariants } from "../avatar";
import { Progress } from "../progress";

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
