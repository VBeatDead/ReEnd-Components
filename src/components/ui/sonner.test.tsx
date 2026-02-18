import * as React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { Toaster, toast } from "./sonner";

afterEach(() => {
  cleanup();
});

describe("Toaster (Sonner)", () => {
  it("renders without crashing", () => {
    const { container } = render(<Toaster />);
    expect(container).toBeTruthy();
  });

  it("renders an aria-live region for accessibility", () => {
    const { container } = render(<Toaster />);
    const section = container.querySelector("section[aria-live]");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-live")).toBe("polite");
  });

  it("accepts dark theme prop without crashing", () => {
    const { container } = render(<Toaster theme="dark" />);
    expect(container.querySelector("section")).not.toBeNull();
  });

  it("accepts light theme prop without crashing", () => {
    const { container } = render(<Toaster theme="light" />);
    expect(container.querySelector("section")).not.toBeNull();
  });

  it("accepts position prop without crashing", () => {
    const { container } = render(<Toaster position="top-center" />);
    expect(container.querySelector("section")).not.toBeNull();
  });
});

describe("toast (Sonner)", () => {
  it("is a function", () => {
    expect(typeof toast).toBe("function");
  });

  it("has standard toast sub-methods", () => {
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.warning).toBe("function");
    expect(typeof toast.info).toBe("function");
    expect(typeof toast.dismiss).toBe("function");
  });
});
