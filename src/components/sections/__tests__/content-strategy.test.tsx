/**
 * Content Strategy Section tests
 *
 * Covers: ContentStrategySection rendering, locale keys, placeholder color,
 * Brand Voice Attributes table, microcopy rows (all 7), code props,
 * truncation demos, and date/number formatting.
 */
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { ContentStrategySection } from "../ContentStrategySection";

function renderSection() {
  return render(
    <I18nextProvider i18n={i18n}>
      <ContentStrategySection />
    </I18nextProvider>,
  );
}

// ─── Voice & Tone ─────────────────────────────────────────────────────────────

describe("Voice & Tone section", () => {
  it("renders the voice-tone ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("voice-tone");
    expect(section).not.toBeNull();
  });

  it("renders Brand Voice Attributes heading", () => {
    renderSection();
    expect(
      screen.getByText("BRAND VOICE ATTRIBUTES"),
    ).toBeInTheDocument();
  });

  it("renders all 5 brand voice attributes", () => {
    renderSection();
    expect(screen.getByText("Authoritative")).toBeInTheDocument();
    expect(screen.getByText("Concise")).toBeInTheDocument();
    expect(screen.getByText("Technical")).toBeInTheDocument();
    expect(screen.getByText("Calm")).toBeInTheDocument();
    expect(screen.getByText("Forward-Looking")).toBeInTheDocument();
  });

  it("renders brand voice avoid column entries", () => {
    renderSection();
    expect(screen.getByText("Hedging, uncertain language")).toBeInTheDocument();
    expect(screen.getByText("Verbose explanations")).toBeInTheDocument();
    expect(screen.getByText("Alarmist messaging")).toBeInTheDocument();
  });

  it("renders all 6 context/tone rows", () => {
    renderSection();
    expect(screen.getByText("Hero/Marketing")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Error/Feedback")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Onboarding")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("renders TERMINOLOGY heading", () => {
    renderSection();
    expect(screen.getByText("TERMINOLOGY")).toBeInTheDocument();
  });

  it("renders user/system/operations terminology labels", () => {
    renderSection();
    expect(screen.getByText(/"Endministrator"/)).toBeInTheDocument();
    expect(screen.getByText(/"Endfield System" \/ "EF-SYS"/)).toBeInTheDocument();
  });

  it("renders example copy entries", () => {
    renderSection();
    expect(screen.getByText(/"Operation complete\."/)).toBeInTheDocument();
    expect(screen.getByText(/"Signal lost\. Check your connection\."/)).toBeInTheDocument();
  });
});

// ─── Microcopy ────────────────────────────────────────────────────────────────

describe("Microcopy section", () => {
  it("renders the microcopy ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("microcopy");
    expect(section).not.toBeNull();
  });

  it("renders all 7 action rows (including cancel and external)", () => {
    renderSection();
    // 5 original
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Navigate")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    // 2 new
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("External Link")).toBeInTheDocument();
  });

  it("renders USE values for cancel and external", () => {
    renderSection();
    expect(screen.getByText("GO BACK")).toBeInTheDocument();
    expect(screen.getByText("↗ GITHUB")).toBeInTheDocument();
  });

  it("renders AVOID values for cancel and external", () => {
    renderSection();
    expect(screen.getByText(/"No"/)).toBeInTheDocument();
    expect(screen.getByText(/"Open Link"/)).toBeInTheDocument();
  });

  it("renders NAVIGATION LABELS heading and nav items", () => {
    renderSection();
    expect(screen.getByText("NAVIGATION LABELS")).toBeInTheDocument();
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("DOCS")).toBeInTheDocument();
    expect(screen.getByText("BLOG")).toBeInTheDocument();
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
  });

  it("renders FORM LABELS section with required/optional markers", () => {
    renderSection();
    expect(screen.getByText("FORM LABELS")).toBeInTheDocument();
    expect(screen.getByText("(Required)")).toBeInTheDocument();
    expect(screen.getByText("(Optional)")).toBeInTheDocument();
  });

  it("renders CONFIRMATION DIALOGS section", () => {
    renderSection();
    expect(screen.getByText("CONFIRMATION DIALOGS")).toBeInTheDocument();
    // "DELETE RECORD" appears as both the dialog title and the confirm button
    const deleteRecordEls = screen.getAllByText("DELETE RECORD");
    expect(deleteRecordEls.length).toBeGreaterThanOrEqual(1);
  });

  it("renders dialog cancel and confirm buttons", () => {
    renderSection();
    // There may be multiple "CANCEL" texts — check all exist
    const cancelBtns = screen.getAllByText("CANCEL");
    expect(cancelBtns.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Placeholder Standards ────────────────────────────────────────────────────

describe("Placeholder Standards section", () => {
  it("renders the placeholder-standards ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("placeholder-standards");
    expect(section).not.toBeNull();
  });

  it("renders all 10 placeholder input fields", () => {
    renderSection();
    const { container } = renderSection();
    const inputs = container.querySelectorAll("input");
    // 10 placeholder inputs
    expect(inputs.length).toBeGreaterThanOrEqual(10);
  });

  it("uses placeholder:text-muted-foreground (not ef-gray-mid) for input fields", () => {
    const { container } = renderSection();
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input.className).toContain("placeholder:text-muted-foreground");
      expect(input.className).not.toContain("placeholder:text-ef-gray-mid");
    });
  });

  it("renders email placeholder correctly", () => {
    const { container } = renderSection();
    const emailInput = container.querySelector(
      "input[placeholder='endministrator@endfield.icu']",
    );
    expect(emailInput).not.toBeNull();
  });

  it("renders date placeholder in YYYY.MM.DD format", () => {
    const { container } = renderSection();
    const dateInput = container.querySelector("input[placeholder='YYYY.MM.DD']");
    expect(dateInput).not.toBeNull();
  });

  it("renders password placeholder with dots", () => {
    const { container } = renderSection();
    const pwInput = container.querySelector("input[placeholder='••••••••']");
    expect(pwInput).not.toBeNull();
  });

  it("renders all 10 label spans", () => {
    const { container } = renderSection();
    // Labels are in font-display spans
    const labelSpans = container.querySelectorAll(
      ".font-display.text-\\[10px\\].tracking-\\[0\\.1em\\]",
    );
    expect(labelSpans.length).toBeGreaterThanOrEqual(10);
  });
});

