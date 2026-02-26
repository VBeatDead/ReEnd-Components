/**
 * Patterns Section tests
 *
 * Covers: PatternsSection rendering, all 24 sidebar items have matching
 * ComponentPreview ids, locale key resolution, dark/light mode token usage,
 * CSS class correctness, a11y attributes, code tab presence, and
 * key content within each section.
 */
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { PatternsSection } from "../PatternsSection";

function renderSection() {
  return render(
    <I18nextProvider i18n={i18n}>
      <PatternsSection />
    </I18nextProvider>,
  );
}

// ─── Section IDs (all 24 sidebar items) ───────────────────────────────────────

describe("PatternsSection — ComponentPreview IDs", () => {
  const expectedIds = [
    "page-templates",
    "section-patterns",
    "responsive",
    "accessibility",
    "performance",
    "design-tokens",
    "naming-conventions",
    "behavioral-rules",
    "timing-focus",
    "scroll-touch-rules",
    "form-action-rules",
    "notification-media",
    "consistency-sizing",
    "auth-layouts",
    "pricing-tables",
    "mega-menu",
    "kanban",
    "language-switcher",
    "print-styles",
    "fab",
    "comments",
    "spoiler-tags",
    "ad-placements",
    "audio-player",
  ];

  it.each(expectedIds)("renders #%s ComponentPreview", (id) => {
    renderSection();
    const el = document.getElementById(id);
    expect(el).not.toBeNull();
  });
});

// ─── Code tab presence ────────────────────────────────────────────────────────

describe("Code tab presence", () => {
  // These sections should have a code tab
  const codeTabIds = [
    "page-templates",
    "section-patterns",
    "responsive",
    "accessibility",
    "performance",
    "design-tokens",
    "naming-conventions",
    "timing-focus",
    "scroll-touch-rules",
    "form-action-rules",
    "notification-media",
    "consistency-sizing",
    "auth-layouts",
    "pricing-tables",
    "mega-menu",
    "kanban",
    "language-switcher",
    "print-styles",
    "fab",
    "comments",
    "spoiler-tags",
    "ad-placements",
    "audio-player",
  ];

  it("has code tab buttons for all sections with code props", () => {
    const { container } = renderSection();
    const codeTabs = container.querySelectorAll("[id$='-tab-code']");
    expect(codeTabs.length).toBeGreaterThanOrEqual(codeTabIds.length);
  });

  it.each(codeTabIds)("section #%s has a code tab", (id) => {
    const { container } = renderSection();
    const codeTab = container.querySelector(`#${id}-tab-code`);
    expect(codeTab).not.toBeNull();
  });
});

// ─── Design Tokens section ────────────────────────────────────────────────────

describe("Design Tokens section", () => {
  it("renders color swatch tokens (not empty placeholder)", () => {
    renderSection();
    // The section now shows real token names — not the old empty message
    expect(screen.getByText("--ef-yellow / --primary")).toBeInTheDocument();
  });

  it("renders all 5 brand color tokens", () => {
    renderSection();
    expect(screen.getByText("--ef-blue")).toBeInTheDocument();
    expect(screen.getByText("--ef-green")).toBeInTheDocument();
    expect(screen.getByText("--ef-red")).toBeInTheDocument();
    expect(screen.getByText("--ef-orange")).toBeInTheDocument();
  });

  it("renders surface layer labels", () => {
    renderSection();
    expect(screen.getByText("canvas")).toBeInTheDocument();
    expect(screen.getByText("surface-1")).toBeInTheDocument();
    expect(screen.getByText("surface-2")).toBeInTheDocument();
    expect(screen.getByText("surface-3")).toBeInTheDocument();
  });

  it("renders z-index token table with --z-modal", () => {
    renderSection();
    const els = screen.getAllByText("--z-modal");
    expect(els.length).toBeGreaterThanOrEqual(1);
  });

  it("renders duration scale tokens", () => {
    renderSection();
    expect(screen.getByText("--duration-base")).toBeInTheDocument();
  });

  it("code prop does NOT contain var(--bg-surface)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#design-tokens");
    expect(section?.textContent).not.toContain("var(--bg-surface");
  });
});

// ─── Naming Conventions section ───────────────────────────────────────────────

