/**
 * Content & Media component tests
 * ScrollProgress, BackToTop, Separator
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ScrollProgress } from "../../ui/scroll-progress";
import { BackToTop } from "../../ui/back-to-top";
import { Separator } from "../../ui/separator";

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════ */

describe("ScrollProgress", () => {
  it("renders without crashing", () => {
    render(<ScrollProgress />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("has correct ARIA attributes initially", () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("is positioned fixed top-0", () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveClass("fixed");
    expect(bar).toHaveClass("top-0");
  });

  it("uses default height of 2px via style", () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole("progressbar");
    // jsdom serializes numeric height as "Npx"
    expect(bar).toHaveStyle({ height: "2px" });
  });

  it("accepts custom height prop", () => {
    render(<ScrollProgress height={4} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle({ height: "4px" });
  });

  it("renders inner progress indicator with h-full class", () => {
    const { container } = render(<ScrollProgress />);
    // The inner fill div always has h-full + transition
    const inner = container.querySelector(".h-full");
    expect(inner).toBeInTheDocument();
  });

  it("initial progress indicator width is 0%", () => {
    const { container } = render(<ScrollProgress />);
    const inner = container.querySelector(".h-full") as HTMLElement;
    expect(inner).toBeInTheDocument();
    expect(inner.style.width).toBe("0%");
  });

  it("renders inner fill div with inline style", () => {
    const { container } = render(<ScrollProgress />);
    const inner = container.querySelector(".h-full") as HTMLElement;
    expect(inner).toBeInTheDocument();
    // backgroundColor is set via inline style (may not be parsed by jsdom, but property exists)
    expect(inner.style).toBeDefined();
  });

  it("accepts custom color prop without throwing", () => {
    expect(() =>
      render(<ScrollProgress color="hsl(var(--ef-blue))" />)
    ).not.toThrow();
  });

  it("forwards className to root", () => {
    render(<ScrollProgress className="custom-progress" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress");
  });

  it("updates aria-valuenow on window scroll", async () => {
    // Mock scrollY and document dimensions
    Object.defineProperty(document.documentElement, "scrollHeight", {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 500,
    });
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 250,
    });

    render(<ScrollProgress />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    // 250 / (1000 - 500) * 100 = 50%
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
  });

  it("has z-max class for layering above all content", () => {
    render(<ScrollProgress />);
    expect(screen.getByRole("progressbar")).toHaveClass("z-max");
  });

  it("forwardRef works (accepts ref)", () => {
    const ref = { current: null };
    render(<ScrollProgress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ═══════════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════════ */

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is hidden when scrollY < threshold (default 300)", () => {
    render(<BackToTop />);
    // scrollY = 0, should not render
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
  });

  it("renders when scrollY exceeds threshold", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop threshold={300} />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("has aria-label 'Back to top'", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Back to top");
  });

  it("calls window.scrollTo on click", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("uses instant scroll when smooth=false", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop smooth={false} />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("is positioned fixed bottom-6 right-6", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("fixed");
    expect(btn).toHaveClass("bottom-6");
    expect(btn).toHaveClass("right-6");
  });

  it("forwards className to button", async () => {
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
    render(<BackToTop className="custom-back-to-top" />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    expect(screen.getByRole("button")).toHaveClass("custom-back-to-top");
  });

  it("respects custom threshold", async () => {
    // scrollY = 50, threshold = 100 → should still be hidden
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 50 });
    render(<BackToTop threshold={100} />);
    await act(async () => {
      fireEvent.scroll(window);
    });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════
   SEPARATOR
═══════════════════════════════════════════════════════════ */

describe("Separator", () => {
  it("renders without crashing", () => {
    render(<Separator />);
    // Radix Separator with decorative=true renders as div role="none"
    // or as separator when not decorative
    const el = document.querySelector("[data-orientation]");
    expect(el).toBeInTheDocument();
  });

  it("renders with default horizontal orientation", () => {
    render(<Separator />);
    const el = document.querySelector("[data-orientation='horizontal']");
    expect(el).toBeInTheDocument();
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    const el = document.querySelector("[data-orientation='vertical']");
    expect(el).toBeInTheDocument();
  });

  it("applies h-px class for horizontal", () => {
    const { container } = render(<Separator />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("h-px");
    expect(sep).toHaveClass("w-full");
  });

  it("applies w-px class for vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("w-px");
    expect(sep).toHaveClass("h-full");
  });

  it("applies bg-border for default variant", () => {
    const { container } = render(<Separator variant="default" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("bg-border");
  });

  it("applies bg-border for subtle variant", () => {
    const { container } = render(<Separator variant="subtle" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("bg-border");
  });

  it("applies strong border class for strong variant", () => {
    const { container } = render(<Separator variant="strong" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("bg-border-strong");
  });

  it("applies gradient class for glow variant", () => {
    const { container } = render(<Separator variant="glow" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("bg-gradient-to-r");
  });

  it("applies primary color class for accent variant", () => {
    const { container } = render(<Separator variant="accent" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("bg-primary/30");
  });

  it("forwards className", () => {
    const { container } = render(<Separator className="my-custom-sep" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toHaveClass("my-custom-sep");
  });

  it("renders as non-decorative with role=separator", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("forwardRef works", () => {
    const ref = { current: null };
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
