import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input, inputWrapperVariants, Label, HelperText } from "../input";
import { Textarea, textareaVariants } from "../textarea";

// ════════════════════════════════════════════════════════════════════════════
// Input (root)
// ════════════════════════════════════════════════════════════════════════════

describe("Input", () => {
  // ── Render ─────────────────────────────────────────────────────────────────
  it("renders without crashing", () => {
    const { container } = render(<Input placeholder="Type here" />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("renders a wrapper <div> as root", () => {
    const { container } = render(<Input />);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders an inner <input> element", () => {
    const { container } = render(<Input />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("forwards placeholder to inner input", () => {
    render(<Input placeholder="Enter callsign" />);
    expect(screen.getByPlaceholderText("Enter callsign")).toBeInTheDocument();
  });

  // ── Base classes ────────────────────────────────────────────────────────────
  it("applies bg-surface-1 and border on wrapper by default", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("bg-surface-1");
    expect(wrapper.className).toContain("border");
  });

  it("applies flex and items-center on wrapper", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("items-center");
  });

  it("applies transition-all on wrapper", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("transition-all");
  });

  it("inner input has bg-transparent and font-mono", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input") as HTMLElement;
    expect(input.className).toContain("bg-transparent");
    expect(input.className).toContain("font-mono");
  });

  // ── State variants ──────────────────────────────────────────────────────────
  it("applies default border class when state=default", () => {
    const { container } = render(<Input state="default" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("border-white/[0.12]");
  });

  it("applies error border class when state=error", () => {
    const { container } = render(<Input state="error" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("border-ef-red");
  });

  it("applies success border class when state=success", () => {
    const { container } = render(<Input state="success" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("border-ef-green");
  });

  it("default state has hover and focus-within classes", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("hover:border-white/20");
    expect(wrapper.className).toContain("focus-within:border-primary");
  });

  it("error state has red focus ring shadow", () => {
    const { container } = render(<Input state="error" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("focus-within:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]");
  });

  // ── Size variants ───────────────────────────────────────────────────────────
  it("applies h-8 for size=sm", () => {
    const { container } = render(<Input size="sm" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("h-8");
  });

  it("applies h-11 for size=md (default)", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("h-11");
  });

  it("applies h-[52px] for size=lg", () => {
    const { container } = render(<Input size="lg" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("h-[52px]");
  });

  // ── leftElement / rightElement ──────────────────────────────────────────────
  it("renders leftElement when provided", () => {
    render(<Input leftElement={<span data-testid="left-icon">L</span>} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders rightElement when provided", () => {
    render(<Input rightElement={<span data-testid="right-icon">R</span>} />);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("does not render leftElement slot when not provided", () => {
    const { container } = render(<Input />);
    // Only one child: the inner input (no left span)
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBe(0);
  });

  it("renders both left and right elements together", () => {
    render(
      <Input
        leftElement={<span data-testid="left">L</span>}
        rightElement={<span data-testid="right">R</span>}
      />,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  // ── Disabled state ──────────────────────────────────────────────────────────
  it("applies opacity-40 and cursor-not-allowed on wrapper when disabled", () => {
    const { container } = render(<Input disabled />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("opacity-40");
    expect(wrapper.className).toContain("cursor-not-allowed");
    expect(wrapper.className).toContain("pointer-events-none");
  });

  it("sets disabled attribute on inner input", () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("does not apply disabled classes when not disabled", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain("opacity-40");
    expect(wrapper.className).not.toContain("cursor-not-allowed");
  });

  // ── className merge ─────────────────────────────────────────────────────────
  it("merges custom className onto wrapper div", () => {
    const { container } = render(<Input className="w-full custom-input" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("w-full");
    expect(wrapper.className).toContain("custom-input");
  });

  // ── forwardRef ──────────────────────────────────────────────────────────────
  it("forwards ref to inner <input> element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  // ── Event handlers ──────────────────────────────────────────────────────────
  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("passes through HTML attributes (id, name, type)", () => {
    const { container } = render(
      <Input id="callsign" name="callsign" type="email" />,
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.id).toBe("callsign");
    expect(input.name).toBe("callsign");
    expect(input.type).toBe("email");
  });

  // ── displayName ─────────────────────────────────────────────────────────────
  it("has correct displayName", () => {
    expect(Input.displayName).toBe("Input");
  });

  // ── inputWrapperVariants export ─────────────────────────────────────────────
  it("exports inputWrapperVariants function", () => {
    expect(typeof inputWrapperVariants).toBe("function");
    const cls = inputWrapperVariants({ state: "error", size: "lg" });
    expect(typeof cls).toBe("string");
    expect(cls).toContain("border-ef-red");
    expect(cls).toContain("h-[52px]");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Label
// ════════════════════════════════════════════════════════════════════════════

describe("Label", () => {
  it("renders without crashing", () => {
    render(<Label>CALLSIGN</Label>);
    expect(screen.getByText("CALLSIGN")).toBeInTheDocument();
  });

  it("renders as a <label> element", () => {
    const { container } = render(<Label>L</Label>);
    expect(container.firstChild?.nodeName).toBe("LABEL");
  });

  it("applies display font and uppercase tracking classes", () => {
    const { container } = render(<Label>L</Label>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("font-display");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("tracking-widest");
    expect(el.className).toContain("text-muted-foreground");
    expect(el.className).toContain("font-semibold");
  });

  it("applies 11px font size", () => {
    const { container } = render(<Label>L</Label>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-[11px]");
  });

  it("merges custom className", () => {
    const { container } = render(<Label className="text-ef-red">L</Label>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-ef-red");
  });

  it("forwards htmlFor attribute", () => {
    render(<Label htmlFor="email-field">Email</Label>);
    const el = screen.getByText("Email");
    expect(el).toHaveAttribute("for", "email-field");
  });

  it("forwards ref to label element", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>L</Label>);
    expect(ref.current?.tagName).toBe("LABEL");
  });

  it("has correct displayName", () => {
    expect(Label.displayName).toBe("Label");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// HelperText
// ════════════════════════════════════════════════════════════════════════════

describe("HelperText", () => {
  it("renders without crashing", () => {
    render(<HelperText>Helper message</HelperText>);
    expect(screen.getByText("Helper message")).toBeInTheDocument();
  });

  it("renders as a <p> element", () => {
    const { container } = render(<HelperText>H</HelperText>);
    expect(container.firstChild?.nodeName).toBe("P");
  });

  it("applies muted-foreground by default (state=default)", () => {
    const { container } = render(<HelperText>H</HelperText>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-muted-foreground");
  });

  it("applies text-destructive for state=error", () => {
    const { container } = render(<HelperText state="error">Error</HelperText>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-destructive");
    expect(el.className).not.toContain("text-ef-green");
  });

  it("applies text-ef-green for state=success", () => {
    const { container } = render(
      <HelperText state="success">Success</HelperText>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-ef-green");
    expect(el.className).not.toContain("text-destructive");
  });

  it("applies 12px font size", () => {
    const { container } = render(<HelperText>H</HelperText>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-[12px]");
  });

  it("merges custom className", () => {
    const { container } = render(<HelperText className="mt-1">H</HelperText>);
    expect((container.firstChild as HTMLElement).className).toContain("mt-1");
  });

  it("forwards ref to p element", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<HelperText ref={ref}>H</HelperText>);
    expect(ref.current?.tagName).toBe("P");
  });

  it("has correct displayName", () => {
    expect(HelperText.displayName).toBe("HelperText");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Textarea
// ════════════════════════════════════════════════════════════════════════════

describe("Textarea", () => {
  // ── Render ──────────────────────────────────────────────────────────────────
  it("renders without crashing", () => {
    const { container } = render(<Textarea placeholder="Enter message" />);
    expect(container.querySelector("textarea")).toBeInTheDocument();
  });

  it("renders a wrapper <div> as root", () => {
    const { container } = render(<Textarea />);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders an inner <textarea> element", () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector("textarea")).toBeInTheDocument();
  });

  it("forwards placeholder to inner textarea", () => {
    render(<Textarea placeholder="Type your message" />);
    expect(screen.getByPlaceholderText("Type your message")).toBeInTheDocument();
  });

  // ── Base classes ────────────────────────────────────────────────────────────
  it("applies bg-surface-1 and border by default", () => {
    const { container } = render(<Textarea />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("bg-surface-1");
    expect(ta.className).toContain("border");
  });

  it("applies min-h-[120px] and resize-y", () => {
    const { container } = render(<Textarea />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("min-h-[120px]");
    expect(ta.className).toContain("resize-y");
  });

  it("applies font-mono text-sm", () => {
    const { container } = render(<Textarea />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("font-mono");
    expect(ta.className).toContain("text-sm");
  });

  // ── State variants ──────────────────────────────────────────────────────────
  it("applies default border class when state=default", () => {
    const { container } = render(<Textarea state="default" />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("border-white/[0.12]");
  });

  it("applies error border class when state=error", () => {
    const { container } = render(<Textarea state="error" />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("border-ef-red");
  });

  it("applies success border class when state=success", () => {
    const { container } = render(<Textarea state="success" />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("border-ef-green");
  });

  it("default state has hover and focus classes", () => {
    const { container } = render(<Textarea />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("hover:border-white/20");
    expect(ta.className).toContain("focus:border-primary");
  });

  it("error state has red focus ring shadow", () => {
    const { container } = render(<Textarea state="error" />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("focus:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]");
  });

  // ── Disabled state ──────────────────────────────────────────────────────────
  it("applies disabled classes when disabled", () => {
    const { container } = render(<Textarea disabled />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("disabled:opacity-40");
    expect(ta.className).toContain("disabled:cursor-not-allowed");
  });

  it("sets disabled attribute on textarea", () => {
    const { container } = render(<Textarea disabled />);
    const ta = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(ta.disabled).toBe(true);
  });

  // ── showCount (no maxLength) ────────────────────────────────────────────────
  it("does not render counter by default (showCount=false)", () => {
    const { container } = render(<Textarea />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBe(0);
  });

  it("renders counter span when showCount=true", () => {
    const { container } = render(<Textarea showCount />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
  });

  it("shows only count when showCount=true and no maxLength", () => {
    render(<Textarea showCount />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows count/maxLength when showCount=true with maxLength", () => {
    render(<Textarea showCount maxLength={100} />);
    expect(screen.getByText("0/100")).toBeInTheDocument();
  });

  // ── Counter updates on user input ───────────────────────────────────────────
  it("updates counter when user types", () => {
    const { container } = render(<Textarea showCount maxLength={100} />);
    const ta = container.querySelector("textarea") as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: "hello" } });
    expect(screen.getByText("5/100")).toBeInTheDocument();
  });

  it("fires onChange callback when user types", () => {
    const onChange = vi.fn();
    const { container } = render(<Textarea showCount onChange={onChange} />);
    const ta = container.querySelector("textarea") as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // ── Counter colours ─────────────────────────────────────────────────────────
  it("counter uses muted-foreground when below 80% of maxLength", () => {
    const { container } = render(<Textarea showCount maxLength={100} />);
    const span = container.querySelector("span") as HTMLElement;
    expect(span.className).toContain("text-muted-foreground");
  });

  it("counter uses text-ef-orange when at or above 80% of maxLength", () => {
    const { container } = render(
      <Textarea showCount maxLength={10} defaultValue="12345678" />,
    );
    const span = container.querySelector("span") as HTMLElement;
    // 8/10 = 80% → orange
    expect(span.className).toContain("text-ef-orange");
  });

  it("counter uses text-destructive when over maxLength", () => {
    // Controlled with value longer than maxLength to simulate programmatic overflow
    const { container } = render(
      <Textarea showCount maxLength={5} value="123456" onChange={() => {}} />,
    );
    const span = container.querySelector("span") as HTMLElement;
    // 6 > 5 → destructive
    expect(span.className).toContain("text-destructive");
  });

  // ── Counter adds bottom padding ─────────────────────────────────────────────
  it("adds pb-7 to textarea when showCount=true", () => {
    const { container } = render(<Textarea showCount maxLength={100} />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("pb-7");
  });

  it("does not add pb-7 when showCount=false", () => {
    const { container } = render(<Textarea maxLength={100} />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).not.toContain("pb-7");
  });

  // ── className merge ─────────────────────────────────────────────────────────
  it("merges custom className onto textarea", () => {
    const { container } = render(<Textarea className="custom-textarea" />);
    const ta = container.querySelector("textarea") as HTMLElement;
    expect(ta.className).toContain("custom-textarea");
  });

  // ── forwardRef ──────────────────────────────────────────────────────────────
  it("forwards ref to inner <textarea> element", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("TEXTAREA");
  });

  // ── HTML attribute passthrough ──────────────────────────────────────────────
  it("passes through id, name, rows attributes", () => {
    const { container } = render(
      <Textarea id="msg" name="message" rows={6} />,
    );
    const ta = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(ta.id).toBe("msg");
    expect(ta.name).toBe("message");
    expect(ta.rows).toBe(6);
  });

  // ── displayName ─────────────────────────────────────────────────────────────
  it("has correct displayName", () => {
    expect(Textarea.displayName).toBe("Textarea");
  });

  // ── textareaVariants export ─────────────────────────────────────────────────
  it("exports textareaVariants function", () => {
    expect(typeof textareaVariants).toBe("function");
    const cls = textareaVariants({ state: "error" });
    expect(typeof cls).toBe("string");
    expect(cls).toContain("border-ef-red");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Composition: Label + Input + HelperText
// ════════════════════════════════════════════════════════════════════════════

describe("Form field composition", () => {
  it("renders Label + Input + HelperText together without error", () => {
    render(
      <div>
        <Label htmlFor="callsign">CALLSIGN</Label>
        <Input id="callsign" placeholder="Enter designation" />
        <HelperText>Must be 4–8 characters</HelperText>
      </div>,
    );
    expect(screen.getByText("CALLSIGN")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter designation")).toBeInTheDocument();
    expect(screen.getByText("Must be 4–8 characters")).toBeInTheDocument();
  });

  it("renders error state composition", () => {
    render(
      <div>
        <Label htmlFor="user">USERNAME</Label>
        <Input id="user" state="error" value="x" onChange={() => {}} />
        <HelperText state="error">Username already taken</HelperText>
      </div>,
    );
    const helper = screen.getByText("Username already taken");
    expect(helper.className).toContain("text-destructive");
  });

  it("renders Textarea with counter in form context", () => {
    render(
      <div>
        <Label htmlFor="msg">MESSAGE</Label>
        <Textarea id="msg" showCount maxLength={200} />
        <HelperText>Optional field</HelperText>
      </div>,
    );
    expect(screen.getByText("MESSAGE")).toBeInTheDocument();
    expect(screen.getByText("0/200")).toBeInTheDocument();
    expect(screen.getByText("Optional field")).toBeInTheDocument();
  });
});