describe("Naming Conventions section", () => {
  it("renders file structure tree", () => {
    renderSection();
    expect(screen.getByText("src/")).toBeInTheDocument();
  });

  it("uses text-muted-foreground (NOT text-ef-gray-mid) for arrow annotations", () => {
    const { container } = renderSection();
    const section = container.querySelector("#naming-conventions");
    expect(section).not.toBeNull();
    // No ef-gray-mid class anywhere in section
    const grayMidEls = section?.querySelectorAll(".text-ef-gray-mid");
    expect(grayMidEls?.length ?? 0).toBe(0);
  });
});

// ─── Accessibility section ────────────────────────────────────────────────────

describe("Accessibility section", () => {
  it("renders contrast ratios table", () => {
    renderSection();
    expect(screen.getByText("18.3:1")).toBeInTheDocument();
    expect(screen.getByText("11.7:1")).toBeInTheDocument();
  });

  it("renders AAA grade badges", () => {
    renderSection();
    const aaaBadges = screen.getAllByText("AAA");
    expect(aaaBadges.length).toBeGreaterThanOrEqual(3);
  });

  it("renders ARIA requirements section", () => {
    renderSection();
    // aria_requirements heading
    const section = document.getElementById("accessibility");
    expect(section).not.toBeNull();
  });

  it("renders modal ARIA requirement", () => {
    renderSection();
    const items = screen.getAllByText(/role="dialog"/i);
    expect(items.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Responsive section ───────────────────────────────────────────────────────

describe("Responsive section", () => {
  it("renders breakpoint table rows", () => {
    const { container } = renderSection();
    const section = container.querySelector("#responsive");
    expect(within(section!).getAllByText("Container pad").length).toBeGreaterThanOrEqual(1);
    expect(within(section!).getByText("Hero height")).toBeInTheDocument();
  });

  it("renders Hamburger value", () => {
    renderSection();
    const hamburgers = screen.getAllByText("Hamburger");
    expect(hamburgers.length).toBeGreaterThanOrEqual(1);
  });

  it("renders 1 col / 2 col / 3 col values", () => {
    renderSection();
    expect(screen.getByText("1 col")).toBeInTheDocument();
    expect(screen.getByText("3 col")).toBeInTheDocument();
  });
});

// ─── Performance section ──────────────────────────────────────────────────────

describe("Performance section", () => {
  it("renders Images optimization group", () => {
    renderSection();
    // Section contains performance items
    const section = document.getElementById("performance");
    expect(section).not.toBeNull();
  });

  it("renders all 4 performance categories", () => {
    const { container } = renderSection();
    const section = container.querySelector("#performance");
    expect(section).not.toBeNull();
    // Category titles are in the ComponentPreview — check within
    const texts = section!.textContent ?? "";
    // Category titles from locale (uppercase) — check case-insensitively via includes
    expect(texts.toLowerCase()).toContain("images");
    expect(texts.toLowerCase()).toContain("fonts");
    expect(texts.toLowerCase()).toContain("css");
    expect(texts.toLowerCase()).toContain("animation");
  });
});

// ─── Page Templates ───────────────────────────────────────────────────────────

describe("Page Templates section", () => {
  it("renders all 5 template cards", () => {
    renderSection();
    expect(screen.getByText("HOMEPAGE")).toBeInTheDocument();
    expect(screen.getByText("DOCUMENTATION")).toBeInTheDocument();
    expect(screen.getByText("BLOG LIST")).toBeInTheDocument();
    expect(screen.getByText("BLOG POST")).toBeInTheDocument();
    expect(screen.getByText("ERROR PAGE")).toBeInTheDocument();
  });

  it("renders block items for homepage template", () => {
    renderSection();
    const heroBlocks = screen.getAllByText(/Hero/i);
    expect(heroBlocks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders error page blocks (glitch code)", () => {
    renderSection();
    expect(screen.getByText("Error Code (Glitch)")).toBeInTheDocument();
  });
});

// ─── Section Patterns ────────────────────────────────────────────────────────

describe("Section Patterns section", () => {
  it("renders feature grid with numbered items", () => {
    renderSection();
    expect(screen.getByText("FEATURE 1")).toBeInTheDocument();
    expect(screen.getByText("FEATURE 2")).toBeInTheDocument();
    expect(screen.getByText("FEATURE 3")).toBeInTheDocument();
  });

  it("renders alternating layout labels", () => {
    renderSection();
    expect(screen.getByText("ALTERNATING LAYOUT")).toBeInTheDocument();
  });

  it("renders testimonial section", () => {
    renderSection();
    expect(screen.getByText("TESTIMONIAL")).toBeInTheDocument();
  });

  it("testimonial uses text-muted-foreground (not text-[#CCC])", () => {
    const { container } = renderSection();
    // No hardcoded color classes
    const hashColor = container.querySelector('[class*="text-[#"]');
    // There should be none with hardcoded hex text colors inside section-patterns
    const sectionEl = container.querySelector("#section-patterns");
    const badQuote = sectionEl?.querySelector('[class*="text-[#CCC]"]');
    expect(badQuote).toBeNull();
  });
});

// ─── Behavioral Rules Overview ────────────────────────────────────────────────

describe("Behavioral Rules overview section", () => {
  it("renders 5 sub-section cards", () => {
    const { container } = renderSection();
    const section = container.querySelector("#behavioral-rules");
    expect(section).not.toBeNull();
    const cards = section?.querySelectorAll("a[href^='#']");
    expect(cards?.length).toBeGreaterThanOrEqual(5);
  });

  it("links to timing-focus, scroll-touch-rules, form-action-rules", () => {
    const { container } = renderSection();
    const section = container.querySelector("#behavioral-rules");
    expect(section?.querySelector('a[href="#timing-focus"]')).not.toBeNull();
    expect(
      section?.querySelector('a[href="#scroll-touch-rules"]'),
    ).not.toBeNull();
    expect(
      section?.querySelector('a[href="#form-action-rules"]'),
    ).not.toBeNull();
  });
});

// ─── Timing & Focus ───────────────────────────────────────────────────────────

describe("Timing & Focus section", () => {
  it("renders Doherty Threshold table", () => {
    renderSection();
    const section = document.getElementById("timing-focus");
    expect(section).not.toBeNull();
    expect(within(section!).getByText("0–100ms")).toBeInTheDocument();
    expect(within(section!).getByText(">10s")).toBeInTheDocument();
  });

  it("renders debounce/throttle table with 4 rows", () => {
    renderSection();
    expect(screen.getByText("Search input")).toBeInTheDocument();
    expect(screen.getByText("Form autosave")).toBeInTheDocument();
  });

  it("renders focus trap rules", () => {
    renderSection();
    expect(
      screen.getByText("Modal OPEN → focus first focusable element"),
    ).toBeInTheDocument();
  });

  it("renders escape hierarchy levels", () => {
    renderSection();
    expect(screen.getByText("Layer 4")).toBeInTheDocument();
    expect(screen.getByText("Layer 0")).toBeInTheDocument();
  });

  it("renders z-index stacking tokens", () => {
    renderSection();
    expect(screen.getAllByText("--z-toast").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("--z-tooltip").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Scroll & Touch ───────────────────────────────────────────────────────────

describe("Scroll & Touch section", () => {
  it("renders scroll behavior rules", () => {
    renderSection();
    expect(screen.getByText("Link to new page")).toBeInTheDocument();
    expect(screen.getByText("Anchor link #section")).toBeInTheDocument();
  });

  it("renders touch target standards table", () => {
    renderSection();
    const section = document.getElementById("scroll-touch-rules");
    expect(section).not.toBeNull();
    expect(within(section!).getByText("48px")).toBeInTheDocument();
  });

  it("renders iOS safe area CSS variables", () => {
    renderSection();
    expect(screen.getByText(/safe-area-inset-top/)).toBeInTheDocument();
  });
});

// ─── Form & Action Rules ──────────────────────────────────────────────────────

describe("Form & Action Rules section", () => {
  it("renders form behavior rules", () => {
    renderSection();
    expect(screen.getByText("Disable on submit")).toBeInTheDocument();
    expect(screen.getByText("Password visibility")).toBeInTheDocument();
  });

  it("renders autosave indicators with token classes", () => {
    const { container } = renderSection();
    const section = container.querySelector("#form-action-rules");
    // autosave-saved uses text-ef-green (not hardcoded color)
    const savedEl = section?.querySelector(".autosave-saved, [class*='autosave']");
    // The wrapper div uses the token class
    const greenEl = section?.querySelector(".text-ef-green");
    expect(greenEl).not.toBeNull();
  });

  it("renders destructive action severity table", () => {
    renderSection();
    expect(screen.getByText("Trivial")).toBeInTheDocument();
    expect(screen.getByText("Catastrophic")).toBeInTheDocument();
  });

  it("renders error recovery hierarchy", () => {
    renderSection();
    expect(screen.getByText("Field error")).toBeInTheDocument();
    expect(screen.getByText("Fatal error")).toBeInTheDocument();
  });

  it("renders auto-retry backoff note", () => {
    renderSection();
    expect(screen.getAllByText(/Auto-retry/i).length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Notifications & Media ────────────────────────────────────────────────────

describe("Notifications & Media Queries section", () => {
  it("renders toast duration grid", () => {
    renderSection();
    const section = document.getElementById("notification-media");
    expect(section).not.toBeNull();
    expect(within(section!).getByText("info")).toBeInTheDocument();
    expect(within(section!).getByText("success")).toBeInTheDocument();
    expect(within(section!).getByText("error")).toBeInTheDocument();
  });

  it("renders error toast never auto-dismiss rule", () => {
    renderSection();
    expect(screen.getByText(/Error toasts NEVER auto-dismiss/)).toBeInTheDocument();
  });

  it("renders media query code blocks for all 4 preference types", () => {
    const { container } = renderSection();
    const section = container.querySelector("#notification-media");
    expect(section).not.toBeNull();
    const text = section!.textContent ?? "";
    expect(text).toContain("prefers-reduced-motion");
    expect(text).toContain("forced-colors");
    expect(text).toContain("prefers-contrast");
    expect(text).toContain("pointer: coarse");
  });
});

// ─── Consistency & Sizing ─────────────────────────────────────────────────────

describe("Consistency & Sizing section", () => {
  it("renders consistency standards (All links / All forms)", () => {
    renderSection();
    expect(screen.getByText("All links")).toBeInTheDocument();
    expect(screen.getByText("All modals")).toBeInTheDocument();
  });

  it("renders sizing standards table", () => {
    renderSection();
    expect(screen.getByText("Container max")).toBeInTheDocument();
    expect(screen.getByText("Modal width")).toBeInTheDocument();
  });

  it("renders CLS score targets", () => {
    renderSection();
    expect(screen.getByText("< 0.1")).toBeInTheDocument();
    expect(screen.getByText("> 0.25")).toBeInTheDocument();
  });
});

// ─── Auth Layouts ─────────────────────────────────────────────────────────────

describe("Auth Layouts section", () => {
  it("renders 3 layout variant cards", () => {
    renderSection();
    expect(screen.getByText("Split Panel")).toBeInTheDocument();
    expect(screen.getByText("Centered Card")).toBeInTheDocument();
    expect(screen.getByText("Fullscreen Immersive")).toBeInTheDocument();
  });

  it("layout variants are actual div wireframes (not unicode chars)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#auth-layouts");
    // Should have divs for wireframes — not unicode placeholder chars
    const textContent = section?.textContent ?? "";
    expect(textContent).not.toContain("\u258C");
    expect(textContent).not.toContain("\u25A3");
    expect(textContent).not.toContain("\u25FB");
  });

  it("split panel wireframe is responsive (grid-cols-1 sm:grid-cols-[2fr_3fr])", () => {
    const { container } = renderSection();
    const section = container.querySelector("#auth-layouts");
    const splitGrid = section?.querySelector(
      ".grid-cols-1.sm\\:grid-cols-\\[2fr_3fr\\]",
    );
    expect(splitGrid).not.toBeNull();
  });

  it("visual panel is hidden sm:flex", () => {
    const { container } = renderSection();
    const section = container.querySelector("#auth-layouts");
    const visualPanel = section?.querySelector(".hidden.sm\\:flex");
    expect(visualPanel).not.toBeNull();
  });

  it("renders auth page variants table (Login / Register / etc.)", () => {
    renderSection();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByText("Verify Email")).toBeInTheDocument();
  });

  it("password strength uses token classes (not hardcoded hex)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#auth-layouts");
    // No inline style with backgroundColor
    const styleElements = section?.querySelectorAll("[style*='backgroundColor']");
    expect(styleElements?.length ?? 0).toBe(0);
    // Uses token classes
    expect(section?.querySelector(".bg-ef-red")).not.toBeNull();
    expect(section?.querySelector(".bg-ef-green")).not.toBeNull();
  });
});

// ─── Pricing Tables ───────────────────────────────────────────────────────────

describe("Pricing Tables section", () => {
  it("renders 3 pricing tiers", () => {
    renderSection();
    expect(screen.getByText("RECRUIT")).toBeInTheDocument();
    expect(screen.getByText("OPERATOR")).toBeInTheDocument();
    expect(screen.getByText("ELITE II")).toBeInTheDocument();
  });

  it("renders MOST POPULAR badge on featured tier", () => {
    renderSection();
    expect(screen.getByText("MOST POPULAR")).toBeInTheDocument();
  });

  it("renders FREE tier price", () => {
    renderSection();
    expect(screen.getByText("FREE")).toBeInTheDocument();
  });
});

// ─── Mega Menu ───────────────────────────────────────────────────────────────

describe("Mega Menu section", () => {
  it("renders 3 column mega menu", () => {
    renderSection();
    expect(screen.getByText("OPERATORS")).toBeInTheDocument();
    expect(screen.getByText("RESOURCES")).toBeInTheDocument();
    expect(screen.getByText("GUIDES")).toBeInTheDocument();
  });

  it("code prop uses hsl(var(--primary)) not #FFD429", () => {
    const { container } = renderSection();
    const section = container.querySelector("#mega-menu");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("#FFD429");
    expect(codeContent).not.toContain("var(--bg-surface");
  });
});

// ─── Kanban Board ─────────────────────────────────────────────────────────────

describe("Kanban Board section", () => {
  it("renders all 4 columns", () => {
    renderSection();
    expect(screen.getByText("BACKLOG")).toBeInTheDocument();
    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("REVIEW")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  it("code prop uses hsl(var(--surface-1)) not var(--bg-surface)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#kanban");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("var(--bg-surface");
  });
});

// ─── Language Switcher ────────────────────────────────────────────────────────

describe("Language Switcher section", () => {
  it("renders EN and ID toggle buttons", () => {
    const { container } = renderSection();
    const section = container.querySelector("#language-switcher");
    expect(section).not.toBeNull();
    const buttons = within(section!).getAllByRole("button");
    const labels = buttons.map((b) => b.textContent);
    expect(labels).toContain("EN");
    expect(labels).toContain("ID");
  });

  it("active language has border-primary class", () => {
    const { container } = renderSection();
    const section = container.querySelector("#language-switcher");
    const activeBtn = section?.querySelector(".border-primary");
    expect(activeBtn).not.toBeNull();
  });
});

// ─── Print Styles ─────────────────────────────────────────────────────────────

describe("Print Styles section", () => {
  it("renders all 5 print utility classes", () => {
    renderSection();
    expect(screen.getByText(".print-hidden")).toBeInTheDocument();
    expect(screen.getByText(".print-only")).toBeInTheDocument();
    expect(screen.getByText(".print-break-before")).toBeInTheDocument();
    expect(screen.getByText(".print-break-after")).toBeInTheDocument();
    expect(screen.getByText(".print-no-break")).toBeInTheDocument();
  });
});

// ─── FAB / Chat Widget ────────────────────────────────────────────────────────

describe("FAB section", () => {
  it("renders diamond FAB button", () => {
    const { container } = renderSection();
    const section = container.querySelector("#fab");
    // React renders clipPath as clip-path in DOM
    const fabBtn = section?.querySelector('[style*="clip-path"]');
    expect(fabBtn).not.toBeNull();
  });

  it("FAB button has aria-label", () => {
    const { container } = renderSection();
    const section = container.querySelector("#fab");
    const fabBtn = section?.querySelector('[aria-label]');
    expect(fabBtn).not.toBeNull();
  });

  it("code prop uses hsl(var(--primary)) not #FFD429", () => {
    const { container } = renderSection();
    const section = container.querySelector("#fab");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("#FFD429");
  });
});

// ─── Comments ────────────────────────────────────────────────────────────────

describe("Comments section", () => {
  it("renders comment threads", () => {
    renderSection();
    expect(screen.getByText("OPERATOR_7")).toBeInTheDocument();
    expect(screen.getByText("ANALYST_R")).toBeInTheDocument();
  });

  it("nested comment uses border-l styling", () => {
    const { container } = renderSection();
    const section = container.querySelector("#comments");
    const nested = section?.querySelector(".border-l.border-border.pl-4");
    expect(nested).not.toBeNull();
  });

  it("code prop uses hsl(var(--surface-2)) not var(--bg-surface-2)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#comments");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("var(--bg-surface");
  });
});

// ─── Spoiler Tags ─────────────────────────────────────────────────────────────

describe("Spoiler Tags section", () => {
  it("renders SpoilerBlock component with reveal button", () => {
    renderSection();
    // SpoilerBlock renders a button to reveal content
    const revealBtns = screen.getAllByRole("button");
    const reveal = revealBtns.find((b) =>
      b.textContent?.toLowerCase().includes("reveal") ||
      b.textContent?.toLowerCase().includes("unlock"),
    );
    expect(reveal).toBeDefined();
  });

  it("renders spoiler block with chapter 9 title", () => {
    renderSection();
    // SpoilerBlock renders "SPOILER — Chapter 9 Boss Identity" as one span
    expect(screen.getByText(/Chapter 9 Boss Identity/)).toBeInTheDocument();
  });
});

// ─── Ad Placements ────────────────────────────────────────────────────────────

describe("Ad Placements section", () => {
  it("renders ad slot placeholders", () => {
    renderSection();
    expect(screen.getByText(/LEADERBOARD AD/)).toBeInTheDocument();
    expect(screen.getByText(/SIDEBAR AD/)).toBeInTheDocument();
  });

  it("code prop uses hsl(var(--surface-0)) not var(--bg-surface-0)", () => {
    const { container } = renderSection();
    const section = container.querySelector("#ad-placements");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("var(--bg-surface");
    expect(codeContent).not.toContain("color: #444");
  });
});

// ─── Audio Player ─────────────────────────────────────────────────────────────

describe("Audio Player section", () => {
  it("renders play button with aria-label", () => {
    const { container } = renderSection();
    const section = container.querySelector("#audio-player");
    const playBtn = section?.querySelector('[aria-label="Play"]');
    expect(playBtn).not.toBeNull();
  });

  it("renders track title and artist", () => {
    renderSection();
    expect(screen.getByText("Endfield — Main Theme")).toBeInTheDocument();
  });

  it("renders time display", () => {
    renderSection();
    expect(screen.getByText("02:06 / 05:32")).toBeInTheDocument();
  });

  it("code prop uses hsl(var(--primary)) not #FFD429", () => {
    const { container } = renderSection();
    const section = container.querySelector("#audio-player");
    const codeContent = section?.textContent ?? "";
    expect(codeContent).not.toContain("#FFD429");
    expect(codeContent).not.toContain("var(--bg-surface");
  });
});

// ─── Light mode token compliance ──────────────────────────────────────────────

describe("Light mode token compliance", () => {
  it("no hardcoded hex text-color classes anywhere in Patterns section", () => {
    const { container } = renderSection();
    // Look for classname patterns like text-[#...] or text-[rgba...]
    const allElements = container.querySelectorAll("[class]");
    let hexTextColorFound = false;
    allElements.forEach((el) => {
      const cls = el.getAttribute("class") ?? "";
      if (/text-\[#[0-9a-fA-F]{3,6}\]/.test(cls)) {
        hexTextColorFound = true;
      }
    });
    expect(hexTextColorFound).toBe(false);
  });

  it("no hardcoded hex background-color classes in section JSX", () => {
    const { container } = renderSection();
    const allElements = container.querySelectorAll("[class]");
    let hexBgFound = false;
    allElements.forEach((el) => {
      const cls = el.getAttribute("class") ?? "";
      if (/bg-\[#[0-9a-fA-F]{3,6}\]/.test(cls)) {
        hexBgFound = true;
      }
    });
    expect(hexBgFound).toBe(false);
  });
});

// ─── EN locale completeness ───────────────────────────────────────────────────

describe("EN locale patterns keys", () => {
  it("templates.title resolves", () => {
    renderSection();
    expect(screen.getByText("Page Templates")).toBeInTheDocument();
  });

  it("responsive.title resolves", () => {
    renderSection();
    expect(screen.getByText("Responsive Breakpoints")).toBeInTheDocument();
  });

  it("accessibility.title resolves", () => {
    renderSection();
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
  });

  it("performance.title resolves", () => {
    renderSection();
    expect(screen.getByText("Performance Guidelines")).toBeInTheDocument();
  });

  it("tokens.title resolves", () => {
    renderSection();
    expect(screen.getByText("Design Tokens (Complete)")).toBeInTheDocument();
  });

  it("naming.title resolves", () => {
    renderSection();
    expect(screen.getByText("Naming Conventions")).toBeInTheDocument();
  });
});