// ─── Error Message Writing ────────────────────────────────────────────────────

describe("Error Message Writing section", () => {
  it("renders the error-message-writing ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("error-message-writing");
    expect(section).not.toBeNull();
  });

  it("renders all 10 error validation rows", () => {
    renderSection();
    expect(screen.getByText("Required empty")).toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByText("Password short")).toBeInTheDocument();
    expect(screen.getByText("Rate limited")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.getByText("Server error")).toBeInTheDocument();
    expect(screen.getByText("Permission denied")).toBeInTheDocument();
    expect(screen.getByText("File too large")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
    expect(screen.getByText("Mismatch")).toBeInTheDocument();
  });

  it("renders error messages in in-universe language", () => {
    renderSection();
    expect(
      screen.getByText("Access restricted. Insufficient clearance level."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("System malfunction. Our team has been notified."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Target not located. Verify the ID and try again."),
    ).toBeInTheDocument();
  });

  it("renders VALIDATION and MESSAGE headers", () => {
    const { container } = renderSection();
    const section = container.querySelector("#error-message-writing");
    expect(section).not.toBeNull();
    expect(within(section!).getByText("VALIDATION")).toBeInTheDocument();
    expect(within(section!).getByText("MESSAGE")).toBeInTheDocument();
  });
});

// ─── Date / Time / Number ─────────────────────────────────────────────────────

describe("Date, Time & Number Formatting section", () => {
  it("renders the date-time-number ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("date-time-number");
    expect(section).not.toBeNull();
  });

  it("renders DATE FORMATS heading", () => {
    renderSection();
    expect(screen.getByText("DATE FORMATS")).toBeInTheDocument();
  });

  it("renders NUMBER FORMATS heading", () => {
    renderSection();
    expect(screen.getByText("NUMBER FORMATS")).toBeInTheDocument();
  });

  it("renders all date format values", () => {
    renderSection();
    expect(screen.getByText("15 Feb 2026")).toBeInTheDocument();
    expect(screen.getByText("2026.02.15")).toBeInTheDocument();
    expect(screen.getByText("2026.02.15 / 14:32:07 UTC")).toBeInTheDocument();
    expect(screen.getByText("3 hours ago")).toBeInTheDocument();
    expect(screen.getByText("15.02.2026")).toBeInTheDocument();
  });

  it("renders all number format values", () => {
    renderSection();
    expect(screen.getByText("1,247")).toBeInTheDocument();
    expect(screen.getByText("67%")).toBeInTheDocument();
    expect(screen.getByText("2.4.1")).toBeInTheDocument();
    expect(screen.getByText("12.4 MB")).toBeInTheDocument();
    expect(screen.getByText("EF-404-3B2C")).toBeInTheDocument();
  });

  it("renders date format labels", () => {
    renderSection();
    expect(screen.getByText("Full")).toBeInTheDocument();
    expect(screen.getByText("Compact")).toBeInTheDocument();
    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Relative")).toBeInTheDocument();
    expect(screen.getByText("Blog meta")).toBeInTheDocument();
  });
});

