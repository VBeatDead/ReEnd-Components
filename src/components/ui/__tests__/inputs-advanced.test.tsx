import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OTPInput } from "../otp-input";
import { DatePicker } from "../date-picker";
import { Rating } from "../rating";
import { FileUpload } from "../file-upload";

// ════════════════════════════════════════════════════════════════════════════
// OTPInput
// ════════════════════════════════════════════════════════════════════════════

describe("OTPInput", () => {
  it("renders 6 inputs by default", () => {
    const { container } = render(<OTPInput />);
    expect(container.querySelectorAll("input")).toHaveLength(6);
  });

  it("renders custom length", () => {
    const { container } = render(<OTPInput length={4} />);
    expect(container.querySelectorAll("input")).toHaveLength(4);
  });

  it("calls onChange when a digit is typed", () => {
    const onChange = vi.fn();
    const { container } = render(<OTPInput onChange={onChange} />);
    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "3" } });
    expect(onChange).toHaveBeenCalledWith("3     ".trimEnd().padEnd(6, ""));
  });

  it("shows error state with destructive border", () => {
    const { container } = render(<OTPInput error />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].className).toContain("border-destructive");
  });

  it("shows success state with green border and text", () => {
    const { container } = render(<OTPInput success value="123456" />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].className).toContain("border-ef-green");
    expect(inputs[0].className).toContain("text-ef-green");
  });

  it("disables all inputs when disabled prop is set", () => {
    const { container } = render(<OTPInput disabled />);
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("renders with accessible aria-label on each input", () => {
    const { container } = render(<OTPInput length={4} />);
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].getAttribute("aria-label")).toContain("Digit 1");
    expect(inputs[3].getAttribute("aria-label")).toContain("Digit 4");
  });

  it("calls onComplete when all digits filled on paste", () => {
    const onComplete = vi.fn();
    const { container } = render(
      <OTPInput length={4} onComplete={onComplete} />,
    );
    const inputs = container.querySelectorAll("input");
    const pasteData = { clipboardData: { getData: () => "1234" } };
    fireEvent.paste(inputs[0], pasteData);
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("renders container with flex class", () => {
    const { container } = render(<OTPInput />);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("shows resend button when onResend is provided and countdown is 0", () => {
    const onResend = vi.fn();
    render(<OTPInput onResend={onResend} />);
    expect(screen.getByText("[RESEND]")).toBeInTheDocument();
  });

  it("shows countdown when resendCooldown is set", () => {
    render(<OTPInput onResend={() => {}} resendCooldown={45} />);
    expect(screen.getByText(/available in/i)).toBeInTheDocument();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// DatePicker — now a custom calendar (Popover-based trigger button)
// ════════════════════════════════════════════════════════════════════════════

describe("DatePicker", () => {
  it("renders a trigger button", () => {
    render(<DatePicker />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<DatePicker label="Mission Date" />);
    expect(screen.getByText("Mission Date")).toBeInTheDocument();
  });

  it("shows placeholder text when no value", () => {
    render(<DatePicker />);
    expect(screen.getByText("YYYY.MM.DD")).toBeInTheDocument();
  });

  it("shows formatted value when provided", () => {
    render(<DatePicker value="2026-02-15" />);
    expect(screen.getByText("2026.02.15")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies error class when error is true", () => {
    render(<DatePicker error />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-destructive");
  });

  it("applies sm size class to trigger button", () => {
    render(<DatePicker size="sm" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-8");
  });

  it("opens calendar on trigger click", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("button"));
    // Calendar should show month navigation
    expect(screen.getByRole("button", { name: /previous month/i })).toBeInTheDocument();
  });

  it("shows TODAY and CLEAR footer buttons in open calendar", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("button", { name: /YYYY\.MM\.DD/i }));
    expect(screen.getByText("[TODAY]")).toBeInTheDocument();
    expect(screen.getByText("[CLEAR]")).toBeInTheDocument();
  });

  it("shows year navigation buttons in open calendar", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("button", { name: /YYYY\.MM\.DD/i }));
    expect(screen.getByRole("button", { name: /previous year/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next year/i })).toBeInTheDocument();
  });

  it("navigates to previous year when ◂◂ is clicked", () => {
    render(<DatePicker value="2026-06-15" />);
    fireEvent.click(screen.getByRole("button", { name: /2026\.06\.15/i }));
    const prevYearBtn = screen.getByRole("button", { name: /previous year/i });
    fireEvent.click(prevYearBtn);
    expect(screen.getByText(/JUNE 2025/i)).toBeInTheDocument();
  });

  it("navigates to next year when ▸▸ is clicked", () => {
    render(<DatePicker value="2026-06-15" />);
    fireEvent.click(screen.getByRole("button", { name: /2026\.06\.15/i }));
    const nextYearBtn = screen.getByRole("button", { name: /next year/i });
    fireEvent.click(nextYearBtn);
    expect(screen.getByText(/JUNE 2027/i)).toBeInTheDocument();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Rating
// ════════════════════════════════════════════════════════════════════════════

describe("Rating", () => {
  it("renders 5 diamonds by default", () => {
    const { container } = render(<Rating />);
    expect(container.textContent).toContain("◇◇◇◇◇");
  });

  it("renders filled diamonds for value", () => {
    const { container } = render(<Rating value={3} />);
    expect(container.textContent).toContain("◆◆◆◇◇");
  });

  it("renders custom max diamonds", () => {
    render(<Rating max={3} value={2} />);
    const container = document.querySelector("[role='slider']");
    expect(container?.textContent).toContain("◆◆◇");
  });

  it("calls onChange when a diamond is clicked", () => {
    const onChange = vi.fn();
    render(<Rating onChange={onChange} defaultValue={0} />);
    const diamonds = screen.getAllByText(/[◆◇]/);
    fireEvent.click(diamonds[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("does not call onChange in readOnly mode", () => {
    const onChange = vi.fn();
    render(<Rating onChange={onChange} readOnly defaultValue={3} />);
    const diamonds = screen.getAllByText(/[◆◇]/);
    fireEvent.click(diamonds[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("has slider role with aria-valuenow", () => {
    render(<Rating value={4} />);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("4");
  });

  it("increments value with ArrowRight key", () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("decrements value with ArrowLeft key", () => {
    const onChange = vi.fn();
    render(<Rating value={4} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(3);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// FileUpload — updated labels + new drag-invalid state + per-file list
// ════════════════════════════════════════════════════════════════════════════

describe("FileUpload", () => {
  it("renders idle state by default", () => {
    render(<FileUpload />);
    expect(
      screen.getByText("Drag files here or click to upload"),
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<FileUpload state="error" />);
    expect(screen.getByText("Upload failed")).toBeInTheDocument();
  });

  it("renders success state", () => {
    render(<FileUpload state="success" />);
    expect(screen.getByText("Upload complete")).toBeInTheDocument();
  });

  it("renders uploading state with progress bar", () => {
    render(<FileUpload state="uploading" progress={50} />);
    expect(screen.getByText("Uploading...")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders drag-invalid state", () => {
    render(<FileUpload state="drag-invalid" />);
    expect(screen.getByText("File type not supported")).toBeInTheDocument();
  });

  it("shows custom error message", () => {
    render(<FileUpload state="error" error="File too large" />);
    expect(screen.getByText("File too large")).toBeInTheDocument();
  });

  it("has hidden file input", () => {
    const { container } = render(<FileUpload />);
    const input = container.querySelector("input[type='file']");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("sr-only");
  });

  it("calls onFileSelect when files are dropped", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    // The dropzone is the inner div with role="button"
    const dropzone = container.querySelector("[role='button']") as HTMLElement;
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });
    expect(onFileSelect).toHaveBeenCalledWith([file]);
  });
});
