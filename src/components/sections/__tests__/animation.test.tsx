import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInView } from "../../../hooks/use-in-view";
import { useStagger } from "../../../hooks/use-stagger";
import { readFileSync } from "fs";
import { resolve } from "path";

// ════════════════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════════════════

const utilitiesCSS = readFileSync(
  resolve(process.cwd(), "src/styles/utilities.css"),
  "utf-8",
);

// ════════════════════════════════════════════════════════════════════════════
// utilities.css — Animation class existence (NPM distribution contract)
// Ensures dist/lib/style.css will contain all animation classes
// ════════════════════════════════════════════════════════════════════════════

describe("utilities.css animation classes", () => {
  const requiredClasses = [
    ".animate-fade-in",
    ".animate-fade-in-up",
    ".animate-fade-in-down",
    ".animate-slide-in-right",
    ".animate-scale-in",
    ".animate-rotate",
    ".animate-loading-dot",
    ".animate-glitch",
    ".animate-cursor-blink",
    ".animate-pulse-glow",
    ".animate-skeleton",
    ".animate-slide-down",
    ".animate-diamond-spin",
    ".animate-switch-spin",
    ".animate-shrink",
    ".animate-dialog-in",
    ".animate-accordion-down",
    ".animate-accordion-up",
    // New additions
    ".animate-shake",
    ".animate-slide-up",
    ".animate-particle-drift",
  ];

  requiredClasses.forEach((cls) => {
    it(`defines ${cls}`, () => {
      expect(utilitiesCSS).toContain(cls);
    });
  });

  it("defines @keyframes shake", () => {
    expect(utilitiesCSS).toContain("@keyframes shake");
  });

  it("defines @keyframes slideUp", () => {
    expect(utilitiesCSS).toContain("@keyframes slideUp");
  });

  it("defines @keyframes particleDrift", () => {
    expect(utilitiesCSS).toContain("@keyframes particleDrift");
  });

  it("defines reduced-motion override", () => {
    expect(utilitiesCSS).toContain("prefers-reduced-motion: reduce");
    expect(utilitiesCSS).toContain("animation-duration: 0.01ms");
  });

  it("defines view-transition rules (Section 55)", () => {
    expect(utilitiesCSS).toContain("::view-transition-old(root)");
    expect(utilitiesCSS).toContain("::view-transition-new(root)");
  });

  it("animate-shake uses shake keyframe", () => {
    expect(utilitiesCSS).toMatch(/\.animate-shake\s*\{[^}]*animation:\s*shake/);
  });

  it("animate-particle-drift uses particleDrift keyframe", () => {
    expect(utilitiesCSS).toMatch(/\.animate-particle-drift\s*\{[^}]*animation:\s*particleDrift/);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// useInView hook
// ════════════════════════════════════════════════════════════════════════════

describe("useInView", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn((cb: IntersectionObserverCallback) => {
        observerCallback = cb;
        return { observe: observeMock, disconnect: disconnectMock };
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false initially when element not in view", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useInView(ref));
    expect(result.current).toBe(false);
  });

  it("returns true when IntersectionObserver fires isIntersecting=true", () => {
    const el = document.createElement("div");
    const ref = { current: el };
    const { result } = renderHook(() => useInView(ref));

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe(true);
  });

  it("disconnects observer after first intersection when once=true", () => {
    const el = document.createElement("div");
    const ref = { current: el };
    renderHook(() => useInView(ref, { once: true }));

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(disconnectMock).toHaveBeenCalled();
  });

  it("does not disconnect when once=false and stays reactive", () => {
    const el = document.createElement("div");
    const ref = { current: el };
    const { result } = renderHook(() => useInView(ref, { once: false }));

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(result.current).toBe(true);

    act(() => {
      observerCallback(
        [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(result.current).toBe(false);
  });

  it("observes the ref element", () => {
    const el = document.createElement("div");
    const ref = { current: el };
    renderHook(() => useInView(ref));
    expect(observeMock).toHaveBeenCalledWith(el);
  });

  it("uses default threshold of 0.1", () => {
    const ref = { current: document.createElement("div") };
    renderHook(() => useInView(ref));
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 },
    );
  });

  it("uses custom threshold when provided", () => {
    const ref = { current: document.createElement("div") };
    renderHook(() => useInView(ref, { threshold: 0.5 }));
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 },
    );
  });

  it("cleans up observer on unmount", () => {
    const ref = { current: document.createElement("div") };
    const { unmount } = renderHook(() => useInView(ref));
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it("returns false when ref.current is null", () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInView(ref));
    expect(result.current).toBe(false);
    expect(observeMock).not.toHaveBeenCalled();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// useStagger hook
// ════════════════════════════════════════════════════════════════════════════

describe("useStagger", () => {
  it("returns an array of the correct length", () => {
    const { result } = renderHook(() => useStagger(5));
    expect(result.current).toHaveLength(5);
  });

  it("first element is always '0ms'", () => {
    const { result } = renderHook(() => useStagger(3));
    expect(result.current[0]).toBe("0ms");
  });

  it("uses default delay of 100ms", () => {
    const { result } = renderHook(() => useStagger(3));
    expect(result.current).toEqual(["0ms", "100ms", "200ms"]);
  });

  it("uses custom delay", () => {
    const { result } = renderHook(() => useStagger(4, 150));
    expect(result.current).toEqual(["0ms", "150ms", "300ms", "450ms"]);
  });

  it("returns empty array for count=0", () => {
    const { result } = renderHook(() => useStagger(0));
    expect(result.current).toEqual([]);
  });

  it("returns single element for count=1", () => {
    const { result } = renderHook(() => useStagger(1, 200));
    expect(result.current).toEqual(["0ms"]);
  });

  it("each delay string ends with 'ms'", () => {
    const { result } = renderHook(() => useStagger(3));
    result.current.forEach((delay) => {
      expect(delay).toMatch(/^\d+ms$/);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// ParticleField
// ════════════════════════════════════════════════════════════════════════════

// Minimal ParticleField extracted for testing (mirrors the component logic)
const PARTICLE_COUNT = 12;

function TestParticleField({ label }: { label: string }) {
  const particles = React.useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: 10 + ((i * 7) % 80),
        y: 15 + ((i * 13) % 70),
        opacity: 0.3 + (i % 3) * 0.15,
        delay: i * 300,
        duration: 2.5 + (i % 3),
      })),
    [],
  );

  const W = 320;
  const H = 128;
  const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const ax = (particles[i].x / 100) * W;
      const ay = (particles[i].y / 100) * H;
      const bx = (particles[j].x / 100) * W;
      const by = (particles[j].y / 100) * H;
      if (Math.hypot(ax - bx, ay - by) < 100) {
        lines.push({ x1: ax, y1: ay, x2: bx, y2: by, key: `${i}-${j}` });
      }
    }
  }

  return (
    <div data-testid="particle-field" className="relative h-32 bg-surface-0 border border-border overflow-hidden flex items-center justify-center">
      <svg data-testid="particle-svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {lines.map((l) => (
          <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="hsl(var(--foreground))" strokeOpacity="0.12" strokeWidth="0.5"
          />
        ))}
      </svg>
      {particles.map((p, i) => (
        <div
          key={i}
          data-testid="particle"
          className="absolute w-1 h-1 bg-primary animate-particle-drift"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
      <span>{label}</span>
    </div>
  );
}

describe("ParticleField", () => {
  it("renders the label", () => {
    render(<TestParticleField label="AMBIENT PARTICLES" />);
    expect(screen.getByText("AMBIENT PARTICLES")).toBeInTheDocument();
  });

  it(`renders exactly ${PARTICLE_COUNT} particles`, () => {
    render(<TestParticleField label="test" />);
    expect(screen.getAllByTestId("particle")).toHaveLength(PARTICLE_COUNT);
  });

  it("renders an SVG for connection lines", () => {
    render(<TestParticleField label="test" />);
    expect(screen.getByTestId("particle-svg")).toBeInTheDocument();
  });

  it("SVG lines use hsl(var(--foreground)) stroke for theme adaptability", () => {
    const { container } = render(<TestParticleField label="test" />);
    const lines = container.querySelectorAll("line");
    // Not all particle pairs may be within 100px threshold, but if lines exist they use foreground
    if (lines.length > 0) {
      expect(lines[0].getAttribute("stroke")).toBe("hsl(var(--foreground))");
    }
  });

  it("SVG has aria-hidden for screen readers", () => {
    render(<TestParticleField label="test" />);
    expect(screen.getByTestId("particle-svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("particles have animate-particle-drift class for slow drift motion", () => {
    render(<TestParticleField label="test" />);
    const particles = screen.getAllByTestId("particle");
    particles.forEach((p) => {
      expect(p).toHaveClass("animate-particle-drift");
    });
  });

  it("particles have opacity >= 0.3 for light mode visibility", () => {
    render(<TestParticleField label="test" />);
    const particles = screen.getAllByTestId("particle");
    particles.forEach((p) => {
      const opacity = parseFloat(p.style.opacity);
      expect(opacity).toBeGreaterThanOrEqual(0.3);
    });
  });

  it("particles use diamond clip-path", () => {
    render(<TestParticleField label="test" />);
    const particles = screen.getAllByTestId("particle");
    expect(particles[0].style.clipPath).toBe("polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)");
  });

  it("particles have staggered animation delays", () => {
    render(<TestParticleField label="test" />);
    const particles = screen.getAllByTestId("particle");
    const delays = particles.map((p) => p.style.animationDelay);
    // At least some delays should be different (staggered)
    const uniqueDelays = new Set(delays);
    expect(uniqueDelays.size).toBeGreaterThan(1);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Animation Catalog (Section 54 spec completeness)
// ════════════════════════════════════════════════════════════════════════════

describe("Animation catalog completeness", () => {
  // Test that all required Section 54 animate-* classes are defined in utilities.css
  const catalogAnimations = [
    { name: "fadeIn",       cls: "animate-fade-in" },
    { name: "fadeInUp",     cls: "animate-fade-in-up" },
    { name: "fadeInDown",   cls: "animate-fade-in-down" },
    { name: "slideInRight", cls: "animate-slide-in-right" },
    { name: "scaleIn",      cls: "animate-scale-in" },
    { name: "glitch",       cls: "animate-glitch" },
    { name: "cursorBlink",  cls: "animate-cursor-blink" },
    { name: "pulseGlow",    cls: "animate-pulse-glow" },
    { name: "rotate",       cls: "animate-rotate" },
    { name: "skeleton",     cls: "animate-skeleton" },
    { name: "diamondSpin",  cls: "animate-diamond-spin" },
    { name: "loadingDot",   cls: "animate-loading-dot" },
    { name: "shrink",       cls: "animate-shrink" },
  ];

  catalogAnimations.forEach(({ name, cls }) => {
    it(`utilities.css defines .${cls} for ${name} animation`, () => {
      expect(utilitiesCSS).toContain(`.${cls}`);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Page transitions demo
// ════════════════════════════════════════════════════════════════════════════

describe("Page transitions interactive demo", () => {
  it("renders switch button", () => {
    render(
      <button type="button" onClick={vi.fn()}>
        [SWITCH PAGE]
      </button>,
    );
    expect(screen.getByRole("button", { name: "[SWITCH PAGE]" })).toBeInTheDocument();
  });

  it("page state toggles between A and B on button click", () => {
    function Demo() {
      const [page, setPage] = React.useState<"A" | "B">("A");
      return (
        <div>
          <span data-testid="page">{page}</span>
          <button type="button" onClick={() => setPage((p) => (p === "A" ? "B" : "A"))}>
            switch
          </button>
        </div>
      );
    }
    render(<Demo />);
    expect(screen.getByTestId("page")).toHaveTextContent("A");
    fireEvent.click(screen.getByRole("button", { name: "switch" }));
    expect(screen.getByTestId("page")).toHaveTextContent("B");
    fireEvent.click(screen.getByRole("button", { name: "switch" }));
    expect(screen.getByTestId("page")).toHaveTextContent("A");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Scroll-triggered animation (IntersectionObserver integration)
// ════════════════════════════════════════════════════════════════════════════

describe("Scroll-triggered animation", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    observeMock = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn((cb: IntersectionObserverCallback) => {
        observerCallback = cb;
        return { observe: observeMock, disconnect: vi.fn() };
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("animKey increments when element intersects", () => {
    let setAnimKey: (fn: (k: number) => number) => void;

    function Demo() {
      const [animKey, _setAnimKey] = React.useState(0);
      setAnimKey = _setAnimKey;
      const scrollRef = React.useRef<HTMLDivElement>(null);

      React.useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) _setAnimKey((k) => k + 1); },
          { threshold: 0.1 },
        );
        obs.observe(el);
        return () => obs.disconnect();
      }, []);

      return (
        <div>
          <div ref={scrollRef} data-testid="scroll-target" />
          <span data-testid="anim-key">{animKey}</span>
        </div>
      );
    }

    const { getByTestId } = render(<Demo />);
    expect(getByTestId("anim-key")).toHaveTextContent("0");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(getByTestId("anim-key")).toHaveTextContent("1");
  });

  it("stagger items render with staggered animation delays", () => {
    function Demo() {
      return (
        <div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              data-testid="stagger-item"
              className="animate-fade-in-up"
              style={{ animationDelay: `${(i - 1) * 150}ms`, animationFillMode: "both" }}
            />
          ))}
        </div>
      );
    }
    render(<Demo />);
    const items = screen.getAllByTestId("stagger-item");
    expect(items[0].style.animationDelay).toBe("0ms");
    expect(items[1].style.animationDelay).toBe("150ms");
    expect(items[2].style.animationDelay).toBe("300ms");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// OTPInput shake animation (Section 74)
// ════════════════════════════════════════════════════════════════════════════

describe("OTPInput shake animation", () => {
  it("utilities.css has animate-shake for OTP error state", () => {
    expect(utilitiesCSS).toContain(".animate-shake");
  });

  it("shake keyframe uses translateX for horizontal shake", () => {
    expect(utilitiesCSS).toMatch(/@keyframes shake[\s\S]*?translateX/);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Duration scale (timing correctness)
// ════════════════════════════════════════════════════════════════════════════

describe("Duration scale tokens", () => {
  const mainCSS = readFileSync(
    resolve(process.cwd(), "src/styles/variables.css"),
    "utf-8",
  );

  it("defines --duration-instant: 100ms", () => {
    expect(mainCSS).toContain("--duration-instant: 100ms");
  });

  it("defines --duration-fast: 150ms", () => {
    expect(mainCSS).toContain("--duration-fast: 150ms");
  });

  it("defines --duration-normal: 300ms", () => {
    expect(mainCSS).toContain("--duration-normal: 300ms");
  });

  it("defines --duration-slow: 500ms", () => {
    expect(mainCSS).toContain("--duration-slow: 500ms");
  });

  it("defines --duration-slower: 800ms", () => {
    expect(mainCSS).toContain("--duration-slower: 800ms");
  });
});