// ─── Truncation & Overflow ────────────────────────────────────────────────────

describe("Truncation & Overflow section", () => {
  it("renders the truncation-overflow ComponentPreview with correct id", () => {
    renderSection();
    const section = document.getElementById("truncation-overflow");
    expect(section).not.toBeNull();
  });

  it("renders single-line truncate demo with .truncate class", () => {
    const { container } = renderSection();
    const truncated = container.querySelector("p.truncate");
    expect(truncated).not.toBeNull();
  });

  it("renders 2-line clamp demo with .line-clamp-2 class", () => {
    const { container } = renderSection();
    const clamped = container.querySelector("p.line-clamp-2");
    expect(clamped).not.toBeNull();
  });

  it("renders 3-line clamp demo with .line-clamp-3 class", () => {
    const { container } = renderSection();
    const clamped = container.querySelector("p.line-clamp-3");
    expect(clamped).not.toBeNull();
  });

  it("renders break-all demo with .break-all class", () => {
    const { container } = renderSection();
    const broken = container.querySelector("p.break-all");
    expect(broken).not.toBeNull();
  });

  it("renders ELEMENT TRUNCATION RULES table", () => {
    renderSection();
    expect(screen.getByText("ELEMENT TRUNCATION RULES")).toBeInTheDocument();
  });

  it("renders all 7 truncation rule rows", () => {
    renderSection();
    expect(screen.getByText("Card title")).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
    expect(screen.getByText("Nav item")).toBeInTheDocument();
    expect(screen.getByText("Table cell")).toBeInTheDocument();
    expect(screen.getByText("Tag text")).toBeInTheDocument();
    expect(screen.getByText("Sidebar link")).toBeInTheDocument();
    expect(screen.getByText("Toast message")).toBeInTheDocument();
  });

  it("renders ELEMENT, MAX LINES, OVERFLOW table headers", () => {
    renderSection();
    expect(screen.getByText("ELEMENT")).toBeInTheDocument();
    expect(screen.getByText("MAX LINES")).toBeInTheDocument();
    expect(screen.getByText("OVERFLOW")).toBeInTheDocument();
  });

  it("renders Ellipsis + Tooltip rule for table cell", () => {
    renderSection();
    expect(screen.getByText("Ellipsis + Tooltip")).toBeInTheDocument();
  });
});

// ─── Code Props ───────────────────────────────────────────────────────────────

describe("ComponentPreview code props", () => {
  it("each ComponentPreview receives a code prop (code tab button present)", () => {
    const { container } = renderSection();
    // ComponentPreview renders a tab button with id="${id}-tab-code" when code prop is provided
    const codeTabs = container.querySelectorAll("[id$='-tab-code']");
    // 6 ComponentPreviews × 1 code tab each
    expect(codeTabs.length).toBeGreaterThanOrEqual(6);
  });
});

// ─── Locale completeness (EN keys) ────────────────────────────────────────────

describe("EN locale strategy keys", () => {
  it("voice_tone.brand_voice.authoritative.attribute resolves", () => {
    renderSection();
    expect(screen.getByText("Authoritative")).toBeInTheDocument();
  });

  it("microcopy.rows.cancel.use resolves to GO BACK", () => {
    renderSection();
    expect(screen.getByText("GO BACK")).toBeInTheDocument();
  });

  it("microcopy.rows.external.use resolves to ↗ GITHUB", () => {
    renderSection();
    expect(screen.getByText("↗ GITHUB")).toBeInTheDocument();
  });

  it("microcopy.rows.cancel.avoid resolves", () => {
    renderSection();
    expect(screen.getByText(/"No"/)).toBeInTheDocument();
  });

  it("microcopy.rows.external.avoid resolves", () => {
    renderSection();
    expect(screen.getByText(/"Open Link"/)).toBeInTheDocument();
  });
});
