import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { SpoilerBlock, SpoilerInline } from "../spoiler-block";
import { ThemeSwitcher } from "../theme-switcher";

// ════════════════════════════════════════════════════════════════════════════
// SpoilerBlock
// ════════════════════════════════════════════════════════════════════════════

describe("SpoilerBlock", () => {
  it("renders children in hidden state", () => {
    render(
      <SpoilerBlock>
        <p>Secret info</p>
      </SpoilerBlock>,
    );
    expect(screen.getByText("Secret info")).toBeInTheDocument();
  });

  it("renders SPOILER header", () => {
    render(
      <SpoilerBlock>
        <p>Content</p>
      </SpoilerBlock>,
    );
    expect(screen.getByText(/SPOILER/)).toBeInTheDocument();
  });

  it('renders reveal button with default label "REVEAL CONTENT"', () => {
    render(
      <SpoilerBlock>
        <p>Content</p>
      </SpoilerBlock>,
    );
    expect(
      screen.getByRole("button", { name: "REVEAL CONTENT" }),
    ).toBeInTheDocument();
  });

  it("reveals content when reveal button is clicked (overlay disappears)", () => {
    render(
      <SpoilerBlock>
        <p>Content</p>
      </SpoilerBlock>,
    );
    fireEvent.click(screen.getByRole("button", { name: "REVEAL CONTENT" }));
    expect(
      screen.queryByRole("button", { name: "REVEAL CONTENT" }),
    ).not.toBeInTheDocument();
  });

  it("hides content again when HIDE button is clicked", () => {
    render(
      <SpoilerBlock>
        <p>Content</p>
      </SpoilerBlock>,
    );
    // Reveal first
    fireEvent.click(screen.getByRole("button", { name: "REVEAL CONTENT" }));
    // Then hide
    fireEvent.click(screen.getByRole("button", { name: "HIDE" }));
    // Overlay should be back
    expect(
      screen.getByRole("button", { name: "REVEAL CONTENT" }),
    ).toBeInTheDocument();
  });

  it("defaultRevealed=true shows content immediately (no overlay)", () => {
    render(
      <SpoilerBlock defaultRevealed>
        <p>Content</p>
      </SpoilerBlock>,
    );
    expect(
      screen.queryByRole("button", { name: "REVEAL CONTENT" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "HIDE" })).toBeInTheDocument();
  });

  it("custom title shows in header", () => {
    render(
      <SpoilerBlock title="Major Plot Spoiler">
        <p>Content</p>
      </SpoilerBlock>,
    );
    expect(screen.getByText(/Major Plot Spoiler/)).toBeInTheDocument();
  });

  it("custom revealLabel shown on button", () => {
    render(
      <SpoilerBlock revealLabel="SHOW ME">
        <p>Content</p>
      </SpoilerBlock>,
    );
    expect(
      screen.getByRole("button", { name: "SHOW ME" }),
    ).toBeInTheDocument();
  });

  it("aria-expanded is false when hidden, true when revealed", () => {
    const { container } = render(
      <SpoilerBlock>
        <p>Content</p>
      </SpoilerBlock>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(screen.getByRole("button", { name: "REVEAL CONTENT" }));
    expect(wrapper.getAttribute("aria-expanded")).toBe("true");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// SpoilerInline
// ════════════════════════════════════════════════════════════════════════════

describe("SpoilerInline", () => {
  it("renders with spoiler class", () => {
    render(<SpoilerInline>secret</SpoilerInline>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("spoiler");
  });

  it("sets data-revealed after click", () => {
    render(<SpoilerInline>secret</SpoilerInline>);
    const el = screen.getByRole("button");
    expect(el).not.toHaveAttribute("data-revealed");
    fireEvent.click(el);
    expect(el).toHaveAttribute("data-revealed", "true");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// ThemeSwitcher
// ════════════════════════════════════════════════════════════════════════════

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light");
  });

  it("renders with Sun icon initially (dark mode default)", () => {
    render(<ThemeSwitcher />);
    // In dark mode, shows Sun to allow switching to light
    const btn = screen.getByRole("button");
    expect(btn.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });

  it('has aria-label "Switch to light mode"', () => {
    render(<ThemeSwitcher />);
    expect(
      screen.getByLabelText("Switch to light mode"),
    ).toBeInTheDocument();
  });

  it("toggles light class on documentElement when clicked", () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it('stores "light" in localStorage when switched to light mode', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("ef-theme")).toBe("light");
  });

  it("renders Moon icon after switching to light mode", () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    // In light mode, shows Moon to allow switching to dark
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
    const btn = screen.getByRole("button");
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("reads initial state from localStorage", () => {
    localStorage.setItem("ef-theme", "light");
    render(<ThemeSwitcher />);
    // After useEffect runs, the component should reflect "light"
    expect(
      screen.getByLabelText("Switch to dark mode"),
    ).toBeInTheDocument();
  });
});
